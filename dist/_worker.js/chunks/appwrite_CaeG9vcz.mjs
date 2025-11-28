globalThis.process ??= {}; globalThis.process.env ??= {};
import { C as Client, D as Databases, A as Account } from './sdk_BPbYzYsq.mjs';

// Appwrite Configuration
const config = {
  databaseId: 'main-db',
  collections: {
    users: {
      id: 'users',
      name: 'Users',
      permissions: [
        'read("user:{userId}")',
        'update("user:{userId}")',
        'delete("user:{userId}")'
      ],
      attributes: [
        {
          key: 'userId',
          type: 'string',
          size: 36,
          required: true
        },
        {
          key: 'name',
          type: 'string',
          size: 100,
          required: true
        },
        {
          key: 'email',
          type: 'string',
          size: 255,
          required: true
        },
        {
          key: 'phone',
          type: 'string',
          size: 20,
          required: false
        },
        {
          key: 'avatar',
          type: 'string',
          size: 255,
          required: false
        },
        {
          key: 'preferences',
          type: 'json',
          required: false
        }
      ],
      indexes: [
        {
          key: 'email',
          type: 'key',
          attributes: ['email'],
          orders: ['ASC']
        },
        {
          key: 'phone',
          type: 'key',
          attributes: ['phone'],
          orders: ['ASC']
        }
      ]
    },
    orders: {
      id: 'orders',
      name: 'Orders',
      permissions: [
        'read("user:{userId}")',
        'create("user:{userId}")',
        'update("user:{userId}")'
      ],
      attributes: [
        {
          key: 'userId',
          type: 'string',
          size: 36,
          required: true
        },
        {
          key: 'items',
          type: 'json',
          required: true
        },
        {
          key: 'total',
          type: 'double',
          required: true
        },
        {
          key: 'status',
          type: 'string',
          size: 20,
          required: true,
          default: 'pending'
        },
        {
          key: 'deliveryAddress',
          type: 'json',
          required: true
        },
        {
          key: 'paymentMethod',
          type: 'string',
          size: 50,
          required: true
        },
        {
          key: 'paymentStatus',
          type: 'string',
          size: 20,
          required: true,
          default: 'pending'
        }
      ]
    },
    menu_items: {
      id: 'menu_items',
      name: 'Menu Items',
      permissions: [
        'read("any")',
        'create("role:admin")',
        'update("role:admin")',
        'delete("role:admin")'
      ],
      attributes: [
        {
          key: 'name',
          type: 'string',
          size: 100,
          required: true
        },
        {
          key: 'description',
          type: 'string',
          size: 500,
          required: false
        },
        {
          key: 'price',
          type: 'double',
          required: true
        },
        {
          key: 'category',
          type: 'string',
          size: 50,
          required: true
        },
        {
          key: 'image',
          type: 'string',
          size: 255,
          required: false
        },
        {
          key: 'isVeg',
          type: 'boolean',
          required: true,
          default: true
        },
        {
          key: 'isAvailable',
          type: 'boolean',
          required: true,
          default: true
        },
        {
          key: 'ingredients',
          type: 'json',
          required: false
        },
        {
          key: 'nutrition',
          type: 'json',
          required: false
        }
      ]
    }
  }
};

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
const client = new Client().setEndpoint("https://fra.cloud.appwrite.io/v1").setProject("6900b1ed001604d8befb");
const account = new Account(client);
const databases = new Databases(client);
const getDatabaseId = () => {
  return config.databaseId;
};
const initDatabase = async () => {
  try {
    try {
      await databases.get(getDatabaseId());
    } catch (error) {
      if (error.code === 404) {
        console.log("Database not found, creating...");
        console.log("Please create the database in Appwrite console");
      } else {
        throw error;
      }
    }
    for (const [key, collection] of Object.entries(config.collections)) {
      try {
        await databases.getCollection(getDatabaseId(), collection.id);
        console.log(`Collection ${collection.name} already exists`);
      } catch (error) {
        if (error.code === 404) {
          console.log(`Creating collection: ${collection.name}`);
          console.log(`Please create collection '${collection.name}' in Appwrite console`);
        } else {
          console.error(`Error checking collection ${collection.name}:`, error);
        }
      }
    }
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};
if (typeof window !== "undefined") {
  initDatabase();
}
function getEnvVar(name) {
  if (typeof import.meta !== "undefined" && Object.assign(__vite_import_meta_env__, { VITE_APPWRITE_PROJECT_ID: "6900b1ed001604d8befb", VITE_APPWRITE_DATABASE_ID: "main-db", APPWRITE_PROJECT_ID: "6900b1ed001604d8befb", APPWRITE_DATABASE_ID: "main-db" })) {
    return Object.assign(__vite_import_meta_env__, { VITE_APPWRITE_PROJECT_ID: "6900b1ed001604d8befb", VITE_APPWRITE_DATABASE_ID: "main-db", APPWRITE_PROJECT_ID: "6900b1ed001604d8befb", APPWRITE_DATABASE_ID: "main-db" })[name];
  }
  return void 0;
}
({
  projectId: getEnvVar("VITE_APPWRITE_PROJECT_ID") || "6900b1ed001604d8befb",
  databaseId: getEnvVar("VITE_APPWRITE_DATABASE_ID") || "main-db"});

export { account as a, client as c };
