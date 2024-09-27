// src/components/WholeFarmMilkForm.tsx
import React, { useState } from 'react';
import MilkQualityForm from './MilkQualityForm';
import { MilkProduction } from '../../types/MilkProduction';
import { addWholeFarmMilkProduction } from '../../services/MilkProductionService/milkProductionService';
import SelectGroupOne from '../Forms/SelectGroup/SelectGroupOne';

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
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Whole Farm Milk Entry
                </h3>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="p-6.5">
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Quantity (liters):
                            </label>
                            <input
                                type="number"
                                name="totalQuantity"
                                value={production.totalQuantity}
                                onChange={handleChange}
                                required
                                placeholder="Enter the quantity"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>

                        <div className="w-full xl:w-1/2">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Production Date:
                            </label>
                            <input
                                type="date"
                                name="productionDate"
                                value={production.productionDate}
                                onChange={handleChange}
                                required placeholder="Enter the date"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Note
                        </label>
                        <textarea
                            name="notes"
                            value={production.notes}
                            onChange={handleChange}
                            rows={6}
                            placeholder="Add Note"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        ></textarea>
                    </div>

                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Quantity (liters):
                            </label>
                            <input
                                type="text"
                                placeholder="Enter the quantity"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>

                        <div className="w-full xl:w-1/2">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Production Date:
                            </label>
                            <input
                                type="date"
                                placeholder="Enter the date"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className="w-full xl:w-1/2">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Production Date:
                            </label>
                            <input
                                type="date"
                                placeholder="Enter the date"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                    </div>
                    <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                        Add Milk
                    </button>
                </div>
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
