import {model} from 'mongoose';
import {OrderSchema} from '../schemas/order-schema';

const Order = model('orders', OrderSchema);

export class OrderModel {
  // 주문 조회
  async findById(orderId) {
    const order = await Order.findOne({_id: orderId}).populate('products.product');
    return order;
  }

  // 주문 조회 목록(회원)
  async findByUserId(userId) {
    const orderList = await Order.find({userId: userId}).populate('products.product').sort({createdAt: -1});
    return orderList;
  }

  // 주문 조회 목록(비회원)
  async findByNamePhoneNumber(fullname, phoneNumber) {
    const filter = {fullname: fullname, phoneNumber: phoneNumber};
    const orderList = await Order.find(filter).populate('products.product').sort({createdAt: -1});
    return orderList;
  }

  // 주문 조회(관리자)
  async findAll() {
    const orders = await Order.find({}).populate('products.product').sort({createdAt: -1});
    return orders;
  }

  // 주문 추가
  async create(orderInfo) {
    const createdNewOrder = await Order.create(orderInfo);
    return createdNewOrder;
  }

  // 주문 상태 변경(취소, 완료)
  async update(orderId, update) {
    const filter = {_id: orderId};
    const option = {returnOriginal: false};

    const updatedOrder = await Order.findByIdAndUpdate(filter, update, option);
    return updatedOrder;
  }
}

const orderModel = new OrderModel();

export {orderModel};
