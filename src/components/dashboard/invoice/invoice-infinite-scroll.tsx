"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useInView } from "react-intersection-observer";

import { InvoiceType } from "@/actions/invoices/types";

interface Props {
  nextCursor: string | undefined;
  invoices: InvoiceType["invoice"];
}

function InfiniteScroll({ nextCursor, invoices }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { ref, inView } = useInView({ triggerOnce: false });

  const searchCursor = searchParams.get("cursor");
  const [currentCursor, setCurrentCursor] = useState<string | undefined>(searchCursor ?? nextCursor);

  useEffect(() => {
    if (inView && nextCursor && nextCursor !== currentCursor) {
      setCurrentCursor(nextCursor);

      const _searchParams = new URLSearchParams(searchParams.toString());
      _searchParams.set("cursor", nextCursor);
      router.replace(`?${_searchParams.toString()}`, { scroll: false });

      console.log("Updated Cursor:", nextCursor);
    }
  }, [inView, nextCursor, currentCursor, router]);

  // ✅ Ensure the URL updates even if `useState` delays changes
  useEffect(() => {
    if (currentCursor !== searchCursor) {
      const _searchParams = new URLSearchParams(searchParams.toString());
      _searchParams.set("cursor", currentCursor!);
      router.replace(`?${_searchParams.toString()}`, { scroll: false });

      console.log("Forced URL update:", currentCursor);
    }
  }, [currentCursor]);

  if (!nextCursor) return null;

  return (
    <Stack ref={ref} alignItems="center" justifyContent="center">
      <Typography variant="subtitle2">Loading more data . . .</Typography>
    </Stack>
  );
}

export default InfiniteScroll;
