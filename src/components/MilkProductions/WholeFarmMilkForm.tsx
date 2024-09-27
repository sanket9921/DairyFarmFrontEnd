// src/components/WholeFarmMilkForm.tsx
import React, { useState } from 'react';
import MilkQualityForm from './MilkQualityForm';
import { MilkProduction } from '../../types/MilkProduction';
import { addWholeFarmMilkProduction } from '../../services/MilkProductionService/milkProductionService';

const WholeFarmMilkForm: React.FC = () => {
    const [production, setProduction] = useState<MilkProduction>({
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
            [name]: name === 'totalQuantity' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const savedProduction = await addWholeFarmMilkProduction(
                production.totalQuantity,
                new Date(production.productionDate),  // Send as Date object to backend
                production.notes
            );
            setSavedProductionId(savedProduction.productionId || null);
            setErrorMessage(null);  // Clear any previous errors
        } catch (error) {
            setErrorMessage('Failed to save milk production. Please try again.');
            setSavedProductionId(null);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Whole Farm Milk Entry</h2>
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

export default WholeFarmMilkForm;
