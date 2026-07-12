import OrderRow from "./OrderRow";

export default function OrderList({ orders }) {
  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <OrderRow
          key={order.id}
          order={order}
        />
      ))}
    </div>
  );
}