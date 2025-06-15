import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Address subdocument
const AddressSchema = new Schema({
  street: String,
  city: String,
  state: String,
  postalCode: String,
  country: String,
});

// Product Variant subdocument
const VariantSchema = new Schema({
  color: String,
  size: String,
  price: Number,
  stock: Number,
});

// Product Schema
const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    category: {
      type: String,
      enum: ["electronics", "fashion", "home", "books"],
      required: true,
    },
    price: { type: Number, required: true },
    variants: [VariantSchema],
    images: [String],
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// User Schema
const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    addresses: [AddressSchema],
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

// Order Schema
const OrderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        variant: VariantSchema,
        quantity: Number,
        price: Number,
      },
    ],
    shippingAddress: AddressSchema,
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    status: {
      type: String,
      enum: ["placed", "shipped", "delivered", "cancelled"],
      default: "placed",
    },
    totalAmount: Number,
  },
  { timestamps: true }
);

// Middleware Example
OrderSchema.pre("save", function (next) {
  this.totalAmount = this.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  next();
});

// Virtual Example
UserSchema.virtual("orderCount", {
  ref: "Order",
  localField: "_id",
  foreignField: "user",
  count: true,
});

export const Product = model("Product", ProductSchema);
export const User = model("User", UserSchema);
export const Order = model("Order", OrderSchema);
