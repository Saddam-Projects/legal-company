'use client';
import { useRouter } from 'next/navigation';

export default function useNavigateTo() {
  return (path: string) => {
    const link = `${path}?redirect_url=${path.replace('/', '')}`;
    window.location.href = link;
  };
}
