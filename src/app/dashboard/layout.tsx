import Sidebar from "@/components/admin/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* El Sidebar fijo a la izquierda */}
      <Sidebar />

      {/* El contenido cambiante a la derecha */}
      {/* ml-64 deja el espacio para que el sidebar no tape el contenido */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}