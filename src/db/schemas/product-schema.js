import {Schema} from 'mongoose';

const ProductSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: false,
      },
      brand: {
        type: String,
        required: true,
      },
      sex: {
        type: String,
        required: true,
      },
      colors: [
        {
          color: {
            type: Schema.Types.ObjectId,
            ref: 'colors',
          },
        },
      ],
      sizes: [
        {
          size: {
            type: Schema.Types.ObjectId,
            ref: 'sizes',
          },
        },
      ],
      categories: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
        required: true,
      },
      modelNumber: {
        type: String,
        required: true,
        default: '0',
      },
      season: {
        type: String,
        required: true,
        default: 'S/S',
      },
      view: {
        type: Number,
        required: true,
        default: 0,
      },
      deliveryStart: {
        type: String,
        required: true,
        default: '220603',
      },
      deliveryMethod: {
        type: String,
        required: true,
        default: '입점사 배송',
      },
      detailImage: {
        type: String,
        required: true,
      },
    },
    {
      collection: 'products',
      timestamps: true,
    },
);

export {ProductSchema};
