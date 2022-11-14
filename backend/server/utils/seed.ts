import { faker } from "@faker-js/faker";
import { getAuth } from "firebase-admin/auth";
import { createAnimal } from "server/mongodb/actions/Animal";
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
} from "src/utils/types";
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

const PASSWORD = "h4hpassword";

async function generateUsers(): Promise<User[]> {
  const users = [];
  for (let i = 0; i < NUM_USERS; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const birthday = faker.date.birthdate();
    const profileImage = faker.image.people();
    const email = faker.internet.email(firstName, lastName);
    firebaseConnect();
    const firebaseUser = await getAuth().createUser({
      email,
      password: PASSWORD,
      displayName: `${firstName} ${lastName}`,
      photoURL: profileImage,
    });

    const roles = [];
    if (i < NUM_NONPROFIT_ADMINS) {
      roles.push(Role.NONPROFIT_ADMIN);
    } else {
      roles.push(Role.NONPROFIT_USER);
    }

    const user = await createUser(
      email,
      firebaseUser.uid,
      roles,
      birthday,
      firstName,
      lastName,
      randomEnum(HandlerType),
      profileImage,
      randomBoolean(),
      true
    );

    users.push(user);
  }
  return users;
}

async function generateAnimals(users: User[]): Promise<ServiceAnimal[]> {
  const serviceAnimals = [];

  for (const user of users) {
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
      const microchipExpiration = faker.date.future();
      const checkUpDate = faker.date.between(dateOfBirth, new Date());
      const profileImage = faker.image.animals();

      const animal = await createAnimal(
        user._id,
        name,
        totalHours,
        subHandler,
        dateOfTrainingClass,
        dateOfBirth,
        dateOfAdoption,
        microchipExpiration,
        checkUpDate,
        profileImage
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
        behavior,
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

export async function seedDatabase() {
  console.log("Seeding database...");

  const users = await generateUsers();
  const animals = await generateAnimals(users);
  await generateTrainingLogs(animals);

  console.log("Seeding complete.");
}

function randomEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = Object.keys(anEnum as any)
    .map((n) => Number.parseInt(n))
    .filter((n) => !Number.isNaN(n)) as unknown as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex];
}

function randomBoolean() {
  return Math.random() < 0.5;
}

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
