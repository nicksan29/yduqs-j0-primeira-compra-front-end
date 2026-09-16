import type { Course, UserFormData } from '../types';



export const mockApi = {
  getCourses: async (): Promise<Course[]> => {
    const courseres = await fetch('http://localhost:3000/courses');
    const data = await courseres.json();
    return data;
  },


  submitEnrollment: async (formData: UserFormData) => {
    const formsubmit = await fetch('http://localhost:3000/enrollments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (!formsubmit.ok) {
      throw new Error('Falha ao enviar matricula')
    }
    return {
      sucess: true,
      message: 'tudo certo com o envio!'
    }
  }
};
