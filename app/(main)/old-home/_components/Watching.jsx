"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Clock, Heart, Film, Tv, Eye } from 'lucide-react';

const WatchingSection = () => {
   const [activeTab, setActiveTab] = useState('binges');

   const binges = [
      {
         title: 'One Piece',
         type: 'Anime',
         image: '/bento/bento-4.webp',
         rating: 10,
         review: "A legendary adventure filled with heart, humor, and epic battles."
      },
      {
         title: 'Money Heist',
         type: 'TV Series',
         image: '/watch/money-heist.jpeg',
         rating: 9.5,
         review: "Thrilling heist drama with unforgettable characters and twists."
      },
      {
         title: 'Rang De Basanti',
         type: 'Movie',
         image: '/watch/rang-de-basanti.avif',
         rating: 9.4,
         review: "A powerful story that blends history, rebellion, and friendship."
      },
      {
         title: 'Our Beloved Summer',
         type: 'K-Drama',
         image: '/watch/our-beloved-summer.webp',
         rating: 9.6,
         review: "A beautifully crafted romance filled with nostalgia and charm."
      },
   ];

   const currentWatch = [
      {
         title: 'One Piece',
         type: 'Anime',
         image: '/bento/bento-4.webp',
         progress: '50%',
         nextEpisode: 'Episode 1122'
      },
      {
         title: 'Supernatural',
         type: 'TV Series',
         image: '/watch/supernatural.jpeg',
         progress: '20%',
         nextEpisode: 'Season 2, Episode 10'
      },
      {
         title: 'First Frost',
         type: 'K-Drama',
         image: '/watch/first-frost.webp',
         progress: '95%',
         nextEpisode: 'Episode 31'
      },
   ];

   const getTypeIcon = (type) => {
      switch (type) {
         case 'Anime': return <Film className="h-4 w-4" />;
         case 'TV Series': return <Tv className="h-4 w-4" />;
         case 'Movie': return <Film className="h-4 w-4" />;
         case 'K-Drama': return <Tv className="h-4 w-4" />;
         default: return <Film className="h-4 w-4" />;
      }
   };

   const renderStars = (rating) => {
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating - fullStars >= 0.5;
      const stars = [];

      for (let i = 0; i < fullStars; i++) {
         stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
      }

      if (hasHalfStar) {
         stars.push(<Star key="half" className="h-4 w-4 text-yellow-400" />);
      }

      const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
      for (let i = 0; i < remainingStars; i++) {
         stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
      }

      return stars;
   };

   return (
      <div className="bg-gradient-to-b from-base-100 to-base-200 py-16 text-primary-content">
         <div className="text-center px-6 max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-base-content uppercase font-oswald tracking-wider">
               <span className="inline-block animate-pulse">🎬</span> My Cinematic Journey
            </h2>
            <p className="mt-4 text-sm sm:text-lg opacity-90 font-noto">
               Dive into my world of stories that have moved, thrilled, and inspired me.
            </p>
         </div>

         {/* Tab Switcher */}
         <div className="flex justify-center mt-8">
            <div className="tabs tabs-boxed bg-base-300 p-1">
               <button
                  className={`tab px-6 py-2 transition-all duration-300 ${activeTab === 'binges' ? 'tab-active bg-primary text-white font-medium rounded-lg' : ''}`}
                  onClick={() => setActiveTab('binges')}
               >
                  <Heart className={`h-4 w-4 mr-2 inline ${activeTab === 'binges' ? 'fill-white' : ''}`} />
                  Favorites
               </button>
               <button
                  className={`tab px-6 py-2 transition-all duration-300 ${activeTab === 'current' ? 'tab-active bg-primary text-white font-medium rounded-lg' : ''}`}
                  onClick={() => setActiveTab('current')}
               >
                  <Clock className="h-4 w-4 mr-2 inline" />
                  Currently Watching
               </button>
            </div>
         </div>

         <div className="mt-8 max-w-6xl mx-auto px-4">
            {activeTab === 'binges' && (
               <div className="animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                     {binges.map((item, index) => (
                        <div key={index} className="bg-base-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                           <div className="relative h-48 sm:h-56">
                              <Image
                                 src={item.image}
                                 alt={item.title}
                                 fill
                                 className="object-cover"
                              />
                              <div className="absolute top-2 right-2 bg-black/70 rounded-full px-2 py-1 text-xs flex items-center">
                                 <span className="text-yellow-400 font-bold mr-1">{item.rating}</span>
                                 <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                                 <div className="flex items-center">
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/80 text-white">
                                       {getTypeIcon(item.type)}
                                       <span className="ml-1">{item.type}</span>
                                    </span>
                                 </div>
                              </div>
                           </div>
                           <div className="p-4">
                              <h3 className="font-bold text-lg text-base-content">{item.title}</h3>
                              <div className="flex mt-1 mb-2">
                                 {renderStars(item.rating)}
                              </div>
                              <p className="text-sm opacity-80 italic">"{item.review}"</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            )}

            {activeTab === 'current' && (
               <div className="animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                     {currentWatch.map((item, index) => (
                        <div key={index} className="bg-base-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                           <div className="relative h-48 sm:h-56">
                              <Image
                                 src={item.image}
                                 alt={item.title}
                                 fill
                                 className="object-cover"
                              />

                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                                 <div className="flex items-center">
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/80 text-white">
                                       {getTypeIcon(item.type)}
                                       <span className="ml-1">{item.type}</span>
                                    </span>
                                 </div>
                              </div>
                           </div>
                           <div className="p-4">
                              <h3 className="font-bold text-lg text-base-content">{item.title}</h3>
                              <div className="mt-3">
                                 <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div className="bg-primary h-2.5 rounded-full" style={{ width: item.progress }}></div>
                                 </div>
                                 <div className="flex justify-between mt-2 text-sm opacity-80">
                                    <span>{item.progress} complete</span>
                                    <span>Up next: {item.nextEpisode}</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            )}
         </div>

         {/* Call to Action */}
         <div className="text-center mt-12">
            <Link
               href="/watchlist"
               className="group relative inline-flex items-center px-8 py-3 overflow-hidden rounded-lg bg-primary text-white shadow-md transition-all hover:bg-primary-focus"
            >
               <span className="absolute right-0 translate-x-full group-hover:-translate-x-4 transition-transform">
                  <Film className="h-5 w-5" />
               </span>
               <span className="mr-3 group-hover:mr-6 transition-all">Explore My Complete Collection</span>
            </Link>
            <p className="mt-3 text-sm opacity-70">Discover 50+ shows and movies I've watched and rated</p>
         </div>

         <style jsx global>{`
       
      `}</style>
      </div>
   );
};

export default WatchingSection;