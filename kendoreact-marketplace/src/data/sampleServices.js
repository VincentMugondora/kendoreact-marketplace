export const SAMPLE_SERVICES = [
  {
    id: 1,
    name: 'House Cleaning',
    category: 'Cleaning',
    price: 80,
    rating: 4.6,
    description: 'Professional house cleaning with eco-friendly supplies.',
    image: 'https://picsum.photos/seed/cleaning/200/120'
  },
  {
    id: 2,
    name: 'Plumbing Fix',
    category: 'Plumbing',
    price: 120,
    rating: 4.4,
    description: 'Leak repairs, pipe replacement, and fixture installations.',
    image: 'https://picsum.photos/seed/plumbing/200/120'
  },
  {
    id: 3,
    name: 'Math Tutoring',
    category: 'Tutoring',
    price: 45,
    rating: 4.8,
    description: '1:1 math tutoring for middle and high school.',
    image: 'https://picsum.photos/seed/tutoring/200/120'
  },
  {
    id: 4,
    name: 'Garden Makeover',
    category: 'Gardening',
    price: 150,
    rating: 4.5,
    description: 'Planting, trimming, and landscaping small backyards.',
    image: 'https://picsum.photos/seed/garden/200/120'
  },
  {
    id: 5,
    name: 'Portrait Photography',
    category: 'Photography',
    price: 200,
    rating: 4.9,
    description: 'Outdoor portrait session with 10 edited photos.',
    image: 'https://picsum.photos/seed/photo/200/120'
  },
  {
    id: 6,
    name: 'Dog Walking',
    category: 'Pets',
    price: 25,
    rating: 4.7,
    description: '30-minute dog walking and playtime.',
    image: 'https://picsum.photos/seed/dog/200/120'
  },
  {
    id: 7,
    name: 'Car Wash (Mobile)',
    category: 'Automotive',
    price: 35,
    rating: 4.2,
    description: 'Exterior wash and interior vacuum at your location.',
    image: 'https://picsum.photos/seed/car/200/120'
  },
  {
    id: 8,
    name: 'Yoga Session',
    category: 'Wellness',
    price: 60,
    rating: 4.6,
    description: 'Private yoga session tailored to your level.',
    image: 'https://picsum.photos/seed/yoga/200/120'
  },
  {
    id: 9,
    name: 'Home Cooking Class',
    category: 'Culinary',
    price: 90,
    rating: 4.7,
    description: 'Learn to cook a 3-course meal at home.',
    image: 'https://picsum.photos/seed/cook/200/120'
  },
  {
    id: 10,
    name: 'PC Repair',
    category: 'IT Services',
    price: 70,
    rating: 4.3,
    description: 'Diagnostics, virus removal, and tune-up.',
    image: 'https://picsum.photos/seed/pc/200/120'
  }
];

export const CATEGORIES = ['All', ...Array.from(new Set(SAMPLE_SERVICES.map(s => s.category)))];
