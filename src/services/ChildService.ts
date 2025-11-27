import axios from 'axios';

const API_URL = 'http://localhost:8080/api/children';

export interface Child {
  id?: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  age?: number;
  story: string;
  imageUrl: string;
  status: 'AVAILABLE' | 'SPONSORED' | 'INACTIVE';
}

// ✅ CORRECCIÓN AQUÍ:
// Usamos "auth_token" porque es EXACTAMENTE lo que aparece en tu captura de Local Storage
const getAuthHeaders = () => {
  const token = localStorage.getItem("auth_token"); 
  
  if (token) {
    return {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
  }
  return {};
};

export const childService = {
  // OBTENER (GET) - Ahora envía el token correcto
  getAll: async () => {
    const response = await axios.get<Child[]>(API_URL, getAuthHeaders());
    return response.data;
  },
  
  // CREAR (POST) - Requiere token de ADMIN
  create: async (child: Child) => {
    const response = await axios.post<Child>(API_URL, child, getAuthHeaders());
    return response.data;
  },

  // ELIMINAR (DELETE) - Requiere token de ADMIN
  delete: async (id: number) => {
    await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
  }
};