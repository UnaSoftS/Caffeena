'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type Slide = {
  src: string;
  title: string;
  subtitle?: string;
};

const slides: Slide[] = [
  { src: '/images/image5.jpg', title: 'Arabica Morning', subtitle: 'Fresh beans, bold vibes' },
  { src: '/images/image4.jpg', title: 'Roast & Relax', subtitle: 'Slow mornings, warm cups' },
  { src: '/images/image1.jpg', title: 'COFFEE HOUSE', subtitle: 'Crafted with passion' },
  { src: '/images/image3.jpg', title: 'Espresso Shot', subtitle: 'Pure energy in a sip' },
  { src: '/images/image2.jpg', title: 'Latte Art', subtitle: 'Where taste meets design' },
  { src: '/images/image1.jpg', title: 'Brewed Right', subtitle: 'The perfect extraction' },
  { src: '/images/1.png', title: 'Brewed Right', subtitle: 'The perfect extraction' },

];

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent(c => (c + 1) % slides.length);
  const prevSlide = () => setCurrent(c => (c - 1 + slides.length) % slides.length);

  // تدوير تلقائي كل 5 ثوانٍ (من دون إعادة إنشاء المؤقّت كل تغيير)
  useEffect(() => {
    const id = setInterval(() => setCurrent(c => (c + 1) % slides.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="relative w-full h-full"
        >
          {/* الصورة الخلفية */}
          <Image
            src={slides[current].src}
            alt={`Slide ${current + 1}`}
            fill
            className="object-cover animate-zoomPan"
            priority
          />

          {/* طبقة تدرّج لتعزيز قراءة النص */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent" />

          {/* النص الخاص بكل صورة */}
          <div className="absolute inset-0 z-10 flex items-center justify-center p-6">
            <div className="text-center">
              <motion.h1
                key={`title-${current}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="text-white font-extrabold leading-tight text-4xl md:text-6xl lg:text-7xl drop-shadow"
              >
                {slides[current].title}
              </motion.h1>

              {slides[current].subtitle && (
                <motion.p
                  key={`subtitle-${current}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
                  className="mt-3 text-white/90 text-base md:text-lg lg:text-xl"
                >
                  {slides[current].subtitle}
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* أزرار التنقّل */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black rounded-full p-3 shadow-md backdrop-blur-md z-20"
      >
        ◀
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black rounded-full p-3 shadow-md backdrop-blur-md z-20"
      >
        ▶
      </button>

      {/* النقاط */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.2 }}
            className={`w-3 h-3 rounded-full ${index === current ? 'bg-white' : 'bg-white/50'} transition-all`}
          />
        ))}
      </div>
    </div>
  );
}
