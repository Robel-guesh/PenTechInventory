const goodsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  unitOfMeasureId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Measurement",
    required: true,
  },
  qty: { type: Number, required: true },
  photo: { type: String, required: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  description: { type: String, required: true },
  shortageLevel: { type: Number, required: true },
});

const Goods = mongoose.model("Goods", goodsSchema);
