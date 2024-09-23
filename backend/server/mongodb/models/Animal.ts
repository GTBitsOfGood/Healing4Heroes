import mongoose from "mongoose";
import { ServiceAnimal, HandlerType } from "src/utils/types";

const AnimalSchema = new mongoose.Schema<ServiceAnimal>({
  handler: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  totalHours: {
    type: Number,
    required: true,
    default: 0,
  },
  subHandler: {
    name: {
      type: String,
      required: false,
    },
    relation: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
      enum: Object.values(HandlerType),
    },
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  dateOfAdoption: {
    type: Date,
    required: false,
  },
  dateOfRabiesShot: {
    type: Date,
    required: false,
  },
  rabiesShotTimeInterval: {
    type: Number,
    required: false,
  },
  dateOfTrainingClass: {
    type: Date,
    required: false,
  },
  microchipExpiration: {
    type: Date,
    required: false,
  },
  checkUpDate: {
    type: Date,
    required: false,
  },
  profileImage: {
    type: String,
    required: false,
  },
});

const AnimalModel =
  (mongoose.models.Animal as mongoose.Model<ServiceAnimal>) ||
  mongoose.model<ServiceAnimal>("Animal", AnimalSchema);

export default AnimalModel;
