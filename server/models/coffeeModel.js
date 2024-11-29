import mongoose from "mongoose";

const coffeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { minimize: false }
);

const coffeeModel =
  mongoose.models.coffee || mongoose.model("coffee", coffeeSchema);
export default coffeeModel;
