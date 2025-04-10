import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  try {
    const { validationLib, fields } = await req.json();

    let systemPrompt = "";

    if (validationLib === "yup") {
      systemPrompt = `You're a Formik + Yup expert. Create a Yup validationSchema ONLY using these fields:\n\n${JSON.stringify(
        fields,
        null,
        2
      )}\n\nReturn only the schema code. No import/export. Follow this example:\n\nconst validationSchema = Yup.object({\n  email: Yup.string().email("Invalid email").required("Email is required"),\n  password: Yup.string().min(8, "Min 8 chars").required("Password is required"),\n  confirmPassword: Yup.string()\n    .oneOf([Yup.ref("password"), null], "Passwords must match")\n    .required("Confirm Password is required"),\n  age: Yup.number().min(18, "Must be at least 18").required("Age is required"),\n  website: Yup.string().url("Invalid URL"),\n  terms: Yup.boolean().oneOf([true], "You must accept the terms"),\n})\n\nStrictly no extra text, quotes, or language tags.`;
    } else if (validationLib === "zod") {
      systemPrompt = `You're a Zod expert. Generate a Zod object schema using:\n\n${JSON.stringify(
        fields,
        null,
        2
      )}\n\nReturn only the schema object. No imports. No explanation. No quotes and dont mention javascript or typescript in the prompt no additons just the validation schema`;
    } else if (validationLib === "react-hook-form") {
      systemPrompt = `You're a react-hook-form expert. Generate the register() validation rules object using:\n\n${JSON.stringify(
        fields,
        null,
        2
      )}\n\nReturn only the rules object. No imports or text.  No quotes and dont mention javascript or typescript in the prompt no additons just the validation schema`;
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: "Generate the validation schema now." },
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
    return NextResponse.json({ schemaCode: code });
  } catch (err) {
    console.error("🔥 OpenRouter error:", err.message);
    return NextResponse.json(
      { error: "Failed to generate validation schema" },
      { status: 500 }
    );
  }
}
