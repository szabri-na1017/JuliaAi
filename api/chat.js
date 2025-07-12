export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Csak POST kérés engedélyezett!" });
  }

  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Te vagy Julia, egy kedves, vicces, empatikus, beszélgetős magyar asszisztens. Segíts mindenben!",
          },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    res.status(200).json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error("Hiba a mesterséges intelligencia hívás során:", error);
    res.status(500).json({ error: "Hoppá! Valami elromlott 😓" });
  }
}
