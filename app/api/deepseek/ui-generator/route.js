import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  try {
    const body = await req.json();
    const { prompt, framework, styling } = body;

    const systemPrompt = `You are an expert frontend developer. Generate a ${framework} component using ${styling} CSS. Do not explain, just give the full code. NO comments, No quotes, No mention of languages dont mention javascript and quotes on top dont mention anything on top withb quotes`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
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

    const code = response.data.choices[0].message.content;
    return NextResponse.json({ componentCode: code });
  } catch (err) {
    console.error("🔥 DeepSeek error:", err.message);
    return NextResponse.json(
      { error: "Failed to generate component" },
      { status: 500 }
    );
  }
}
