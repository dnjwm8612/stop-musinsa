import {model} from 'mongoose';
import {SizeSchema} from '../schemas/size-schema';

const Size = model('sizes', SizeSchema);

export class SizeModel {
  async create(sizeName) {
    const size = await Size.create({sizeName});
    return size;
  }

  async update(sizeId, updateName) {
    const filter = {_id: sizeId};
    const updateData = {sizeName: updateName};
    const option = {returnOriginal: false};

    const updatedSize = await Size.findOneAndUpdate(filter, updateData, option);
    return updatedSize;
  }

  async findById(sizeId) {
    const size = await Size.findOne({_id: sizeId});
    return size;
  }

  async findAll() {
    const size = await Size.find();
    return size;
  }

  async findByName(sizeName) {
    const size = await Size.findOne({sizeName});
    return size;
  }

  async delete(sizeId) {
    if (!sizeId) {
      await Size.deleteMany();
    }
    await Size.deleteOne({_id: sizeId});
  }
}

const sizeModel = new SizeModel();

export {sizeModel};
