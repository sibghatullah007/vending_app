export interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  rating: number;
  description: string;
  flavor: { color: string; label: string }[];
  stock: number;
  ingredients: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Chips & Cheese",
    price: 4.99,
    images: [
      "/images/products/Lays (1).png",
      "/images/products/Lays (2).png",
      "/images/products/Lays (3).png",
      "/images/products/Lays (4).png",
    ],
    rating: 4,
    description:
      "The healthy Potato chips with best taste ever and fried in good quality oil.",
    flavor: [
      { color: "bg-orange-500", label: "Salty" },
      { color: "bg-red-600", label: "Crispy" },
    ],
    stock: 32,
    ingredients: [
      "16 Grams of Protein",
      "+35 Grams of Carbs",
      "10 Grams of Fiber",
      "11 Grams of Sugar",
      "CN Soft Baked",
      "Certified Vegan",
    ],
  },
  {
    id: 2,
    name: "Spicy Chips",
    price: 5.49,
    images: [
      "/images/products/Lays (5).png",
      "/images/products/Lays (6).png",
      "/images/products/Lays (7).png",
    ],
    rating: 3,
    description:
      "Spicy potato chips with a kick, fried in premium oil for a crispy bite.",
    flavor: [
      { color: "bg-red-700", label: "Spicy" },
      { color: "bg-yellow-400", label: "Tangy" },
    ],
    stock: 20,
    ingredients: [
      "18 Grams of Protein",
      "+30 Grams of Carbs",
      "8 Grams of Fiber",
      "15 Grams of Sugar",
      "Gluten Free",
      "Non-GMO",
    ],
  },
  {
    id: 3,
    name: "Classic Salted Chips",
    price: 3.99,
    images: [
      "/images/products/Lays (8).png",
      "/images/products/Lays (9).png",
      "/images/products/Lays (1).png",
    ],
    rating: 5,
    description: "Simple and classic salted chips, crispy and fresh every time.",
    flavor: [
      { color: "bg-gray-400", label: "Salted" },
      { color: "bg-yellow-300", label: "Crunchy" },
    ],
    stock: 50,
    ingredients: [
      "14 Grams of Protein",
      "+40 Grams of Carbs",
      "12 Grams of Fiber",
      "8 Grams of Sugar",
      "Kosher Certified",
      "Non-GMO",
    ],
  },
  {
    id: 4,
    name: "Cheddar Cheese Chips",
    price: 6.99,
    images: [
      "/images/products/Lays (2).png",
      "/images/products/Lays (5).png",
      "/images/products/Lays (7).png",
      "/images/products/Lays (3).png",
    ],
    rating: 4,
    description: "Rich cheddar flavored chips for cheese lovers.",
    flavor: [
      { color: "bg-yellow-500", label: "Cheesy" },
      { color: "bg-orange-400", label: "Savory" },
    ],
    stock: 25,
    ingredients: [
      "20 Grams of Protein",
      "+32 Grams of Carbs",
      "10 Grams of Fiber",
      "14 Grams of Sugar",
      "Gluten Free",
      "Certified Vegetarian",
    ],
  },
  {
    id: 5,
    name: "Barbecue Chips",
    price: 5.99,
    images: [
      "/images/products/Lays (6).png",
      "/images/products/Lays (4).png",
      "/images/products/Lays (8).png",
    ],
    rating: 4,
    description: "Smoky and tangy barbecue flavored chips.",
    flavor: [
      { color: "bg-red-600", label: "Smoky" },
      { color: "bg-brown-500", label: "Tangy" },
    ],
    stock: 30,
    ingredients: [
      "17 Grams of Protein",
      "+33 Grams of Carbs",
      "9 Grams of Fiber",
      "13 Grams of Sugar",
      "Non-GMO",
      "Certified Vegan",
    ],
  },
  {
    id: 6,
    name: "Sour Cream & Onion Chips",
    price: 6.49,
    images: [
      "/images/products/Lays (9).png",
      "/images/products/Lays (1).png",
      "/images/products/Lays (5).png",
    ],
    rating: 3,
    description:
      "Tangy sour cream and onion flavored chips with a smooth finish.",
    flavor: [
      { color: "bg-green-400", label: "Tangy" },
      { color: "bg-white", label: "Creamy" },
    ],
    stock: 18,
    ingredients: [
      "19 Grams of Protein",
      "+29 Grams of Carbs",
      "7 Grams of Fiber",
      "12 Grams of Sugar",
      "Gluten Free",
      "Certified Vegetarian",
    ],
  },
  {
    id: 7,
    name: "Salt & Vinegar Chips",
    price: 5.49,
    images: [
      "/images/products/Lays (3).png",
      "/images/products/Lays (6).png",
      "/images/products/Lays (7).png",
    ],
    rating: 5,
    description:
      "Sharp and tangy salt & vinegar chips with a perfect crunch.",
    flavor: [
      { color: "bg-blue-600", label: "Tangy" },
      { color: "bg-gray-500", label: "Salty" },
    ],
    stock: 22,
    ingredients: [
      "15 Grams of Protein",
      "+31 Grams of Carbs",
      "11 Grams of Fiber",
      "10 Grams of Sugar",
      "Non-GMO",
      "Certified Vegan",
    ],
  },
  {
    id: 8,
    name: "Honey BBQ Chips",
    price: 6.99,
    images: [
      "/images/products/Lays (8).png",
      "/images/products/Lays (9).png",
      "/images/products/Lays (2).png",
    ],
    rating: 4,
    description: "Sweet and smoky honey barbecue flavored chips.",
    flavor: [
      { color: "bg-yellow-500", label: "Sweet" },
      { color: "bg-red-700", label: "Smoky" },
    ],
    stock: 15,
    ingredients: [
      "18 Grams of Protein",
      "+28 Grams of Carbs",
      "10 Grams of Fiber",
      "17 Grams of Sugar",
      "Certified Vegan",
      "Gluten Free",
    ],
  },
  {
    id: 9,
    name: "Jalapeño Chips",
    price: 7.49,
    images: [
      "/images/products/Lays (4).png",
      "/images/products/Lays (5).png",
      "/images/products/Lays (6).png",
    ],
    rating: 3,
    description: "Spicy jalapeño flavored chips with a bold taste.",
    flavor: [
      { color: "bg-green-700", label: "Spicy" },
      { color: "bg-red-600", label: "Bold" },
    ],
    stock: 20,
    ingredients: [
      "20 Grams of Protein",
      "+30 Grams of Carbs",
      "8 Grams of Fiber",
      "14 Grams of Sugar",
      "Gluten Free",
      "Certified Vegan",
    ],
  },
]; 