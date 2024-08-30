import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const dataSchema = new Schema(
  {
    intensity: Number,
    likelihood: Number,
    relevance: Number,
    end_year: String,
    sector: String,
    topic: String,
    region: String,
    country: String,
    city: String,
    pestle: String,
    source: String,
    swot: String,
  },
  { timestamps: true, collection: "datas" }
);

const Datas = model("Datas", dataSchema);

export default Datas;