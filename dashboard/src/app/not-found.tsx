import ErrorComponent from '@/components/Error';
import { IMAGE_NOT_FOUND_PAGE } from '@/utils/images';
import { PAGE_NOT_FOUND } from '@/utils/messageProperties';

export default function NotFound() {
  return <ErrorComponent description="sorry we couldn't find page you want" title={PAGE_NOT_FOUND} image={IMAGE_NOT_FOUND_PAGE} />;
}
