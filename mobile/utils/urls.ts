function getBaseURL() {
  return `https://healing4heroes.vercel.app`;
  if (process.env.NODE_ENV === "production") {
    return `https://healing4heroes.vercel.app`;
  }
  return "http://localhost:3000";
}

export const urls = {
  baseUrl: getBaseURL(),
  api: {
    auth: {
      verify: "/api/auth/verify",
    },
    user: {
      user: "/api/user/user",
      animal: "/api/user/animal",
      training: "/api/user/training",
      announcement: "/api/user/announcement",
      readLog: "/api/user/announcements/read",
    },
    admin: {
      user: "/api/admin/user",
      userVerified: "/api/admin/user/verified",
      animal: "/api/admin/animal",
      training: "/api/admin/training",
      announcement: "/api/admin/announcement",
    },
  },
};
