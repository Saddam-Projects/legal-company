import SpanInterface from '@/interfaces/components/shared/SpanInterface';
import { poppins } from '@/utils/fonts';

export default function TextComponent(props: SpanInterface) {
  return <span className={`text-dark text-base ${poppins.className}`} {...props}></span>;
}
