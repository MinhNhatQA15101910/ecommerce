import { injectable } from "inversify";
import { IOrderRepository } from "../interfaces/IOrderRepository";
import { Order, OrderEvent, PrismaClient } from "@prisma/client";
import { ITXClientDenyList } from "@prisma/client/runtime/library";

@injectable()
export class OrderRepository implements IOrderRepository {
  async _createOrder(
    prisma: Omit<PrismaClient, ITXClientDenyList>,
    orderData: any
  ): Promise<Order> {
    const order = await prisma.order.create({
      data: orderData,
    });
    return order;
  }

  async _createOrderEvent(
    prisma: Omit<PrismaClient, ITXClientDenyList>,
    orderEventData: any
  ): Promise<OrderEvent> {
    const orderEvent = await prisma.orderEvent.create({
      data: orderEventData,
    });
    return orderEvent;
  }
}
