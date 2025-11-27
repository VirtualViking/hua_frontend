"use client";

import { useState } from "react";
import { Project, projectService } from "@/services/ProjectService";
import { X } from "lucide-react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export default function ProjectModal({ isOpen, onClose, onSaved }: ProjectModalProps) {
  const [formData, setFormData] = useState<Project>({
    title: "",
    description: "",
    goalAmount: 0,
    currentAmount: 0,
    imageUrl: ""
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await projectService.create(formData);
      onSaved();
      onClose();
      setFormData({ title: "", description: "", goalAmount: 0, currentAmount: 0, imageUrl: "" });
    } catch (error) {
      alert("Error al guardar el proyecto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#1E3A5F]">Nuevo Proyecto</h2>
          <button onClick={onClose}><X className="w-6 h-6 text-gray-400" /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Proyecto</label>
            <input required type="text"
              className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta ($)</label>
              <input required type="number" min="0"
                className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.goalAmount} onChange={(e) => setFormData({ ...formData, goalAmount: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Recaudado Actual ($)</label>
              <input required type="number" min="0"
                className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.currentAmount} onChange={(e) => setFormData({ ...formData, currentAmount: Number(e.target.value) })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Imagen (URL)</label>
            <input type="url" placeholder="https://..."
              className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea required rows={3}
              className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancelar</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-[#1E3A5F] text-white rounded-lg hover:bg-[#152a45] disabled:opacity-50">
              {loading ? "Guardando..." : "Guardar Proyecto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}