import React from 'react';
import Image from 'next/image';
import { FaAngular, FaNodeJs, FaReact, FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { RiNextjsLine } from "react-icons/ri";
import { SiExpress, SiTailwindcss, SiTypescript } from "react-icons/si";
import { DiMongodb } from "react-icons/di";
import { BsBriefcase } from "react-icons/bs";
import { MdOutlineSchool } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa6";
import Link from 'next/link';

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
      { icon: <FaInstagram size={20} />, url: "https://instagram.com/yourusername", name: "Instagram" },
      { icon: <FaBriefcase size={20} />, url: "https://instagram.com/yourusername", name: "Portfolio" },
      { icon: <FaGithub size={20} />, url: "https://github.com/yourusername", name: "GitHub" },
   ];

   return (
      <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 py-8 sm:py-16 bg-base-100">
         <div className="grid grid-cols-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-5">
            <div className="col-span-2 sm:col-span-6 md:col-span-4 lg:col-span-4 row-span-1 lg:row-span-2 rounded-box bg-primary/80 p-4 sm:p-6 flex flex-col justify-center items-center relative overflow-hidden group hover:scale-[1.009] transition-all duration-200">
               <div className="text-center z-10">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-content mb-3 font-oswald">Rushabh Bhosale</h2>
                  <p className="text-xl sm:text-2xl text-primary-content mb-4 opacity-90">Full Stack Developer</p>
                  <p className="text-sm sm:text-base text-primary-content opacity-80 max-w-md mx-auto mb-6 font-noto">
                     Crafting exceptional digital experiences with modern web technologies and creative problem-solving.
                  </p>
                  <button className="btn btn-secondary text-secondary-content py-2 px-6 rounded-full font-medium hover:bg-opacity-90 transition-colors">
                     Lets Talk
                  </button>
               </div>
               <div className="absolute -bottom-20 -right-20 md:w-64 md:h-64 w-40 h-40 bg-accent rounded-full opacity-20 animate-float" style={{ "--rotation": "5deg" }}></div>
               <div className="absolute md:-top-20 md:-left-20 -left-12 -top-12 md:w-48 md:h-48 w-32 h-32 bg-secondary rounded-full opacity-20 animate-float" style={{ "--rotation": "-5deg" }}></div>
            </div>

            <div className="col-span-2 sm:col-span-6 md:col-span-4 lg:col-span-5 rounded-box bg-gradient-to-r from-secondary to-accent p-4 sm:p-6 flex flex-col justify-center hover:scale-[1.009] transition-all duration-200">
               <div className="flex flex-col sm:flex-row items-center">
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 mb-4 sm:mb-0 sm:mr-6">
                     <Image
                        src="/bento/bento-3.avif"
                        alt="Profile"
                        fill
                        className="object-cover rounded-full border-4 border-base-300 shadow-lg"
                     />
                  </div>
                  <div className="flex flex-col">
                     <h3 className="text-xl sm:text-2xl font-bold text-secondary-content mb-3 text-center sm:text-left font-oswald">Connect With Me</h3>
                     <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
                        {socialProfiles.map((profile, index) => (
                           <a
                              key={index}
                              href={profile.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-base-100 bg-opacity-30 hover:bg-opacity-50 p-2 sm:p-3 rounded-box text-secondary-content transition-all flex items-center gap-2"
                           >
                              {profile.icon}
                              <span className="text-xs sm:text-sm font-noto">{profile.name}</span>
                           </a>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            <div className="col-span-2 sm:col-span-6 md:col-span-4 lg:col-span-3 rounded-box bg-neutral p-4 sm:p-5 hover:scale-[1.009] transition-all duration-200">
               <h3 className="text-lg sm:text-xl font-bold text-neutral-content mb-2 sm:mb-3 font-oswald">Skills</h3>
               <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3">
                  {skills.slice(0, 6).map((skill, index) => (
                     <div
                        key={index}
                        className="flex items-center p-2 sm:p-3 rounded-box bg-base-100 bg-opacity-10 hover:bg-opacity-20 transition-all"
                     >
                        <span className="text-black mr-2">{skill.icon}</span>
                        <span className="text-xs sm:text-sm text-black font-noto">{skill.name}</span>
                     </div>
                  ))}
               </div>
            </div>

            <div className="col-span-2 sm:col-span-6 md:col-span-4 lg:col-span-5 rounded-box bg-gradient-to-r from-info to-success p-4 sm:p-5 hover:scale-[1.009] transition-all duration-200">
               <div className="flex items-center mb-2 sm:mb-3">
                  <BsBriefcase className="text-lg sm:text-xl text-info-content mr-2" />
                  <h3 className="text-lg sm:text-xl font-bold text-info-content font-oswald">Work Experience</h3>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <div className="bg-base-100 bg-opacity-10 p-3 rounded-box">
                     <h4 className="font-bold text-info-content text-sm sm:text-base font-oswald">Software Developer</h4>
                     <p className="text-info-content opacity-80 text-xs sm:text-sm font-noto">Peracto Infotech Pvt Ltd.</p>
                     <p className="text-info-content opacity-70 text-xs sm:text-sm font-noto">Apr 2024 – Present</p>
                     <p className="text-info-content opacity-90 text-xs sm:text-sm mt-2 font-noto">Build web and mobile applications with the latest technologies and best practices</p>
                  </div>
                  <div className="bg-base-100 bg-opacity-10 p-3 rounded-box">
                     <h4 className="font-bold text-info-content text-sm sm:text-base font-oswald">MERN Stack Developer</h4>
                     <p className="text-info-content opacity-80 text-xs sm:text-sm font-noto">TechKendr</p>
                     <p className="text-info-content opacity-70 text-xs sm:text-sm font-noto">Oct 2023 – Mar 2024</p>
                     <p className="text-info-content opacity-90 text-xs sm:text-sm mt-2 font-noto">Developed and maintained full-stack applications using the MERN stack</p>
                  </div>
                  <div className="bg-base-100 bg-opacity-10 md:hidden p-3 rounded-box">
                     <h4 className="font-bold text-info-content text-sm sm:text-base font-oswald">Digital Marketing Executive</h4>
                     <p className="text-info-content opacity-80 text-xs sm:text-sm font-noto">SNK Web Solutions</p>
                     <p className="text-info-content opacity-70 text-xs sm:text-sm font-noto">Mar 2023 – Aug 2023</p>
                     <p className="text-info-content opacity-90 text-xs sm:text-sm mt-2 font-noto">Managed digital marketing campaigns and SEO strategies</p>
                  </div>
                  <div className="bg-base-100 bg-opacity-10 md:hidden p-3 rounded-box">
                     <h4 className="font-bold text-info-content text-sm sm:text-base font-oswald">SEO Intern</h4>
                     <p className="text-info-content opacity-80 text-xs sm:text-sm font-noto">FinPlus E-commerce Solutions LLP</p>
                     <p className="text-info-content opacity-70 text-xs sm:text-sm font-noto">Apr 2022 – Jun 2022</p>
                     <p className="text-info-content opacity-90 text-xs sm:text-sm mt-2 font-noto">Assisted in optimizing e-commerce platforms for search engines</p>
                  </div>
               </div>
            </div>


            <div className="col-span-2 sm:col-span-6 md:col-span-4 lg:col-span-3 rounded-box bg-warning p-4 sm:p-5 hover:scale-[1.009] transition-all duration-200">
               <div className="flex items-center mb-2 sm:mb-3">
                  <MdOutlineSchool className="text-lg sm:text-xl text-warning-content mr-2" />
                  <h3 className="text-lg sm:text-xl font-bold text-warning-content font-oswald">Education</h3>
               </div>
               <div className="space-y-2 sm:space-y-3">
                  <div className="bg-base-100 bg-opacity-10 p-3 rounded-box">
                     <h4 className="font-bold text-warning-content text-sm sm:text-base font-oswald">BAMMC</h4>
                     <p className="text-warning-content opacity-80 text-xs sm:text-sm font-noto">Guru Nanak Khalsa, 2020 - 2023</p>
                  </div>
                  <div className="bg-base-100 bg-opacity-10 p-3 rounded-box">
                     <h4 className="font-bold text-warning-content text-sm sm:text-base font-oswald">Web Development</h4>
                     <p className="text-warning-content opacity-80 text-xs sm:text-sm font-noto">Self taught YouTube University since 2020</p>
                  </div>
               </div>
            </div>

            <div className="col-span-1 sm:col-span-3 md:col-span-4 lg:col-span-4 rounded-box overflow-hidden relative group h-48 sm:h-56 md:h-64 hover:scale-[1.009] transition-all duration-200">
               <Image
                  src="/bento/bento-4.webp"
                  alt="Anime"
                  fill
                  className="object-cover transition-transform group-hover:scale-[1.009]"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80"></div>
               <div className="absolute bottom-0 text-white left-0 p-3 sm:p-5">
                  <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 font-oswald">Anime Enthusiast</h3>
                  <p className="opacity-90 text-shadow-black text-sm sm:text-lg font-noto">Watched over 140+ anime series, exploring diverse genres and captivating stories.</p>
               </div>
            </div>

            <div className="col-span-1 sm:col-span-3 md:col-span-8 lg:col-span-4 rounded-box overflow-hidden relative group h-48 sm:h-56 md:h-64 hover:scale-[1.009] transition-all duration-200">
               <Image
                  src="/bento/bento-1.avif"
                  alt="Travel"
                  fill
                  className="object-cover transition-transform group-hover:scale-[1.009]"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80"></div>
               <div className="absolute bottom-0 text-white left-0 p-3 sm:p-5">
                  <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 font-oswald">Travel Explorer</h3>
                  <p className="opacity-90 text-shadow-black text-sm sm:text-lg font-noto">Visited multiple places, experiencing new cultures and breathtaking landscapes.</p>
               </div>
            </div>

            <div className="col-span-2 sm:col-span-6 md:col-span-8 lg:col-span-4 rounded-box bg-gradient-to-r from-accent to-primary p-4 sm:p-6 flex flex-col justify-between hover:scale-[1.009] transition-all duration-200">
               <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-accent-content mb-1 sm:mb-2 font-oswald">Featured Projects</h3>
                  <p className="text-accent-content opacity-90 text-sm sm:text-base mb-3 sm:mb-4 font-noto">Check out some of my recent work</p>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <Link href="https://sparkly-babka-1f1489.netlify.app/">
                     <div className="bg-base-100 bg-opacity-10 p-3 rounded-box">
                        <h4 className="font-bold text-accent-content text-sm sm:text-base font-oswald">Movie Db</h4>
                        <p className="text-accent-content opacity-80 text-xs sm:text-sm font-noto">Next.js, MongoDb</p>
                     </div>
                  </Link>
                  <Link href="https://best-ecommerce.netlify.app/">
                     <div className="bg-base-100 bg-opacity-10 p-3 rounded-box">
                        <h4 className="font-bold text-accent-content text-sm sm:text-base font-oswald">Ecommerce Store</h4>
                        <p className="text-accent-content opacity-80 text-xs sm:text-sm font-noto">React, Firebase</p>
                     </div>
                  </Link>
               </div>
               <button className="bg-white text-black py-2 px-4 rounded-lg mt-3 sm:mt-4 transition-colors self-start text-sm sm:text-base hover:bg-gray-200">
                  View All Projects →
               </button>
            </div>
         </div>
      </div>
   );
};

export default Bento;