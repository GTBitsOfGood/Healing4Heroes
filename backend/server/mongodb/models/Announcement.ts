import mongoose from "mongoose";
import { Announcement } from "src/utils/types";

const AnnouncementSchema = new mongoose.Schema<Announcement>({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
    index: true,
  },
});

const AnnouncementModel =
  (mongoose.models.Announcement as mongoose.Model<Announcement>) ||
  mongoose.model<Announcement>("Announcement", AnnouncementSchema);
export default AnnouncementModel;
