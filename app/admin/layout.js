import Sidebar from "@/src/features/admin/components/Sidebar";
import AdminNavbar from "@/src/features/admin/components/AdminNavbar";
import ProtectedRoute from "@/src/components/layout/ProtectedRoute";

export default function AdminLayout({ children }) {
  return (
    
    <ProtectedRoute requiredRoles={["ADMIN", "SUPPLIER"]}>
      <div className="flex min-h-screen">
        {/* Persistent Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex min-w-0 flex-1 flex-col">
          <AdminNavbar />
          <div className="flex-1 bg-paper2 p-4 sm:p-6">
            {children}
          </div>
        </div>
      </div>
    </ProtectedRoute>
    );
}