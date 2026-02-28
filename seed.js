const { db } = require('./firebase');

const menuItems = [
  { id: 1,  name: 'Veg Meals',       price: 60,  available: true,  category: 'rice',      img: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&q=80' },
  { id: 2,  name: 'Chicken Biryani', price: 90,  available: true,  category: 'rice',      img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80' },
  { id: 3,  name: 'Curd Rice',       price: 40,  available: true,  category: 'rice',      img: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400&q=80' },
  { id: 4,  name: 'Veg Biryani',     price: 70,  available: false, category: 'rice',      img: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&q=80' },
  { id: 5,  name: 'Samosa (2 pcs)',  price: 20,  available: true,  category: 'snacks',    img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80' },
  { id: 6,  name: 'Vada Pav',        price: 25,  available: true,  category: 'snacks',    img: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80' },
  { id: 7,  name: 'Egg Roll',        price: 35,  available: true,  category: 'snacks',    img: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80' },
  { id: 8,  name: 'French Fries',    price: 40,  available: false, category: 'snacks',    img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80' },
  { id: 9,  name: 'Masala Chai',     price: 15,  available: true,  category: 'beverages', img: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&q=80' },
  { id: 10, name: 'Cold Coffee',     price: 45,  available: true,  category: 'beverages', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80' },
  { id: 11, name: 'Fresh Lime Soda', price: 30,  available: true,  category: 'beverages', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80' },
  { id: 12, name: 'Mango Juice',     price: 35,  available: false, category: 'beverages', img: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400&q=80' },
  { id: 13, name: 'Chapati (3 pcs)', price: 20,  available: true,  category: 'breads',    img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80' },
  { id: 14, name: 'Paratha + Curd',  price: 35,  available: true,  category: 'breads',    img: 'https://images.unsplash.com/photo-1605197788044-36d90d4da9c5?w=400&q=80' },
  { id: 15, name: 'Puri Bhaji',      price: 40,  available: true,  category: 'breads',    img: 'https://images.unsplash.com/photo-1606756790138-261d2b21cd75?w=400&q=80' },
  { id: 16, name: 'Naan',            price: 25,  available: false, category: 'breads',    img: 'https://images.unsplash.com/photo-1601050690117-94f5f7eb6b05?w=400&q=80' },
];

async function seed() {
  console.log('🌱 Seeding menu...');
  for (const item of menuItems) {
    await db.collection('menu').doc(item.id.toString()).set(item);
    console.log(`✅ Added: ${item.name}`);
  }
  console.log('🎉 Menu seeded successfully!');
  process.exit();
}

seed();