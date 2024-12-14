import { useRouter } from 'next/navigation';

export default function useNavigateTo() {
  const router = useRouter();

  return (path: string) => {
    router.push(`${path}?redirect_url=${path.replace('/', '')}`);
  };
}
