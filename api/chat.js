export default async function handler(req, res) {
    try {
        const { message } = req.body;

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

        res.status(200).json({ reply: json.choices[0].message.content });

    } catch (error) {
        res.status(500).json({ reply: "Error: " + error.message });
    }
}

