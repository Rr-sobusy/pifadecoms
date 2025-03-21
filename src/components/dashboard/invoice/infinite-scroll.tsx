'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';

type Props = {};

function InfiniteScroll({}: Props) {
  const { ref, inView } = useInView({ triggerOnce: false });
  React.useEffect(() => {
    if (inView) {
      alert('InfiniteScroll');
    }
  }, [inView]);
  return <div ref={ref}>InfiniteScroll</div>;
}

export default InfiniteScroll;
