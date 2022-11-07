import APIWrapper from "server/utils/APIWrapper";

export default APIWrapper({
  GET: {
    config: {
      requireToken: false,
      requireAdminVerification: false
    },
    handler: async () => {
      return {
        Hello: "World",
        Version: 2.0,
      };
    },
  },
});
