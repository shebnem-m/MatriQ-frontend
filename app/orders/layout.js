import ProtectedRoute from "@/src/components/layout/ProtectedRoute";

export default function OrdersLayout({ children }) {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  );
}