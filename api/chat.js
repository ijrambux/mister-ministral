import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const body = req.method === "POST" ? req.body : { prompt: "Hello!" };

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages: [
          { role: "user", content: body.prompt }
        ]
      })
    });

    const json = await response.json();
    return res.status(200).json(json);

  } catch (err) {
    return res.status(500).json({ error: err.toString() });
  }
}
