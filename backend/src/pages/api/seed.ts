import APIWrapper from "server/utils/APIWrapper";

export default APIWrapper({
  POST: {
    config: {
      requireToken: false,
    },
    handler: async () => {
      // await seedDatabase();
      throw new Error(
        "Seeding is disabled. To enable, edit backend/src/pages/api/seed.ts."
      );
    },
  },
});
