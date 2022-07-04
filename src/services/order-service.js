import {orderModel} from '../db';
import jwt from 'jsonwebtoken';

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  // 고객 주문 내역 조회
  async getOrder(orderInfo) {
    const userId = orderInfo.userId || nonMemberId;
    const fullname = orderInfo.fullname || '';
    const phoneNumber = orderInfo.phoneNumber || '';
    const orderList = userId === nonMemberId ?
        await this.orderModel.findByNamePhoneNumber(fullname, phoneNumber) :
        await this.orderModel.findByUserId(userId);

    if (!orderList) {
      throw new Error('주문 내역이 없습니다. 다시 한 번 확인해 주세요.');
      return;
    }

    return orderList;
  }

  // 전체 주문 내역 확인(운영자)
  async getOrders() {
    const orders = await this.orderModel.findAll();
    return orders;
  }

  // 주문 추가
  async addOrder(orderInfo) {
    const {token} = orderInfo;
    if (token) {
      const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
      const jwtDecoded = jwt.verify(token, secretKey);
      const {userId} = jwtDecoded;

      orderInfo.userId = userId;
    }
    delete orderInfo.token;
    console.log(orderInfo);
    const createNewOrder = await this.orderModel.create(orderInfo);
    return createNewOrder;
  }

  // 주문 상태 변경(취소, 완료)
  async setOrder(orderInfo) {
    // 일치하는 주문 여부 확인
    const metchOrder = await this.orderModel.findById(orderInfo.orderId);
    if (!metchOrder) {
      throw new Error('해당 주문이 존재하지 않습니다. 다시 한 번 확인해 주세요.');
      return;
    }

    const updateOrder =
        await this.orderModel.update(orderInfo.orderId, {state: orderInfo.state});
    return updateOrder;
  }
}

const orderService = new OrderService(orderModel);
const nonMemberId = 'Non-member';

export {orderService};
