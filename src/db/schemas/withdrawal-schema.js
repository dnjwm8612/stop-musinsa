import {Schema} from 'mongoose';

const WithdrawalSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 1209600,
    default: Date.now,
  },
},
{
  collection: 'withdrawals',
  timestamps: true,
});

export {WithdrawalSchema};
