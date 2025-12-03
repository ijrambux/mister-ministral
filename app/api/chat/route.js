export async function POST(req) {
  try {
    const { message } = await req.json();

    const apiKey = process.env.OPENROUTER_API_KEY;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/Ministral-8B-Instruct",
        messages: [
          { role: "user", content: message }
        ]
      })
    });

    const json = await response.json();

    return Response.json({ reply: json.choices[0].message.content });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
