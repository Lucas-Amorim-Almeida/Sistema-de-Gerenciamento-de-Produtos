export enum OrderStatus {
  PENDING = "PENDING", // Pedido aguardando confirmação ou pagamento
  PROCESSING = "PROCESSING", // Pedido em processamento
  SHIPPED = "SHIPPED", // Pedido enviado ao cliente
  DELIVERED = "DELIVERED", // Pedido entregue ao cliente
  FINISHED = "FINISHED", // Pedido concluído com sucesso
  CANCELED = "CANCELED", // Pedido cancelado pelo cliente ou pelo sistema
  RETURN_REQUESTED = "RETURN_REQUESTED", // Cliente solicitou devolução
  RETURNED = "RETURNED", // Pedido devolvido com sucesso
  FAILED = "FAILED", // Falha na finalização (ex.: pagamento negado)
  REFUNDED = "REFUNDED", // Pedido reembolsado após cancelamento ou devolução
}
