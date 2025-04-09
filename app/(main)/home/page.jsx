import React from 'react';
import "@/components/components.css"
import Image from 'next/image';
import { FaCode, FaGlobeAmericas, FaTv, FaFilm, FaGamepad } from 'react-icons/fa';
import { SiMyanimelist } from 'react-icons/si';

const Home = () => {
   const categories = [
      { name: "Coding", icon: <FaCode size={32} /> },
      { name: "Anime", icon: <SiMyanimelist size={32} /> },
      { name: "Travel", icon: <FaGlobeAmericas size={32} /> },
      { name: "TV Series", icon: <FaTv size={32} /> },
      { name: "Movies", icon: <FaFilm size={32} /> },
      { name: "Gaming", icon: <FaGamepad size={32} /> }
   ];
   return (
      <div>
         <div className="max-w-7xl mx-auto rounded-4xl relative bg-transparent p-8">
            <div className="flex flex-col md:flex-row justify-between gap-10">
               <div className="md:w-full text-center">
                  <h1 className="text-3xl md:text-4xl lg:text-6xl font-extrabold leading-tight text-black">
                     A Glimpse into My World
                  </h1>
                  <p className="mt-4 text-base md:text-lg text-gray-500 italic">
                     Crafting code with purpose, exploring pixels, places, and plots ✨
                  </p>
                  <div className="mt-6 flex flex-col items-center text-center">
                     <div className="flex items-center gap-6 w-full max-w-2xl justify-center relative">
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 z-0" />
                        {[
                           { value: '5+', label: 'Years Coding' },
                           { value: '200+', label: 'Episodes Binged' },
                           { value: '30+', label: 'Cities Explored' },
                        ].map((item, idx) => (
                           <div key={idx} className="z-10 bg-white px-5 py-2 rounded-full shadow-md flex flex-col items-center">
                              <span className="text-xl font-extrabold text-black">{item.value}</span>
                              <span className="text-xs text-gray-500 mt-1">{item.label}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>


            <div className="mt-8 relative max-w-7xl h-[250px] md:h-[330px] bg-[url('/hero/hero-1.avif')] bg-no-repeat bg-cover bg-center rounded-[30px] md:rounded-[50px] overflow-hidden">
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
         <div className="bg-base-300 py-12 md:my-16 my-12">
            <div className="text-center max-w-5xl mx-auto px-6">
               <p className="mb-8 text-lg">
                  Explore your passions across multiple dimensions of entertainment and learning.
               </p>

               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mt-10">
                  {categories.map((category, index) => (
                     <div key={index} className="flex flex-col items-center">
                        <div className="bg-base-100 p-6 rounded-full mb-3 shadow-md hover:shadow-lg transition-shadow">
                           {category.icon}
                        </div>
                        <span className="font-medium text-lg">{category.name}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         <div className="flex flex-col md:flex-row items-center max-w-7xl my-12 mx-auto gap-20 justify-between">
            <div className='text-4xl flex-[35%]'>
               Augmented Crowd <br />
               augmented Sway
            </div>
            <div className="divider divider-horizontal scale-125"></div>
            <div className='text-black/70 flex-[40%]'>
               Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam praesentium asperiores quas recusandae laudantium labore harum possimus vero! Eveniet, impedit!
            </div>
            <div className='flex-[30%] flex justify-center'>
               <button className='btn btn-outline'>Read more</button>
            </div>
         </div>
      </div>
   );
};

export default Home;
