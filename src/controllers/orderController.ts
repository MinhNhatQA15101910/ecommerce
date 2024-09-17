import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { IPrismaService } from "../interfaces/IPrismaService";
import { INTERFACE_TYPE } from "../utils/appConst";
import { ICartRepository } from "../interfaces/ICartRepository";
import { IAddressRepository } from "../interfaces/IAddressRepository";
import { IOrderRepository } from "../interfaces/IOrderRepository";

@injectable()
export class OrderController {
  private _prismaService: IPrismaService;
  private _addressRepository: IAddressRepository;
  private _cartRepository: ICartRepository;
  private _orderRepository: IOrderRepository;

  constructor(
    @inject(INTERFACE_TYPE.PrismaService)
    prismaService: IPrismaService,
    @inject(INTERFACE_TYPE.AddressRepository)
    addressRepository: IAddressRepository,
    @inject(INTERFACE_TYPE.CartRepository) cartRepository: ICartRepository,
    @inject(INTERFACE_TYPE.OrderRepository) orderRepository: IOrderRepository
  ) {
    this._prismaService = prismaService;
    this._addressRepository = addressRepository;
    this._cartRepository = cartRepository;
    this._orderRepository = orderRepository;
  }

  async createOrder(req: any, res: Response) {
    return await this._prismaService.createTransaction(async (prisma) => {
      const cartItems = await this._cartRepository._getCartById(
        prisma,
        req.user.id
      );

      if (cartItems.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }

      const price = cartItems.reduce((prev, current) => {
        return prev + +current.product.price * current.quantity;
      }, 0);

      console.log(price);

      const address = await this._addressRepository._getAddressById(
        prisma,
        req.user.defaultShippingAddressId
      );

      const order = await this._orderRepository._createOrder(prisma, {
        userId: req.user.id,
        netAmount: price,
        address: address.formattedAddress,
        products: {
          create: cartItems.map((item) => {
            return {
              productId: item.productId,
              quantity: item.quantity,
            };
          }),
        },
      });

      await this._orderRepository._createOrderEvent(prisma, {
        orderId: order.id,
      });

      await this._cartRepository._emptyCart(prisma, req.user.id);

      return res.json(order);
    });
  }

  async getOrders(req: Request, res: Response) {}

  async cancelOrder(req: Request, res: Response) {}

  async getOrderById(req: Request, res: Response) {}
}
