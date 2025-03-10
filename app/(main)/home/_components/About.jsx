import React from "react";
import Image from "next/image";

const About = () => {
   const images = [
      "/hero-1.avif",
      "/hero-2.avif",
      "/hero-3.avif",
      "/hero-4.jpg",
   ];

   return (
      <div className="mt-40 w-[120vw] -ml-10 mb-40 flex justify-center relative">
         <div className="absolute inset-0 bg-yellow-400 opacity-20 z-10 pointer-events-none -rotate-6"></div>
         <div className="absolute inset-0 bg-[url('/film-grain-2.avif')] opacity-45 z-20 pointer-events-none mix-blend-multiply -rotate-6 bg-repeat"></div>
         <div className="w-full border-dashed border-white border-[15px] outline-[10px] outline-black bg-black h-52 -rotate-6 flex items-center overflow-hidden px-6 py-4 gap-4 rounded-xl relative">
            {[...images, ...images].map((src, index) => (
               <div key={index} className="relative w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 overflow-hidden rounded-[33px]">
                  <Image
                     src={src}
                     alt={`about-image-${index}`}
                     fill
                     className="object-cover py-8"
                  />
               </div>
            ))}
         </div>
      </div>
   );
};

export default About;
