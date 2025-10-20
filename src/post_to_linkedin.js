import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function postToLinkedIn(authorUrn, text) {
  const res = await axios.post(
    "https://api.linkedin.com/v2/ugcPosts",
    {
      author: authorUrn,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: { text },
          shareMediaCategory: "NONE",
        },
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.LINKEDIN_ACCESS_TOKEN}`,
        "X-Restli-Protocol-Version": "2.0.0",
      },
    }
  );
  return res.data;
}
