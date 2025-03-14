import React from 'react'
import Hero from './_components/Hero'
import Image from 'next/image'

const Home = () => {
   return (
      <div className='overflow-hidden'>
         <Hero />
         <div className='my-24 bg-base-200 py-8 text-primary-content'>
            <div className='text-center px-3 max-w-4xl mx-auto'>
               <h1 data-cursor-size="70" className='text-2xl sm:text-3xl md:text-4xl xl:text-5xl uppercase font-bold text-base-content leading-tight'>
                  More Than Just Code
               </h1>
               <p className='mt-6 text-lg sm:text-xl md:text-2xl lg:text-3xl text-primary leading-relaxed italic'>
                  " I create with code, but my passion lies in exploring new places, chasing adventures, and getting lost in great movies. "
               </p>
            </div>

            <div className="w-[90%] my-8 mx-auto md:h-[80vh]">
               <div className="flex flex-col md:flex-row gap-4 w-full h-full overflow-hidden">
                  {/* Left Section */}
                  <div className="flex flex-col gap-4 w-full md:w-[35%] h-full">
                     <div className="w-full rounded-2xl bg-accent flex-[60%] overflow-hidden p-6 text-sm sm:text-lg md:text-[80px] flex justify-center leading-[98px] font-black">
                        Passionate Developer
                     </div>
                     <div className="w-full rounded-2xl bg-zinc-800 flex-[40%] overflow-hidden"></div>
                  </div>

                  {/* Right Section */}
                  <div className="flex flex-col gap-4 flex-1">
                     {/* Top Row */}
                     <div className="flex flex-col sm:flex-row gap-4 w-full h-[35%]">
                        <div className="rounded-2xl bg-zinc-800 bg-[url('/bento/bento-1.avif')] bg-center bg-cover bg-no-repeat flex-[75%] min-h-[150px] p-6 overflow-hidden text-[80px] text-center text-white font-black">
                           Love to Travel
                        </div>
                        <div className="rounded-2xl bg-zinc-800 flex-[25%] min-h-[150px] p-6 overflow-hidden flex justify-center items-center relative w-full h-full">
                           <Image
                              src="/bento/bento-3.avif"
                              width={200}
                              height={200}
                              alt='me'
                              className='object-center object-cover rounded-full'
                           />
                        </div>
                     </div>

                     {/* Bottom Row */}
                     <div className="flex flex-col sm:flex-row gap-4 flex-1">
                        <div className="rounded-2xl bg-zinc-800 flex-1 min-h-[150px]"></div>
                        <div className="flex flex-col gap-4 flex-1">
                           <div className="bg-zinc-800 rounded-2xl flex-1 p-6 min-h-[150px] overflow-hidden"></div>
                           <div className="bg-zinc-800 rounded-2xl flex-1 p-6 bg-[url('/bento/bento-2.jpg')] bg-cover bg-center min-h-[150px] text-[80px] text-white font-black text-center overflow-hidden">
                              Anime
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

         </div>
      </div>
   )
}

export default Home