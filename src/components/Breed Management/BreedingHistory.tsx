import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL_MAIN from '../../config/config';

interface BreedingRecord {
  id: number;
  matingDate: string;
  sire: { id: number; name: string };
  inseminationType: string;
  pregnancyConfirmedDate?: string;
  dueDate?: string;
}

const BreedingHistory: React.FC<{ animalId: number }> = ({ animalId }) => {
  const [breedingRecords, setBreedingRecords] = useState<BreedingRecord[]>([]);

  useEffect(() => {
    axios.get(`${API_URL_MAIN}/breeding-records/animal/${animalId}`)
      .then(response => setBreedingRecords(response.data))
      .catch(error => console.error('Error fetching breeding records', error));
  }, [animalId]);

  return (
    <div>
      <h2>Breeding History for Animal {animalId}</h2>
      <ul>
        {breedingRecords.map(record => (
          <li key={record.id}>
            Mating Date: {record.matingDate}, Sire: {record.sire.name}, Type: {record.inseminationType}
            {record.pregnancyConfirmedDate && (
              <span> (Pregnancy Confirmed on {record.pregnancyConfirmedDate}, Due: {record.dueDate})</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BreedingHistory;
