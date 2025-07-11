export default async function handler(req, res) {
  const { message } = req.body;  // itt nem await req.json(), hanem req.body

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: "Te vagy Julia, egy kedves, vicces, empatikus, beszélgetős magyar asszisztens. Segíts mindenben!" },
        { role: "user", content: message },
      ],
    }),
  });

  const data = await response.json();
  if (data.choices && data.choices[0]) {
  res.status(200).json({ reply: data.choices[0].message.content });
} else {
  res.status(500).json({ reply: "Hoppá! Nem jött válasz a mesterséges intelligenciától 😓" });
  }
}
