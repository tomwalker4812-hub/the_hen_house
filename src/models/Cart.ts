import mongoose, { Schema, Document } from "mongoose";

export interface ICart extends Document {
  user?: mongoose.Types.ObjectId;
  sessionId?: string;
  items: {
    product: mongoose.Types.ObjectId;
    quantity: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const CartSchema = new Schema<ICart>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    sessionId: {
      type: String,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Ensure either user or sessionId exists
CartSchema.pre<ICart>("save", function (next: any) {
  if (!this.user && !this.sessionId) {
    return next(new Error("Either user or sessionId must be provided"));
  }

  next();
});

export default mongoose.models.Cart ||
  mongoose.model<ICart>("Cart", CartSchema);
  