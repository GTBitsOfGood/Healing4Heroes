import mongoose, { Schema } from "mongoose";
import { TrainingLog, BehaviorTypes } from "src/utils/types";

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
    type: [String],
    enum: Object.values(BehaviorTypes),
    required: true,
    default: [],
  },
  behaviorNote: {
    type: String,
    required: false,
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
    required: false,
  },
});

const TrainingLogModel =
  (mongoose.models.TrainingLog as mongoose.Model<TrainingLog>) ||
  mongoose.model<TrainingLog>("TrainingLog", TrainingLogSchema);
export default TrainingLogModel;
