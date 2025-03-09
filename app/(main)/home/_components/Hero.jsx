import Image from "next/image";
import React from "react";

const Hero = () => {
   return (
      <div className="h-screen w-screen flex items-center px-6 md:px-8 lg:px-10 relative">
         {/* Left - Text Content */}
         <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl oswald font-medium text-base-content/30 leading-tight">
               Hello!! <br />
               My name is <br />
               <span className="text-base-content">Rushabh Bhosale</span> <br />
               <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start">
                  I'm a <span className="text-base-content">Software Developer</span>
               </div>
            </h1>
         </div>

         {/* Right - Image Collage */}
         <div className="relative w-full md:w-1/2">
            {[
               { src: "/hero-1.avif", size: "w-64 h-64 sm:w-80 sm:h-80", position: "left-48 top-1/2 -translate-y-1/2", text: "Follow Your Dream" },
               { src: "/hero-3.avif", size: "w-52 h-52 sm:w-64 sm:h-64", position: "left-4 -top-10 -rotate-6", text: "Cinema is Magic" },
               { src: "/hero-2.avif", size: "w-40 h-40 sm:w-48 sm:h-48", position: "left-[450px] -bottom-24 -rotate-6", text: "Coding is Life" },
               { src: "/hero-4.jpg", size: "w-28 h-28 sm:w-36 sm:h-36", position: "left-24 bottom-24 rotate-[15deg]", text: " Luffy - The Future Pirate King" }
            ].map((img, index) => (
               <div key={index} className={`absolute ${img.size} ${img.position} rounded-3xl shadow-lg hover:scale-105 hover:rotate-0 hover:z-50 transition-all duration-350 group overflow-hidden`}>
                  <Image src={img.src} alt={img.text} layout="fill" className="object-cover rounded-3xl border-4 border-white" />
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
