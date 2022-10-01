import mongoose, { Schema } from "mongoose";
import { TrainingLog, ServiceAnimalBehavior } from "src/utils/types";

const ServiceAnimalBehaviorSchema = new mongoose.Schema<ServiceAnimalBehavior>(
  {
    description: String,
    repeat: Number,
  },
  { _id: false }
);

const TrainingLogSchema = new mongoose.Schema<TrainingLog>({
  date: {
    type: Date,
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: false,
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
    type: String,
    required: true,
  },
  animal: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  handler: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  video: {
    type: String,
  },
});

const TrainingLogModel =
  (mongoose.models.TrainingLog as mongoose.Model<TrainingLog>) ||
  mongoose.model<TrainingLog>("TrainingLog", TrainingLogSchema);
export default TrainingLogModel;
