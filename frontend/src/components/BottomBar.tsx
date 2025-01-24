import { useMemo } from 'react';
import ContainerComponent from './Container';
import TextComponent from './Text';
import * as Fa from 'react-icons/fa';

export default function BottomBarComponent({ email, phone }: { email: string; phone: string }) {
  const CONTACT = useMemo(
    () => [
      {
        icon: <Fa.FaWhatsapp className="text-xl" />,
        title: 'Whatsapp',
        name: 'wa',
        color: 'bg-primary',
        url: `http://rentetan.nextdigital.co.id/socom?bid=8ff0781eeaa355ce0e36184564fa16d24ff935898cbc8f3a6eb5ba446b745427`,
      },

      {
        icon: <Fa.FaPhoneAlt className="text-xl" />,
        title: 'Phone',
        name: 'phone',
        color: 'bg-secondary',
        url: `tel:${phone}`,
      },
      {
        icon: <Fa.FaEnvelope className="text-xl" />,
        title: 'Email',
        name: 'mail',
        color: 'bg-gold',
        url: `mailto:${email}`,
      },
    ],
    [email, phone]
  );
  return (
    <ContainerComponent className="fixed bottom-0 left-0 w-full bg-white z-30">
      <div className="flex justify-between">
        {CONTACT.map((item, index) => (
          <div key={index} className={`flex items-center space-x-1 justify-center bg-primary w-full h-full p-2 ${item.color}`}>
            {item.icon}
            <TextComponent className={`text-black font-medium text-base`}>
              <a className="btn-rentetan" href={item.url}>
                {item.title}
              </a>
            </TextComponent>
          </div>
        ))}
      </div>
    </ContainerComponent>
  );
}
