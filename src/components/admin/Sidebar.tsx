"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Heart, 
  LogOut,
  FolderHeart
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const menuItems = [
  { name: "Resumen", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Niños (Apadrinar)", icon: Users, href: "/dashboard/ninos" },
  { name: "Eventos", icon: Calendar, href: "/dashboard/eventos" },
  { name: "Proyectos", icon: FolderHeart, href: "/dashboard/proyectos" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col fixed left-0 top-0 h-full z-10">
      {/* Logo Area */}
      <div className="p-6 border-b border-gray-100 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-[#1E3A5F]">Huahuacuna</h1>
        <img src="/logo.png" alt="Logo" className="w-10 h-10 ml-2" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive
                  ? "bg-[#1E3A5F] text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-50 hover:text-[#1E3A5F]"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Footer */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-xl transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}