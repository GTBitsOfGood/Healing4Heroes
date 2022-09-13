import mongoose from "mongoose";
import { ServiceAnimal, HandlerType } from "src/utils/types";

const AnimalSchema = new mongoose.Schema<ServiceAnimal>({
  totalHours: {
    type: Number,
    required: true,
  },
  handler: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  subHandler: {
    name: {
      type: String,
      required: true,
      default: "John Doe",
    },
    relation: {
      type: String,
      required: true,
      default: "Nonprofit Staff",
    },
    type: {
      type: String,
      required: false,
      enum: Object.values(HandlerType),
      default: HandlerType.HANDLER_CIVILIAN,
    },
  },
  dateOfBirth: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  dateOfAdoption: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  microchipExpiration: {
    type: Date,
    required: true,
    default: new Date("2030-01-01"),
  },
  checkUpDate: {
    type: Date,
    required: true,
    default: new Date("2030-01-01"),
  },
});

const AnimalModel =
  (mongoose.models.Animal as mongoose.Model<ServiceAnimal>) ||
  mongoose.model<ServiceAnimal>("Animal", AnimalSchema);

export default AnimalModel;
