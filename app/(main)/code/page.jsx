import Link from "next/link";

const tools = [
   { name: "Convert CSS Units", slug: "convert-css-units", description: "Convert between CSS units like px, rem, and vw." },
   { name: "Form Validation", slug: "form-validation", description: "Validate forms with ease." },
   { name: "Generate Schema", slug: "generate-schema", description: "Generate structured data schemas." },
   { name: "JS to TS", slug: "js-to-ts", description: "Convert JavaScript to TypeScript." },
   { name: "Test Case Generator", slug: "test-case-generator", description: "Generate test cases for your code." },
   { name: "UI Generator", slug: "ui-generator", description: "Create UI components quickly." },
];

const Code = () => {
   return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 mb-60 p-2 max-w-6xl mx-auto">
         {tools.map((tool) => {
            console.log("tool", tool)
            return (
               <Link key={tool.slug} href={`code/${tool.slug}`} className="col-span-1">
                  <div className="card bg-base-300 shadow-md hover:shadow-lg transition-all h-40">
                     <div className="card-body p-3">
                        <h2 className="card-title text-lg text-primary-content">{tool.name}</h2>
                        <p className="text-base-content/70 text-base">{tool.description}</p>
                     </div>
                  </div>
               </Link>
            )
         })}
      </div>
   );
};

export default Code;