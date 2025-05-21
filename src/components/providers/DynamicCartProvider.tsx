'use client';

import dynamic from 'next/dynamic';

const CartProviderWrapper = dynamic(
  () => import('@/components/providers/CartProviderWrapper'),
  { ssr: false }
);

export default function DynamicCartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CartProviderWrapper>{children}</CartProviderWrapper>;
} 