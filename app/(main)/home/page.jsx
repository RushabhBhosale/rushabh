import React from 'react'
import Hero from './_components/Hero'
import Bento from './_components/Bento'

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
            <Bento />
         </div>
      </div>
   )
}

export default Home