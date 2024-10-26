"use client";
// src/app/page.js
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/products');
  }, [router]);
  
  return null;
}
