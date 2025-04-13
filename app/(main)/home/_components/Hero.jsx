import React from 'react'
import Marquee from 'react-fast-marquee'

const Hero = () => {
   return (
      <div className="flex items-start justify-center h-[70vh] md:min-h-screen w-full">
         <div className="w-7xl mx-auto rounded-4xl relative bg-transparent p-8">
            <div className="flex flex-col md:flex-row justify-between gap-10">
               <div className="md:w-full text-center">
                  <h1 className="text-2xl md:text-4xl lg:text-6xl font-extrabold leading-tight text-black">
                     A Glimpse into My World
                  </h1>
                  <p className="mt-4 text-base md:text-lg text-gray-500 italic">
                     Crafting code with purpose, exploring pixels, places, and plots ✨
                  </p>
               </div>
            </div>
            <div className="mt-8 text-center max-w-[250px] md:max-w-[450px] mx-auto uppercase text-[14px] md:text-[18px] tracking-wide font-medium">
               <Marquee gradient={true} gradientColor="oklch(97.788% 0.004 56.375)" gradientWidth={100} speed={30}>‎ Gaming. Coding. Anime. Travel. Hokage. Movies. TV-Series. Future Pirate King.</Marquee>
            </div>
            <div className="mt-8 relative max-w-7xl h-[250px] md:h-[330px] bg-[url('/hero/hero-1.avif')] bg-no-repeat bg-cover bg-center rounded-[30px] md:rounded-[50px]">
               <div className="absolute rounded-[30px] md:rounded-[50px] inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
               <div
                  className="relative rounded-[30px] md:rounded-[50px] font-medium text-black ml-2 text-center"
               >
                  <div className="absolute contat rounded-bl-[30px] md:rounded-bl-[50px] bg-base-100 w-[50%] md:w-[35%] h-[100px] top-0 right-0 pb-2 pl-2 flex items-center justify-center text-sm md:text-[16px] lg:text-[20px] italic font-medium">
                     " Passionate software developer, <br />
                     building apps & solutions since 2020"
                  </div>
               </div>
               <div className="absolute bottom-12 left-3 md:left-6">
                  <button className='btn backdrop-blur-2xl bg-white/10 border-white/60 btn-xs mr-2 text-white outline-white btn-outline rounded-full'>#Coding</button>
                  <button className='btn backdrop-blur-2xl bg-white border-white/60 btn-xs mr-2 outline-white btn-outline rounded-full'>#Anime</button>
                  <button className='btn backdrop-blur-2xl bg-white/10 border-white/60 btn-xs text-white outline-white btn-outline rounded-full'>#Gaming</button>
               </div>
               <div className="absolute bottom-4 left-3 md:left-6">
                  <button className='btn backdrop-blur-2xl bg-white/10 border-white/60 btn-xs mr-2 text-white outline-white btn-outline rounded-full'>#Travel the world</button>
                  <button className='btn backdrop-blur-2xl bg-white/10 btn-xs  text-white outline-white btn-outline border-white/60 rounded-full'>#Binge Everthing</button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Hero