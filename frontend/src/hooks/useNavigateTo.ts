'use client';

import { useRouter } from 'next/navigation';

export default function useNavigateTo() {
  const route = useRouter();
  return (path: string, args?: string) => {
    const link = `${path}`;
    // window.location.href = link;
    route.push(link);
  };
}
