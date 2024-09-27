// types/animal.ts
export interface Animal {
    animalId?: number;
    user_id:number;
    tagNumber: string;
    breed: string;
    dateOfBirth: string; // Use string for date to keep it simple
    gender: 'MALE' | 'FEMALE';
  }
  
export interface AnimalDB{
    id?: number;
    user_id:number;
    tagNumber: string;
    imageUrl:string;
    status:string
    breed: string;
    dateOfBirth: string; // Use string for date to keep it simple
    gender: 'MALE' | 'FEMALE';
}