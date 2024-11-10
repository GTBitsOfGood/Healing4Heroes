import {
  createUser,
  findUserByFirebaseUid,
  updateUser,
} from "server/mongodb/actions/User";
import APIWrapper from "server/utils/APIWrapper";
import { getUser, sendEmail } from "server/utils/Authentication";
import {
  HandlerType,
  Role,
  EmailSubject,
  EmailTemplate,
  User,
} from "src/utils/types";

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
      const unsubscribeEmail: boolean = req.body.unsubscribeEmail as boolean;

      const dbUser = await findUserByFirebaseUid(firebaseUid);
      if (dbUser) {
        throw new Error("User already exists in database!");
      }
      const roles = [Role.NONPROFIT_USER];
      const isAdmin = email.endsWith("@healing4heroes.org");
      if (isAdmin) {
        roles.push(Role.NONPROFIT_ADMIN);
      }
      let nextPrescriptionReminder = undefined;
      if (annualPetVisitDay) {
        nextPrescriptionReminder = new Date();
        nextPrescriptionReminder.setFullYear(
          nextPrescriptionReminder.getFullYear() + 1
        );
        nextPrescriptionReminder.setDate(annualPetVisitDay.getDate());
        nextPrescriptionReminder.setMonth(annualPetVisitDay.getMonth());
      }

      const user = await createUser(
        email,
        firebaseUid,
        roles,
        unsubscribeEmail,
        birthday,
        firstName,
        lastName,
        handlerType,
        profileImage,
        address,
        annualPetVisitDay,
        isAdmin,
        false,
        nextPrescriptionReminder
      );
      if (!user) {
        throw new Error("Failed to create user!");
      }
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
      let nextPrescriptionReminder: Date = req.body
        .nextPrescriptionReminder as Date;
      const userCreation: boolean = req.body.userCreation as boolean;
      const unsubscribeEmail: boolean = req.body.unsubscribeEmail as boolean;
      const user = await getUser(accessToken);

      if (!user) {
        throw new Error("User not found in database!");
      }

      if (annualPetVisitDay && !nextPrescriptionReminder) {
        const today = new Date();
        nextPrescriptionReminder = new Date();
        nextPrescriptionReminder.setFullYear(today.getFullYear() + 1);
        nextPrescriptionReminder.setDate(annualPetVisitDay.getDate());
        nextPrescriptionReminder.setMonth(annualPetVisitDay.getMonth());
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
        profileImage,
        nextPrescriptionReminder,
        unsubscribeEmail,
      );

      if (!updatedUser?.modifiedPaths) {
        throw new Error("Failed to update user!");
      }

      // Only send email if user isn't on profile image upload
      if (userCreation && !profileImage) {
        const emailData = {
          email: (user as User).email,
          firstName: firstName,
          lastName: lastName,
          address: address,
        };
        if (process.env.DEPLOY_CONTEXT === "production") {
          await sendEmail(
            "applicant@healing4heroes.org",
            EmailSubject.ACCOUNT_CREATED,
            EmailTemplate.ACCOUNT_CREATED,
            emailData
          );
        } else {
          await sendEmail(
            "gt.engineering@hack4impact.org",
            EmailSubject.ACCOUNT_CREATED,
            EmailTemplate.ACCOUNT_CREATED,
            emailData
          );
        }
      }

      return updatedUser;
    },
  },
});
