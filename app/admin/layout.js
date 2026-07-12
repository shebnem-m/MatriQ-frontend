import Sidebar from "@/src/features/admin/components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Persistent Sidebar */}
      <Sidebar />
      
      {/* Main Content Area where nested page.js contents will render */}
      <main className="flex-1 p-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
}