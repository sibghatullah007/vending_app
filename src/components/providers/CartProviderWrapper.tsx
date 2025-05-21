'use client'

import { CartProvider } from '@/context/CartContext'
import { useEffect, useState } from 'react'

export default function CartProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <CartProvider>{children}</CartProvider>
} 