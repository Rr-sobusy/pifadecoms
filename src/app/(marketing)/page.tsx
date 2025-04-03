import * as React from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { config } from '@/config';


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
