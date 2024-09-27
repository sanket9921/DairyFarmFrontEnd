// src/components/MilkQualityForm.tsx
import React, { useState } from 'react';
import { MilkQuality } from '../../types/MilkQuality';
import { addMilkQuality } from '../../services/MilkProductionService/milkQualityService';

const MilkQualityForm: React.FC<{ productionId: number }> = ({ productionId }) => {
    const [quality, setQuality] = useState<MilkQuality>({
        productionId: productionId,
        fatContent: undefined,
        proteinContent: undefined,
        somaticCellCount: undefined,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setQuality((prev) => ({
            ...prev,
            [name]: name === 'somaticCellCount' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addMilkQuality(quality);
        // Reset the form or show success message
    };

    return (
        <div>
            <h3>Milk Quality Details</h3>
            <label>
                Fat Content (%):
                <input
                    type="number"
                    name="fatContent"
                    value={quality.fatContent || ''}
                    onChange={handleChange}
                />
            </label>
            <label>
                Protein Content (%):
                <input
                    type="number"
                    name="proteinContent"
                    value={quality.proteinContent || ''}
                    onChange={handleChange}
                />
            </label>
            <label>
                Somatic Cell Count:
                <input
                    type="number"
                    name="somaticCellCount"
                    value={quality.somaticCellCount || ''}
                    onChange={handleChange}
                />
            </label>
        </div>
    );
};

export default MilkQualityForm;
