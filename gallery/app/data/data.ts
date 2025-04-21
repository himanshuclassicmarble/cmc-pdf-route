// data.ts
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string; // path to local image in public folder
};

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Apollo Grey',
    description: 'Classic Italian marble with subtle gray veining on a white background.',
    price: 199.99,
    image: 'https://picsum.photos/800/600',
  },
  {
    id: '2',
    name: 'Emperador Dark',
    description: 'Rich brown Spanish marble with irregular veining patterns.',
    price: 249.99,
    image: 'https://picsum.photos/800/600',
  },
  {
    id: '3',
    name: 'Calacatta Gold',
    description: 'Luxury Italian marble with dramatic gold veining on white background.',
    price: 349.99,
    image: 'https://picsum.photos/800/600',
  },
  {
    id: '4',
    name: 'Nero Marquina',
    description: 'Elegant black Spanish marble with white veining.',
    price: 279.99,
    image: 'https://picsum.photos/800/600',
  },
  {
    id: '5',
    name: 'Statuario Venato',
    description: 'Premium white marble with bold gray veining patterns.',
    price: 329.99,
  image: 'https://picsum.photos/800/600',
  },
  {
    id: '6',
    name: 'Travertine Classic',
    description: 'Natural beige travertine with characteristic small cavities.',
    price: 189.99,
    image: '/Images/Statuario-Venato.jpg',
  },
];

