"use client"
import { useState } from "react"
import axios from "axios"

const schemaTypes = ["mongoose", "prisma", "zod", "sequelize", "sql"]

export default function SchemaGenerator() {
   const [description, setDescription] = useState("")
   const [type, setType] = useState("mongoose")
   const [schemaCode, setSchemaCode] = useState("")
   const [loading, setLoading] = useState(false)

   const generateSchema = async () => {
      setLoading(true)
      try {
         const res = await axios.post("/api/deepseek/generate-schema", { description, type })
         setSchemaCode(res.data.schemaCode)
      } catch (err) {
         setSchemaCode("❌ Error generating schema.")
         console.error(err.message)
      } finally {
         setLoading(false)
      }
   }

   return (
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-base-200 rounded-xl space-y-6">
         <h2 className="text-xl font-bold text-center">🧠 Backend Schema Generator</h2>

         <textarea
            className="textarea textarea-bordered w-full"
            rows={4}
            placeholder="Describe your schema like: User with name, email, password, createdAt..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
         />

         <select
            className="select select-bordered w-full"
            value={type}
            onChange={(e) => setType(e.target.value)}
         >
            {schemaTypes.map((t) => (
               <option key={t} value={t}>{t.toUpperCase()}</option>
            ))}
         </select>

         <button
            className="btn btn-primary w-full"
            onClick={generateSchema}
            disabled={loading || !description}
         >
            ⚙️ {loading ? "Generating..." : "Generate Schema"}
         </button>

         {schemaCode && (
            <div className="mockup-code whitespace-pre-wrap">
               {schemaCode.split("\n").map((line, i) => (
                  <pre key={i} data-prefix=">"><code>{line}</code></pre>
               ))}
            </div>
         )}
      </div>
   )
}
