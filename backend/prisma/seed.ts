import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const users = [
  { name: 'Alice Johnson', email: 'alice@example.com', username: 'alice_j', phone: '+1-555-0101', website: 'https://alice.dev' },
  { name: 'Bob Smith', email: 'bob@example.com', username: 'bob_smith', phone: '+1-555-0102', website: 'https://bobsmith.io' },
  { name: 'Carol White', email: 'carol@example.com', username: 'carol_w', phone: '+1-555-0103', website: '' },
  { name: 'David Brown', email: 'david@example.com', username: 'david_b', phone: '+1-555-0104', website: 'https://davidb.com' },
  { name: 'Eva Martinez', email: 'eva@example.com', username: 'eva_m', phone: '+1-555-0105', website: '' },
  { name: 'Frank Lee', email: 'frank@example.com', username: 'frank_l', phone: '+1-555-0106', website: 'https://franklee.net' },
  { name: 'Grace Kim', email: 'grace@example.com', username: 'grace_k', phone: '', website: 'https://gracekim.co' },
  { name: 'Henry Davis', email: 'henry@example.com', username: 'henry_d', phone: '+1-555-0108', website: '' },
  { name: 'Iris Chen', email: 'iris@example.com', username: 'iris_c', phone: '+1-555-0109', website: 'https://irischen.me' },
  { name: 'Jake Wilson', email: 'jake@example.com', username: 'jake_w', phone: '+1-555-0110', website: '' },
];

const products = [
  { name: 'Wireless Headphones', category: 'Electronics', price: 79.99, stock: 42 },
  { name: 'Mechanical Keyboard', category: 'Electronics', price: 129.99, stock: 18 },
  { name: 'USB-C Hub', category: 'Electronics', price: 34.99, stock: 65 },
  { name: 'Desk Lamp', category: 'Office', price: 24.99, stock: 30 },
  { name: 'Notebook (A5)', category: 'Stationery', price: 8.99, stock: 120 },
  { name: 'Ergonomic Mouse', category: 'Electronics', price: 49.99, stock: 25 },
  { name: 'Standing Desk Mat', category: 'Office', price: 39.99, stock: 14 },
  { name: 'Webcam HD 1080p', category: 'Electronics', price: 59.99, stock: 9 },
  { name: 'Blue Pen Set', category: 'Stationery', price: 4.99, stock: 200 },
  { name: 'Monitor Arm', category: 'Office', price: 89.99, stock: 11 },
];

async function main() {
  console.log('Seeding database...');
  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }
  console.log(`Seeded ${users.length} users.`);

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: products.indexOf(product) + 1 },
      update: {},
      create: product,
    });
  }
  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
