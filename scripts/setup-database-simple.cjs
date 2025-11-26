#!/usr/bin/env node

/**
 * Simple Appwrite Database Setup Script
 * Run this to set up collections for Litterateur Cafe
 */

// Import Appwrite SDK
const { Client, Databases, ID } = require('appwrite');

// Configuration
const PROJECT_ID = 'fra-6900b1ed001604d8befb';
const ENDPOINT = 'https://cloud.appwrite.io/v1';
const DATABASE_ID = 'litterateur_db';

// Initialize Appwrite
const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID);

const databases = new Databases(client);

console.log('🚀 Setting up Appwrite database for Litterateur Cafe...');
console.log(`📦 Project ID: ${PROJECT_ID}`);
console.log(`🗄️ Database ID: ${DATABASE_ID}`);

async function setupDatabase() {
    try {
        // Create database
        console.log('📦 Creating database...');
        try {
            const database = await databases.create(DATABASE_ID, 'Litterateur Cafe Database');
            console.log('✅ Database created:', database.name);
        } catch (error) {
            if (error.code === 409) {
                console.log('⚠️ Database already exists');
            } else {
                throw error;
            }
        }

        // Create collections
        const collections = [
            {
                id: 'users',
                name: 'Users',
                attributes: [
                    { key: 'name', type: 'string', size: 255, required: true },
                    { key: 'email', type: 'email', required: false },
                    { key: 'phone', type: 'string', size: 20, required: false },
                    { key: 'tokens', type: 'integer', required: true, default: 100 },
                    { key: 'referrals', type: 'integer', required: true, default: 0 },
                    { key: 'currentDiscount', type: 'integer', required: true, default: 20 },
                    { key: 'joinDate', type: 'datetime', required: true },
                    { key: 'lastLogin', type: 'datetime', required: true },
                    { key: 'referralCode', type: 'string', size: 20, required: false }
                ]
            },
            {
                id: 'orders',
                name: 'Orders',
                attributes: [
                    { key: 'userId', type: 'string', size: 255, required: true },
                    { key: 'items', type: 'string', size: 2000, required: true },
                    { key: 'totalAmount', type: 'integer', required: true },
                    { key: 'discount', type: 'integer', required: true, default: 0 },
                    { key: 'finalAmount', type: 'integer', required: true },
                    { key: 'status', type: 'string', size: 50, required: true, default: 'pending' },
                    { key: 'paymentMethod', type: 'string', size: 50, required: true },
                    { key: 'deliveryAddress', type: 'string', size: 500, required: false },
                    { key: 'orderDate', type: 'datetime', required: true },
                    { key: 'estimatedDelivery', type: 'datetime', required: false }
                ]
            },
            {
                id: 'menu_items',
                name: 'Menu Items',
                attributes: [
                    { key: 'name', type: 'string', size: 255, required: true },
                    { key: 'description', type: 'string', size: 1000, required: true },
                    { key: 'category', type: 'string', size: 100, required: true },
                    { key: 'price', type: 'integer', required: true },
                    { key: 'image', type: 'string', size: 500, required: false },
                    { key: 'available', type: 'boolean', required: true, default: true },
                    { key: 'bestseller', type: 'boolean', required: true, default: false },
                    { key: 'new', type: 'boolean', required: true, default: false },
                    { key: 'spicy', type: 'boolean', required: true, default: false },
                    { key: 'prepTime', type: 'integer', required: true, default: 15 }
                ]
            }
        ];

        // Create each collection
        for (const collection of collections) {
            console.log(`📄 Creating collection: ${collection.name}...`);
            
            try {
                const createdCollection = await databases.createCollection(
                    DATABASE_ID,
                    collection.id,
                    collection.name,
                    collection.attributes
                );
                console.log(`✅ Collection created: ${createdCollection.name}`);
            } catch (error) {
                if (error.code === 409) {
                    console.log(`⚠️ Collection ${collection.name} already exists`);
                } else {
                    console.error(`❌ Error creating collection ${collection.name}:`, error.message);
                }
            }
        }

        // Add sample menu items
        console.log('🍽️ Adding sample menu items...');
        const sampleMenuItems = [
            {
                name: 'Artisan Croissant',
                description: 'Buttery, flaky perfection with premium French butter',
                category: 'Bakery',
                price: 299,
                image: '/images/croissant.jpg',
                available: true,
                bestseller: true,
                new: false,
                spicy: false,
                prepTime: 10
            },
            {
                name: 'Signature Blend Coffee',
                description: 'Single-origin beans with notes of chocolate and caramel',
                category: 'Beverages',
                price: 199,
                image: '/images/coffee.jpg',
                available: true,
                bestseller: true,
                new: false,
                spicy: false,
                prepTime: 5
            },
            {
                name: 'Literary Latte',
                description: 'Espresso with steamed milk and a touch of vanilla',
                category: 'Beverages',
                price: 249,
                image: '/images/latte.jpg',
                available: true,
                bestseller: false,
                new: true,
                spicy: false,
                prepTime: 7
            }
        ];

        for (const item of sampleMenuItems) {
            try {
                await databases.createDocument(DATABASE_ID, 'menu_items', ID.unique(), item);
                console.log(`✅ Added menu item: ${item.name}`);
            } catch (error) {
                console.error(`❌ Error adding menu item ${item.name}:`, error.message);
            }
        }

        console.log('\n🎉 Appwrite database setup completed successfully!');
        console.log('\n📋 Summary:');
        console.log(`- Database: ${DATABASE_ID}`);
        console.log(`- Collections: ${collections.length}`);
        console.log(`- Sample menu items: ${sampleMenuItems.length}`);
        console.log('\n✨ Your Litterateur Cafe backend is ready!');
        console.log('\n🌐 Test authentication at: http://localhost:4321/login');

    } catch (error) {
        console.error('❌ Setup failed:', error.message);
        console.log('\n💡 Manual setup:');
        console.log('1. Go to your Appwrite dashboard');
        console.log('2. Create database: litterateur_db');
        console.log('3. Create collections: users, orders, menu_items');
        console.log('4. Add attributes as shown in APPWRITE_SETUP.md');
        process.exit(1);
    }
}

// Run the setup
setupDatabase();
