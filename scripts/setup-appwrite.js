#!/usr/bin/env node

/**
 * Appwrite Database Setup Script
 * Run this script to set up the database and collections for Litterateur Cafe
 */

import { Client, Account, Databases, ID } from 'npm:appwrite';
import { load } from 'https://deno.land/std@0.207.0/dotenv/mod.ts';

// Load environment variables
const env = await load({ 
    allowEmptyValues: true,
    export: true 
});

// Configuration
const PROJECT_ID = env.VITE_APPWRITE_PROJECT_ID || 'YOUR_PROJECT_ID';
const ENDPOINT = env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const DATABASE_ID = env.VITE_APPWRITE_DATABASE_ID || 'litterateur_db';

// Initialize Appwrite
const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID);

const databases = new Databases(client);

console.log('🚀 Setting up Appwrite database for Litterateur Cafe...');

async function setupDatabase() {
    try {
        // Create database
        console.log('📦 Creating database...');
        const database = await databases.create(DATABASE_ID, 'Litterateur Cafe Database');
        console.log('✅ Database created:', database.$id);

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
                ],
                indexes: [
                    { key: 'email', type: 'unique' },
                    { key: 'phone', type: 'unique' },
                    { key: 'referralCode', type: 'unique' }
                ]
            },
            {
                id: 'orders',
                name: 'Orders',
                attributes: [
                    { key: 'userId', type: 'string', size: 255, required: true },
                    { key: 'items', type: 'string', size: 2000, required: true }, // JSON string
                    { key: 'totalAmount', type: 'integer', required: true },
                    { key: 'discount', type: 'integer', required: true, default: 0 },
                    { key: 'finalAmount', type: 'integer', required: true },
                    { key: 'status', type: 'string', size: 50, required: true, default: 'pending' },
                    { key: 'paymentMethod', type: 'string', size: 50, required: true },
                    { key: 'deliveryAddress', type: 'string', size: 500, required: false },
                    { key: 'orderDate', type: 'datetime', required: true },
                    { key: 'estimatedDelivery', type: 'datetime', required: false }
                ],
                indexes: [
                    { key: 'userId', type: 'key' },
                    { key: 'status', type: 'key' },
                    { key: 'orderDate', type: 'key' }
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
                ],
                indexes: [
                    { key: 'category', type: 'key' },
                    { key: 'available', type: 'key' },
                    { key: 'bestseller', type: 'key' },
                    { key: 'new', type: 'key' }
                ]
            },
            {
                id: 'referrals',
                name: 'Referrals',
                attributes: [
                    { key: 'referrerId', type: 'string', size: 255, required: true },
                    { key: 'referredId', type: 'string', size: 255, required: true },
                    { key: 'referralCode', type: 'string', size: 20, required: true },
                    { key: 'status', type: 'string', size: 50, required: true, default: 'pending' },
                    { key: 'rewardAmount', type: 'integer', required: true, default: 50 },
                    { key: 'referralDate', type: 'datetime', required: true },
                    { key: 'completedDate', type: 'datetime', required: false }
                ],
                indexes: [
                    { key: 'referrerId', type: 'key' },
                    { key: 'referredId', type: 'key' },
                    { key: 'referralCode', type: 'key' },
                    { key: 'status', type: 'key' }
                ]
            },
            {
                id: 'tokens',
                name: 'Token Transactions',
                attributes: [
                    { key: 'userId', type: 'string', size: 255, required: true },
                    { key: 'type', type: 'string', size: 50, required: true }, // earned, spent, refunded
                    { key: 'amount', type: 'integer', required: true },
                    { key: 'description', type: 'string', size: 500, required: true },
                    { key: 'orderId', type: 'string', size: 255, required: false },
                    { key: 'transactionDate', type: 'datetime', required: true },
                    { key: 'balance', type: 'integer', required: true }
                ],
                indexes: [
                    { key: 'userId', type: 'key' },
                    { key: 'type', type: 'key' },
                    { key: 'transactionDate', type: 'key' }
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
                    collection.attributes,
                    collection.indexes
                );
                console.log(`✅ Collection created: ${createdCollection.name}`);
            } catch (error) {
                if (error.code === 409) {
                    console.log(`⚠️ Collection ${collection.name} already exists`);
                } else {
                    console.error(`❌ Error creating collection ${collection.name}:`, error);
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
            },
            {
                name: 'Poet\'s Pancakes',
                description: 'Fluffy pancakes with maple syrup and fresh berries',
                category: 'Breakfast',
                price: 349,
                image: '/images/pancakes.jpg',
                available: true,
                bestseller: true,
                new: false,
                spicy: false,
                prepTime: 20
            },
            {
                name: 'Writer\'s Wrap',
                description: 'Grilled chicken with fresh vegetables in herb sauce',
                category: 'Main Course',
                price: 449,
                image: '/images/wrap.jpg',
                available: true,
                bestseller: false,
                new: false,
                spicy: false,
                prepTime: 15
            }
        ];

        for (const item of sampleMenuItems) {
            try {
                await databases.createDocument(DATABASE_ID, 'menu_items', ID.unique(), item);
                console.log(`✅ Added menu item: ${item.name}`);
            } catch (error) {
                console.error(`❌ Error adding menu item ${item.name}:`, error);
            }
        }

        console.log('\n🎉 Appwrite database setup completed successfully!');
        console.log('\n📋 Summary:');
        console.log(`- Database: ${DATABASE_ID}`);
        console.log(`- Collections: ${collections.length}`);
        console.log(`- Sample menu items: ${sampleMenuItems.length}`);
        console.log('\n✨ Your Litterateur Cafe backend is ready!');

    } catch (error) {
        console.error('❌ Setup failed:', error);
        process.exit(1);
    }
}

// Run the setup
setupDatabase();
