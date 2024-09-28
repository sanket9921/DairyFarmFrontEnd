// src/services/milkProductionService.ts
import axios from 'axios';
import { MilkProduction } from '../../types/MilkProduction';
import API_URL_MAIN from "../../config/config"


const API_URL = API_URL_MAIN+"/milk-production";  // Update the base URL according to your backend

// Function to add new milk production (whole farm or individual animal)
export const addMilkProduction = async (production: MilkProduction): Promise<MilkProduction> => {
    const response = await axios.post<MilkProduction>(`${API_URL}`, production);
    return response.data;
};


export const addMilkProductionForAnimal = async (animalId: number, totalQuantity: string, productionDate: Date, notes?: string) => {
    const response = await axios.post(`${API_URL}/animal`, null, {
        params: {
            animalId,
            totalQuantity,
            productionDate,
            notes,
        },
    });

    return response.data as MilkProduction;
};

export const addWholeFarmMilkProduction = async (totalQuantity: number, productionDate: Date, notes?: string) => {
    const response = await axios.post(`${API_URL}/farm`,null, {
        params: {
        totalQuantity,
        productionDate,
        notes,
        }
    });

    return response.data as MilkProduction;
};

// Function to update milk production
export const updateMilkProduction = async (id: number, production: MilkProduction): Promise<MilkProduction> => {
    const response = await axios.put<MilkProduction>(`${API_URL}/${id}`, production);
    return response.data;
};

// Function to get all milk production records
export const getAllMilkProductions = async (): Promise<MilkProduction[]> => {
    const response = await axios.get<MilkProduction[]>(`${API_URL}/`);
    return response.data;
};

// Function to get milk production by animal ID
export const getMilkProductionByAnimalId = async (animalId: number): Promise<MilkProduction[]> => {
    const response = await axios.get<MilkProduction[]>(`${API_URL}/animal/${animalId}`);
    return response.data;
};

// Function to get milk production by farm (whole farm)
export const getFarmMilkProduction = async (): Promise<MilkProduction[]> => {
    const response = await axios.get<MilkProduction[]>(`${API_URL}/farm`);
    return response.data;
};

// Function to delete milk production by ID
export const deleteMilkProduction = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};
