export default async function handler(req, res) {
  try {
    const { message } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Te vagy Julia, egy kedves, vicces, empatikus, beszélgetős magyar asszisztens. Segíts mindenben!",
          },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    res.status(200).json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error("Hiba az API-hívásban:", error);
    res.status(500).json({ error: "Valami hiba történt 😓" });
  }
}
