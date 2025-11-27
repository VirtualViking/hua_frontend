"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/ui/Navbar";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Footer from "@/components/ui/Footer";
import { eventService, Event } from "@/services/EventService";
import { Calendar, MapPin, Clock } from "lucide-react";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventService.getAll();
        setEvents(data);
      } catch (error) {
        console.error("Error cargando eventos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 font-['Poppins']">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumb items={[{ label: "Eventos" }]} />
      </div>

      {/* Header */}
      <section className="bg-white pb-12 pt-6">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-[#1E3A5F] mb-4">Próximos Eventos</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Participa en nuestras actividades, talleres y encuentros comunitarios. ¡Te esperamos!
          </p>
        </div>
      </section>

      {/* Lista de Eventos */}
      <section className="py-12 max-w-6xl mx-auto px-6">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E3A5F]"></div>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900">No hay eventos programados</h3>
            <p className="text-gray-500">Vuelve pronto para conocer nuestras próximas actividades.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col md:flex-row h-full">
                {/* Imagen (Izquierda o Arriba) */}
                <div className="md:w-2/5 h-48 md:h-auto relative bg-gray-200">
                  <img
                    src={event.imageUrl || "/placeholder-event.jpg"}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/300x400?text=Evento")}
                  />
                  {/* Fecha Flotante */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-lg p-2 text-center shadow-sm min-w-[60px]">
                    <div className="text-xs text-gray-500 font-bold uppercase">
                      {new Date(event.date).toLocaleDateString('es-ES', { month: 'short' })}
                    </div>
                    <div className="text-xl font-bold text-[#1E3A5F]">
                      {new Date(event.date).getDate()}
                    </div>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6 md:w-3/5 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#1E3A5F] mb-2">{event.title}</h3>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(event.date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate max-w-[150px]">{event.location}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}