'use client';

import React from 'react';
import {dayjs} from '@/lib/dayjs'
import { logger } from '@/lib/default-logger';
import type { ILoanDetails } from '@/actions/loans/types';
import LoanPdfDoc from '@/components/dashboard/member-loans/loan-pdf-doc';



function page({ params }: { params: { loanId: number } }) {
  const [loanDetails, setLoanDetails] = React.useState<ILoanDetails | undefined>();

  /**
   * * Fetch loanDetails using api call to prevent bugs instead of using react server component.
   */

  React.useEffect(() => {
    async function fetchLoanDetails() {
      try {
        const loanDetails = await fetch(`/dashboard/memberLoans/api/${params.loanId}`, { method: 'GET' }).then((res) =>
          res.json()
        );
        setLoanDetails(loanDetails);
      } catch (error) {
        logger.debug(error);
      }
    }
    fetchLoanDetails();
  }, []);

  return <LoanPdfDoc loanDetails={loanDetails} />;
}

export default page;
