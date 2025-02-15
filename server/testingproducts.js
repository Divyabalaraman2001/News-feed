

// const products=[
//     { "id": 1, "name": "Product 1", "category": "Old Category" },
//     { "id": 2, "name": "Product 2", "category": "Old Category" },
//     { "id": 3, "name": "Product 3", "category": "Old Category" },
//     { "id": 4, "name": "Product 4", "category": "Old Category" },
//     { "id": 5, "name": "Product 5", "category": "Old Category" },
//     { "id": 6, "name": "Product 6", "category": "Old Category" },
//     { "id": 7, "name": "Product 7", "category": "Old Category" },
//     { "id": 8, "name": "Product 8", "category": "Old Category" },
//     { "id": 9, "name": "Product 9", "category": "Old Category" },
//     { "id": 10, "name": "Product 10", "category": "Old Category" },
//     { "id": 11, "name": "Product 11", "category": "Old Category" },
//     { "id": 12, "name": "Product 12", "category": "Old Category" },
//     { "id": 13, "name": "Product 13", "category": "Old Category" },
//     { "id": 14, "name": "Product 14", "category": "Old Category" },
//     { "id": 15, "name": "Product 15", "category": "Old Category" },
//     { "id": 16, "name": "Product 16", "category": "Old Category" },
//     { "id": 17, "name": "Product 17", "category": "Old Category" },
//     { "id": 18, "name": "Product 18", "category": "Old Category" },
//     { "id": 19, "name": "Product 19", "category": "Old Category" },
//     { "id": 20, "name": "Product 20", "category": "Old Category" }
//   ]


  function updateProductCategories(products, categories) {
  return products.map((product, index) => ({
    ...product,
    category: categories[index % categories.length]  // Assign category in a round-robin manner
  }));
}

// Example: Dynamic product list (adjust length as needed)
const products = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: "Old Category"
}));

const categories = ["Electronics", "Fashion", "Home & Kitchen", "Health & Beauty", "Sports & Outdoors"];

const updatedProducts = updateProductCategories(products, categories);
console.log(updatedProducts);
