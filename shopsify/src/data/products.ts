export type Category = {
  id: string
  name: string
  image: string
  color: string
}

export type Product = {
  id: number
  name: string
  category: string
  price: number
  mrp: number
  unit: string
  image: string
  rating: number
  description: string
  inStock: boolean
  tags?: string[]
}

// Product photos: TheMealDB ingredient images (https://www.themealdb.com), stored locally in /public/images/products
export const img = (slug: string) => `/images/products/${slug}.webp`

export const categories: Category[] = [
  { id: 'fruits', name: 'Fruits', image: img('apples'), color: '#ffe8e5' },
  { id: 'vegetables', name: 'Vegetables', image: img('broccoli'), color: '#e3f7e6' },
  { id: 'dairy', name: 'Dairy & Eggs', image: img('milk'), color: '#e8f1ff' },
  { id: 'bakery', name: 'Bakery', image: img('bread'), color: '#fff3dc' },
  { id: 'staples', name: 'Atta, Rice & Dal', image: img('basmati-rice'), color: '#f6efe2' },
  { id: 'snacks', name: 'Snacks', image: img('popcorn'), color: '#fdeadf' },
  { id: 'beverages', name: 'Beverages', image: img('orange-juice'), color: '#e6f7f7' },
  { id: 'masala', name: 'Oil, Ghee & Masala', image: img('turmeric'), color: '#fff6d6' },
]

export const products: Product[] = [
  { id: 1, name: 'Fresh Red Apples', category: 'fruits', price: 159, mrp: 199, unit: '1 kg', image: img('apples'), rating: 4.5, inStock: true, tags: ['bestseller'], description: 'Crisp, juicy Shimla apples hand-picked from the orchards. Rich in fiber and perfect for snacking.' },
  { id: 2, name: 'Robusta Bananas', category: 'fruits', price: 49, mrp: 60, unit: '12 pcs', image: img('banana'), rating: 4.3, inStock: true, description: 'Naturally ripened bananas, a great source of potassium and instant energy.' },
  { id: 3, name: 'Alphonso Mangoes', category: 'fruits', price: 499, mrp: 650, unit: '1 dozen', image: img('mango'), rating: 4.8, inStock: true, tags: ['bestseller'], description: 'The king of mangoes from Ratnagiri — sweet, aromatic and non-fibrous.' },
  { id: 4, name: 'Pomegranate', category: 'fruits', price: 129, mrp: 160, unit: '500 g', image: img('pomegranate'), rating: 4.4, inStock: true, description: 'Bhagwa pomegranates with deep red, juicy arils. Packed with antioxidants.' },
  { id: 5, name: 'Nagpur Oranges', category: 'fruits', price: 99, mrp: 120, unit: '1 kg', image: img('orange'), rating: 4.2, inStock: false, description: 'Juicy Nagpur oranges packed with Vitamin C.' },
  { id: 6, name: 'Fresh Strawberries', category: 'fruits', price: 119, mrp: 149, unit: '200 g', image: img('strawberries'), rating: 4.3, inStock: true, description: 'Sweet Mahabaleshwar strawberries — perfect for desserts and smoothies.' },
  { id: 34, name: 'Hass Avocado', category: 'fruits', price: 149, mrp: 199, unit: '2 pcs', image: img('avocado'), rating: 4.1, inStock: true, tags: ['organic'], description: 'Creamy, ready-to-eat Hass avocados for toast, salads and guacamole.' },
  { id: 35, name: 'Fresh Lemons', category: 'fruits', price: 29, mrp: 40, unit: '250 g', image: img('lemon'), rating: 4.2, inStock: true, description: 'Juicy lemons for nimbu pani, salads and cooking.' },

  { id: 7, name: 'Fresh Tomatoes', category: 'vegetables', price: 35, mrp: 45, unit: '1 kg', image: img('tomatoes'), rating: 4.2, inStock: true, tags: ['bestseller'], description: 'Farm fresh red tomatoes, ideal for curries, salads and chutneys.' },
  { id: 8, name: 'Onions', category: 'vegetables', price: 40, mrp: 50, unit: '1 kg', image: img('onions'), rating: 4.4, inStock: true, description: 'Nashik onions — a staple for every Indian kitchen.' },
  { id: 9, name: 'Potatoes', category: 'vegetables', price: 30, mrp: 38, unit: '1 kg', image: img('potatoes'), rating: 4.3, inStock: true, description: 'Fresh potatoes, versatile and perfect for any dish.' },
  { id: 10, name: 'Broccoli', category: 'vegetables', price: 79, mrp: 99, unit: '500 g', image: img('broccoli'), rating: 4.1, inStock: true, tags: ['organic'], description: 'Organic broccoli florets loaded with vitamins and antioxidants.' },
  { id: 11, name: 'Carrots', category: 'vegetables', price: 45, mrp: 55, unit: '500 g', image: img('carrots'), rating: 4.0, inStock: true, tags: ['organic'], description: 'Crunchy orange carrots, great for halwa, salads and juices.' },
  { id: 12, name: 'Green Capsicum', category: 'vegetables', price: 39, mrp: 49, unit: '250 g', image: img('capsicum'), rating: 3.9, inStock: true, description: 'Fresh bell peppers for stir-fries, pizzas and more.' },
  { id: 36, name: 'Fresh Spinach (Palak)', category: 'vegetables', price: 25, mrp: 30, unit: '250 g', image: img('spinach'), rating: 4.2, inStock: true, tags: ['organic'], description: 'Tender green palak leaves, cleaned and ready to cook.' },

  { id: 13, name: 'Full Cream Milk', category: 'dairy', price: 68, mrp: 68, unit: '1 L', image: img('milk'), rating: 4.6, inStock: true, tags: ['bestseller'], description: 'Pasteurised full cream milk, rich and creamy.' },
  { id: 14, name: 'Brown Farm Eggs', category: 'dairy', price: 84, mrp: 96, unit: '6 pcs', image: img('eggs'), rating: 4.5, inStock: true, description: 'Protein-packed brown eggs from free-range hens.' },
  { id: 15, name: 'Malai Paneer', category: 'dairy', price: 95, mrp: 110, unit: '200 g', image: img('paneer'), rating: 4.4, inStock: true, description: 'Soft and fresh malai paneer, made from pure milk.' },
  { id: 16, name: 'Salted Butter', category: 'dairy', price: 58, mrp: 60, unit: '100 g', image: img('butter'), rating: 4.7, inStock: true, description: 'Creamy salted butter — the perfect topping for toast and parathas.' },
  { id: 37, name: 'Cheese Block', category: 'dairy', price: 135, mrp: 160, unit: '200 g', image: img('cheese'), rating: 4.3, inStock: true, description: 'Mild, creamy processed cheese block — great for sandwiches and pizzas.' },

  { id: 17, name: 'Wholegrain Bread', category: 'bakery', price: 45, mrp: 50, unit: '400 g', image: img('bread'), rating: 4.2, inStock: true, description: 'Soft wholegrain bread baked fresh every morning.' },
  { id: 18, name: 'Sesame Burger Buns', category: 'bakery', price: 40, mrp: 50, unit: '4 pcs', image: img('buns'), rating: 4.3, inStock: true, description: 'Soft sesame-topped buns, perfect for burgers and pav bhaji.' },
  { id: 19, name: 'English Muffins', category: 'bakery', price: 99, mrp: 120, unit: '6 pcs', image: img('muffins'), rating: 4.4, inStock: true, description: 'Classic English muffins — toast them for a perfect breakfast.' },

  { id: 20, name: 'Basmati Rice', category: 'staples', price: 189, mrp: 240, unit: '1 kg', image: img('basmati-rice'), rating: 4.6, inStock: true, tags: ['bestseller'], description: 'Aged long-grain basmati rice with a rich aroma.' },
  { id: 21, name: 'Plain Flour (Maida)', category: 'staples', price: 65, mrp: 80, unit: '1 kg', image: img('atta'), rating: 4.5, inStock: true, description: 'Finely milled plain flour for baking, naan and snacks.' },
  { id: 22, name: 'Toor Dal', category: 'staples', price: 149, mrp: 175, unit: '1 kg', image: img('toor-dal'), rating: 4.3, inStock: true, description: 'Unpolished organic toor dal, rich in protein.' },

  { id: 23, name: 'Toffee Popcorn', category: 'snacks', price: 99, mrp: 120, unit: '100 g', image: img('popcorn'), rating: 4.1, inStock: true, description: 'Crunchy popcorn coated in rich toffee.' },
  { id: 24, name: 'Digestive Biscuits', category: 'snacks', price: 60, mrp: 70, unit: '250 g', image: img('biscuits'), rating: 4.4, inStock: true, description: 'Wholewheat digestive biscuits — the perfect tea-time companion.' },
  { id: 25, name: 'Dark Chocolate', category: 'snacks', price: 149, mrp: 175, unit: '100 g', image: img('dark-chocolate'), rating: 4.6, inStock: true, description: 'Rich and smooth dark chocolate bar.' },
  { id: 26, name: 'Roasted Peanuts', category: 'snacks', price: 60, mrp: 75, unit: '200 g', image: img('peanuts'), rating: 4.0, inStock: true, description: 'Spicy masala roasted peanuts — a crunchy snack.' },

  { id: 27, name: 'Orange Juice', category: 'beverages', price: 110, mrp: 130, unit: '1 L', image: img('orange-juice'), rating: 4.2, inStock: true, description: '100% orange juice with no added sugar.' },
  { id: 28, name: 'Assam Tea', category: 'beverages', price: 245, mrp: 290, unit: '500 g', image: img('tea'), rating: 4.7, inStock: true, tags: ['bestseller'], description: 'Strong and aromatic Assam CTC tea for the perfect cup of chai.' },
  { id: 29, name: 'Filter Coffee', category: 'beverages', price: 199, mrp: 230, unit: '250 g', image: img('coffee'), rating: 4.5, inStock: true, description: 'South Indian filter coffee blend with chicory.' },
  { id: 30, name: 'Pineapple Juice', category: 'beverages', price: 99, mrp: 120, unit: '1 L', image: img('pineapple-juice'), rating: 4.3, inStock: true, description: '100% pineapple juice — sweet, tangy and refreshing.' },

  { id: 31, name: 'Sunflower Oil', category: 'masala', price: 699, mrp: 799, unit: '5 L', image: img('sunflower-oil'), rating: 4.2, inStock: true, description: 'Light and healthy refined sunflower oil for everyday cooking.' },
  { id: 32, name: 'Pure Desi Ghee', category: 'masala', price: 299, mrp: 340, unit: '500 ml', image: img('ghee'), rating: 4.7, inStock: true, tags: ['bestseller'], description: 'Aromatic clarified butter made the traditional way.' },
  { id: 33, name: 'Turmeric Powder', category: 'masala', price: 45, mrp: 55, unit: '100 g', image: img('turmeric'), rating: 4.4, inStock: true, description: 'Pure haldi powder with rich colour and aroma.' },
  { id: 38, name: 'Garam Masala', category: 'masala', price: 75, mrp: 90, unit: '100 g', image: img('garam-masala'), rating: 4.5, inStock: true, description: 'A fragrant blend of whole spices for curries and biryanis.' },
]

export const getProduct = (id: number) => products.find((p) => p.id === id)
export const getCategory = (id: string) => categories.find((c) => c.id === id)
export const discountPercent = (p: Product) =>
  p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0
export const formatPrice = (n: number) => `₹${n.toLocaleString('en-IN')}`

export const FREE_DELIVERY_ABOVE = 499
export const DELIVERY_FEE = 40
