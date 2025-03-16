import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const LastTrip = () => {
   return (
      <div className="relative my-16 bg-base-100 py-16 text-primary-content">
         <div className="absolute inset-0">
            <Image
               src="/travel/bg.jpeg"
               alt="Mathura, Vrindavan & Amritsar"
               fill
               className="object-cover opacity-30 blur-md"
            />
         </div>

         <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-base-content uppercase font-oswald">
               A Spiritual & Cultural Journey ✨
            </h2>
            <p className="mt-4 text-sm sm:text-lg opacity-90 font-noto max-w-2xl mx-auto">
               From the divine energy of **Mathura & Vrindavan** to the soulful **Golden Temple in Amritsar**—this trip was a perfect blend of peace, history, and culture. 🕌🎡
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
               <div className="relative h-52 sm:h-64 rounded-box overflow-hidden shadow-lg">
                  <Image
                     src="/travel/mathura.avif"
                     alt="Mathura"
                     fill
                     className="object-cover transition-transform hover:scale-105 duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                     <span className="text-white text-lg sm:text-xl font-bold">Mathura</span>
                  </div>
               </div>

               <div className="relative h-52 sm:h-64 rounded-box overflow-hidden shadow-lg">
                  <Image
                     src="/travel/vridavan.avif"
                     alt="Vrindavan"
                     fill
                     className="object-cover transition-transform hover:scale-105 duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                     <span className="text-white text-lg sm:text-xl font-bold">Vrindavan</span>
                  </div>
               </div>

               <div className="relative h-52 sm:h-64 rounded-box overflow-hidden shadow-lg">
                  <Image
                     src="/travel/golden-temple.avif"
                     alt="Amritsar"
                     fill
                     className="object-cover transition-transform hover:scale-105 duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                     <span className="text-white text-lg sm:text-xl font-bold">Amritsar</span>
                  </div>
               </div>
            </div>

            <Link href="/travel" className="inline-block mt-6 px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary-focus transition">
               See Full Trip 📍
            </Link>
         </div>
      </div>
   )
}

export default LastTrip