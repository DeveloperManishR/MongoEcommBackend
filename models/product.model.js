import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, required: true },
    rating: { type: Number, required: true },
    stock: { type: Number, required: true },
    warrantyInformation: { type: String, required: true },
    shippingInformation: { type: String, required: true },
    availabilityStatus: { type: String, required: true },
    returnPolicy: { type: String, required: true },
    minimumOrderQuantity: { type: Number, required: true },
    images: [{ type: String, required: true }],
    thumbnail: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", productSchema);
