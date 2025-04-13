import Image from 'next/image'
import React from 'react'
import { Parallax } from 'react-scroll-parallax'
import { motion } from "motion/react"

const ImageParallax = () => {
   return (
      <div className="relative flex md:my-12 justify-between px-6 md:px-12">
         <Parallax speed={-15}>
            <div className="flex flex-col gap-6 mt-12">
               <div className="relative w-18 md:w-30 lg:w-40 xl:w-50 h-35 md:h-45 xl:h-50 rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
                  <Image src="/bento/bento-1.avif" alt='rushabh bhosale' fill className='object-cover object-center' />
               </div>
               <div className="relative w-18 md:w-30 lg:w-40 xl:w-50 h-25 md:h-30 xl:h-30 rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
                  <Image src="/me/me-1.jpeg" alt='rushabh bhosale' fill className='object-cover object-center' />
               </div>
               <div className="relative w-18 md:w-30 lg:w-40 xl:w-50 h-20 md:h-35 xl:h-40 rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
                  <Image src="/hero-1.avif" alt='rushabh bhosale' fill className='object-cover object-center' />
               </div>
            </div>
         </Parallax>
         <Parallax speed={-10}>
            <div className="flex flex-col gap-6">
               <div className="relative w-18 md:w-30 lg:w-40 xl:w-50 h-45 md:h-75 xl:h-80 rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
                  <Image src="/me/me-2.jpeg" alt='rushabh bhosale' fill className='object-cover object-center scale-140' />
               </div>
               <div className="relative w-18 md:w-30 lg:w-40 xl:w-50 h-35 md:h-40 xl:h-45 rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
                  <Image src="/hero-2.avif" alt='rushabh bhosale' fill className='object-cover object-center' />
               </div>
            </div>
         </Parallax>
         <Parallax speed={-7}>
            <div className="flex flex-col gap-6 mt-6">
               <div className="relative w-18 md:w-30 lg:w-40 xl:w-50 h-20 md:h-20 xl:h-20 rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
                  <Image src="/watch/our-beloved-summer.webp" alt='rushabh bhosale' fill className='object-cover object-center' />
               </div>
               <div className="relative w-18 md:w-30 lg:w-40 xl:w-50 h-35 md:h-60 xl:h-70 rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
                  <Image src="/watch/our-beloved-summer.webp" alt='rushabh bhosale' fill className='object-cover object-center' />
               </div>
               <div className="relative w-18 md:w-30 lg:w-40 xl:w-50 h-25 md:h-30 xl:h-30 rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
                  <Image src="/bento/bento-1.avif" alt='rushabh bhosale' fill className='object-cover object-center' />
               </div>
            </div>
         </Parallax>
         <Parallax speed={-15}>
            <div className="flex flex-col gap-6 mt-24">
               <div className="relative w-18 md:w-30 lg:w-40 xl:w-50 h-25 md:h-40 xl:h-45 rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
                  <Image src="/hero-4.jpg" alt='rushabh bhosale' fill className='object-cover object-center' />
               </div>
               <div className="relative w-18 md:w-30 lg:w-40 xl:w-50 h-35 md:h-75 xl:h-80 rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
                  <Image src="/bento/bento-4.webp" alt='rushabh bhosale' fill className='object-cover object-center' />
               </div>
            </div>
         </Parallax>
         <Parallax speed={12} className='hidden lg:block'>
            <div className="flex flex-col gap-6 -mt-12">
               <div className="relative w-18 md:w-30 lg:w-40 xl:w-50 h-25 md:h-30 xl:h-30 rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
                  <Image src="/watch/money-heist.jpeg" alt='rushabh bhosale' fill className='object-cover object-center' />
               </div>
               <div className="relative w-18 md:w-30 lg:w-40 xl:w-50 h-25 md:h-30 xl:h-35 rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
                  <Image src="/bento/bento-2.jpg" alt='rushabh bhosale' fill className='object-cover object-center' />
               </div>
               <div className="relative w-18 md:w-30 lg:w-40 xl:w-50 h-40 md:h-45 xl:h-55 rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
                  <Image src="/hero-3.avif" alt='rushabh bhosale' fill className='object-cover object-center' />
               </div>
            </div>
         </Parallax>
         <Parallax speed={-15} className='hidden md:block'>
            <div className="flex flex-col gap-6">
               <div className="relative w-18 md:w-30 lg:w-40 xl:w-50 h-20 md:h-25 xl:h-25 rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
                  <Image src="/bento/bento-4.webp" alt='rushabh bhosale' fill className='object-cover object-center' />
               </div>
               <div className="relative w-18 md:w-30 lg:w-40 xl:w-50 h-30 md:h-60 xl:h-65 rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
                  <Image src="/me/me-3.jpeg" alt='rushabh bhosale' fill className='object-cover object-center' />
               </div>
               <div className="relative w-18 md:w-30 lg:w-40 xl:w-50 h-30 md:h-25 xl:h-30 rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
                  <Image src="/hero-2.avif" alt='rushabh bhosale' fill className='object-cover object-center' />
               </div>
            </div>
         </Parallax>
      </div>
   )
}

export default ImageParallax