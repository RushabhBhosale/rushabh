import React from 'react';
import "@/components/components.css"
import Image from 'next/image';

const About = () => {
   return (
      <div>
         <div className="max-w-7xl mx-auto rounded-4xl relative bg-transparent p-8">
            <div className="flex items-center justify-between">
               <div className='md:w-[70%]'>
                  <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold leading-tight text-black">
                     A Glimpse into My World
                  </h1>

                  <p className="mt-4 text-lg text-gray-600 max-w-2xl">
                     I'm Rushabh, a software developer with a knack for bringing concepts to life through code. Beyond the screen, I'm an avid anime enthusiast who finds joy in great TV shows and gaming adventures. Travel is my reset button—each new destination broadens my perspective and fuels my creativity
                  </p>
               </div>
               <div className='relative hidden md:block size-54 mx-auto overflow-hidden shadow-lg rounded-3xl'>
                  <Image
                     src="/hero/hero.png"
                     alt='hero'
                     fill
                     className='object-cover object-center scale-110'
                  />
               </div>
            </div>

            <div className="mt-8  relative max-w-7xl h-[250px] md:h-[330px] bg-[url('/hero/hero-1.avif')] bg-no-repeat bg-cover bg-center rounded-[30px] md:rounded-[50px] overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
               <div
                  className="relative rounded-[30px] md:rounded-[50px] font-medium text-black ml-2 text-center"
               >
                  <div className="absolute contat rounded-bl-[30px] md:rounded-bl-[50px] bg-base-100 w-[50%] md:w-[35%] h-[100px] top-0 right-0 pb-2 pl-2 flex items-center justify-center text-sm md:text-[16px] lg:text-[20px] italic font-medium">
                     " Passionate software developer, <br />
                     building apps & solutions since 2020"
                  </div>
               </div>
               <div className="absolute bottom-12 left-3 md:left-6">
                  <button className='btn btn-xs mr-2 text-white outline-white btn-outline rounded-full'>#Coding</button>
                  <button className='btn btn-xs mr-2 text-white outline-white btn-outline rounded-full'>#Anime</button>
                  <button className='btn btn-xs text-white outline-white btn-outline rounded-full'>#Gaming</button>
               </div>
               <div className="absolute bottom-4 left-3 md:left-6">
                  <button className='btn btn-xs mr-2 text-white outline-white btn-outline rounded-full'>#Travel the world</button>
                  <button className='btn btn-xs  text-white outline-white btn-outline rounded-full'>#Binge Everthing</button>
               </div>
            </div>
         </div>
         <div className="bg-base-300 py-12 md:my-24 my-12">
            <div className="text-center max-w-5xl mx-auto">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur deserunt minus veniam aperiam ab at sunt nihil vel necessitatibus, totam, eius nesciunt voluptatem qui voluptatibus.
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit mollitia minima ex, beatae iusto assumenda quos earum, aperiam doloribus ea facere rerum consequuntur, natus fuga pariatur ducimus vitae enim eveniet.
            </div>
         </div>
      </div>
   );
};

export default About;
