"use client";

import { useState } from "react";
import { Event, eventService } from "@/services/EventService";
import { X } from "lucide-react";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export default function EventModal({ isOpen, onClose, onSaved }: EventModalProps) {
  const [formData, setFormData] = useState<Event>({
    title: "",
    description: "",
    date: "",
    location: "",
    imageUrl: ""
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await eventService.create(formData);
      onSaved();
      onClose();
      setFormData({ title: "", description: "", date: "", location: "", imageUrl: "" });
    } catch (error) {
      alert("Error al guardar el evento");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#1E3A5F]">Nuevo Evento</h2>
          <button onClick={onClose}><X className="w-6 h-6 text-gray-400" /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título del Evento</label>
            <input required type="text"
              className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha y Hora</label>
              <input required type="datetime-local"
                className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
              <input required type="text"
                className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
              {loading ? "Guardando..." : "Guardar Evento"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}