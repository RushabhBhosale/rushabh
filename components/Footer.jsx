"use client";
import React from "react";
import { Mail, Send } from "lucide-react";

const Footer = () => {
   return (
      <footer className="w-full bg-gray-900 text-white py-20 px-6 relative overflow-hidden">
         {/* Background Quote */}
         <div className="absolute bottom-0 inset-0 flex items-end justify-center overflow-hidden whitespace-nowrap text-xl font-bold uppercase opacity-5">
            <marquee> I am going to be the Pirate King • I am going to be Hokage • I am Atomic • You have no enemies. No one does. There is no one who it's okay to hurt • It's over 9000!</marquee>
         </div>

         {/* Content */}
         <div className="container mx-auto flex flex-col items-center text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight uppercase mb-6">
               Miles to{" "}
               <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Travel
               </span>
               ,{" "}
               <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  Stories
               </span>{" "}
               to Tell
            </h1>
            <p className="mt-2 text-lg md:text-xl opacity-90 max-w-2xl leading-relaxed">
               "Miles to travel, stories to tell, and everything in between."
            </p>

            {/* Email Subscription */}
            <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mt-10 shadow-lg overflow-hidden w-full max-w-md hover:shadow-xl transition-shadow">
               <div className="pl-5 pr-3 py-3 text-gray-300">
                  <Mail size={20} />
               </div>
               <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 outline-none text-base bg-transparent placeholder-gray-400 text-white"
               />
               <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 flex items-center gap-2 hover:from-blue-700 hover:to-blue-600 transition-all">
                  Send <Send size={16} />
               </button>
            </div>

            {/* Footer Note */}
            <p className="mt-8 text-sm opacity-70 flex items-center gap-2">
               <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Adventure Awaits
               </span>
               <span className="text-gray-400">|</span>
               <span className="text-gray-400">Crafted with ❤️</span>
            </p>
         </div>
      </footer>
   );
};

export default Footer;
