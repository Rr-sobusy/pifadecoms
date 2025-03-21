import * as React from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { config } from '@/config';
import { Faqs } from '@/components/marketing/home/faqs';
import { Features } from '@/components/marketing/home/features';
import { Hero } from '@/components/marketing/home/hero';
import { Included } from '@/components/marketing/home/included';
import { Productivity } from '@/components/marketing/home/productivity';
import { StartBuilding } from '@/components/marketing/home/start-building';
import { Testimonails } from '@/components/marketing/home/testimonials';

export const metadata = { title: config.site.name, description: config.site.description } satisfies Metadata;

export default function Page(): React.JSX.Element {
  redirect('/dashboard');
  return (
    <div>
      {/* <Hero />
      <Productivity />
      <Included />
      <Features />
      <Testimonails />
      <Faqs />
      <StartBuilding /> */}
    </div>
  );
}
