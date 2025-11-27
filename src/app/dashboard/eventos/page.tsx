"use client";

import { useEffect, useState } from "react";
import { eventService, Event } from "@/services/EventService";
import { Trash2, Plus, Calendar, MapPin } from "lucide-react";
import EventModal from "@/components/admin/EventModal";

export default function EventosPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => { loadEvents(); }, []);

  const loadEvents = async () => {
    try {
      const data = await eventService.getAll();
      setEvents(data);
    } catch (error) { console.error(error); } 
    finally { setLoading(false); }
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Eliminar este evento?")) {
      await eventService.delete(id);
      loadEvents();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#1E3A5F]">Gestión de Eventos</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-[#1E3A5F] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#152a45]">
          <Plus className="w-5 h-5" /> <span>Nuevo Evento</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-600">Imagen</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Evento</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Fecha</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Ubicación</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? ( <tr><td colSpan={5} className="p-4 text-center">Cargando...</td></tr> ) : 
             events.length === 0 ? ( <tr><td colSpan={5} className="p-4 text-center text-gray-500">No hay eventos</td></tr> ) : 
             ( events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <img src={event.imageUrl || "https://via.placeholder.com/100"} alt={event.title} className="w-16 h-10 object-cover rounded-md border" />
                  </td>
                  <td className="p-4 font-medium text-gray-900">{event.title}</td>
                  <td className="p-4 text-gray-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> {new Date(event.date).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-gray-600">
                    <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {event.location}</div>
                  </td>
                  <td className="p-4">
                    <button onClick={() => event.id && handleDelete(event.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <EventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSaved={loadEvents} />
    </div>
  );
}