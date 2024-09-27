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
            <div style={styles.tabs}>
                <button
                    style={activeTab === 'wholeFarm' ? styles.activeTab : styles.tab}
                    onClick={() => setActiveTab('wholeFarm')}
                >
                    Whole Farm Milk Entry
                </button>
                <button
                    style={activeTab === 'byAnimal' ? styles.activeTab : styles.tab}
                    onClick={() => setActiveTab('byAnimal')}
                >
                    Milk Entry by Animal
                </button>
            </div>
            <div style={styles.formContainer}>
                {renderForm()}  {/* Render form based on active tab */}
            </div>
        </div>
    );
};

const styles = {
    tabs: {
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: '20px',
    },
    tab: {
        padding: '10px 20px',
        cursor: 'pointer',
        backgroundColor: '#ddd',
    },
    activeTab: {
        padding: '10px 20px',
        cursor: 'pointer',
        backgroundColor: '#4CAF50',
        color: '#fff',
    },
    formContainer: {
        marginTop: '20px',
    },
};

export default MilkEntryForm;
