import mongoose from "mongoose";

const listSchema = new mongoose.Schema(
  {
    agent: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        firstName: { type: String, required: true },
        phone: { type: String, required: true },
        notes: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const List = mongoose.model("List", listSchema);

export default List;
