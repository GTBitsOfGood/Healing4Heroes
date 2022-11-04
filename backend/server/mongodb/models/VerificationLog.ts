import mongoose, { Schema } from "mongoose";
import { UserVerificationLogType, VerificationLog } from "src/utils/types";

const VerificationLogSchema = new mongoose.Schema<VerificationLog>({
  code: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: UserVerificationLogType,
    required: true,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
  },
  expired: {
    type: Boolean,
    required: true,
  },
});

const VerificationLogModel =
  (mongoose.models.VerificationLog as mongoose.Model<VerificationLog>) ||
  mongoose.model<VerificationLog>("VerificationLog", VerificationLogSchema);

export default VerificationLogModel;
