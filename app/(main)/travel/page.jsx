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
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-teal-50 text-gray-800 flex items-center justify-center px-4 py-8">
         <div className="w-full max-w-2xl space-y-6">
            {/* Header */}
            <div className="text-center space-y-1">
               <h1 className="text-3xl font-bold tracking-tight text-gray-900">🧳 AI Trip Planner</h1>
               <p className="text-gray-500 text-sm">Your journey, pass-style!</p>
            </div>

            {/* Input Form */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 space-y-3">
               <input
                  className="w-full p-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm placeholder-gray-400"
                  placeholder="Where to? (e.g. Japan)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
               />
               <input
                  type="number"
                  min={1}
                  className="w-full p-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm placeholder-gray-400"
                  placeholder="How many days?"
                  value={days}
                  onChange={(e) => setDays(parseInt(e.target.value))}
               />
               <button
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-lg font-medium transition-all duration-200 text-sm shadow-md"
                  onClick={generate}
                  disabled={loading}
               >
                  {loading ? "Planning..." : "Get My Pass"}
               </button>
            </div>

            {/* Travel Pass-Style Itinerary */}
            {itinerary.length > 0 && (
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {itinerary.map((day, idx) => (
                     <div
                        key={idx}
                        className="relative bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-teal-300"
                     >
                        {/* Pass Header */}
                        <div className="bg-teal-600 text-white p-2 flex justify-between items-center">
                           <span className="text-sm font-semibold">Day {day.day}</span>
                           <span className="text-xs bg-white text-teal-600 px-2 py-1 rounded-full">
                              {location}
                           </span>
                        </div>

                        {/* Content */}
                        <div className="p-4 flex flex-col gap-2">
                           {day.image && (
                              <img
                                 src={day.image}
                                 alt={day.title}
                                 className="h-24 w-full object-cover rounded-md"
                              />
                           )}
                           <h2 className="text-lg font-semibold text-gray-900">{day.title}</h2>
                           <ul className="list-none text-gray-600 text-sm space-y-1">
                              {day.activities.map((activity, i) => (
                                 <li key={i} className="flex items-start">
                                    <span className="text-teal-500 mr-1">➤</span> {activity}
                                 </li>
                              ))}
                           </ul>
                        </div>

                        {/* Pass Footer */}
                        <div className="bg-gray-100 p-2 text-center text-xs text-gray-500">
                           Travel Pass #{idx + 1}
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </div>
      </main>
   )
}