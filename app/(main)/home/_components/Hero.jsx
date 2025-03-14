import Image from "next/image";
import React from "react";

const Hero = () => {
   const heroImages = [
      {
         src: "/hero-1.avif",
         size: "w-64 h-64 sm:w-80 sm:h-80",
         position: "xl:left-48 md:left-32 top-1/2 -translate-y-1/2 z-[2]",
         text: "Follow Your Dream",
      },
      {
         src: "/hero-3.avif",
         size: "w-52 h-52 sm:w-64 sm:h-64",
         position: "left-4 -top-10 -rotate-6",
         text: "Cinema is Magic",
      },
      {
         src: "/hero-2.avif",
         size: "w-40 h-40 sm:w-48 sm:h-48",
         position: "xl:left-[450px] md:left-[320px] xl:-bottom-27 md:-bottom-64 -rotate-6 z-[3]",
         text: "Coding is Life",
      },
      {
         src: "/hero-4.jpg",
         size: "w-28 h-28 sm:w-36 sm:h-36",
         position: "left-24 bottom-24 rotate-[15deg] z-[3]",
         text: "Luffy - The Future Pirate King",
      },
   ];

   return (
      <div className="md:h-screen w-screen my-23 mt-0 flex md:flex-row flex-col md:gap-24 items-center px-6 md:px-8 lg:px-10 relative">
         <div className="md:hidden w-screen flex justify-center mb-6">
            <div className="relative w-full h-76 overflow-hidden">
               <Image
                  src="/hero-1.avif"
                  alt="Follow Your Dream"
                  fill
                  className="object-cover object-left-top"
               />
            </div>
         </div>
         <div className="w-full md:w-1/2 flex flex-col justify-center gap-6">
            <span className="text-sm uppercase text-error tracking-[0.3rem]">
               Full-Stack Developer & Dreamer
            </span>

            <h1 className="text-primary-content/30 xl:text-5xl lg:text-4xl md:text-4xl text-3xl font-extrabold leading-tight">
               Hey, I'm <span className="text-primary-content">Rushabh</span>.
               <br /> I <span className="text-primary-content">craft code</span> by day, <span className="text-primary-content">chase adventures</span> by night.
            </h1>

            <p className="text-lg text-base-content">
               I turn caffeine into clean, functional, and beautiful digital experiences. Whether it's a website, an app, or something entirely out of this world, I’m here to bring your ideas to life. When I’m not debugging or designing, you’ll find me binge-watching anime, exploring hidden gems in movies, or dreaming about my next travel destination—because the world is too big to stay in one place. 🌍✨ Let’s build something unforgettable together. 🚀
            </p>

            <div className="flex gap-4">
               <button data-cursor-size="50" className="btn btn-primary px-6 py-3 text-lg hover:scale-105 transition-transform">
                  Let's Build Magic
               </button>
               <button className="btn btn-outline btn-primary px-6 py-3 text-lg hover:scale-105 transition-transform">
                  Explore My Journey
               </button>
            </div>
         </div>


         <div className="relative w-full md:w-1/2 hidden md:block">
            {heroImages.map((img, index) => (
               <div
                  key={index}
                  className={`absolute ${img.size} ${img.position} rounded-3xl shadow-lg transition-all duration-350 group hover:scale-105 hover:rotate-0 hover:z-50 overflow-hidden animate-float`}
               >
                  <Image
                     src={img.src}
                     alt={img.text}
                     fill
                     sizes="(max-width: 768px)"
                     className="object-cover rounded-3xl border-4 border-white"
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <p className="text-white text-lg p-3 font-semibold">{img.text}</p>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Hero;
