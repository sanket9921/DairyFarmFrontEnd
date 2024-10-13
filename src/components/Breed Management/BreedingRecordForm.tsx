// src/components/BreedingRecordForm.tsx

import React, { useEffect, useState } from 'react';
import { createBreedingRecord } from '../../services/breedingService';
import { Animal, AnimalDB } from '../../types/animal';
import { getAnimalById, getAnimalsByUserId } from '../../services/animalService';

const BreedingRecordForm: React.FC = () => {
  const [animals, setAnimals] = useState<AnimalDB[]>([]);
  const [femaleAnimal, SetFemaleAnimal] = useState<AnimalDB[]>([]);
  const [MaleAnimal, SetMaleAnimal] = useState<Animal[]>([]);
  const [formData, setFormData] = useState({
    animalId: '',
    matingDate: '',
    inseminationType: 'Natural',
    sireId: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    // Fetch all animals to populate the select dropdown
    const fetchAnimals = async () => {
      try {
        const response = await getAnimalsByUserId(1) // user Id
        setAnimals(response);
        // Assuming sires are males; filter if necessary
        SetFemaleAnimal(response.filter((animal: AnimalDB) => animal.gender === "FEMALE"));

        const maleAnimals = response.filter((animal: AnimalDB) => animal.gender === "MALE");
        SetMaleAnimal(maleAnimals);
      } catch (err) {
        setError('Failed to fetch animals.');
      }
    };

    fetchAnimals();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const { animalId, matingDate, inseminationType, sireId } = formData;
  
      // Log to check date format
      console.log("Submitting data:", { animalId, matingDate, inseminationType, sireId });
  
      const data = await createBreedingRecord(
        Number(animalId),
        matingDate, // Ensure this is 'YYYY-MM-DD'
        inseminationType,
        inseminationType === 'AI' && sireId ? Number(sireId) : undefined
      );
      
      setSuccess('Breeding record created successfully!');
      setFormData({
        animalId: '',
        matingDate: '',
        inseminationType: 'Natural',
        sireId: '',
      });
    } catch (err) {
      setError('Failed to create breeding record.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <h2>Create Breeding Record</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        {/* Animal Select */}
        <div>
          <label htmlFor="animalId">Animal:</label>
          <select name="animalId" value={formData.animalId} onChange={handleChange} required>
            <option value="">Select Animal</option>
            {femaleAnimal.map((animal) => (
              <option key={animal.id} value={animal.id}>
                {animal.tagNumber}
              </option>
            ))}
          </select>
        </div>

        {/* Mating Date */}
        <div>
          <label htmlFor="matingDate">Mating Date:</label>
          <input
            type="date"
            name="matingDate"
            value={formData.matingDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Insemination Type */}
        <div>
          <label htmlFor="inseminationType">Insemination Type:</label>
          <select
            name="inseminationType"
            value={formData.inseminationType}
            onChange={handleChange}
            required
          >
            <option value="Natural">Natural</option>
            <option value="AI">Artificial Insemination</option>
          </select>
        </div>
        {formData.inseminationType !== 'AI' && (
          <div>
            <label htmlFor="sireId">Sire:</label>
            <select name="sireId" value={formData.sireId} onChange={handleChange} required>
              <option value="">Select Sire</option>
              {MaleAnimal.map((sire) => (
                <option key={sire.animalId} value={sire.animalId}>
                  {sire.tagNumber}
                </option>
              ))}
            </select>
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default BreedingRecordForm;
