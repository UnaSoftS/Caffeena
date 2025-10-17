'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

const cards = [
  {
    title: "Espresso Delight",
    description: "Rich and bold espresso with a smooth crema.",
    image: "/images/coffee1.jpg",
    buttonText: "Order Now",
  },
  {
    title: "Arabica Beans",
    description: "Finest Arabica coffee beans roasted to perfection.",
    image: "/images/coffee2.jpg",
    buttonText: "Order Beans",
  },
  {
    title: "Chocolate Mocha",
    description: "Decadent chocolate-infused mocha espresso.",
    image: "/images/coffee3.jpg",
    buttonText: "Get Yours",
  },
  {
    title: "Cinnamon Brew",
    description: "Spiced cinnamon coffee with deep aroma.",
    image: "/images/coffee4.jpg",
    buttonText: "Try Now",
  },
];

export default function CoffeeCards() {
  return (
    <section className="bg-wh text-white py-20 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-[#c69a35] tracking-wider">COFFEE COLLECTION</h1>
        <p className="mt-4 text-gray-400">Experience our signature coffee delights</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-100 rounded-xl    
              overflow-hidden shadow-lg hover:shadow-[#c69a35]/40
             transition duration-300 text-[#c69a35] hover:text-[#c69a35]" 
          >
            <div className="relative h-64 w-full">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover hover:scale-105 transition duration-500 ease-in-out"
              />
            </div>
            <div className="p-6 text-center">
              <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
              <p className="text-gray-400 mb-4">{card.description}</p>
              <button className="bg-[#c69a35] hover:bg-primary text-white font-bold py-2 px-4 rounded-b-md transition">
                {card.buttonText}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}