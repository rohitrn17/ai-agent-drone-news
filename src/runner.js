import dotenv from "dotenv";
import { fetchNews } from "./fetch_news.js";
import { summarizeArticle } from "./summarize.js";
import { formatSocialPost } from "./format_post.js";
import { postToTwitter } from "./post_to_twitter.js";
import { safeLog } from "./utils.js";
dotenv.config();

async function main() {
  const keywords = process.env.DEFAULT_KEYWORDS.split(",");
  const articles = await fetchNews(keywords);

  for (const article of articles) {
    const summary = await summarizeArticle(article);
    const post = formatSocialPost(article, summary);
    safeLog("POST", post.caption);

    // Uncomment to auto-post
    // await postToTwitter(post.caption);
  }
}

main();
