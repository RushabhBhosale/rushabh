'use client'
import { useState } from "react"
import axios from "axios"

const units = ["px", "rem", "em", "%", "vh", "vw"]

export default function UnitConverter() {
   const [inputValue, setInputValue] = useState("16")
   const [inputUnit, setInputUnit] = useState("px")
   const [targetUnit, setTargetUnit] = useState("rem")
   const [converted, setConverted] = useState("")

   const handleConvert = async () => {
      const finalValue = isNaN(Number(inputValue)) ? inputValue : `${inputValue}${inputUnit}`

      try {
         const res = await axios.post("/api/convert-css-units", {
            value: finalValue,
            targetUnit,
         })
         setConverted(res.data.converted)
      } catch (err) {
         console.error("Conversion failed:", err.message)
         setConverted("Conversion error ❌")
      }
   }

   return (
      <div className="max-w-md mx-auto mt-10 p-6 rounded-xl bg-base-200 shadow-xl space-y-5">
         <h2 className="text-xl font-bold text-center">🎯 CSS Unit Converter</h2>

         <div className="space-y-3">
            <label className="font-medium">From</label>
            <div className="flex gap-2">
               <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter value"
                  className="input input-bordered w-full"
               />
               <select
                  value={inputUnit}
                  onChange={(e) => setInputUnit(e.target.value)}
                  className="select select-bordered"
               >
                  {units.map((u) => (
                     <option key={u} value={u}>
                        {u.toUpperCase()}
                     </option>
                  ))}
               </select>
            </div>
         </div>

         <div className="space-y-2">
            <label className="font-medium">To</label>
            <select
               value={targetUnit}
               onChange={(e) => setTargetUnit(e.target.value)}
               className="select select-bordered w-full"
            >
               {units.map((u) => (
                  <option key={u} value={u}>
                     {u.toUpperCase()}
                  </option>
               ))}
            </select>
         </div>

         <button className="btn btn-primary w-full mt-2" onClick={handleConvert}>
            🔁 Convert
         </button>

         {converted && (
            <div className="text-center bg-base-100 p-4 rounded-xl border border-base-300">
               <p className="text-sm text-neutral-content">Converted Value</p>
               <p className="text-lg font-semibold">{converted}</p>
            </div>
         )}
      </div>
   )
}
