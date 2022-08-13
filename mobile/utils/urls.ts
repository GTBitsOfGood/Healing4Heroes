function getBaseURL() {
  if (process.env.ENVIRONMENT === "production") {
    return `https://healing4heroes.vercel.app`;
  }
  return "http://localhost:3000";
}

export const urls = {
  baseUrl: getBaseURL(),
  api: {
    user: "/api/user",
  },
};
