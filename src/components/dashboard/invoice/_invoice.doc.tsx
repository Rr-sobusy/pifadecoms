'use client';

import * as React from 'react';
import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import { formatToPHP } from '@/lib/api-utils/format-to-php';
import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import type { SingleInvoiceType } from '@/actions/invoices/types';

// Invoice data should be received as a prop.
// For the sake of simplicity, we are using a hardcoded data.

export interface LineItem {
  id: string;
  name: string;
  quantity: number;
  currency: string;
  unitAmount: number;
  totalAmount: number;
}

const lineItems = [
  { id: 'LI-001', name: 'Pro Subscription', quantity: 1, currency: 'USD', unitAmount: 14.99, totalAmount: 14.99 },
] satisfies LineItem[];

const styles = StyleSheet.create({
  // Utils
  fontMedium: { fontWeight: 500 },
  fontSemibold: { fontWeight: 600 },
  textLg: { fontSize: 10, lineHeight: 1.5 },
  textXl: { fontSize: 18, lineHeight: 1.6 },
  textRight: { textAlign: 'right' },
  uppercase: { textTransform: 'uppercase' },
  gutterBottom: { marginBottom: 4 },
  flexGrow: { flexGrow: 1 },
  flexRow: { flexDirection: 'row' },
  flexColumn: { flexDirection: 'column', display: 'flex', gap: 30 },
  w50: { width: '50%' },
  w100: { width: '100%' },
  // Components
  page: { backgroundColor: '#FFFFFF', gap: 32, padding: 24, fontSize: 10, fontWeight: 400, lineHeight: 1.43 },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  brand: { height: 40, width: 40 },
  refs: { gap: 8 },
  refRow: { flexDirection: 'row' },
  refDescription: { fontWeight: 500, width: 100 },
  items: { borderWidth: 1, borderStyle: 'solid', borderColor: '#262626', borderRadius: 4 },
  itemRow: { borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: '#262626', flexDirection: 'row' },
  itemNumber: { padding: 6, width: '10%' },
  itemDescription: { padding: 6, width: '50%' },
  itemQty: { padding: 6, width: '10%' },
  itemUnitAmount: { padding: 6, width: '15%' },
  itemTotalAmount: { padding: 6, width: '15%' },
  summaryRow: { flexDirection: 'row' },
  summaryGap: { padding: 6, width: '70%' },
  summaryTitle: { padding: 6, width: '15%' },
  summaryValue: { padding: 6, width: '15%' },
});

export interface InvoicePDFDocumentProps {
  invoice: SingleInvoiceType | undefined;
}

export function InvoiceDoc({ invoice }: InvoicePDFDocumentProps): React.JSX.Element {
  const invDueDate = dayjs(dayjs(invoice?.dateOfInvoice).add(1, 'M')).format('MMM DD,YYYY');
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.flexGrow}>
            <Text style={[styles.textXl, styles.fontSemibold]}>Sales Invoice</Text>
          </View>
          <View>
            <Image source="/assets/logo-emblem--dark.png" style={styles.brand} />
          </View>
        </View>
        <View style={styles.refs}>
          <View style={styles.refRow}>
            <Text style={styles.refDescription}>Number:</Text>
            <Text>{`INV - ${invoice?.invoiceId.toString().padStart(6, '0')}`}</Text>
          </View>
          <View style={styles.refRow}>
            <Text style={styles.refDescription}>Due Date:</Text>
            <Text>{dayjs(invoice?.dateOfInvoice).add(1, 'month').format('MMM DD YYYY')}</Text>
          </View>
          <View style={styles.refRow}>
            <Text style={styles.refDescription}>Issue Date:</Text>
            <Text>{dayjs(invoice?.dateOfInvoice).format('MMM D, YYYY')}</Text>
          </View>
          <View style={styles.refRow}>
            <Text style={styles.refDescription}>Issuer VAT No:</Text>
            <Text>-</Text>
          </View>
        </View>
        <View style={styles.flexColumn}>
          <View style={styles.w100}>
            <Text style={[styles.fontMedium, styles.gutterBottom]}>
              Pinagsibaan Farmer's Development Multi-Purpose Cooperative
            </Text>
            <Text style={[styles.fontMedium, styles.gutterBottom]}>
              Pinagsibaan, Rosario, Batangas, Philippines, 4225
            </Text>
            <Text style={[styles.fontMedium, styles.gutterBottom]}>pifadeco_2000@gmail.com</Text>
          </View>
          <View style={styles.w100}>
            <Text style={[styles.fontMedium, styles.gutterBottom]}>Billed To</Text>
            <Text>{`${invoice?.Members.lastName}, ${invoice?.Members.firstName}`}</Text>
            <Text>{invoice?.Members.address}</Text>
          </View>
        </View>
        <View>
          <Text>{`${formatToPHP(invoice?.outStandingAmt ?? 0)} due on ${invDueDate}`}</Text>
        </View>
        <View>
          <View style={styles.items}>
            <View style={styles.itemRow}>
              <View style={styles.itemNumber}>
                <Text style={styles.fontSemibold}>#</Text>
              </View>
              <View style={styles.itemDescription}>
                <Text style={styles.fontSemibold}>Name</Text>
              </View>
              <View style={styles.itemUnitAmount}>
                <Text style={styles.fontSemibold}>Unit Price</Text>
              </View>
              <View style={styles.itemQty}>
                <Text style={styles.fontSemibold}>Qty</Text>
              </View>
              <View style={styles.itemTotalAmount}>
                <Text style={[styles.fontSemibold, styles.textRight]}>Amount</Text>
              </View>
            </View>
            {invoice?.InvoiceItems.map((lineItem, index) => (
              <View key={lineItem.invoiceItemId} style={styles.itemRow}>
                <View style={styles.itemNumber}>
                  <Text>{index + 1}</Text>
                </View>
                <View style={styles.itemDescription}>
                  <Text>{lineItem.Item.itemName}</Text>
                </View>
                <View style={styles.itemUnitAmount}>
                  <Text>{formatToPHP(lineItem.rate)}</Text>
                </View>
                <View style={styles.itemQty}>
                  <Text>{lineItem.quantity}</Text>
                </View>
                <View style={styles.itemTotalAmount}>
                  <Text style={styles.textRight}>{formatToPHP(lineItem.quantity * lineItem.rate)}</Text>
                </View>
              </View>
            ))}
          </View>
          <View>
            <View style={styles.summaryRow}>
              <View style={styles.summaryGap} />
              <View style={styles.summaryTitle}>
                <Text>Subtotal</Text>
              </View>
              <View style={styles.summaryValue}>
                <Text style={styles.textRight}>{formatToPHP(invoice?.outStandingAmt ?? 0)}</Text>
              </View>
            </View>
            <View style={styles.summaryRow}>
              <View style={styles.summaryGap} />
              <View style={styles.summaryTitle}>
                <Text>Taxes</Text>
              </View>
              <View style={styles.summaryValue}>
                <Text style={styles.textRight}>-</Text>
              </View>
            </View>
            <View style={styles.summaryRow}>
              <View style={styles.summaryGap} />
              <View style={styles.summaryTitle}>
                <Text>Total</Text>
              </View>
              <View style={styles.summaryValue}>
                <Text style={[styles.textRight, styles.textLg]}>{formatToPHP(invoice?.outStandingAmt ?? 0)}</Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text style={[styles.textLg, styles.fontSemibold, styles.gutterBottom]}>Notes</Text>
          <Text>
          This is a system generated invoice. Please make sure that all the data stated above are accurate before
          proceed for payment.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
