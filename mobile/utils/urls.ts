import Constants from "expo-constants";

const { manifest } = Constants;

function getBaseURL() {
  if (process.env.NODE_ENV === "production") {
    return `https://deploy-preview-168--healing4heroes-mobile.netlify.app`;
  }

  return `https://deploy-preview-168--healing4heroes-mobile.netlify.app`;

  // if (manifest?.debuggerHost) {
  //   return `http://${manifest?.debuggerHost?.split(":").shift()}:3000`;
  // } else {
  //   return "http://localhost:3000";
  // }
}

export const urls = {
  baseUrl: getBaseURL(),
  api: {
    auth: {
      verify: "/api/auth/verify",
      password: {
        reset: "/api/auth/password/reset",
      },
    },
    user: {
      user: "/api/user/user",
      animal: "/api/user/animal",
      training: "/api/user/training",
      announcement: "/api/user/announcement",
      email: "/api/user/email",
      readLog: "/api/user/announcements/read",
      fileUpload: {
        init: "/api/user/file/upload/init",
        urls: "/api/user/file/upload/urls",
        complete: "/api/user/file/upload/complete",
      },
    },
    admin: {
      user: "/api/admin/user",
      userVerified: "/api/admin/user/verify",
      animal: "/api/admin/animal",
      training: "/api/admin/training",
      announcement: "/api/admin/announcement",
      fileDownload: "/api/admin/file/download",
      analytics: "/api/admin/analytics",
    },
  },
};
