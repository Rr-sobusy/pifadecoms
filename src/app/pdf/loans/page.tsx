


import React from 'react';
import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import { formatToPHP } from '@/lib/api-utils/format-to-php';
import { dayjs } from '@/lib/dayjs';
import { PDFViewer } from '@/components/core/pdf-viewer';

type Props = {};

const styleSheet = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    fontSize: 10,
    fontWeight: 400,
    marginTop : 40
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

function page({}: Props) {
  return (
    <PDFViewer style={{ border: 'none', height: '100vh', width: '100vw' }}>
      <Document>
        <Page size="A4" style={styleSheet.page}>
          <View style={styleSheet.sampleStyle}>
            <Text style={styleSheet.bigText}>Loan Amortization Schedule</Text>
            <Text style={styleSheet.smallText}>Pinagsibaan Farmer's Development Multi-purpose Cooperative</Text>
          </View>

          {/* ***** Loan Details ***** */}
          <View style={[styleSheet.refRow, styleSheet.largeGap, { marginTop: 25 }]}>
            <View style={styleSheet.refs}>
              <View style={styleSheet.refRow}>
                <Text style={styleSheet.refDescription}>Loan ID:</Text>
                <Text>LN-00005</Text>
              </View>
              <View style={styleSheet.refRow}>
                <Text style={styleSheet.refDescription}>Loaner Name:</Text>
                <Text>Hernandez Rex Randy</Text>
              </View>
              <View style={styleSheet.refRow}>
                <Text style={styleSheet.refDescription}>Loan source:</Text>
                <Text>Member Loans</Text>
              </View>
              <View style={styleSheet.refRow}>
                <Text style={styleSheet.refDescription}>Loan contract:</Text>
                <Text>Diminishing</Text>
              </View>
              <View style={styleSheet.refRow}>
                <Text style={styleSheet.refDescription}>Repayment interval:</Text>
                <Text>Monthly</Text>
              </View>
              <View style={styleSheet.refRow}>
                <Text style={styleSheet.refDescription}>Loaned Amount:</Text>
                <Text>{formatToPHP(10000)}</Text>
              </View>
              <View style={styleSheet.refRow}>
                <Text style={styleSheet.refDescription}>Amount Payable</Text>
                <Text>{formatToPHP(10000)} + accrued int.</Text>
              </View>
            </View>
            <View style={styleSheet.refs}>
              <View style={styleSheet.refRow}>
                <Text style={styleSheet.refDescription}>Interest rate:</Text>
                <Text>2.5% per month</Text>
              </View>
              <View style={styleSheet.refRow}>
                <Text style={styleSheet.refDescription}>Amortization count:</Text>
                <Text>6</Text>
              </View>
              <View style={styleSheet.refRow}>
                <Text style={styleSheet.refDescription}>Date released:</Text>
                <Text>{dayjs().format('MMM DD YYYY')}</Text>
              </View>
              <View style={styleSheet.refRow}>
                <Text style={styleSheet.refDescription}>Date Due:</Text>
                <Text>{dayjs().format('MMM DD YYYY')}</Text>
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

          {/* ******* Sched line***** */}
          <View style={styleSheet.schedLine}>
            <View style={styleSheet.paymentNo}>
              <Text>1</Text>
            </View>
            <View style={styleSheet.paymentDate}>
              <Text>{dayjs().format('MMM DD YYYY')}</Text>
            </View>
            <View style={styleSheet.totalPayment}>
              <Text>{formatToPHP(1200)}</Text>
            </View>
            <View style={styleSheet.principal}>
              <Text>{formatToPHP(1000)}</Text>
            </View>
            <View style={styleSheet.interest}>
              <Text>{formatToPHP(200)}</Text>
            </View>
            <View style={styleSheet.balance}>
              <Text>{formatToPHP(9000)}</Text>
            </View>
          </View>

          <View style={styleSheet.schedLine}>
            <View style={styleSheet.paymentNo}>
              <Text>2</Text>
            </View>
            <View style={styleSheet.paymentDate}>
              <Text>{dayjs().format('MMM DD YYYY')}</Text>
            </View>
            <View style={styleSheet.totalPayment}>
              <Text>{formatToPHP(1200)}</Text>
            </View>
            <View style={styleSheet.principal}>
              <Text>{formatToPHP(1000)}</Text>
            </View>
            <View style={styleSheet.interest}>
              <Text>{formatToPHP(200)}</Text>
            </View>
            <View style={styleSheet.balance}>
              <Text>{formatToPHP(9000)}</Text>
            </View>
          </View>

          <View style={styleSheet.schedLine}>
            <View style={styleSheet.paymentNo}>
              <Text>3</Text>
            </View>
            <View style={styleSheet.paymentDate}>
              <Text>{dayjs().format('MMM DD YYYY')}</Text>
            </View>
            <View style={styleSheet.totalPayment}>
              <Text>{formatToPHP(1200)}</Text>
            </View>
            <View style={styleSheet.principal}>
              <Text>{formatToPHP(1000)}</Text>
            </View>
            <View style={styleSheet.interest}>
              <Text>{formatToPHP(200)}</Text>
            </View>
            <View style={styleSheet.balance}>
              <Text>{formatToPHP(9000)}</Text>
            </View>
          </View>

          <View style={styleSheet.schedLine}>
            <View style={styleSheet.paymentNo}>
              <Text>4</Text>
            </View>
            <View style={styleSheet.paymentDate}>
              <Text>{dayjs().format('MMM DD YYYY')}</Text>
            </View>
            <View style={styleSheet.totalPayment}>
              <Text>{formatToPHP(1200)}</Text>
            </View>
            <View style={styleSheet.principal}>
              <Text>{formatToPHP(1000)}</Text>
            </View>
            <View style={styleSheet.interest}>
              <Text>{formatToPHP(200)}</Text>
            </View>
            <View style={styleSheet.balance}>
              <Text>{formatToPHP(9000)}</Text>
            </View>
          </View>

          <View style={styleSheet.schedLine}>
            <View style={styleSheet.paymentNo}>
              <Text>5</Text>
            </View>
            <View style={styleSheet.paymentDate}>
              <Text>{dayjs().format('MMM DD YYYY')}</Text>
            </View>
            <View style={styleSheet.totalPayment}>
              <Text>{formatToPHP(1200)}</Text>
            </View>
            <View style={styleSheet.principal}>
              <Text>{formatToPHP(1000)}</Text>
            </View>
            <View style={styleSheet.interest}>
              <Text>{formatToPHP(200)}</Text>
            </View>
            <View style={styleSheet.balance}>
              <Text>{formatToPHP(9000)}</Text>
            </View>
          </View>

          <View style={styleSheet.schedLine}>
            <View style={styleSheet.paymentNo}>
              <Text>6</Text>
            </View>
            <View style={styleSheet.paymentDate}>
              <Text>{dayjs().format('MMM DD YYYY')}</Text>
            </View>
            <View style={styleSheet.totalPayment}>
              <Text>{formatToPHP(1200)}</Text>
            </View>
            <View style={styleSheet.principal}>
              <Text>{formatToPHP(1000)}</Text>
            </View>
            <View style={styleSheet.interest}>
              <Text>{formatToPHP(200)}</Text>
            </View>
            <View style={styleSheet.balance}>
              <Text>{formatToPHP(9000)}</Text>
            </View>
          </View>

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

export default page;
