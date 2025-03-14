"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
   const cursorX = useMotionValue(0);
   const cursorY = useMotionValue(0);
   const size = useMotionValue(15);

   const springX = useSpring(cursorX, { stiffness: 500, damping: 30 });
   const springY = useSpring(cursorY, { stiffness: 500, damping: 30 });
   const springSize = useSpring(size, { stiffness: 500, damping: 30 });

   useEffect(() => {
      const moveCursor = (e) => {
         cursorX.set(e.clientX - size.get() / 2);
         cursorY.set(e.clientY - size.get() / 2);
      };

      const handleHover = (e) => {
         const target = e.target;
         size.set(target.dataset.cursorSize ? parseInt(target.dataset.cursorSize) : 10);
      };

      window.addEventListener("mousemove", moveCursor);
      window.addEventListener("mouseover", handleHover);

      return () => {
         window.removeEventListener("mousemove", moveCursor);
         window.removeEventListener("mouseover", handleHover);
      };
   }, []);

   return (
      <motion.div
         className="fixed pointer-events-none mix-blend-difference hidden md:block z-[99] bg-white text-black rounded-full"
         style={{
            x: springX,
            y: springY,
            width: springSize,
            height: springSize,
         }}
      />
   );
};

export default CustomCursor;