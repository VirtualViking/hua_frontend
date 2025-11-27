"use client";

import { useEffect, useState } from "react";
import { projectService, Project } from "@/services/ProjectService";
import { Trash2, Plus, Target, DollarSign } from "lucide-react";
import ProjectModal from "@/components/admin/ProjectModal";

export default function ProyectosPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => { loadProjects(); }, []);

  const loadProjects = async () => {
    try {
      const data = await projectService.getAll();
      setProjects(data);
    } catch (error) { console.error(error); } 
    finally { setLoading(false); }
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Eliminar este proyecto?")) {
      await projectService.delete(id);
      loadProjects();
    }
  };

  // Calcula el porcentaje de progreso
  const getProgress = (current: number, goal: number) => {
    if (goal === 0) return 0;
    return Math.min(100, Math.round((current / goal) * 100));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#1E3A5F]">Gestión de Proyectos</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-[#1E3A5F] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#152a45]">
          <Plus className="w-5 h-5" /> <span>Nuevo Proyecto</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-600">Imagen</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Proyecto</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Meta</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Progreso</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? ( <tr><td colSpan={5} className="p-4 text-center">Cargando...</td></tr> ) : 
             projects.length === 0 ? ( <tr><td colSpan={5} className="p-4 text-center text-gray-500">No hay proyectos</td></tr> ) : 
             ( projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <img src={proj.imageUrl || "https://via.placeholder.com/100"} alt={proj.title} className="w-16 h-10 object-cover rounded-md border" />
                  </td>
                  <td className="p-4 font-medium text-gray-900">{proj.title}</td>
                  <td className="p-4 text-gray-600 flex items-center gap-1">
                    <Target className="w-4 h-4" /> ${proj.goalAmount.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <div className="w-full max-w-[150px]">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">${proj.currentAmount.toLocaleString()}</span>
                        <span className="font-medium text-[#1E3A5F]">{getProgress(proj.currentAmount, proj.goalAmount)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#1E3A5F] h-2 rounded-full" style={{ width: `${getProgress(proj.currentAmount, proj.goalAmount)}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <button onClick={() => proj.id && handleDelete(proj.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSaved={loadProjects} />
    </div>
  );
}