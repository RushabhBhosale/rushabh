"use client"
import { useState } from "react"
import axios from "axios"

const libs = ["yup", "zod", "react-hook-form"]
const fieldTypes = ["string", "number", "boolean", "email", "password"]
const patternOptions = [
   { label: "None", value: "" },
   { label: "Email", value: "email" },
   { label: "URL", value: "url" },
   { label: "Alphanumeric", value: "alphanumeric" },
   { label: "Password (8+ chars, 1 symbol)", value: "password" },
]

export default function ValidationSchemaGenerator() {
   const [lib, setLib] = useState("yup")
   const [fields, setFields] = useState([
      { name: "email", type: "string", required: true },
   ])
   const [schema, setSchema] = useState("")
   const [loading, setLoading] = useState(false)

   const updateField = (index, key, value) => {
      const updated = [...fields]
      updated[index][key] = value
      setFields(updated)
   }

   const addField = () =>
      setFields([...fields, { name: "", type: "string", required: false }])

   const removeField = (index) =>
      setFields(fields.filter((_, i) => i !== index))

   const generateSchema = async () => {
      setLoading(true)
      try {
         const res = await axios.post("/api/deepseek/form-validation", {
            validationLib: lib,
            language,
            fields,
         })
         setSchema(res.data.schemaCode)
      } catch (err) {
         console.error(err.message)
         setSchema("❌ Error generating schema.")
      } finally {
         setLoading(false)
      }
   }

   return (
      <div className="max-w-[90%] mx-auto mt-10 p-6 rounded-xl bg-base-200 shadow-xl space-y-6">
         <h2 className="text-xl font-bold text-center">✅ Validation Schema Generator</h2>

         <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="font-medium">Select Library</label>
               <select
                  value={lib}
                  onChange={(e) => setLib(e.target.value)}
                  className="select select-bordered w-full"
               >
                  {libs.map((l) => (
                     <option key={l} value={l}>{l.toUpperCase()}</option>
                  ))}
               </select>
            </div>
         </div>

         <div className="space-y-4">
            <label className="font-medium">Define Fields</label>
            {fields.map((field, index) => (
               <div key={index} className="grid grid-cols-12 gap-2 items-center bg-base-100 p-2 rounded-xl">
                  <input type="text" placeholder="Name" className="input input-bordered col-span-2" value={field.name} onChange={(e) => updateField(index, "name", e.target.value)} />
                  <select className="select select-bordered col-span-1" value={field.type} onChange={(e) => updateField(index, "type", e.target.value)}>
                     {fieldTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <input type="number" placeholder="Min" className="input input-bordered col-span-1" value={field.min || ""} onChange={(e) => updateField(index, "min", e.target.value ? parseFloat(e.target.value) : undefined)} />
                  <input type="number" placeholder="Max" className="input input-bordered col-span-1" value={field.max || ""} onChange={(e) => updateField(index, "max", e.target.value ? parseFloat(e.target.value) : undefined)} />
                  <input type="number" placeholder="MinLen" className="input input-bordered col-span-1" value={field.minLength || ""} onChange={(e) => updateField(index, "minLength", e.target.value ? parseInt(e.target.value) : undefined)} />
                  <input type="number" placeholder="MaxLen" className="input input-bordered col-span-1" value={field.maxLength || ""} onChange={(e) => updateField(index, "maxLength", e.target.value ? parseInt(e.target.value) : undefined)} />
                  <select className="select select-bordered col-span-2" value={field.patternType || ""} onChange={(e) => updateField(index, "patternType", e.target.value || undefined)}>
                     {patternOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                  <label className="label cursor-pointer col-span-1">
                     <input type="checkbox" className="checkbox" checked={field.required} onChange={(e) => updateField(index, "required", e.target.checked)} />
                  </label>
                  <button className="btn btn-error btn-sm col-span-1" onClick={() => removeField(index)}>✖</button>
               </div>
            ))}
            <button className="btn btn-secondary w-full" onClick={addField}>➕ Add Field</button>
         </div>


         <button className="btn btn-primary w-full" onClick={generateSchema} disabled={loading}>
            ⚙️ {loading ? "Generating..." : "Generate Schema"}
         </button>

         {schema && (
            <div className="mockup-code whitespace-pre-wrap">
               {schema.split("\n").map((line, idx) => (
                  <pre key={idx} data-prefix=">">
                     <code>{line}</code>
                  </pre>
               ))}
            </div>
         )}
      </div>
   )
}
