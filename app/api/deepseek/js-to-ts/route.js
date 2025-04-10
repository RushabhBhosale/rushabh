import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      code,
      strict = false,
      withComments = false,
      convertToAsyncIfNeeded = false,
    } = body;

    let instruction = `Convert the following JavaScript code to clean, production-grade TypeScript.`;
    if (strict) instruction += ` Use strict typing with type inference.`;
    if (withComments)
      instruction += ` Add inline comments explaining major changes.`;
    if (convertToAsyncIfNeeded)
      instruction += ` If async logic is detected, convert functions accordingly.`;
    instruction += ` Only return the code.  NO quotes, dont mention javascript no additions `;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat",
        messages: [
          { role: "system", content: instruction },
          { role: "user", content: code },
        ],
        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const tsCode = response.data.choices[0].message.content;
    return NextResponse.json({ convertedCode: tsCode });
  } catch (err) {
    console.error("⚡ JS to TS error:", err.message);
    return NextResponse.json({ error: "Conversion failed" }, { status: 500 });
  }
}
