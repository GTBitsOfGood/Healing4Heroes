import mongoose from "mongoose";
import { Analytics } from "src/utils/types";

const AnalyticsSchema = new mongoose.Schema<Analytics>({
  totalUsers: {
    type: Number,
    required: true,
  },
  activeUsers: {
    type: Number,
    required: true,
  },
  usersCompletedTraining: {
    type: Number,
    required: true,
  },
  negativeBehaviorLogGraph: {
    type: [Number],
    required: true,
  },
  cumulativeTrainingHours: {
    type: [Number],
    required: true,
  },
});

const AnalyticsModel =
  (mongoose.models.Analytics as mongoose.Model<Analytics>) ||
  mongoose.model<Analytics>("Analytics", AnalyticsSchema);

export default AnalyticsModel;
