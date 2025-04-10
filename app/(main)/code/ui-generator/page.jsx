"use client"
import { useState } from "react"
import axios from "axios"

export default function GenerateComponent() {
   const [prompt, setPrompt] = useState("")
   const [framework, setFramework] = useState("react")
   const [styling, setStyling] = useState("tailwind")
   const [generatedCode, setGeneratedCode] = useState("")
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState("")

   const handleSubmit = async (e) => {
      e.preventDefault()
      setLoading(true)
      setError("")

      try {
         const response = await axios.post("/api/deepseek/ui-generator", {
            prompt,
            framework,
            styling,
         })

         const data = response.data

         if (data.componentCode) {
            setGeneratedCode(data.componentCode)
            renderPreview(data.componentCode)
         } else {
            setError("Failed to generate component.")
         }
      } catch (err) {
         setError("An error occurred.")
      } finally {
         setLoading(false)
      }
   }

   const renderPreview = (code) => {
      try {
         // Create a sandbox iframe to render the component dynamically
         const iframe = document.createElement("iframe")
         iframe.style.width = "100%"
         iframe.style.height = "200px"
         iframe.style.border = "1px solid #ddd"
         document.body.appendChild(iframe)

         const iframeDoc = iframe.contentWindow.document
         iframeDoc.open()
         iframeDoc.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
               <meta charset="UTF-8">
               <meta name="viewport" content="width=device-width, initial-scale=1.0">
               <title>Preview</title>
            </head>
            <body>
               <div id="app"></div>
               <script src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
               <script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
               <script>
                  const App = () => {
                     ${code} // Render the generated code dynamically
                  }
                  ReactDOM.render(React.createElement(App), document.getElementById('app'))
               </script>
            </body>
            </html>
         `)
         iframeDoc.close()
      } catch (err) {
         console.error("Error rendering preview:", err)
      }
   }

   return (
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-base-200 rounded-xl space-y-6">
         <h2 className="text-xl font-bold text-center">🔨 Component Generator</h2>

         <form onSubmit={handleSubmit} className="space-y-5">
            <div>
               <label htmlFor="prompt" className="text-lg">Enter Component Prompt</label>
               <textarea
                  id="prompt"
                  className="textarea textarea-bordered w-full"
                  placeholder="Describe the component you want to generate"
                  rows={6}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
               />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
               <div>
                  <label htmlFor="framework" className="text-lg">Framework</label>
                  <select
                     id="framework"
                     className="select select-bordered w-full"
                     value={framework}
                     onChange={(e) => setFramework(e.target.value)}
                  >
                     <option value="react">React</option>
                     <option value="vue">Vue</option>
                     <option value="angular">Angular</option>
                  </select>
               </div>

               <div>
                  <label htmlFor="styling" className="text-lg">Styling Method</label>
                  <select
                     id="styling"
                     className="select select-bordered w-full"
                     value={styling}
                     onChange={(e) => setStyling(e.target.value)}
                  >
                     <option value="tailwind">Tailwind CSS</option>
                     <option value="css">CSS</option>
                     <option value="styled-components">Styled Components</option>
                     <option value="styled-components">Shad Cn</option>
                     <option value="styled-components">Daisy ui</option>
                     <option value="styled-components">Rsuite</option>
                     <option value="styled-components">Material Ui</option>
                     <option value="styled-components">Bootstrap</option>
                  </select>
               </div>
            </div>

            <button
               type="submit"
               className="btn btn-primary w-full"
               disabled={loading}
            >
               {loading ? "Generating..." : "Generate Component"}
            </button>
         </form>

         {error && <p className="text-red-400">{error}</p>}

         {generatedCode && (
            <div className="space-y-6">
               <div className="mockup-code whitespace-pre-wrap">
                  <pre className="mt-2">
                     <code>{generatedCode}</code>
                  </pre>
               </div>
            </div>
         )}
      </div>
   )
}
