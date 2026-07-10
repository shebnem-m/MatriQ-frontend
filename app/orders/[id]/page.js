"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { getOrderById } from "../api";


export default function OrderDetailsPage() {

  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {

    if (!id) return;

    getOrderById(id)
      .then(setOrder)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));

  }, [id]);



  if (loading) {
    return (
      <p className="p-8 text-gray-600">
        Loading order...
      </p>
    );
  }



  if (error) {
    return (
      <p className="p-8 text-rust">
        {error}
      </p>
    );
  }



  return (
    <div className="
      min-h-screen
      bg-stone-50
      px-6
      py-12
    ">

      <div className="
        max-w-4xl
        mx-auto
      ">


        {/* Back */}
        <Link
            href="/orders"
            className="
                inline-flex
                items-center
                gap-2
                text-sm
                text-gray-600
                hover:text-rust
                transition
                mb-8
            "
        >
        <span className="
            text-lg
            leading-none
            -translate-y-[1px]
        ">
            ←
        </span>

        <span>
            Back to orders
        </span>
        </Link>



        {/* Header */}
        <div className="
          rounded-xl
          bg-white
          border
          border-stone-200
          p-8
          shadow-sm
        ">


          <div className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
          ">

            <div>

              <p className="
                text-sm
                text-gray-500
              ">
                Order
              </p>


              <h1 className="
                mt-1
                font-display
                text-3xl
                font-bold
                text-rust
              ">
                #{order.id.slice(0,8).toUpperCase()}
              </h1>

            </div>


            <StatusBadge status={order.status}/>

          </div>


        </div>



        {/* Details */}
        <div className="
          mt-6
          rounded-xl
          bg-white
          border
          border-stone-200
          p-8
          shadow-sm
        ">

          <h2 className="
            font-display
            text-xl
            font-bold
            text-gray-900
            mb-6
          ">
            Order Information
          </h2>


          <div className="
            grid
            sm:grid-cols-2
            gap-6
          ">


            <Info
              label="Listing ID"
              value={order.listingId}
            />


            <Info
              label="Quantity"
              value={order.quantity}
            />


            <Info
              label="Unit Price"
              value={`${order.unitPrice} AZN`}
            />


            <Info
              label="Total Price"
              value={`${order.totalPrice} AZN`}
            />


            <Info
              label="Created"
              value={formatDate(order.createdAt)}
            />


            <Info
              label="Updated"
              value={formatDate(order.updatedAt)}
            />


          </div>

        </div>


      </div>

    </div>
  );
}

