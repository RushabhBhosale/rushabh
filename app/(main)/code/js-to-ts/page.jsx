"use client"
import { useState } from "react"
import axios from "axios"

export default function CodeConverter() {
   const [code, setCode] = useState("")
   const [strict, setStrict] = useState(false)
   const [withComments, setWithComments] = useState(false)
   const [convertToAsync, setConvertToAsync] = useState(false)
   const [convertedCode, setConvertedCode] = useState("")
   const [loading, setLoading] = useState(false)

   const convertCode = async () => {
      setLoading(true)
      try {
         const res = await axios.post("/api/deepseek/js-to-ts", {
            code,
            strict,
            withComments,
            convertToAsyncIfNeeded: convertToAsync,
         })
         setConvertedCode(res.data.convertedCode)
      } catch (err) {
         setConvertedCode("❌ Conversion failed.")
         console.error(err.message)
      } finally {
         setLoading(false)
      }
   }

   return (
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-base-200 rounded-xl space-y-6">
         <h2 className="text-xl font-bold text-center">⚡ JavaScript to TypeScript Converter</h2>

         <textarea
            className="textarea textarea-bordered w-full"
            rows={6}
            placeholder="Paste your JavaScript code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
         />

         <div className="space-y-3">
            <label className="label cursor-pointer">
               <span className="label-text">Strict Typing</span>
               <input
                  type="checkbox"
                  className="checkbox"
                  checked={strict}
                  onChange={(e) => setStrict(e.target.checked)}
               />
            </label>

            <label className="label cursor-pointer">
               <span className="label-text">Add Comments</span>
               <input
                  type="checkbox"
                  className="checkbox"
                  checked={withComments}
                  onChange={(e) => setWithComments(e.target.checked)}
               />
            </label>

            <label className="label cursor-pointer">
               <span className="label-text">Convert to Async if Needed</span>
               <input
                  type="checkbox"
                  className="checkbox"
                  checked={convertToAsync}
                  onChange={(e) => setConvertToAsync(e.target.checked)}
               />
            </label>
         </div>

         <button
            className="btn btn-primary w-full"
            onClick={convertCode}
            disabled={loading || !code}
         >
            ⚙️ {loading ? "Converting..." : "Convert to TypeScript"}
         </button>

         {convertedCode && (
            <div className="mockup-code whitespace-pre-wrap">
               {convertedCode.split("\n").map((line, i) => (
                  <pre key={i} data-prefix=">"><code>{line}</code></pre>
               ))}
            </div>
         )}
      </div>
   )
}
