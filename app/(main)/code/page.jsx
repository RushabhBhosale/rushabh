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
         {/* Tool 1 */}
         <Link href={`code/${tools[0].slug}`} className="col-span-1">
            <div className="card bg-base-300 shadow-md hover:shadow-lg transition-all h-40">
               <div className="card-body p-3">
                  <h2 className="card-title text-lg text-primary-content">{tools[0].name}</h2>
                  <p className="text-base-content/70 text-base">{tools[0].description}</p>
               </div>
            </div>
         </Link>

         {/* Tool 2 */}
         <Link href={`code/${tools[1].slug}`} className="col-span-1">
            <div className="card bg-base-300 shadow-md hover:shadow-lg transition-all h-40">
               <div className="card-body p-3">
                  <h2 className="card-title text-lg text-primary-content">{tools[1].name}</h2>
                  <p className="text-base-content/70 text-base">{tools[1].description}</p>
               </div>
            </div>
         </Link>

         {/* Tool 3 */}
         <Link href={`code/${tools[2].slug}`} className="col-span-1">
            <div className="card bg-base-300 shadow-md hover:shadow-lg transition-all h-40">
               <div className="card-body p-3">
                  <h2 className="card-title text-lg text-primary-content">{tools[2].name}</h2>
                  <p className="text-base-content/70 text-base">{tools[2].description}</p>
               </div>
            </div>
         </Link>

         {/* Tool 4 */}
         <Link href={`code/${tools[3].slug}`} className="col-span-1">
            <div className="card bg-base-300 shadow-md hover:shadow-lg transition-all h-40">
               <div className="card-body p-3">
                  <h2 className="card-title text-lg text-primary-content">{tools[3].name}</h2>
                  <p className="text-base-content/70 text-base">{tools[3].description}</p>
               </div>
            </div>
         </Link>

         {/* Tool 5 */}
         <Link href={`code/${tools[4].slug}`} className="col-span-1">
            <div className="card bg-base-300 shadow-md hover:shadow-lg transition-all h-40">
               <div className="card-body p-3">
                  <h2 className="card-title text-lg text-primary-content">{tools[4].name}</h2>
                  <p className="text-base-content/70 text-base">{tools[4].description}</p>
               </div>
            </div>
         </Link>

         {/* Tool 6 */}
         <Link href={`code/${tools[5].slug}`} className="col-span-1">
            <div className="card bg-base-300 shadow-md hover:shadow-lg transition-all h-40">
               <div className="card-body p-3">
                  <h2 className="card-title text-lg text-primary-content">{tools[5].name}</h2>
                  <p className="text-base-content/70 text-base">{tools[5].description}</p>
               </div>
            </div>
         </Link>

      </div>
   );
};

export default Code;