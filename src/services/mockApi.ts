import data from '../mocks/coursesData.json';
import type { Course, UserFormData } from '../types';

const NETWORK_DELAY = 1500;

export const mockApi = {
  getCourses: async (): Promise<Course[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data.courses as Course[]);
      }, NETWORK_DELAY);
    });
  },


  submitEnrollment: async (formData: UserFormData): Promise<{ success: boolean; message: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Mock Backend recebeu os seguintes dados:", formData);

        resolve({
          success: true,
          message: `Matrícula concluída! Um e-mail de confirmação foi enviado para ${formData.email}.`,
        });
      }, NETWORK_DELAY);
    });
  }
};
