import SpanInterface from '@/interfaces/components/shared/SpanInterface';

export default function TextComponent(props: SpanInterface) {
  return <span className="text-dark dark:text-light text-base" {...props}></span>;
}
