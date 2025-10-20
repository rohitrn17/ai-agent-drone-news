export function formatSocialPost(article, summary) {
  const caption = `
${summary.hook || ""}

${summary.summary || ""}

${(summary.hashtags || "").replace(/,/g, " ")}

Read more 👇
${article.url}
`;
  return { caption };
}
