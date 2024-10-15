import {
  createUser,
  findUserByFirebaseUid,
  updateUser,
} from "server/mongodb/actions/User";
import APIWrapper from "server/utils/APIWrapper";
import { getUser } from "server/utils/Authentication";
import { HandlerType, Role } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireToken: true,
      requireAdminVerification: false,
      roles: [Role.NONPROFIT_USER],
    },
    handler: async (req) => {
      const accessToken: string = req.headers.accesstoken as string;
      const user = await getUser(accessToken);

      if (!user) {
        throw new Error("User not found in database!");
      }

      return user;
    },
  },
  POST: {
    config: {
      requireToken: false,
      requireAdminVerification: false,
      requireEmailVerified: false,
    },
    handler: async (req) => {
      const email: string = req.body.email as string;
      const birthday: Date = req.body.birthday as Date;
      const firebaseUid: string = req.body.firebaseUid as string;
      const firstName: string = req.body.firstName as string;
      const lastName: string = req.body.lastName as string;
      const handlerType: HandlerType = req.body.handlerType as HandlerType;
      const profileImage: string = req.body.profileImage as string;
      const address: string = req.body.address as string;
      const annualPetVisitDay: Date = req.body.annualPetVisitDay as Date;

      const dbUser = await findUserByFirebaseUid(firebaseUid);
      if (dbUser) {
        throw new Error("User already exists in database!");
      }
      const roles = [Role.NONPROFIT_USER];
      const isAdmin = email.endsWith("@healing4heroes.org");
      if (isAdmin) {
        roles.push(Role.NONPROFIT_ADMIN);
      }

      const user = await createUser(
        email,
        firebaseUid,
        roles,
        birthday,
        firstName,
        lastName,
        handlerType,
        profileImage,
        address,
        annualPetVisitDay,
        isAdmin
      );
      if (!user) {
        throw new Error("Failed to create user!");
      }
        // if (process.env.NODE_ENV === "production") {
        //   await sendEmail(
        //     "applicant@healing4heroes.org",
        //     EmailSubject.ACCOUNT_CREATED,
        //     EmailTemplate.ACCOUNT_CREATED,
        //     emailData
        //   );
        // } else {
        //   await sendEmail(
        //     "gt.engineering@hack4impact.org",
        //     EmailSubject.ACCOUNT_CREATED,
        //     EmailTemplate.ACCOUNT_CREATED,
        //     emailData
        //   );
        // }
      return user;
    },
  },
  PATCH: {
    config: {
      requireToken: true,
      requireAdminVerification: false,
      roles: [Role.NONPROFIT_USER],
    },
    handler: async (req) => {
      const accessToken: string = req.headers.accesstoken as string;
      const birthday: Date = req.body.birthday as Date;
      const firstName: string = req.body.firstName as string;
      const lastName: string = req.body.lastName as string;
      const handlerType: HandlerType = req.body.handlerType as HandlerType;
      const profileImage: string = req.body.profileImage as string;
      const address: string = req.body.address as string;
      const annualPetVisitDay: Date = req.body.annualPetVisitDay as Date;

      const user = await getUser(accessToken);

      if (!user) {
        throw new Error("User not found in database!");
      }

      const updatedUser = await updateUser(
        user._id,
        birthday,
        user.roles,
        firstName,
        lastName,
        handlerType,
        address,
        annualPetVisitDay,
        profileImage
      );

      if (!updatedUser?.modifiedPaths) {
        throw new Error("Failed to update user!");
      }

      return updatedUser;
    },
  },
});
