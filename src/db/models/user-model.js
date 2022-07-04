import {model} from 'mongoose';
import {UserSchema} from '../schemas/user-schema';
import {WithdrawalSchema} from '../schemas/withdrawal-schema';

const User = model('users', UserSchema);
const Withdrawal = model('Withdrawals', WithdrawalSchema);

export class UserModel {
  async findByEmail(email) {
    const user = await User.findOne({email});
    return user;
  }

  async findById(userId) {
    const user = await User.findOne({_id: userId});
    return user;
  }

  async create(userInfo) {
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }

  async findAll() {
    const users = await User.find({})
        .sort({createdAt: -1});
    return users;
  }

  async update({userId, update}) {
    const filter = {_id: userId};
    const option = {returnOriginal: false};

    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  async delete(userId) {
    const user = await User.findById({_id: userId});
    const withdrawalUser = await Withdrawal.create({email: user.email, fullName: user.fullName, password: user.password});
    await User.findOneAndDelete({_id: userId});
    return withdrawalUser.fullName;
  }
}

const userModel = new UserModel();

export {userModel};
