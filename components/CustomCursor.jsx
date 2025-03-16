"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const CustomCursor = ({
   defaultSize = 15,
   defaultColor = "white",
   hoverScale = 3,
   mixBlendMode = "difference",
   stiffness = 500,
   damping = 30
}) => {
   const cursorX = useMotionValue(-100); // Start offscreen
   const cursorY = useMotionValue(-100);
   const size = useMotionValue(defaultSize);
   const opacity = useMotionValue(0);
   const [isVisible, setIsVisible] = useState(false);
   const [cursorText, setCursorText] = useState("");
   const [cursorColor, setCursorColor] = useState(defaultColor);

   // Create smoother springs for all animated values
   const springX = useSpring(cursorX, { stiffness, damping });
   const springY = useSpring(cursorY, { stiffness, damping });
   const springSize = useSpring(size, { stiffness, damping });
   const springOpacity = useSpring(opacity, { stiffness: 200, damping: 40 });

   useEffect(() => {
      const moveCursor = (e) => {
         cursorX.set(e.clientX - size.get() / 2);
         cursorY.set(e.clientY - size.get() / 2);

         if (!isVisible) {
            setIsVisible(true);
            opacity.set(1);
         }
      };

      const handleHover = (e) => {
         const target = e.target;

         // Check for interactive elements
         const isInteractive =
            target.tagName.toLowerCase() === "a" ||
            target.tagName.toLowerCase() === "button" ||
            target.tagName.toLowerCase() === "input" ||
            target.closest("button") ||
            target.closest("a") ||
            target.dataset.cursorInteractive === "true";

         // Set custom size if specified, otherwise use default or hover effect
         if (target.dataset.cursorSize) {
            size.set(parseInt(target.dataset.cursorSize));
         } else if (isInteractive) {
            size.set(defaultSize * hoverScale);
         } else {
            size.set(defaultSize);
         }

         // Handle custom cursor text
         setCursorText(target.dataset.cursorText || "");

         // Handle custom cursor color
         setCursorColor(target.dataset.cursorColor || defaultColor);
      };

      const handleMouseLeave = () => {
         setIsVisible(false);
         opacity.set(0);
      };

      window.addEventListener("mousemove", moveCursor);
      window.addEventListener("mouseover", handleHover);
      document.addEventListener("mouseleave", handleMouseLeave);

      return () => {
         window.removeEventListener("mousemove", moveCursor);
         window.removeEventListener("mouseover", handleHover);
         document.removeEventListener("mouseleave", handleMouseLeave);
      };
   }, [defaultSize, hoverScale, isVisible]);

   return (
      <AnimatePresence>
         {isVisible && (
            <motion.div
               className="fixed pointer-events-none hidden xl:block z-[99] items-center justify-center"
               style={{
                  x: springX,
                  y: springY,
                  width: springSize,
                  height: springSize,
                  opacity: springOpacity,
                  backgroundColor: cursorColor,
                  borderRadius: "50%",
                  mixBlendMode,
               }}
               initial={{ scale: 0.5 }}
               animate={{ scale: 1 }}
               exit={{ scale: 0.5, opacity: 0 }}
            >
               {cursorText && (
                  <span className="text-xs whitespace-nowrap font-medium" style={{
                     color: cursorColor === "white" ? "black" : "white"
                  }}>
                     {cursorText}
                  </span>
               )}
            </motion.div>
         )}
      </AnimatePresence>
   );
};

export default CustomCursor;