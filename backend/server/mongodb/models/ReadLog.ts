import mongoose, { Schema } from "mongoose";
import { ReadLog } from "src/utils/types";

const ReadLogSchema = new mongoose.Schema<ReadLog>({
  announcement: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  readAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const ReadLogModel =
  (mongoose.models.ReadLog as mongoose.Model<ReadLog>) ||
  mongoose.model<ReadLog>("ReadLog", ReadLogSchema);

export default ReadLogModel;
