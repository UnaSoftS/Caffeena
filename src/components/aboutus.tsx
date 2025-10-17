'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import Ourstory from  '../../public/images/4.png'

export default function AboutUs() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <h2 className="text-4xl font-bold text-primary">Our Story</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          At UnaSoft, we believe in building digital solutions that bring value
          and innovation to our clients. Our journey started with a simple idea:
          to merge creativity with cutting-edge technology. Through dedication
          and passion, weve grown into a team that delivers excellence.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed">
          Every project we undertake is a new chapter in our story, crafted with
          precision and driven by our commitment to quality and user experience.
        </p>
      </motion.div>

      {/* Image Content */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
        className="flex justify-center"
      >
        <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-xl">
          <Image
            src={Ourstory}
            alt="Our Story Image"
            fill
            // لتحميل الصورة قبل المحتوى
            priority
            className="object-cover"
          />  
          
          
          
        </div>
        
        
      </motion.div>
     
        
        
    </section>
  );
}