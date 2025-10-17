'use client';

import dynamic from 'next/dynamic';
import CoffeeCard from '@/components/CoffeeCard';
import RoastSection from '@/components/RoastSection';
import AboutUs from '@/components/aboutus';
import LogoCloud from '@/components/logocloud';
import ShopByCollections from '@/components/shopbycollection';
import TornEdge from '@/components/tornedge';
import { Pagenation } from '@/components/pagenation';

// تحميل السلايدر ديناميكيًا بدون SSR (أفضل للأداء مع الحركات)
const ImageSlider = dynamic(() => import('@/components/header/HeaderSlider'), {
  ssr: false,
  loading: () => (
    <div className="relative h-[60vh] w-full bg-neutral-200 animate-pulse" aria-busy="true" />
  ),
});

export default function Home() {
  return (
    <>

  <section aria-label="Featured images" className="w-full">
          <ImageSlider />
        </section>

        {/* Main content */}
<main id="main" className="w-full max-w-6xl mx-auto flex-1">
  {/* About section */}
  <section
    id="about"
    aria-labelledby="about-heading"
    className="py-16 px-6 md:px-12"
  >
    <h2 id="about-heading" className="sr-only">About us</h2>
    <AboutUs/>
    </section>

  {/* shopebycollection */}
  <section>
    <ShopByCollections/>
  </section>
    

  {/* Roast section */}
  <section
    id="roast"
    aria-labelledby="roast-heading"
    className="py-16 px-6 md:px-12"
  >
    <h2 id="roast-heading" className="sr-only">Roast types</h2>
    <RoastSection />
  </section>

  {/* Coffee cards */}
  <section
    id="coffee"
    aria-labelledby="coffee-heading"
    className="py-16 px-6 md:px-12"
  >
    <h2 id="coffee-heading"
    className="sr-only">Coffee selection</h2>
    <CoffeeCard />
  </section>
  <section id="contact" aria-labelledby="contact-heading"
className="py-16 px-6 md:px-12">
    <LogoCloud/>
    </section>

  {/* Extra content slot */}
  <section className="py-16 px-6 md:px-12 text-center text-white">
    {/* محتوى إضافي لاحقًا */}
    <Pagenation/>

  </section>
</main>


    </>
  );
}
