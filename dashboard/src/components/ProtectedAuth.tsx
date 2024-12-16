import useLocalStorage from '@/hooks/useLocalStorage';
import { UserSession } from '@/entity/UserSession';
import useNavigateTo from '@/hooks/useNavigateTo';
import { AUTH_URL } from '@/datasources/internals/menus';
import { usePathname } from 'next/navigation';
import ContainerInterface from '@/interfaces/components/shared/ContainerInterface';

export default function ProtectedAuth(props: ContainerInterface) {
  const data = useLocalStorage.read<null | UserSession>('session');
  const navigate = useNavigateTo();
  const pathName = usePathname();

  if (pathName.includes(AUTH_URL)) return props.children;

  if (!data) {
    navigate(AUTH_URL);
    return;
  }

  return props.children;
}
