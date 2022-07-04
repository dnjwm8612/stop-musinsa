import {Schema} from 'mongoose';

const OrderSchema = new Schema(
    {
      products: [{
        product: {
          type: Schema.Types.ObjectId,
          ref: 'products',
          required: true,
        },
        count: {
          type: Number,
          required: true,
        },
      }],
      userId: {
        type: String,
        required: true,
        default: 'Non-member',
      },
      fullname: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      address: {
        type: new Schema(
            {
              postalCode: String,
              address1: String,
              address2: String,
            },
            {
              _id: false,
            },
        ),
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
      paymentMethod: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
        default: '준비중',
      },
    },
    {
      collection: 'orders',
      timestamps: true,
    },
);

export {OrderSchema};
