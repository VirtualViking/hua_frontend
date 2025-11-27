"use client";

import { useEffect, useState } from "react";
import { childService, Child } from "@/services/ChildService";
import { Trash2, Plus, Edit } from "lucide-react";
import ChildModal from "@/components/admin/ChildModal";

export default function NinosPage() {
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir/cerrar modal

  // Cargar niños al entrar
  useEffect(() => {
    loadChildren();
  }, []);

  const loadChildren = async () => {
    try {
      const data = await childService.getAll();
      setChildren(data);
    } catch (error) {
      console.error("Error cargando niños:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás segura de eliminar este registro?")) {
      await childService.delete(id);
      loadChildren(); // Recargar la lista
    }
  };

  return (
    <div>
      {/* Cabecera */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#1E3A5F]">Gestión de Niños</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1E3A5F] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#152a45] transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Nuevo Niño</span>
        </button>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-600">Foto</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Nombre</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Edad</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Estado</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={5} className="p-4 text-center">Cargando...</td></tr>
            ) : children.length === 0 ? (
              <tr><td colSpan={5} className="p-4 text-center text-gray-500">No hay niños registrados</td></tr>
            ) : (
              children.map((child) => (
                <tr key={child.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <img 
                      src={child.imageUrl || "https://ui-avatars.com/api/?name=" + child.firstName} 
                      alt={child.firstName} 
                      className="w-10 h-10 rounded-full object-cover border"
                      onError={(e) => {
                        // Si la imagen falla, pone una por defecto
                        (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + child.firstName;
                      }}
                    />
                  </td>
                  <td className="p-4 font-medium text-gray-900">{child.firstName} {child.lastName}</td>
                  <td className="p-4 text-gray-600">{child.age} años</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      child.status === 'AVAILABLE' ? 'bg-green-100 text-green-700' :
                      child.status === 'SPONSORED' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {child.status === 'AVAILABLE' ? 'Disponible' : 
                       child.status === 'SPONSORED' ? 'Apadrinado' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => child.id && handleDelete(child.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* EL MODAL AQUÍ */}
      <ChildModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSaved={loadChildren} 
      />
    </div>
  );
}