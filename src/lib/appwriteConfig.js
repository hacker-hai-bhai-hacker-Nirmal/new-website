// Appwrite Configuration
export const config = {
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

export default config;
