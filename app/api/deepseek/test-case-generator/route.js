import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  try {
    const { code, framework, language, testType } = await req.json();

    // Prepare the prompt for generating test code
    const prompt = `
You're an expert tester. Write ${testType} tests using ${framework} for the following ${language} code the tests must be of Industrial standards.
No explanations. Output only the test code.
only give the testcase dont write the api again and no comments, no additions just the test case, No Quotes, No imports or exports 

${code}
    `;

    // Make API call to generate the test code
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: "Generate the tests now." },
        ],
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
      }
    );

    // Extract generated test code from the response
    const testCode = response.data.choices[0].message.content;

    return NextResponse.json({ testCode });
  } catch (err) {
    console.error("🚨 Error:", err.message);
    return NextResponse.json(
      { error: "Failed to generate test case" },
      { status: 500 }
    );
  }
}
