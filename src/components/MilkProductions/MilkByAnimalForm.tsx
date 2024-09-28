import React, { useEffect, useState } from 'react';
import MilkQualityForm from './MilkQualityForm';
import { MilkProduction } from '../../types/MilkProduction';
import { addMilkProductionForAnimal } from '../../services/MilkProductionService/milkProductionService';
import SelectGroupOne from '../Forms/SelectGroup/SelectGroupOne';
import { getIdandTagNameOfAnimal } from '../../services/animalService';
import { Animal } from '../../types/animal';

const MilkByAnimalForm: React.FC = () => {
    const [production, setProduction] = useState<MilkProduction>({
        animalId: undefined,
        totalQuantity: '',
        productionDate: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
        notes: '',
    });

    const [savedProductionId, setSavedProductionId] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [animals, setAnimals] = useState<Animal[]>([]);


    useEffect(() => {
        getIdandTagNameOfAnimal(1) //User Id
            .then(data => setAnimals(data))  // Set the animals from service
            .catch(error => console.error('Error fetching animals:', error));
    }, [1]); // Userid

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}


            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                    Milk Entry by Animal
                    </h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6.5">
                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Select Animal
                                </label>
                                <select
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black"
                                    name="animalId"
                                    value={production.animalId || ''}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Animal</option>
                                    {animals.map(animal => (
                                        <option key={animal.animalId} value={animal.animalId}>
                                            {animal.tagNumber}
                                        </option>
                                    ))}
                                </select>
                            </div>
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
                                    placeholder="Enter Milk Quantity in Liter"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>

                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Production Date
                                </label>
                                <input
                                    type="date"
                                    name="productionDate"
                                    value={production.productionDate}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your last name"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Message
                            </label>
                            <textarea
                                name="notes"
                                value={production.notes}
                                onChange={handleChange}
                                rows={6}
                                placeholder="Type your message"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            ></textarea>
                        </div>
                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    First name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your first name"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    First name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your first name"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>

                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Last name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your last name"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                        </div>

                        {savedProductionId && (
                            <>
                                <h3>Milk Quality Details</h3>
                                <MilkQualityForm productionId={savedProductionId} />
                            </>
                        )}


                        <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                            Send Message
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default MilkByAnimalForm;
