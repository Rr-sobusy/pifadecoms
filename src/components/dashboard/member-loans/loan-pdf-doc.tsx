import React from 'react';
import type { RepaymentInterval } from '@prisma/client';
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import { formatToPHP } from '@/lib/api-utils/format-to-php';
import { dayjs } from '@/lib/dayjs';
import { ILoanDetails } from '@/actions/loans/types';
import { PDFViewer } from '@/components/core/pdf-viewer';

interface LoanPdfDocProps {
  loanDetails: ILoanDetails | undefined;
}

const loanTypeMap: Record<RepaymentInterval, dayjs.ManipulateType | null> = {
  Weekly: 'week',
  Monthly: 'month',
  Yearly: 'year',
  None: null,
};

const loanContractMap: Record<ILoanDetails['repStyle'], string> = {
  StraightPayment: 'Straight Payment',
  Diminishing: 'Diminishing',
  OneTime: 'End of term',
};

function computeAmortization(
  repStyle: ILoanDetails['repStyle'] | undefined,
  repInterval: ILoanDetails['repInterval'] | undefined,
  principal: number | undefined, // Principal amount (to be repaid without interest)
  payable: number | undefined, // Total amount to be repaid (including interest)
  releaseDate: Date | undefined,
  dueDate: Date | undefined,
  paymentQty: number | undefined, // Number of payments
  interestRate: number | undefined
  // Annual interest rate in decimal (e.g., 12 for 12%)
): {
  paymentNo: number;
  paymentSched: Date;
  totalPayment: number;
  principal: number;
  interest: number;
  balance: number;
}[] {
  let amortizations: {
    paymentNo: number;
    paymentSched: Date;
    totalPayment: number;
    principal: number;
    interest: number;
    balance: number;
  }[] = [];

  // Validate required values
  if (
    repStyle === undefined ||
    repInterval === undefined ||
    principal === undefined ||
    payable === undefined ||
    releaseDate === undefined ||
    paymentQty === undefined ||
    interestRate === undefined ||
    paymentQty <= 0
  ) {
    return amortizations; // Return empty array if any required value is missing
  }

  let balance = repStyle === 'Diminishing' ? principal : payable;

  if (repStyle === 'Diminishing') {
    const fixedPrincipal = Math.round(principal / paymentQty); // Fixed principal per period
    const periodRate = interestRate / 100; // Convert annual rate to monthly

    for (let i = 1; i <= paymentQty; i++) {
      const interest = Math.round(balance * periodRate); // Interest based on remaining balance
      const totalPayment = Math.round(fixedPrincipal + interest);
      balance -= Math.round(fixedPrincipal);

      amortizations.push({
        paymentNo: i,
        paymentSched: dayjs(releaseDate)
          .add(i, loanTypeMap[repInterval] ?? undefined)
          .toDate(),
        totalPayment,
        principal: fixedPrincipal,
        interest,
        balance: Math.max(balance, 0), // Prevent negative balance
      });
    }
  }

  if (repStyle === 'StraightPayment') {
    const fixedPayment = Math.round(payable / paymentQty);
    for (let i = 1; i <= paymentQty; i++) {
      balance = Math.max(balance - fixedPayment, 0);
      amortizations.push({
        paymentNo: i,
        paymentSched: dayjs(releaseDate)
          .add(i, loanTypeMap[repInterval] ?? undefined)
          .toDate(),
        totalPayment: fixedPayment,
        principal: fixedPayment,
        interest: 0,
        balance,
      });
    }
  }

  if (repStyle === 'OneTime') {
    amortizations.push({
      paymentNo: 1,
      paymentSched: dayjs(dueDate).toDate(),
      totalPayment: payable,
      principal: Math.round(payable),
      interest: 0,
      balance: 0,
    });
  }

  return amortizations;
}

const styleSheet = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    fontSize: 10,
    fontWeight: 400,
    marginTop: 40,
  },
  bigText: { fontSize: 22 },
  smallText: { fontSize: 9 },
  sampleStyle: { textAlign: 'center' },

  //utils
  largeGap: { gap: 25 },

  flexGrow: { flexGrow: 4 },
  refs: { gap: 6 },
  refRow: { flexDirection: 'row' },
  refDescription: { fontWeight: 500, width: 100 },

  paymentSched: {
    borderBottomWidth: 0.5,
    borderBottomStyle: 'solid',
    borderTopWidth: 0.5,
    borderTopStyle: 'solid',
    borderTopColor: '#262626',
    borderBottomColor: '#262626',
    flexDirection: 'row',
    padding: 4,
  },

  schedLine: {
    flexDirection: 'row',
  },


  paymentNo: { width: '10%', textAlign: 'center', margin: 2 },
  paymentDate: { width: '17%', margin: 2 },
  totalPayment: { width: '17%', margin: 2 },
  principal: { width: '17%', margin: 2 },
  interest: { width: '17%', margin: 2 },
  balance: { width: '17%', margin: 2 },
  footer: { marginTop: 25 },
});

function LoanPdfDoc({ loanDetails }: LoanPdfDocProps) {
  const amortizations = computeAmortization(
    loanDetails?.repStyle,
    loanDetails?.repInterval,
    Number(loanDetails?.amountLoaned),
    Number(loanDetails?.amountPayable),
    loanDetails?.issueDate,
    loanDetails?.dueDate,
    loanDetails?.paymentQty,
    Number(loanDetails?.interestRate)
  );

  if (!loanDetails) {
    return (
      <PDFViewer style={{ border: 'none', height: '100vh', width: '100vw' }}>
        <Document>
          <Page size="A4">
            <Text>Loading record. . .</Text>
          </Page>
        </Document>
      </PDFViewer>
    );
  }

  return (
    <PDFViewer style={{ border: 'none', height: '100vh', width: '100vw' }}>
      <Document>
        <Page size="A4" style={styleSheet.page}>
          <View style={styleSheet.sampleStyle}>
            <Text style={styleSheet.bigText}>Loan Amortization Schedule</Text>
            <Text style={styleSheet.smallText}>Pinagsibaan Farmer's Development Multi-Purpose Cooperative</Text>
          </View>

          {/* ***** Loan Details ***** */}
          <View style={[styleSheet.refRow, styleSheet.largeGap, { marginTop: 25 }]}>
            <View style={styleSheet.refs}>
              <View style={styleSheet.refRow}>
                <Text style={styleSheet.refDescription}>Loan ID:</Text>
                <Text>{`LN-${loanDetails.loanId.toString().padStart(6, '0')}`}</Text>
              </View>
              <View style={styleSheet.refRow}>
                <Text style={styleSheet.refDescription}>Loaner Name:</Text>
                <Text>{`${loanDetails.Member.lastName}, ${loanDetails.Member.firstName} `}</Text>
              </View>
              <View style={styleSheet.refRow}>
                <Text style={styleSheet.refDescription}>Loan source:</Text>
                <Text>{loanDetails.Source.sourceName}</Text>
              </View>
              <View style={styleSheet.refRow}>
                <Text style={styleSheet.refDescription}>Loan contract:</Text>
                <Text>{loanContractMap[loanDetails.repStyle]}</Text>
              </View>
              <View style={styleSheet.refRow}>
                <Text style={styleSheet.refDescription}>Repayment interval:</Text>
                <Text>{loanDetails.repInterval}</Text>
              </View>
              <View style={styleSheet.refRow}>
                <Text style={styleSheet.refDescription}>Loaned Amount:</Text>
                <Text>{formatToPHP(Number(loanDetails.amountLoaned))}</Text>
              </View>
              <View style={styleSheet.refRow}>
                <Text style={styleSheet.refDescription}>Amount Payable</Text>
                <Text>
                  {loanDetails.repStyle === 'Diminishing'
                    ? `${formatToPHP(Number(loanDetails.amountLoaned))} + intr. accrued`
                    : formatToPHP(Number(loanDetails.amountPayable))}
                </Text>
              </View>
            </View>
            <View style={styleSheet.refs}>
              <View style={styleSheet.refRow}>
                <Text style={styleSheet.refDescription}>Interest rate:</Text>
                <Text>{Number(loanDetails.interestRate)}% per month</Text>
              </View>
              <View style={styleSheet.refRow}>
                <Text style={styleSheet.refDescription}>Amortization count:</Text>
                <Text>{loanDetails.paymentQty}</Text>
              </View>
              <View style={styleSheet.refRow}>
                <Text style={styleSheet.refDescription}>Date released:</Text>
                <Text>{dayjs(loanDetails.issueDate).format('MMM DD YYYY')}</Text>
              </View>
              <View style={styleSheet.refRow}>
                <Text style={styleSheet.refDescription}>Date Due:</Text>
                <Text>{dayjs(loanDetails.dueDate).format('MMM DD YYYY')}</Text>
              </View>
            </View>
          </View>

          {/* **** Amortization Schedules ****** */}

          <View style={[styleSheet.paymentSched, { marginTop: 25 }]}>
            <View style={styleSheet.paymentNo}>
              <Text>No.</Text>
            </View>
            <View style={styleSheet.paymentDate}>
              <Text>Payment date</Text>
            </View>
            <View style={styleSheet.totalPayment}>
              <Text>Total payment</Text>
            </View>
            <View style={styleSheet.principal}>
              <Text>Principal</Text>
            </View>
            <View style={styleSheet.interest}>
              <Text>Interest</Text>
            </View>
            <View style={styleSheet.balance}>
              <Text>Balance remaining</Text>
            </View>
          </View>

          {amortizations.map((ammort, index) => {
            const diminishingPenaltyRate = 3.5 - Number(loanDetails?.interestRate);
            const previousBalance = index > 0 ? amortizations[index - 1].balance : Number(loanDetails?.amountPayable);
            const diminishingPenalty = (previousBalance * diminishingPenaltyRate) / 100;

            return (
              <View key={index} style={styleSheet.schedLine}>
                <View style={styleSheet.paymentNo}>
                  <Text>{ammort.paymentNo}</Text>
                </View>
                <View style={styleSheet.paymentDate}>
                  <Text>{dayjs(ammort.paymentSched).format('MMM DD YYYY')}</Text>
                </View>
                <View style={styleSheet.totalPayment}>
                  <Text>{loanDetails?.repStyle !== "Diminishing" ? formatToPHP(ammort.totalPayment) : `${formatToPHP(ammort.totalPayment)} (${formatToPHP(ammort.totalPayment + diminishingPenalty)}) if lapses` }</Text>
                </View>
                <View style={styleSheet.principal}>
                  <Text>{formatToPHP(ammort.principal)}</Text>
                </View>
                <View style={styleSheet.interest}>
                  <Text>
                    {formatToPHP(ammort.interest)}
                    {loanDetails.repStyle === 'Diminishing'&& `(${formatToPHP(diminishingPenalty + ammort.interest)} if lapses)`}
                  </Text>
                </View>
                <View style={styleSheet.balance}>
                  <Text>{formatToPHP(ammort.balance)}</Text>
                </View>
              </View>
            );
          })}

          <View style={styleSheet.footer}>
            <Text>
              Note: This is a system generated amortization schedules. Small miscalculations may be seen so better to
              review it.
            </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default LoanPdfDoc;
