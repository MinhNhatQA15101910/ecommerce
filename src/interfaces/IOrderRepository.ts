import { Order, OrderEvent, PrismaClient } from "@prisma/client";
import { ITXClientDenyList } from "@prisma/client/runtime/library";

export interface IOrderRepository {
  _createOrder(
    prisma: Omit<PrismaClient, ITXClientDenyList>,
    orderData: any
  ): Promise<Order>;
  _createOrderEvent(
    prisma: Omit<PrismaClient, ITXClientDenyList>,
    orderEventData: any
  ): Promise<OrderEvent>;
}
