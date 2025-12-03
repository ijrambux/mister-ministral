import axios from "axios";

export async function POST(req) {
  try {
    const { message } = await req.json();

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "ggml-org/ministral-3-8b",
        messages: [
          { role: "system", content: "You are Mister AI." },
          { role: "user", content: message }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return Response.json({
      reply: response.data.choices[0].message.content
    });

  } catch (error) {
    console.log(error.response?.data);
    return Response.json({ reply: "❌ API Error" });
  }
}
