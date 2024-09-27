// src/services/milkQualityService.ts
import axios from 'axios';
import { MilkQuality } from '../../types/MilkQuality';
import API_URL_MAIN from "../../config/config"

const API_URL = API_URL_MAIN+'/milk-qualities';  // Update the base URL according to your backend

// Function to add milk quality data
export const addMilkQuality = async (quality: MilkQuality): Promise<MilkQuality> => {
    const response = await axios.post<MilkQuality>(`${API_URL}`, quality);
    return response.data;
};

// Function to update milk quality data
export const updateMilkQuality = async (id: number, quality: MilkQuality): Promise<MilkQuality> => {
    const response = await axios.put<MilkQuality>(`${API_URL}/${id}`, quality);
    return response.data;
};

// Function to get all milk quality records for a specific milk production
export const getMilkQualityByProductionId = async (productionId: number): Promise<MilkQuality> => {
    const response = await axios.get<MilkQuality>(`${API_URL}/production/${productionId}`);
    return response.data;
};

// Function to delete milk quality record by ID
export const deleteMilkQuality = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};
