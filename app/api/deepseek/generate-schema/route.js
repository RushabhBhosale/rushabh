import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  try {
    const { description, type = "mongoose" } = await req.json();

    const supported = ["mongoose", "prisma", "zod", "sequelize", "sql"];
    if (!supported.includes(type)) {
      return NextResponse.json(
        { error: "Unsupported schema type" },
        { status: 400 }
      );
    }

    const systemPrompt = `You're an expert backend developer. Generate a ${type} schema based on the user description. Only output code, no explanations. NO quotes, dont mention javascript no additions just the schema`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: description },
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

    const schemaCode = response.data.choices[0].message.content;
    return NextResponse.json({ schemaCode });
  } catch (err) {
    console.error("💥 Schema generation error:", err.message);
    return NextResponse.json(
      { error: "Failed to generate schema" },
      { status: 500 }
    );
  }
}
