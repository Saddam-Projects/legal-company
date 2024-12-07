import { PRO_IMAGE, MEDIUM_IMAGE, STARTER_IMAGE } from '@/utils/images';

export const SERVICE_DUMMY = [
  {
    id: 1,
    title: 'Service 1',
    terms: ['Lorem ipsum dolor sit amet.', 'Lorem ipsum dolor sit amet.', 'Lorem ipsum dolor sit amet.', 'Lorem ipsum dolor sit amet.', 'Lorem ipsum dolor sit amet.'],
    price: 1000000,
    img: PRO_IMAGE,
  },
  {
    id: 2,
    title: 'Service 2',
    terms: ['Lorem ipsum dolor sit amet.', 'Lorem ipsum dolor sit amet.', 'Lorem ipsum dolor sit amet.', 'Lorem ipsum dolor sit amet.'],
    price: 200000,
    img: MEDIUM_IMAGE,
  },
  {
    id: 3,
    title: 'Service 3',
    terms: ['Lorem ipsum dolor sit amet.', 'Lorem ipsum dolor sit amet.', 'Lorem ipsum dolor sit amet.'],
    price: 30000,
    img: STARTER_IMAGE,
  },
];

export const SERVICES = [
  ...SERVICE_DUMMY,
  {
    id: 4,
    title: 'Service 4',
    terms: ['Lorem ipsum dolor sit amet.', 'Lorem ipsum dolor sit amet.', 'Lorem ipsum dolor sit amet.', 'Lorem ipsum dolor sit amet.', 'Lorem ipsum dolor sit amet.'],
    price: 1000000,
    img: PRO_IMAGE,
  },
  {
    id: 5,
    title: 'Service 5',
    terms: ['Lorem ipsum dolor sit amet.', 'Lorem ipsum dolor sit amet.', 'Lorem ipsum dolor sit amet.', 'Lorem ipsum dolor sit amet.'],
    price: 200000,
    img: MEDIUM_IMAGE,
  },
  {
    id: 6,
    title: 'Service 6',
    terms: ['Lorem ipsum dolor sit amet.', 'Lorem ipsum dolor sit amet.', 'Lorem ipsum dolor sit amet.'],
    price: 30000,
    img: STARTER_IMAGE,
  },
];
