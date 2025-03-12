import React from 'react'
import Hero from './_components/Hero'

const Home = () => {
   return (
      <div className='overflow-hidden'>
         <Hero />
         <div className='my-24'>
            <div className='text-center px-3 max-w-4xl mx-auto'>
               <h1 className='text-2xl md:text-5xl uppercase font-bold text-base-content leading-tight'>
                  More Than Just Code
               </h1>
               <p className='mt-6 text-xl md:text-3xl text-primary leading-relaxed italic'>
                  " I create with code, but my passion lies in exploring new places, chasing adventures, and getting lost in great movies. "
               </p>
            </div>

            <div className="w-[90%] my-8 mx-auto min-h-screen">
               <div className="flex flex-col sm:flex-row h-full gap-2">
                  <div className="flex flex-col gap-2 w-full sm:w-[25%]">
                     <div className="w-full min-h-[250px] sm:h-[65%] bg-accent rounded-2xl"></div>
                     <div className="w-full min-h-[200px] sm:h-[35%] bg-info rounded-2xl"></div>
                  </div>
                  <div className="flex flex-col gap-2 w-full sm:w-[35%]">
                     <div className="w-full min-h-[250px] sm:h-[45%] bg-primary rounded-2xl"></div>
                     <div className="w-full min-h-[250px] sm:h-[55%] bg-warning rounded-2xl"></div>
                  </div>
                  <div className="w-full sm:w-[40%] h-full sm:h-auto bg-success rounded-2xl flex-1"></div>
               </div>
            </div>



         </div>
      </div>
   )
}

export default Home