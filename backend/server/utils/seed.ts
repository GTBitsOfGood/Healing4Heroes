import * as fs from "fs";
import * as https from "https";
import * as path from "path";
import { faker } from "@faker-js/faker";
import axios from "axios";
import { storage } from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { createAnimal } from "server/mongodb/actions/Animal";
import { createAnnouncement } from "server/mongodb/actions/Announcement";
import { createTrainingLog } from "server/mongodb/actions/TrainingLog";
import { createUser } from "server/mongodb/actions/User";
import AnimalModel from "server/mongodb/models/Animal";
import {
  HandlerType,
  Role,
  User,
  ServiceAnimal,
  TrainingLog,
  ServiceAnimalSkills,
  BehaviorTypes,
  SubHandler,
  Announcement,
  StorageLocation,
} from "src/utils/types";
import { v4 as uuidv4 } from "uuid";
import { firebaseConnect } from "./dbConnect";

/* num users */
const NUM_NONPROFIT_USERS = 15;
const NUM_NONPROFIT_ADMINS = 5;
const NUM_USERS = NUM_NONPROFIT_ADMINS + NUM_NONPROFIT_USERS;

/* other config */
const NUM_ANIMALS_PER_USER = 1;
const MIN_DOG_AGE = 2;
const MAX_DOG_AGE = 15;
const NUM_TRAINING_LOGS_PER_ANIMAL = 10;
const MAX_TRAINING_LOG_HOURS = 12;
const NUM_ANNOUNCEMENTS_PER_ADMIN = 2;

const PASSWORD = "h4hpassword";

async function generateUsers(): Promise<User[]> {
  const users = [];
  for (let i = 0; i < NUM_USERS; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const birthday = faker.date.birthdate();
    const profileImage = faker.image.people();
    const address = faker.address.streetAddress();
    const annualPetVisitDay = faker.date.recent();
    const nextPrescriptionReminder = new Date();
    nextPrescriptionReminder.setFullYear(annualPetVisitDay.getFullYear() + 1);
    nextPrescriptionReminder.setDate(annualPetVisitDay.getDate());
    nextPrescriptionReminder.setMonth(annualPetVisitDay.getMonth());

    const profileImageFirebaseLocation = await uploadImageToFirebase(
      StorageLocation.HANDLER_PICTURES,
      profileImage
    );
    const email = faker.internet.email(firstName, lastName);
    firebaseConnect();
    const firebaseUser = await getAuth().createUser({
      email,
      password: PASSWORD,
      displayName: `${firstName} ${lastName}`,
      photoURL: profileImage,
    });

    const roles = [Role.NONPROFIT_USER];
    if (i < NUM_NONPROFIT_ADMINS) {
      roles.push(Role.NONPROFIT_ADMIN);
    }

    const user = await createUser(
      email,
      firebaseUser.uid,
      roles,
      false,
      birthday,
      firstName,
      lastName,
      randomEnum(HandlerType) as HandlerType,
      profileImageFirebaseLocation,
      address,
      annualPetVisitDay,
      randomBoolean(),
      true,
      nextPrescriptionReminder
    );

    users.push(user);
  }
  return users;
}

async function generateAnimals(users: User[]): Promise<ServiceAnimal[]> {
  const serviceAnimals = [];

  for (const user of users) {
    if (user.roles?.includes(Role.NONPROFIT_ADMIN)) {
      continue;
    }

    for (let i = 0; i < NUM_ANIMALS_PER_USER; i++) {
      const name = faker.name.firstName();

      /* generate subhandler approx. half of the time */
      const subHandler = randomBoolean()
        ? {
            name: faker.name.fullName(),
            relation: faker.word.noun(),
            type: randomEnum(HandlerType),
          }
        : undefined;

      const totalHours = 0;
      const dateOfTrainingClass = faker.date.recent();
      const dateOfBirth = faker.date.birthdate({
        min: MIN_DOG_AGE,
        max: MAX_DOG_AGE,
        mode: "age",
      });
      const dateOfAdoption = faker.date.between(
        dateOfBirth,
        dateOfTrainingClass
      );

      const dateOfRabitsShot = faker.date.between(
        dateOfBirth,
        dateOfTrainingClass
      );

      const rabiesShotTimeInterval = randomNumber(0, 100) > 50 ? 1 : 3;

      const microchipExpiration = faker.date.future();
      const checkUpDate = faker.date.between(dateOfBirth, new Date());
      const profileImage = faker.image.animals();
      const profileImageFirebaseLocation = await uploadImageToFirebase(
        StorageLocation.SERVICE_ANIMAL_PICTURES,
        profileImage
      );

      const animal = await createAnimal(
        user._id,
        name,
        totalHours,
        subHandler as SubHandler,
        dateOfTrainingClass,
        dateOfBirth,
        dateOfAdoption,
        dateOfRabitsShot,
        rabiesShotTimeInterval,
        microchipExpiration,
        checkUpDate,
        profileImageFirebaseLocation
      );

      serviceAnimals.push(animal);
    }
  }

  return serviceAnimals;
}

async function generateTrainingLogs(
  animals: ServiceAnimal[]
): Promise<TrainingLog[]> {
  const trainingLogs = [];

  for (const animal of animals) {
    for (let i = 0; i < NUM_TRAINING_LOGS_PER_ANIMAL; i++) {
      const date = faker.date.recent();
      const description = faker.lorem.sentence();

      /* generate random skill array */
      const skills = [];
      for (const skill of Object.values(ServiceAnimalSkills)) {
        if (randomBoolean()) {
          skills.push(skill);
        }
      }

      const trainingHours = randomNumber(1, MAX_TRAINING_LOG_HOURS);
      const behavior = [];
      behavior.push(randomEnum(BehaviorTypes));
      const behaviorNote = faker.word.adjective();

      const trainingLog = await createTrainingLog(
        date,
        description,
        skills,
        trainingHours,
        behavior as BehaviorTypes[],
        behaviorNote,
        animal._id,
        (animal.handler as User)._id || animal.handler,
        "",
        ""
      );

      await AnimalModel.findByIdAndUpdate(
        { _id: animal._id },
        { $inc: { totalHours: trainingHours } }
      ).exec();

      trainingLogs.push(trainingLog);
    }
  }

  return trainingLogs;
}

export async function generateAnnouncements(
  users: User[]
): Promise<Announcement[]> {
  const announcements = [];
  for (const user of users) {
    if (!user.roles?.includes(Role.NONPROFIT_ADMIN)) {
      continue;
    }

    for (let i = 0; i < NUM_ANNOUNCEMENTS_PER_ADMIN; i++) {
      const title = faker.lorem.sentence();
      const description = faker.lorem.paragraph();
      const date = faker.date.recent();
      const announcement = await createAnnouncement(
        user._id,
        title,
        description,
        date
      );

      announcements.push(announcement);
    }
  }

  return announcements;
}
export async function seedDatabase() {
  console.log("Seeding database...");
  const users = await generateUsers();
  const animals = await generateAnimals(users);
  await generateTrainingLogs(animals);
  await generateAnnouncements(users);
  console.log("Seeding complete.");
}

function randomEnum<T>(anEnum: T): string {
  const enumValues: string[] = Object.values(anEnum as any);
  const randomIndex: number = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex];
}

function randomBoolean() {
  return Math.random() < 0.5;
}

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Interesting code ahead.
/*eslint-disable */
async function uploadImageToFirebase(
  storageLocation: StorageLocation,
  imageUrl: string
) {
  const url: string = (await axios({
    method: "GET",
    url: imageUrl,
  }).then((response) => {
    return response.request._redirectable._options.href;
  })) as string;

  const fileId = uuidv4() + ".jpg";
  const fileName = path.resolve("server/utils/") + path.sep + fileId;
  const file = fs.createWriteStream(fileName);
  https.get(url, (response) => {
    response.pipe(file);
    file.on("finish", async () => {
      file.close();
      firebaseConnect();
      await storage()
        .bucket(process.env.FIREBASE_STORAGE_BUCKET)
        .upload(fileName, {
          destination: storageLocation + fileId,
        });
      fs.unlink(fileName, () => {});
    });
  });

  return storageLocation + fileId;
}
/*eslint-enable */
