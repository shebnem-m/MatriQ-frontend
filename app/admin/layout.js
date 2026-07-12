import Sidebar from "@/src/features/admin/components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Persistent Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 pt-20 lg:pt-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
}