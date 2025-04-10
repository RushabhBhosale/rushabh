"use client"
import { useState } from "react"
import axios from "axios"

export default function GenerateTestCase() {
   const [code, setCode] = useState("")
   const [framework, setFramework] = useState("jest")
   const [language, setLanguage] = useState("javascript")
   const [testType, setTestType] = useState("unit")
   const [generatedTest, setGeneratedTest] = useState("")
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState("")

   const handleSubmit = async (e) => {
      e.preventDefault()
      setLoading(true)
      setError("")

      try {
         const response = await axios.post("/api/deepseek/test-case-generator", {
            code,
            framework,
            language,
            testType,
         })

         const data = response.data

         if (data.testCode) {
            setGeneratedTest(data.testCode)
         } else {
            setError("Failed to generate test case.")
         }
      } catch (err) {
         setError("An error occurred.")
      } finally {
         setLoading(false)
      }
   }

   return (
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-base-200 rounded-xl space-y-6">
         <h2 className="text-xl font-bold text-center">🧪 Test Case Generator</h2>

         <form onSubmit={handleSubmit} className="space-y-5">
            <textarea
               className="textarea textarea-bordered w-full"
               rows={6}
               placeholder="Paste your code here..."
               value={code}
               onChange={(e) => setCode(e.target.value)}
            />

            <div className="space-y-3">
               <div className="flex justify-between">
                  <label htmlFor="framework" className="text-lg">Test Framework</label>
                  <select
                     id="framework"
                     className="select select-bordered w-1/2"
                     value={framework}
                     onChange={(e) => setFramework(e.target.value)}
                  >
                     <option value="jest">Jest</option>
                     <option value="mocha">Mocha</option>
                     <option value="chai">Chai</option>
                  </select>
               </div>

               <div className="flex justify-between">
                  <label htmlFor="language" className="text-lg">Language</label>
                  <select
                     id="language"
                     className="select select-bordered w-1/2"
                     value={language}
                     onChange={(e) => setLanguage(e.target.value)}
                  >
                     <option value="javascript">JavaScript</option>
                     <option value="typescript">TypeScript</option>
                  </select>
               </div>

               <div className="flex justify-between">
                  <label htmlFor="testType" className="text-lg">Test Type</label>
                  <select
                     id="testType"
                     className="select select-bordered w-1/2"
                     value={testType}
                     onChange={(e) => setTestType(e.target.value)}
                  >
                     <option value="unit">Unit Test</option>
                     <option value="integration">Integration Test</option>
                  </select>
               </div>
            </div>

            <button
               type="submit"
               className="btn btn-primary w-full"
               disabled={loading}
            >
               {loading ? "Generating..." : "Generate Test Case"}
            </button>
         </form>

         {error && <p className="text-red-400">{error}</p>}

         {generatedTest && (
            <div className="mockup-code whitespace-pre-wrap">
               <pre className="mt-2">
                  <code>{generatedTest}</code>
               </pre>
            </div>
         )}
      </div>
   )
}
