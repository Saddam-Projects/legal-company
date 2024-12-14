import ContainerInterface from '@/interfaces/components/shared/ContainerInterface';

export default function ContainerComponent(props: ContainerInterface) {
  return (
    <div className="bg-light dark:bg-dark w-full h-full" {...props}>
      {props.children}
    </div>
  );
}
