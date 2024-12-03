import ContainerInterface from '@/interfaces/components/shared/ContainerInterface';

export default function ContainerComponent(props: ContainerInterface) {
  return (
    <div className="w-full h-full" {...props}>
      {props.children}
    </div>
  );
}
