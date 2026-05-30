import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { OrdersService } from "./orders.service";

/**
 * Endpoints de órdenes médicas:
 *
 *  POST /orders        — crea orden, dispara firma, retorna ID + URL PDF
 *  GET  /orders/:id    — consulta estado de orden (público con QR)
 *  GET  /orders/:id/pdf — descarga PDF firmado
 *
 * El frontend Next.js puede llamar estos endpoints directamente,
 * pero para el MVP también provee los mismos endpoints en
 * apps/web/src/app/api/ (Next.js API routes) para simplificar deploys.
 */
@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() dto: any) {
    return this.ordersService.create(dto);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.ordersService.findById(id);
  }
}
