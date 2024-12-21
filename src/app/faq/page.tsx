'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FaqRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/?modal=faq');
  }, [router]);

  return null;
}
