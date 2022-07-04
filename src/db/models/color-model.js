import {model} from 'mongoose';
import {ColorSchema} from '../schemas/color-schema';

const Color = model('colors', ColorSchema);

export class ColorModel {
  async create(colorName) {
    const color = await Color.create({colorName});
    return color;
  }

  async update(colorId, updateName) {
    const filter = {_id: colorId};
    const updateData = {colorName: updateName};
    const option = {returnOriginal: false};

    const updatedColor = await Color.findOneAndUpdate(filter, updateData, option);
    return updatedColor;
  }

  async delete(colorId) {
    if (!colorId) {
      await Color.deleteMany();
    }
    await Color.deleteOne({_id: colorId});
  }

  async findById(colorId) {
    const color = await Color.findOne({_id: colorId});
    return color;
  }

  async findAll() {
    const color = await Color.find().sort({createdAt: -1});
    return color;
  }

  async findByName(colorName) {
    const color = await Color.findOne({colorName}).lean();
    return color;
  }
}

const colorModel = new ColorModel();

export {colorModel};
