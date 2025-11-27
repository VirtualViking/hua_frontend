"use client";

import { useState } from "react";
import { Child, childService } from "@/services/ChildService";
import { X } from "lucide-react";

interface ChildModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void; // Para recargar la tabla al guardar
}

export default function ChildModal({ isOpen, onClose, onSaved }: ChildModalProps) {
  const [formData, setFormData] = useState<Partial<Child>>({
    firstName: "",
    lastName: "",
    birthDate: "",
    story: "",
    imageUrl: "",
    status: "AVAILABLE"
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // @ts-ignore
      await childService.create(formData as Child);
      onSaved(); // Recargar lista
      onClose(); // Cerrar modal
      // Limpiar formulario
      setFormData({ firstName: "", lastName: "", birthDate: "", story: "", imageUrl: "", status: "AVAILABLE" });
    } catch (error) {
      alert("Error al guardar el niño");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl animate-in fade-in zoom-in duration-200">
        
        {/* Encabezado */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#1E3A5F]">Registrar Nuevo Niño</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                required
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
              <input
                required
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento</label>
            <input
              required
              type="date"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL de la Foto</label>
            <input
              type="url"
              placeholder="https://ejemplo.com/foto.jpg"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            />
            <p className="text-xs text-gray-500 mt-1">Pega aquí el enlace directo a la imagen.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Historia / Biografía</label>
            <textarea
              required
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none text-gray-900"
              value={formData.story}
              onChange={(e) => setFormData({ ...formData, story: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#1E3A5F] text-white rounded-lg hover:bg-[#152a45] transition-colors disabled:opacity-50"
            >
              {loading ? "Guardando..." : "Guardar Niño"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}