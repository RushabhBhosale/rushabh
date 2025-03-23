"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
   const [isOpen, setIsOpen] = useState(false);
   const menuRef = useRef(null);
   const pathname = usePathname();
   const router = useRouter();

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
         }
      };

      if (isOpen) document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, [isOpen]);

   const navItems = [
      { name: "Home", path: "/home" },
      { name: "About", path: "/about" },
      { name: "Travel", path: "/travel" },
      { name: "Cinema", path: "/cinema" },
      { name: "Contact", path: "/contact" },
   ];

   const handleNavigation = (path) => {
      router.push(path);
      setIsOpen(false);
   };

   return (
      <div className="w-screen z-50 py-1 md:px-8 lg:px-10 px-4 fixed top-0 bg-base-100">
         <div className="flex justify-between items-center">
            <div className="font-bold text-xl bg-base-100 rounded-full px-3 py-2">Rushabh</div>

            <div className="hidden md:flex bg-base-100 px-10 py-2 rounded-full">
               {navItems.map(({ name, path }) => (
                  <button
                     data-cursor-size="50"
                     key={name}
                     onClick={() => handleNavigation(path)}
                     className={`cursor-pointer px-5 py-2 rounded-full transition-all duration-500 
                     ${pathname === path ? "bg-neutral text-neutral-content" : ""}`}
                  >
                     {name}
                  </button>
               ))}
            </div>

            <div className="md:hidden z-0">
               <Menu className="w-8 h-8 cursor-pointer" onClick={() => setIsOpen(true)} />
            </div>

            <div className="hidden md:block">
               <button className="px-6 py-2 rounded-full border-[1px] border-black hover:bg-base-200 transition-all duration-150 bg-base-100 text-black">
                  Contact
               </button>
            </div>
         </div>

         <AnimatePresence>
            {isOpen && (
               <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
                  <motion.div
                     ref={menuRef}
                     initial={{ x: "100%" }}
                     animate={{ x: 0 }}
                     exit={{ x: "100%" }}
                     transition={{ type: "tween", stiffness: 120, damping: 15 }}
                     className="w-64 h-full bg-base-100 p-6 flex flex-col"
                  >
                     <div className="flex z-50 justify-between items-center mb-6">
                        <h2 className="text-lg font-bold">Menu</h2>
                        <X className="w-8 h-8 cursor-pointer" onClick={() => setIsOpen(false)} />
                     </div>

                     {navItems.map(({ name, path }) => (
                        <button
                           key={name}
                           onClick={() => handleNavigation(path)}
                           className={`py-3 px-4 rounded-md transition-all duration-500 cursor-pointer text-left 
                            ${pathname === path ? "bg-neutral text-neutral-content" : ""}`}
                        >
                           {name}
                        </button>
                     ))}
                  </motion.div>
               </div>
            )}
         </AnimatePresence>
      </div>
   );
};

export default Navbar;
