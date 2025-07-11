export default async function handler(req, res) {
  const buffers = [];

  for await (const chunk of req.body) {
    buffers.push(chunk);
  }

  const bodyString = Buffer.concat(buffers).toString();
  const { message } = JSON.parse(bodyString);

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
  res.status(200).json({ reply: data.choices[0].message.content });
}
