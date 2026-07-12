import Link from "next/link";

export default function OrderRow({ order }) {
  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div
      className="
        rounded-xl
        border
        border-stone-200
        bg-white
        p-5
        shadow-sm
        transition
        hover:border-rust/40
        hover:shadow-md
      "
    >

      {/* Desktop version */}
      <div
        className="
          hidden
          md:flex
          items-center
          justify-between
          gap-6
        "
      >

        <OrderInfo label="Order">
          #{order.id.slice(0, 8).toUpperCase()}
        </OrderInfo>


        <OrderInfo label="Status">
          <StatusBadge status={order.status} />
        </OrderInfo>


        <OrderInfo label="Quantity">
          {order.quantity}
        </OrderInfo>


        <OrderInfo label="Total">
          {order.totalPrice} AZN
        </OrderInfo>


        <OrderInfo label="Date">
          {formatDate(order.createdAt)}
        </OrderInfo>


        <DetailsButton id={order.id} />

      </div>


      {/* Mobile version */}
      <div className="md:hidden space-y-4">

        <div className="flex justify-between items-center">
          <h3 className="
            font-display
            font-semibold
            text-gray-900
          ">
            #{order.id.slice(0, 8).toUpperCase()}
          </h3>

          <StatusBadge status={order.status} />
        </div>


        <div className="space-y-3 text-sm">

          <MobileInfo
            label="Quantity"
            value={order.quantity}
          />

          <MobileInfo
            label="Total"
            value={`${order.totalPrice} AZN`}
          />

          <MobileInfo
            label="Date"
            value={formatDate(order.createdAt)}
          />

        </div>


        <DetailsButton id={order.id} />

      </div>

    </div>
  );
}



function OrderInfo({ label, children }) {
  return (
    <div>
      <p className="
        text-xs
        uppercase
        tracking-wide
        text-gray-500
      ">
        {label}
      </p>

      <div className="
        mt-1
        text-sm
        font-medium
        text-gray-900
      ">
        {children}
      </div>
    </div>
  );
}



function MobileInfo({ label, value }) {
  return (
    <div className="flex justify-between">

      <span className="text-gray-500">
        {label}
      </span>

      <span className="
        font-medium
        text-gray-900
      ">
        {value}
      </span>

    </div>
  );
}



function StatusBadge({ status }) {
  return (
    <span
      className={`
        inline-flex
        rounded-full
        border
        px-3
        py-1
        text-xs
        font-medium
        ${getStatusStyle(status)}
      `}
    >
      {status}
    </span>
  );
}



function getStatusStyle(status) {
  switch (status) {
    case "PENDING":
      return "bg-orange-50 text-orange-700 border-orange-200";

    case "CONFIRMED":
      return "bg-blue-50 text-blue-700 border-blue-200";

    case "SHIPPED":
      return "bg-purple-50 text-purple-700 border-purple-200";

    case "COMPLETED":
      return "bg-green-50 text-green-700 border-green-200";

    case "CANCELLED":
      return "bg-red-50 text-red-700 border-red-200";

    default:
      return "bg-stone-50 text-stone-700 border-stone-200";
  }
}



function DetailsButton({ id }) {
  return (
    <Link
      href={`/orders/${id}`}
      className="
        inline-flex
        justify-center
        rounded-lg
        bg-rust
        px-4
        py-2
        text-sm
        font-medium
        text-white
        transition
        hover:brightness-95
      "
    >
      Details
    </Link>
  );
}