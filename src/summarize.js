import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const KEY = process.env.OPENAI_API_KEY;

export async function summarizeArticle(article) {
  const prompt = `
Summarize this drone-related news article in 2–3 short paragraphs. 
Extract 5 trending keywords, 5 hashtags, and create a one-line hook.
Return valid JSON with fields: summary, hashtags, keywords, hook.

Title: ${article.title}
URL: ${article.url}
`;

  const res = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
    },
    { headers: { Authorization: `Bearer ${KEY}` } }
  );

  try {
    return JSON.parse(res.data.choices[0].message.content);
  } catch {
    return { summary: res.data.choices[0].message.content };
  }
}
