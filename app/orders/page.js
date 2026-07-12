"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { getMyOrders } from "./api";
import Pagination from "@/src/features/orders/components/Pagination";

import OrderFilters from "@/src/features/orders/components/OrderFilters";
import OrderList from "@/src/features/orders/components/OrderList";

export default function OrderHistoryPage() {
  const { user, loading: authLoading } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [pageData, setPageData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  const filteredOrders =
  selectedStatus === "ALL"
    ? orders
    : orders.filter(
        order => order.status === selectedStatus
      );

    
    const totalPages = Math.ceil(
        filteredOrders.length / pageSize
    );


    const safePage =
        currentPage >= totalPages
        ? 0
        : currentPage;


    const paginatedOrders = filteredOrders.slice(
        safePage * pageSize,
        safePage * pageSize + pageSize
    );  

    function handleStatusChange(status) {
        setSelectedStatus(status);
        setCurrentPage(0);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    function handleStatusChange(status) {
        setSelectedStatus(status);
        setCurrentPage(0);
    }

  useEffect(() => {
    if (authLoading || !user) return;

    getMyOrders(user.id, 0, 1000)
      .then((data) => {
        setOrders(data.content);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [authLoading, user]);


  if (authLoading || loading) {
    return (
      <p className="p-8 text-gray-600">
        Loading orders...
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
    <div className="min-h-screen bg-stone-50 px-6 py-12">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="
            font-display
            text-4xl
            font-bold
            text-rust
          ">
            Your Orders
          </h1>

          <p className="mt-2 text-gray-600">
            Track and manage your previous purchases.
          </p>
        </div>


        {/* Main layout */}
        <div className="
          flex
          flex-col
          gap-8
          lg:flex-row
        ">

          {/* Sidebar */}
          <OrderFilters
            selectedStatus={selectedStatus}
            onStatusChange={handleStatusChange}
           />


          {/* Orders */}
          <main className="flex-1">

            {orders.length === 0 ? (
              <div className="
                rounded-xl
                border
                border-stone-200
                bg-white
                p-8
                text-center
              ">
                <p className="text-gray-600">
                  No orders yet.
                </p>
              </div>
            ) : (
                <>
                    <OrderList orders={paginatedOrders} />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>
            )}


          </main>

        </div>

      </div>

    </div>
  );
}