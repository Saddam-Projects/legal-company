import BooleanInterface from '@/interfaces/components/shared/BooleanInterface';

export default function BarMenuComponent(props: BooleanInterface) {
  return (
    <div className="lg:hidden space-y-1 flex flex-col cursor-pointer" onClick={() => props.setActive(!props.active)}>
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-1 w-6 bg-white  rounded-full"></div>
      ))}
    </div>
  );
}
