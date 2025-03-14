import React from 'react'
import Hero from './_components/Hero'

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

            <div className="w-[90%] my-8 mx-auto">
               <div className="flex w-full flex-col md:flex-row h-full gap-2">
                  <div className="flex w-full md:w-[60%] flex-col sm:flex-row gap-2">
                     <div className="flex flex-col gap-2 w-full sm:w-[45%]">
                        <div className="w-full aspect-[4/2] sm:flex-1 bg-warning rounded-2xl shadow-md shadow-black/20"></div>
                        <div className="w-full aspect-[5/4] sm:flex-1 bg-primary rounded-2xl shadow-md shadow-black/20"></div>
                     </div>
                     <div className="flex flex-col gap-2 w-full sm:w-[55%]">
                        <div className="w-full aspect-[4/2] sm:flex-1 bg-success rounded-2xl shadow-md shadow-black/20"></div>
                        <div className="w-full aspect-[6/2] sm:flex-1 bg-info rounded-2xl shadow-md shadow-black/20"></div>
                     </div>
                  </div>
                  <div className="w-full md:w-[40%] aspect-[3/1] bg-accent rounded-2xl flex-1 shadow-md shadow-black/20"></div>
               </div>
            </div>





         </div>
      </div>
   )
}

export default Home