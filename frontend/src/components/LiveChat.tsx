import TextComponent from './Text';

export default function LiveChatComponent() {
  return (
    <div className="fixed bottom-0 w-full flex ">
      <div className="px-12 py-[2px] hover:py-2 opacity-20 hover:opacity-100 ml-auto bg-white border-teal border-1 rounded-tl-xl rounded-tr-xl">
        <TextComponent className="text-teal text-base font-medium">Live Chat</TextComponent>
      </div>
    </div>
  );
}
