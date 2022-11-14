import APIWrapper from "server/utils/APIWrapper";
import { seedDatabase } from "server/utils/seed";

export default APIWrapper({
  GET: {
    config: {
      requireToken: false,
    },
    handler: async () => {
      // await seedDatabase();
      throw new Error(
        "Seeding is disabled. To enable, edit backend/src/pages/api/development/seed.ts."
      );
    },
  },
});
