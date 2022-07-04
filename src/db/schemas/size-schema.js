import {Schema} from 'mongoose';

const SizeSchema = new Schema(
    {
      sizeName: {
        type: String,
        required: true,
      },
    },
    {
      collection: 'sizes',
      timestamps: true,
    },
);

export {SizeSchema};
