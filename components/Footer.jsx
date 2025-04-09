"use client";
import React from "react";
import { Mail, Send } from "lucide-react";
import Image from "next/image";

const Footer = () => {
   return (
      <footer className="w-full bg-neutral text-neutral-content py-10 px-6 relative z-0">
         <div className="container mx-auto flex flex-col items-center text-center relative">
            <h1 data-cursor-size="70" className="text-3xl md:text-4xl font-semibold uppercase mb-4">
               Explore the <span className="text-primary">Unknown</span>, Share the <span className="text-secondary">Journey</span>
            </h1>
            <p className="text-base md:text-lg opacity-80 max-w-xl leading-relaxed">
               "Every road leads to a story, and every story is worth telling."
            </p>

            <div className="flex items-center bg-base-300 border border-base-content/20 rounded-full mt-6 shadow-md overflow-hidden w-full max-w-sm">
               <div className="pl-4 pr-2 py-2 text-base-content">
                  <Mail size={18} />
               </div>
               <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 outline-none bg-transparent placeholder-neutral-content text-neutral-content text-sm"
               />
               <button className="bg-primary text-primary-content px-4 py-2 flex items-center gap-2 hover:bg-primary-content hover:text-primary transition-all text-sm">
                  Send <Send size={14} />
               </button>
            </div>

            <p className="mt-6 text-xs opacity-60 flex items-center gap-2">
               <span className="text-info">Adventure Awaits</span>
               <span className="text-neutral-content">|</span>
               <span className="text-neutral-content">Crafted with ❤️</span>
            </p>
         </div>
         <div className="max-w-7xl h-20 relative mx-auto">
            <Image src="/footer.gif" alt="anime" fill className="object-contain object-center scale-105" />
         </div>
      </footer>
   );
};

export default Footer;
