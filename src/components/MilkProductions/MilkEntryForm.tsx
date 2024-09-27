// src/components/MilkEntryForm.tsx
import React, { useState } from 'react';
import WholeFarmMilkForm from './WholeFarmMilkForm';
import MilkByAnimalForm from './MilkByAnimalForm';

const MilkEntryForm: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'wholeFarm' | 'byAnimal'>('wholeFarm');  // Control the active tab

    const renderForm = () => {
        switch (activeTab) {
            case 'wholeFarm':
                return <WholeFarmMilkForm />;
            case 'byAnimal':
                return <MilkByAnimalForm />;
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="flex justify-around mb-5">
                <button
                    className={`px-5 py-2 cursor-pointer ${
                        activeTab === 'wholeFarm' ? 'bg-green-500 text-white' : 'bg-gray-300'
                    }`}
                    onClick={() => setActiveTab('wholeFarm')}
                >
                    Whole Farm Milk Entry
                </button>
                <button
                    className={`px-5 py-2 cursor-pointer ${
                        activeTab === 'byAnimal' ? 'bg-green-500 text-white' : 'bg-gray-300'
                    }`}
                    onClick={() => setActiveTab('byAnimal')}
                >
                    Milk Entry by Animal
                </button>
            </div>
            <div className="mt-5">
                {renderForm()}  {/* Render form based on active tab */}
            </div>
        </div>
    );
};

export default MilkEntryForm;
