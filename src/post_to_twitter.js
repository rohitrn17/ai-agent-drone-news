import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function postToTwitter(text) {
  const res = await axios.post(
    "https://api.twitter.com/2/tweets",
    { text },
    { headers: { Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}` } }
  );
  return res.data;
}
