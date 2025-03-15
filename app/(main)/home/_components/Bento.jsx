import React from 'react';
import Image from 'next/image';
import { FaAngular, FaNodeJs, FaReact, FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { RiNextjsLine } from "react-icons/ri";
import { SiExpress, SiTailwindcss, SiTypescript } from "react-icons/si";
import { DiMongodb } from "react-icons/di";
import { BsBriefcase } from "react-icons/bs";
import { MdOutlineSchool } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa6";

const Bento = () => {
   const skills = [
      { icon: <FaReact className="text-xl" />, name: "React" },
      { icon: <RiNextjsLine className="text-xl" />, name: "Next.js" },
      { icon: <FaNodeJs className="text-xl" />, name: "Node.js" },
      { icon: <DiMongodb className="text-xl" />, name: "MongoDB" },
      { icon: <FaAngular className="text-xl" />, name: "Angular" },
      { icon: <SiExpress className="text-xl" />, name: "Express" },
      { icon: <SiTailwindcss className="text-xl" />, name: "Tailwind" },
      { icon: <SiTypescript className="text-xl" />, name: "TypeScript" },
   ];

   const socialProfiles = [
      { icon: <FaLinkedinIn size={20} />, url: "https://linkedin.com/in/yourprofile", name: "LinkedIn" },
      { icon: <FaGithub size={20} />, url: "https://github.com/yourusername", name: "GitHub" },
      { icon: <FaInstagram size={20} />, url: "https://instagram.com/yourusername", name: "Instagram" },
      { icon: <FaBriefcase size={20} />, url: "https://instagram.com/yourusername", name: "Portfolio" },
   ];

   return (
      <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
         <div className="grid grid-cols-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-5">
            <div className="col-span-2 sm:col-span-6 md:col-span-4 lg:col-span-4 row-span-1 lg:row-span-2 rounded-3xl bg-gradient-to-br from-secondary-content to-orange-500 p-4 sm:p-6 flex flex-col justify-center items-center relative overflow-hidden group hover:scale-[1.005] transition-all duration-200">
               <div className="relative z-10 flex flex-col items-center">
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 mb-4">
                     <Image
                        src="/bento/bento-3.avif"
                        alt="Profile"
                        fill
                        className="object-cover rounded-full border-4 border-white/20 shadow-lg"
                     />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 text-center">Rushabh Bhosale</h3>
                  <p className="text-white/90 text-base sm:text-lg mb-3 text-center">Full Stack Developer</p>
                  <div className="flex mt-2 sm:mt-4 gap-2 sm:gap-4 flex-wrap justify-center">
                     {socialProfiles.map((profile, index) => (
                        <a
                           key={index}
                           href={profile.url}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="bg-white/20 hover:bg-white/30 p-2 sm:p-3 rounded-xl text-white transition-all flex items-center gap-2"
                        >
                           {profile.icon}
                           <span className="text-xs sm:text-sm">{profile.name}</span>
                        </a>
                     ))}
                  </div>
               </div>
            </div>

            <div className="col-span-2 sm:col-span-6 md:col-span-4 lg:col-span-5 rounded-3xl bg-gradient-to-r from-blue-500 to-cyan-500 p-4 sm:p-6 flex flex-col justify-center hover:scale-[1.005] transition-all duration-200">
               <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">Passionate Developer</h3>
               <p className="text-white/90 text-base sm:text-lg">Building beautiful digital experiences with cutting-edge web technologies and creative solutions.</p>
            </div>

            <div className="col-span-2 sm:col-span-6 md:col-span-4 lg:col-span-3 rounded-3xl bg-zinc-800 p-4 sm:p-5 hover:scale-[1.005] transition-all duration-200">
               <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Skills</h3>
               <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3">
                  {skills.slice(0, 6).map((skill, index) => (
                     <div
                        key={index}
                        className="flex items-center p-2 sm:p-3 rounded-xl bg-white/10 hover:bg-white/15 transition-all"
                     >
                        <span className="text-white mr-2">{skill.icon}</span>
                        <span className="text-xs sm:text-sm text-white">{skill.name}</span>
                     </div>
                  ))}
               </div>
            </div>

            <div className="col-span-2 sm:col-span-6 md:col-span-4 lg:col-span-5 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-4 sm:p-5 hover:scale-[1.005] transition-all duration-200">
               <div className="flex items-center mb-2 sm:mb-3">
                  <BsBriefcase className="text-lg sm:text-xl text-white mr-2" />
                  <h3 className="text-lg sm:text-xl font-bold text-white">Work Experience</h3>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <div className="bg-white/10 p-3 rounded-xl">
                     <h4 className="font-bold text-white text-sm sm:text-base">Senior Frontend Developer</h4>
                     <p className="text-white/80 text-xs sm:text-sm">Tech Innovations Inc.</p>
                     <p className="text-white/70 text-xs sm:text-sm">2022 - Present</p>
                     <p className="text-white/90 text-xs sm:text-sm mt-2">Lead React development team for enterprise applications</p>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl">
                     <h4 className="font-bold text-white text-sm sm:text-base">Full Stack Developer</h4>
                     <p className="text-white/80 text-xs sm:text-sm">Digital Solutions Ltd.</p>
                     <p className="text-white/70 text-xs sm:text-sm">2019 - 2022</p>
                     <p className="text-white/90 text-xs sm:text-sm mt-2">Built responsive web applications using MERN stack</p>
                  </div>
               </div>
            </div>

            <div className="col-span-2 sm:col-span-6 md:col-span-4 lg:col-span-3 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-600 p-4 sm:p-5 hover:scale-[1.005] transition-all duration-200">
               <div className="flex items-center mb-2 sm:mb-3">
                  <MdOutlineSchool className="text-lg sm:text-xl text-white mr-2" />
                  <h3 className="text-lg sm:text-xl font-bold text-white">Education</h3>
               </div>
               <div className="space-y-2 sm:space-y-3">
                  <div className="bg-white/10 p-3 rounded-xl">
                     <h4 className="font-bold text-white text-sm sm:text-base">Master of Computer Science</h4>
                     <p className="text-white/80 text-xs sm:text-sm">Tech University, 2017</p>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl">
                     <h4 className="font-bold text-white text-sm sm:text-base">AWS Certified Developer</h4>
                     <p className="text-white/80 text-xs sm:text-sm">Amazon Web Services, 2023</p>
                  </div>
               </div>
            </div>

            <div className="col-span-1 sm:col-span-3 md:col-span-4 lg:col-span-4 rounded-3xl overflow-hidden relative group h-48 sm:h-56 md:h-64 hover:scale-[1.005] transition-all duration-200">
               <Image
                  src="/bento/bento-2.jpg"
                  alt="Anime"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
               <div className="absolute bottom-0 left-0 p-3 sm:p-5">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">Anime Enthusiast</h3>
                  <p className="text-white/90 text-sm sm:text-lg">Exploring captivating stories and artistic worlds</p>
               </div>
            </div>

            <div className="col-span-1 sm:col-span-3 md:col-span-8 lg:col-span-4 rounded-3xl overflow-hidden relative group h-48 sm:h-56 md:h-64 hover:scale-[1.005] transition-all duration-200">
               <Image
                  src="/bento/bento-1.avif"
                  alt="Travel"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
               <div className="absolute bottom-0 left-0 p-3 sm:p-5">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">World Explorer</h3>
                  <p className="text-white/90 text-sm sm:text-lg">Discovering new cultures and adventures</p>
               </div>
            </div>

            <div className="col-span-2 sm:col-span-6 md:col-span-8 lg:col-span-4 rounded-3xl bg-gradient-to-r from-amber-500 to-orange-600 p-4 sm:p-6 flex flex-col justify-between hover:scale-[1.005] transition-all duration-200">
               <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">Featured Projects</h3>
                  <p className="text-white/90 text-sm sm:text-base mb-3 sm:mb-4">Check out some of my recent work</p>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <div className="bg-white/10 p-3 rounded-xl">
                     <h4 className="font-bold text-white text-sm sm:text-base">E-commerce Platform</h4>
                     <p className="text-white/80 text-xs sm:text-sm">Next.js, MongoDB</p>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl">
                     <h4 className="font-bold text-white text-sm sm:text-base">AI Dashboard</h4>
                     <p className="text-white/80 text-xs sm:text-sm">React, Node.js</p>
                  </div>
               </div>
               <button className="bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg mt-3 sm:mt-4 transition-colors self-start text-sm sm:text-base">
                  View All Projects →
               </button>
            </div>
         </div>
      </div>
   );
};

export default Bento;