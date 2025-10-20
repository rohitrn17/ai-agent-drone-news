import axios from "axios";
import RSSParser from "rss-parser";
import dotenv from "dotenv";
dotenv.config();

const parser = new RSSParser();

export async function fetchNews(keywords = []) {
  const q = keywords.join(" OR ");
  const articles = [];

  if (process.env.NEWSAPI_KEY) {
    try {
      const resp = await axios.get("https://newsapi.org/v2/everything", {
        params: {
          q,
          language: "en",
          sortBy: "publishedAt",
          pageSize: 5,
          apiKey: process.env.NEWSAPI_KEY,
        },
      });
      resp.data.articles.forEach((a) =>
        articles.push({
          title: a.title,
          url: a.url,
          publishedAt: a.publishedAt,
          image: a.urlToImage || null,
          source: a.source.name,
        })
      );
    } catch (err) {
      console.warn("⚠️ NewsAPI failed, using RSS fallback");
    }
  }

  if (articles.length === 0) {
    const rssQuery = encodeURIComponent(q);
    const feedUrl = `https://news.google.com/rss/search?q=${rssQuery}&hl=en-IN&gl=IN&ceid=IN:en`;
    const feed = await parser.parseURL(feedUrl);
    feed.items.slice(0, 5).forEach((item) =>
      articles.push({
        title: item.title,
        url: item.link,
        publishedAt: item.isoDate || item.pubDate,
        source: "Google News",
      })
    );
  }

  return articles;
}
