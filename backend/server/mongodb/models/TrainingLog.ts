import mongoose from "mongoose";
import { TrainingLog, ServiceAnimalBehavior } from "src/utils/types";

const ServiceAnimalBehaviorSchema = new mongoose.Schema<ServiceAnimalBehavior>({
  description: String,
  repeat: Number,
});

const TrainingLogSchema = new mongoose.Schema<TrainingLog>({
  date: {
    type: Date,
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  trainingHours: {
    type: Number,
    required: true,
  },
  behavior: {
    type: ServiceAnimalBehaviorSchema,
    required: true,
  },
  animal: {
    // TODO: replace with the actual schema
    type: Object,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
});

const TrainingLogModel =
  (mongoose.models.TrainingLog as mongoose.Model<TrainingLog>) ||
  mongoose.model<TrainingLog>("TrainingLog", TrainingLogSchema);
export default TrainingLogModel;
