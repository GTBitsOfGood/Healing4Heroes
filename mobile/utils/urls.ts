function getBaseURL() {
  return "https://healing4heroes-ew1oz5tbx-samratsahoo.vercel.app";
  if (process.env.NODE_ENV === "production") {
    return `https://healing4heroes.vercel.app`;
  }
  return "http://localhost:3000";
}

export const urls = {
  baseUrl: getBaseURL(),
  api: {
    user: "/api/user",
    animal: "/api/animal",
    training: "/api/training",
  },
};
