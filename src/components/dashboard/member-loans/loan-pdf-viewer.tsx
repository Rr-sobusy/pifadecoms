"use client"

import React from 'react'
import { PDFViewer } from '@/components/core/pdf-viewer';
import type { ILoanDetails } from '@/actions/loans/types';


interface LoanPdfViewerProps  {
    loanDetails:ILoanDetails
}

function LoanPdfViewer({loanDetails}: LoanPdfViewerProps) {
  return (
    <div>LoanPdfViewer</div>
  )
}

export default LoanPdfViewer