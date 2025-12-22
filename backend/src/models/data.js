// In-memory data store for development
// In production, replace with database models (see neededinfo.md)

export const categories = [
  { id: '1', name: 'All', slug: 'all', order: 0 },
  { id: '2', name: 'Buildings', slug: 'buildings', order: 1 },
  { id: '3', name: 'Landscapes', slug: 'landscapes', order: 2 },
  { id: '4', name: 'Interiors', slug: 'interiors', order: 3 },
  { id: '5', name: 'Vehicles', slug: 'vehicles', order: 4 },
];

export const products = [
  {
    id: '1',
    name: 'Modern Villa Pack',
    description: 'A stunning collection of modern villa designs with clean lines and contemporary aesthetics.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop',
    category: 'buildings',
    tags: ['modern', 'villa', 'luxury'],
    rating: 4.8,
    featured: true,
  },
  {
    id: '2',
    name: 'Fantasy Castle Bundle',
    description: 'Epic medieval castles perfect for RPG servers and fantasy builds.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=300&fit=crop',
    category: 'buildings',
    tags: ['fantasy', 'castle', 'medieval'],
    rating: 4.9,
    featured: true,
  },
  {
    id: '3',
    name: 'Tropical Paradise',
    description: 'Lush tropical landscapes with beaches, palm trees, and crystal-clear waters.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
    category: 'landscapes',
    tags: ['tropical', 'beach', 'nature'],
    rating: 4.7,
  },
  {
    id: '4',
    name: 'Cyberpunk Apartment',
    description: 'Futuristic interior designs with neon accents and high-tech elements.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    category: 'interiors',
    tags: ['cyberpunk', 'futuristic', 'neon'],
    rating: 4.6,
  },
  {
    id: '5',
    name: 'Steampunk Airship',
    description: 'Detailed steampunk-inspired flying vessel with intricate machinery.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1534996858221-380b92700493?w=400&h=300&fit=crop',
    category: 'vehicles',
    tags: ['steampunk', 'airship', 'fantasy'],
    rating: 4.8,
  },
  {
    id: '6',
    name: 'Cozy Cabin Collection',
    description: 'Warm and inviting cabin interiors perfect for survival worlds.',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=400&h=300&fit=crop',
    category: 'interiors',
    tags: ['cozy', 'cabin', 'rustic'],
    rating: 4.5,
  },
  {
    id: '7',
    name: 'Mountain Range Terrain',
    description: 'Majestic mountain landscapes with snow-capped peaks and valleys.',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=300&fit=crop',
    category: 'landscapes',
    tags: ['mountains', 'terrain', 'nature'],
    rating: 4.7,
  },
  {
    id: '8',
    name: 'Space Station Module',
    description: 'Sci-fi space station components for building orbital habitats.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=300&fit=crop',
    category: 'buildings',
    tags: ['space', 'sci-fi', 'station'],
    rating: 4.9,
    featured: true,
  },
];

export const portfolioItems = [
  {
    id: '1',
    title: 'Enchanted Forest Kingdom',
    description: 'A massive fantasy realm featuring enchanted forests and magical structures.',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600&fit=crop',
    category: 'landscapes',
    gridSize: 'large',
  },
  {
    id: '2',
    title: 'Neon City Skyline',
    description: 'Cyberpunk-inspired cityscape with towering skyscrapers.',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=400&fit=crop',
    category: 'buildings',
    gridSize: 'medium',
  },
  {
    id: '3',
    title: 'Ancient Temple Complex',
    description: 'Mysterious ancient temples hidden in dense jungle.',
    image: 'https://images.unsplash.com/photo-1569517282132-25d22f4573e6?w=400&h=400&fit=crop',
    category: 'buildings',
    gridSize: 'small',
  },
  {
    id: '4',
    title: 'Underwater Dome City',
    description: 'Futuristic underwater habitat with bio-luminescent elements.',
    image: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=600&h=400&fit=crop',
    category: 'buildings',
    gridSize: 'medium',
  },
  {
    id: '5',
    title: 'Floating Islands',
    description: 'Magical floating islands connected by bridges and waterfalls.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    category: 'landscapes',
    gridSize: 'small',
  },
  {
    id: '6',
    title: 'Royal Palace Interior',
    description: 'Luxurious palace interiors with grand halls and throne rooms.',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=500&fit=crop',
    category: 'interiors',
    gridSize: 'large',
  },
];

export const teamMembers = [
  {
    id: '1',
    nickname: 'PixelMaster',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop',
    role: 'Lead Builder',
    description: 'Specializing in large-scale fantasy builds with over 8 years of experience.',
    portfolioLink: '/portfolio',
  },
  {
    id: '2',
    nickname: 'TerrainWizard',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    role: 'Landscape Artist',
    description: 'Creating breathtaking natural environments and custom terrain.',
    portfolioLink: '/portfolio',
  },
  {
    id: '3',
    nickname: 'NeonArchitect',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    role: 'Modern Builds Specialist',
    description: 'Expert in contemporary and futuristic architectural designs.',
    portfolioLink: '/portfolio',
  },
  {
    id: '4',
    nickname: 'DetailDemon',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    role: 'Interior Designer',
    description: 'Bringing spaces to life with intricate interior details.',
    portfolioLink: '/portfolio',
  },
];

export const testimonials = [
  {
    id: '1',
    name: 'Alex Gaming',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    role: 'Server Owner',
    content: 'Academy Studios transformed our server with incredible builds. The attention to detail is unmatched.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Creative Corp',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop',
    role: 'Content Creator',
    content: 'The prefab assets saved us hundreds of hours. Quality is consistently exceptional.',
    rating: 5,
  },
  {
    id: '3',
    name: 'BuildMaster Pro',
    avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop',
    role: 'Professional Builder',
    content: 'Their custom commission work exceeded all expectations. Truly professional service.',
    rating: 5,
  },
];

// In-memory stores for submissions (development only)
// In production, these would be stored in a database
export const contactSubmissions = [];
export const customOrders = [];
export const orders = [];
