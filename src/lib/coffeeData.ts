// lib/coffeeData.ts
export type Coffee = {
  category: string;
  isNew: any;
  price: ReactNode;
  id: string;
  name: string;
  description: string;
  image: string; // ضع مسار الصورة (PNG شفافة مثلاً)
  bgLeft?: string; // لون خلفية اللوحة اليسرى (اختياري)
  bgRight?: string; // لون خلفية اللوحة اليمنى (اختياري)
};

const coffeeData: Coffee[] = [
  {
    id: "black",
    name: "Black Coffee",
    description:
      "Delicious coffee should be simply coffee with nothing added, unless you add it yourself.",
    image: "images/coffee/1.png",
    bgLeft: "#cfd4d8",
    bgRight: "#f4ece3",
  },
  {
    id: "espresso",
    name: "Espresso",
    description: "A bold, concentrated shot with rich crema and deep aroma.",
    image: "images/coffee/2.png",
  },
  {
    id: "latte",
    name: "Latte",
    description: "Smooth espresso balanced with silky steamed milk.",
    image: "images/coffee/latte.png",
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    description: "Equal parts espresso, steamed milk, and airy foam.",
    image: "images/coffee/cappuccino.png",
  },
  {
    id: "mocha",
    name: "Mocha",
    description: "Chocolate meets espresso in a creamy, cozy cup.",
    image: "images/coffee/mocha.png",
  },
];

export default coffeeData;
