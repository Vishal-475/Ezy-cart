import { addProduct } from './products-api.js';

const productsToSeed = [
    { name: "Orange", price: 30, category: "Fruits & Vegetables", unit: "kg", image: "/assets/img/imagesorange.png" },
    { name: "Apple", price: 150, category: "Fruits & Vegetables", unit: "kg", image: "/assets/img/imagesapple.png" },
    { name: "Pomegranate", price: 60, category: "Fruits & Vegetables", unit: "kg", image: "/assets/img/imagespomegranate.png" },
    { name: "Strawberry", price: 120, category: "Fruits & Vegetables", unit: "kg", image: "/assets/img/imagesstrawberry.png" },
    { name: "Banana", price: 40, category: "Fruits & Vegetables", unit: "dozen", image: "/assets/img/imagesbanana (1).png" },
    { name: "Blueberry", price: 68.60, category: "Fruits & Vegetables", unit: "kg", image: "/assets/img/blueberry.png" },
    { name: "Kiwi", price: 85.97, category: "Fruits & Vegetables", unit: "kg", image: "/assets/img/kiwi.png" },
    { name: "Pineapple", price: 72.97, category: "Fruits & Vegetables", unit: "kg", image: "/assets/img/pineapple.png" },
    { name: "Watermelon", price: 110.64, category: "Fruits & Vegetables", unit: "kg", image: "/assets/img/watermelon.png" },
    { name: "Capsicum", price: 30, category: "Fruits & Vegetables", unit: "kg", image: "/assets/img/capsicum.png" },
    { name: "Carrot", price: 27, category: "Fruits & Vegetables", unit: "kg", image: "/assets/img/carrot.png" },
    { name: "Chilly", price: 25, category: "Fruits & Vegetables", unit: "100g", image: "/assets/img/chilly.png" },
    { name: "Potato", price: 33, category: "Fruits & Vegetables", unit: "kg", image: "/assets/img/potato.png" },
    { name: "Tomato", price: 38.60, category: "Fruits & Vegetables", unit: "kg", image: "/assets/img/tomato.png" },
    { name: "Beetroot", price: 29.30, category: "Fruits & Vegetables", unit: "kg", image: "/assets/img/beetroot.png" },
    { name: "Cauliflower", price: 40.20, category: "Fruits & Vegetables", unit: "kg", image: "/assets/img/cauliflower.png" },
    { name: "Mushroom", price: 39.99, category: "Fruits & Vegetables", unit: "250g", image: "/assets/img/mushroom.png" },
    { name: "Onion", price: 31.80, category: "Fruits & Vegetables", unit: "kg", image: "/assets/img/onion.png" },
    
    { name: "Milk", price: 25, category: "Dairy/Fresh Meats & Seafood", unit: "liter", image: "/assets/img/download (11).png" },
    { name: "Egg", price: 58, category: "Dairy/Fresh Meats & Seafood", unit: "dozen", image: "/assets/img/egg.png" },
    { name: "Cheese", price: 80, category: "Dairy/Fresh Meats & Seafood", unit: "500g", image: "/assets/img/download (10).png" },
    { name: "Yogurt", price: 40, category: "Dairy/Fresh Meats & Seafood", unit: "500ml", image: "/assets/img/download (12).png" },
    { name: "Butter", price: 90, category: "Dairy/Fresh Meats & Seafood", unit: "200g", image: "/assets/img/download.png" },
    { name: "Paneer", price: 100, category: "Dairy/Fresh Meats & Seafood", unit: "250g", image: "/assets/img/paneer.png" },
    { name: "Chicken", price: 310, category: "Dairy/Fresh Meats & Seafood", unit: "kg", image: "/assets/img/chicken.png" },
    { name: "Mutton", price: 800, category: "Dairy/Fresh Meats & Seafood", unit: "kg", image: "/assets/img/mutton.png" },
    { name: "Crab", price: 175, category: "Dairy/Fresh Meats & Seafood", unit: "kg", image: "/assets/img/crab.png" },
    { name: "Prawn", price: 350, category: "Dairy/Fresh Meats & Seafood", unit: "kg", image: "/assets/img/prawn.png" },
    { name: "Fish", price: 200, category: "Dairy/Fresh Meats & Seafood", unit: "kg", image: "/assets/img/fish.png" },
    { name: "Lobster", price: 1300, category: "Dairy/Fresh Meats & Seafood", unit: "kg", image: "/assets/img/lobster.png" },

    { name: "Chips", price: 20, category: "Snacks", unit: "pack", image: "/assets/img/images.png" },
    { name: "Cookies", price: 30, category: "Snacks", unit: "200g", image: "/assets/img/download (2).png" },
    { name: "Popcorn", price: 35, category: "Snacks", unit: "pack", image: "/assets/img/popcorn.png" },
    { name: "Chocolate", price: 50, category: "Snacks", unit: "bar", image: "/assets/img/download (4).png" },
    { name: "Biscuits", price: 10, category: "Snacks", unit: "pack", image: "/assets/img/download (5).png" },
    { name: "Bread", price: 37, category: "Snacks", unit: "pack", image: "/assets/img/bread.png" },
    { name: "Cupcakes", price: 68, category: "Snacks", unit: "2 pack", image: "/assets/img/cupcakes.png" },
    { name: "Donuts", price: 82, category: "Snacks", unit: "3pcs", image: "/assets/img/donuts.png" },
    { name: "Jellies", price: 100.03, category: "Snacks", unit: "250g", image: "/assets/img/jelly.png" },

    { name: "Water can", price: 15, category: "Beverages", unit: "liter", image: "/assets/img/images (1).png" },
    { name: "Juice", price: 40, category: "Beverages", unit: "1 liter", image: "/assets/img/download (6).png" },
    { name: "Soda", price: 20, category: "Beverages", unit: "500ml", image: "/assets/img/download (7).png" },
    { name: "Tea powder", price: 30, category: "Beverages", unit: "200g", image: "/assets/img/download (9).png" },
    { name: "Coffee powder", price: 50, category: "Beverages", unit: "200g", image: "/assets/img/download (8).png" }
];

export async function seedProductsDatabase() {
    console.log("Starting to seed database...");
    let successCount = 0;
    
    for (const product of productsToSeed) {
        const result = await addProduct({
            name: product.name,
            price: product.price,
            category: product.category,
            unit: product.unit,
            image: product.image,
            stock: 100
        });
        if (result.success) successCount++;
    }
    
    console.log(`Seeded ${successCount} out of ${productsToSeed.length} products successfully.`);
}

window.seedProductsDatabase = seedProductsDatabase;
