import ContainerComponent from './Container';
import TextComponent from './Text';
import * as Fa from 'react-icons/fa';

export const CONTACT = [
  {
    icon: <Fa.FaWhatsapp className="text-xl" />,
    title: 'Whatsapp',
    name: 'wa',
    color: 'bg-primary',
    url: 'https://wa.me/628888888888',
  },

  {
    icon: <Fa.FaPhoneAlt className="text-xl" />,
    title: 'Phone',
    name: 'phone',
    color: 'bg-secondary',
    url: 'https://wa.me/628888888888',
  },
  {
    icon: <Fa.FaEnvelope className="text-xl" />,
    title: 'Email',
    name: 'mail',
    color: 'bg-gold',
    url: 'mailto:example.com',
  },
];
export default function BottomBarComponent() {
  return (
    <ContainerComponent className="fixed bottom-0 left-0 w-full bg-white z-30">
      <div className="flex justify-between">
        {CONTACT.map((item, index) => (
          <div key={index} className={`flex items-center space-x-1 justify-center bg-primary w-full h-full p-2 ${item.color}`}>
            {item.icon}
            <TextComponent className={`text-black font-medium text-base`}>
              <a href={item.url}>{item.title}</a>
            </TextComponent>
          </div>
        ))}
      </div>
    </ContainerComponent>
  );
}
