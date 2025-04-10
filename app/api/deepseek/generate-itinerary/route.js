import { NextResponse } from "next/server";
import axios from "axios";

async function getImage(query) {
  try {
    const res = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query, per_page: 1 },
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    });

    return res.data.results?.[0]?.urls?.regular || null;
  } catch (err) {
    console.error("Unsplash Error:", err);
    return null;
  }
}

export async function POST(req) {
  const { location, days } = await req.json();

  const prompt = `
You are a travel planner AI. Generate a ${days}-day trip itinerary for ${location}.
Respond with valid JSON like:

[
  {
    "day": 1,
    "title": "Arrival + Local Food",
    "date": "",
    "activities": [
      "Arrive and check-in",
      "Explore local markets",
      "Dinner at a popular restaurant"
    ]
  }
]

Do not add text before or after the JSON. No markdown.
`.trim();

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const raw = response.data.choices[0].message.content;
    const parsed = JSON.parse(raw);

    // 🔥 Add images
    const enriched = await Promise.all(
      parsed.map(async (day) => {
        const image = await getImage(`${location} ${day.title}`);
        return { ...day, image };
      })
    );

    return NextResponse.json({ itinerary: enriched });
  } catch (err) {
    console.error("Itinerary API Error:", err);
    return NextResponse.json({ error: "Something broke" }, { status: 500 });
  }
}
