// services/animalService.ts
import axios from 'axios';
import { Animal, AnimalDB } from '../types/animal';
import API_URL_MAIN  from "../config/config";
const API_URL = API_URL_MAIN+'/animals';

// Get all animals
export const getAnimals = async (): Promise<Animal[]> => {
  const response = await axios.get<Animal[]>(API_URL);
  return response.data;
};

// Get a single animal by ID
export const getAnimalById = async (id: number): Promise<AnimalDB> => {
  const response = await axios.get<AnimalDB>(`${API_URL}/${id}`);
  return response.data;
};

// Create a new animal with image
export const createAnimal = async (animalData: Animal, imageFile: File, userId: number): Promise<Animal> => {
  const formData = new FormData();
  
  formData.append('animal', new Blob([JSON.stringify(animalData)], { type: 'application/json' }));
  formData.append('imageFile', imageFile);
  
  // Send userId as a string in FormData
  formData.append('userId', userId.toString());

  const response = await axios.post<Animal>(API_URL, formData);
  return response.data;
};

export const getAnimalsByUserId = async (userId: number): Promise<AnimalDB[]> => {
  const response = await axios.get<AnimalDB[]>(`${API_URL}/user/${userId}`);
  return response.data;
};


// Update animal details with optional image
export const updateAnimal = async (
  id: number,
  animalData: Animal,
  imageFile: File | null = null
): Promise<Animal> => {
  const formData = new FormData();

  // Append the animal data as JSON
  formData.append('animal', new Blob([JSON.stringify(animalData)], { type: 'application/json' }));

  // If there is an image file, append it to the form data
  if (imageFile) {
    formData.append('imageFile', imageFile);
  }

  // Send the PUT request with multipart/form-data
  const response = await axios.put<Animal>(`${API_URL}/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

// Delete an animal
export const deleteAnimal = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
