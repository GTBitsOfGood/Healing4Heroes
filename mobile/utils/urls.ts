function getBaseURL() {
  return "https://healing4heroes-2t4f3u3cl-samratsahoo.vercel.app";
  if (process.env.NODE_ENV === "production") {
    return `https://healing4heroes.vercel.app`;
  }
  return "http://localhost:3000";
}

export const urls = {
  baseUrl: getBaseURL(),
  api: {
    user: "/api/user",
    training: "/api/training",
  },
};
