import APIWrapper from "server/utils/APIWrapper";

export default APIWrapper({
  GET: {
    config: {},
    handler: async (req) => {
      return {
        Hello: "World",
        Version: 2.0,
      };
    },
  },
});
