"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Footer from "@/components/ui/Footer";
import { projectService, Project } from "@/services/ProjectService"; // Importamos el servicio

export default function ProjectsPage() {
  // 1. Estado para guardar los proyectos reales
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. Cargar datos del Backend al entrar
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getAll();
        setProjects(data);
      } catch (error) {
        console.error("Error cargando proyectos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Datos estáticos que no cambian (Actividades y Estadísticas)
  const activities = [
    {
      title: "Actividades Recreativas",
      description: "Esparcimiento y desarrollo de habilidades sociales a través del juego y el uso positivo del tiempo libre.",
      image: "/activities/Actividad.jpg"
    },
    {
      title: "Talleres Creativos",
      description: "Desarrollo de habilidades artísticas, expresión personal y manejo de emociones.",
      image: "/activities/TallerCreativo.jpg"
    },
    {
      title: "Lectura y animación",
      description: "Fomento del hábito de la lectura y desarrollo de habilidades comunicativas.",
      image: "/activities/Lecturas.jpg"
    }
  ];

  const stats = [
    { value: 21, label: "Años de Experiencia" },
    { value: 542, label: "Niños Apadrinados" },
    { value: 8, label: "Municipios Impactados" }
  ];

  // Función para calcular progreso
  const getProgress = (current: number, goal: number) => {
    if (goal === 0) return 0;
    return Math.min(100, Math.round((current / goal) * 100));
  };

  return (
    <main className="min-h-screen bg-[var(--background)] font-['Poppins']">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumb items={[{ label: "Proyectos" }]} />
      </div>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-yellow-50 to-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#1E3A5F] mb-4">
              Transformando Vidas a Través de Proyectos Comunitarios
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Para seguir expandiendo nuestro impacto y alcanzar a más niños, la Fundación Huahuacuna desarrolla proyectos educativos y formativos.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white rounded-xl p-6 shadow-sm min-w-[200px]">
                <div className="text-4xl font-bold text-[#1E3A5F] mb-2">{stat.value}+</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⭐ SECCIÓN DINÁMICA: Nuestros Proyectos (Desde el Admin) ⭐ */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1E3A5F] mb-4">Proyectos Activos</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conoce las iniciativas que estamos llevando a cabo gracias a tu apoyo.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E3A5F]"></div>
            <p className="mt-2 text-gray-500">Cargando proyectos...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-xl">
            <p className="text-gray-500">No hay proyectos activos en este momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                <div className="relative h-56 w-full">
                  {/* Usamos img normal para evitar problemas de configuración con dominios externos */}
                  <img
                    src={project.imageUrl || "/placeholder-project.jpg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/400x300?text=Fundacion")}
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-800 font-semibold shadow-sm">
                      En Curso
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-[#1E3A5F] mb-3">{project.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                    {project.description}
                  </p>
                  
                  {/* Barra de Progreso de Recaudación */}
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <div className="flex justify-between text-xs mb-1 font-medium">
                      <span className="text-gray-500">Recaudado: ${project.currentAmount.toLocaleString()}</span>
                      <span className="text-[#1E3A5F]">{getProgress(project.currentAmount, project.goalAmount)}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className="bg-[#FDD835] h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${getProgress(project.currentAmount, project.goalAmount)}%` }}
                      ></div>
                    </div>
                    <div className="text-right mt-1 text-xs text-gray-400">
                      Meta: ${project.goalAmount.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Actividades (Estáticas) */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1E3A5F] mb-4">Otras Actividades</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="relative h-48">
                   {/* Usamos img para simplificar URLs locales si no tienes configurado Next Image */}
                   <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/400x300")}
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-[#1E3A5F] mb-2">{activity.title}</h3>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1E3A5F] text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Quieres Apoyar Nuestros Proyectos?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Tu apoyo hace la diferencia en la educación y bienestar de nuestros niños.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apadrinar"
              className="px-8 py-3 rounded-full bg-[#FDD835] text-[#1E3A5F] font-semibold hover:bg-[#FBC02D] transition-colors"
            >
              Apadrinar un Niño
            </Link>
            <Link
              href="/donaciones"
              className="px-8 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Hacer Donación
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}