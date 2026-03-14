import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IOrder extends Document {
  user: Types.ObjectId;
  items: {
    product: Types.ObjectId;
    quantity: number;
    price: number;
  }[];
  total: number;
  shippingAddress?: {
    name?: string;
    email?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  paymentIntentId: string;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  }],
  total: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    name: String,
    email: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  paymentIntentId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'shipped', 'delivered'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);