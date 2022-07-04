import {Schema} from 'mongoose';

const ColorSchema = new Schema(
    {
      colorName: {
        type: String,
        required: true,
      },
    },
    {
      collection: 'colors',
      timestamps: true,
    },
);
ColorSchema.set('toObject', {getters: true});
export {ColorSchema};
