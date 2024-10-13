
import axios from 'axios';

import { BreedingRecord, CalvingRecord} from '../types/animal'

import API_URL_MAIN  from "../config/config";
const API_URL = API_URL_MAIN+'/breeding/';

export const createBreedingRecord = async (
  animalId: number,
  matingDate: string,
  inseminationType: string,
  sireId?: number
): Promise<BreedingRecord> => {
  console.log("Submitting data:", { animalId, matingDate, inseminationType, sireId });


  const response = await axios.post(API_URL+'create', null,
    {params:{
      animalId,
      matingDate,
      inseminationType,
      sireId,
    }
  }
    );
  return response.data;
};

export const confirmPregnancy = async (
  breedingRecordId: number,
  confirmationDate: string
): Promise<BreedingRecord> => {
  const response = await axios.post(API_URL+`confirm-pregnancy/${breedingRecordId}`, {
    confirmationDate,
  });
  return response.data;
};

export const registerCalving = async (
  breedingRecordId: number,
  calvingDate: string,
  calfId: number,
  calfGender: string,
  healthStatus: string,
  complications?: string
): Promise<CalvingRecord> => {
  const response = await axios.post(API_URL+`register-calving/${breedingRecordId}`, {
    calvingDate,
    calfId,
    calfGender,
    healthStatus,
    complications,
  });
  return response.data;
};

export const getBreedingHistory = async (animalId: number): Promise<BreedingRecord[]> => {
  const response = await axios.get(API_URL+`history/${animalId}`);
  return response.data;
};

export const getUpcomingPregnancies = async (
  fromDate: string,
  toDate: string
): Promise<BreedingRecord[]> => {
  const response = await axios.get(API_URL+'upcoming-pregnancies', {
    params: { fromDate, toDate },
  });
  return response.data;
};

// Add more services as needed
