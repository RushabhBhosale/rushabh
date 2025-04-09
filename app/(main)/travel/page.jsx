"use client"
import { useState } from "react"

export default function Home() {
   const [location, setLocation] = useState("")
   const [days, setDays] = useState(3)
   const [loading, setLoading] = useState(false)
   const [itinerary, setItinerary] = useState([])

   const generate = async () => {
      setLoading(true)
      const res = await fetch("/api/generate-itinerary", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ location, days }),
      })

      const data = await res.json()
      setItinerary(data.itinerary || [])
      setLoading(false)
   }

   return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-teal-50 text-gray-800">
         {/* Hero Section */}
         <section className="relative bg-cover bg-center h-screen" style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
               <h1 className="text-5xl font-bold">Plan Your Dream Trip</h1>
               <p className="mt-4 text-lg">Let AI craft the perfect itinerary for you</p>
               <button
                  onClick={() => document.getElementById('itinerary-input').scrollIntoView({ behavior: 'smooth' })}
                  className="mt-6 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg shadow-md"
               >
                  Get Started
               </button>
            </div>
         </section>

         {/* Itinerary Input Section */}
         <section id="itinerary-input" className="py-12">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
               <h2 className="text-2xl font-bold text-center mb-6">Create Your Itinerary</h2>
               <div className="space-y-4">
                  <div className="flex items-center border-b border-teal-500 py-2">
                     <span className="text-teal-500 text-lg mr-3">📍</span>
                     <input
                        type="text"
                        placeholder="Enter destination"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                     />
                  </div>
                  <div className="flex items-center border-b border-teal-500 py-2">
                     <span className="text-teal-500 text-lg mr-3">📆</span>
                     <input
                        type="number"
                        min="1"
                        placeholder="Number of days"
                        value={days}
                        onChange={(e) => setDays(parseInt(e.target.value))}
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                     />
                  </div>
                  <div className="text-center">
                     <button
                        onClick={generate}
                        disabled={loading}
                        className="mt-4 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg shadow-md"
                     >
                        {loading ? 'Planning...' : 'Generate Itinerary'}
                     </button>
                  </div>
               </div>
            </div>
         </section>

         {/* Itinerary Display Section */}
         {itinerary.length > 0 && (
            <section className="py-12">
               <div className="max-w-4xl mx-auto">
                  <h2 className="text-2xl font-bold text-center mb-6">Your Itinerary</h2>
                  <div className="space-y-6">
                     {itinerary.map((day) => (
                        <div key={day.day} className="bg-white p-6 rounded-lg shadow-lg">
                           <h3 className="text-xl font-semibold">Day {day.day}: {day.title}</h3>
                           <ul className="mt-4 space-y-2">
                              {day.activities.map((activity, index) => (
                                 <li key={index} className="flex items-start">
                                    <span className="text-teal-500 mr-2">✔️</span>
                                    <p>{activity}</p>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     ))}
                  </div>
               </div>
            </section>
         )}
      </main>
   )
}