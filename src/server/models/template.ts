import mongoose from "mongoose";

const TemplateSchema = new mongoose.Schema({
  title: String,
  options: [
    {
      name: String,
      state: [String],
      triggered: Boolean,
    },
  ],
});

const Template =
  mongoose.models.template || mongoose.model("template", TemplateSchema);

export default Template;
