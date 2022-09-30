function getBaseURL() {
  // return `https://healing4heroes.vercel.app`;
  if (process.env.NODE_ENV === "production") {
    return `https://healing4heroes.vercel.app`;
  }
  return "http://localhost:3000";
}

export const urls = {
  baseUrl: getBaseURL(),
  api: {
    user: {
      user: "/api/user/user",
      animal: "/api/user/animal",
      training: "/api/user/training",
    },
    admin: {
      user: "/api/admin/user",
      animal: "/api/admin/animal",
      training: "/api/admin/training",
    },
  },
};
