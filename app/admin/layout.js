import Sidebar from "@/src/features/admin/components/Sidebar";
import ProtectedRoute from "@/src/components/layout/ProtectedRoute";

export default function AdminLayout({ children }) {
  return (
    <ProtectedRoute roles={["ADMIN", "SUPPLIER"]}>
      <div className="flex min-h-screen">
        {/* Persistent Sidebar */}
        <Sidebar />
        
        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 pt-20 lg:pt-6 bg-paper2">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}