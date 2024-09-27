import React, { useState } from 'react';
import MilkQualityForm from './MilkQualityForm';
import { MilkProduction } from '../../types/MilkProduction';
import { addMilkProductionForAnimal } from '../../services/MilkProductionService/milkProductionService';

const MilkByAnimalForm: React.FC = () => {
    const [production, setProduction] = useState<MilkProduction>({
        animalId: undefined,
        totalQuantity: 0,
        productionDate: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
        notes: '',
    });

    const [savedProductionId, setSavedProductionId] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduction((prev) => ({
            ...prev,
            [name]: name === 'totalQuantity' || name === 'animalId' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        // Ensure animalId is not undefined before proceeding
        if (production.animalId === undefined || production.animalId === null) {
            setErrorMessage('Please provide a valid Animal ID.');
            return;
        }
    
        // Format the productionDate to 'yyyy-MM-dd' before sending to the backend
        const formattedDate = production.productionDate.split('T')[0]; // '2024-09-26'
    
        try {
            const savedProduction = await addMilkProductionForAnimal(
                production.animalId,
                production.totalQuantity,
                new Date(formattedDate), // Use formatted date
                production.notes
            );
            setSavedProductionId(savedProduction.productionId || null);
            setErrorMessage(null);
        } catch (error) {
            setErrorMessage('Failed to save milk production. Please try again.');
            setSavedProductionId(null);
        }
    };
    

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Milk Entry by Individual Animal</h2>
                <label>
                    Animal ID:
                    <input
                        type="number"
                        name="animalId"
                        value={production.animalId || ''}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Quantity (liters):
                    <input
                        type="number"
                        name="totalQuantity"
                        value={production.totalQuantity}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Production Date:
                    <input
                        type="date"
                        name="productionDate"
                        value={production.productionDate}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Notes:
                    <textarea
                        name="notes"
                        value={production.notes}
                        onChange={handleChange}
                    />
                </label>

                <button type="submit">Submit</button>
            </form>

            {savedProductionId && (
                <>
                    <h3>Milk Quality Details</h3>
                    <MilkQualityForm productionId={savedProductionId} />
                </>
            )}

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default MilkByAnimalForm;
