import {Schema} from 'mongoose';

const CategorySchema = new Schema(
    {
      item: {
        type: String,
        required: true,
      },
      subItem: {
        type: String,
        required: true,
      },
    },
    {
      collection: 'categories',
      timestamps: true,
    },
);

export {CategorySchema};
