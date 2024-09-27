import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL_MAIN from '../../config/config';

interface BreedingRecord {
  id: number;
  animal: { id: number; name: string };
  dueDate: string;
}

const PregnancyTracking: React.FC = () => {
  const [upcomingPregnancies, setUpcomingPregnancies] = useState<BreedingRecord[]>([]);
  const [fromDate, setFromDate] = useState<string>('');  // Start date filter
  const [toDate, setToDate] = useState<string>('');      // End date filter

  useEffect(() => {
    if (fromDate && toDate) {
      axios.get(`${API_URL_MAIN}/breeding-records/upcoming-pregnancies`, { params: { fromDate, toDate } })
        .then(response => setUpcomingPregnancies(response.data))
        .catch(error => console.error('Error fetching upcoming pregnancies', error));
    }
  }, [fromDate, toDate]);

  return (
    <div>
      <h2>Pregnancy Tracking</h2>
      <label>
        From Date: 
        <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
      </label>
      <label>
        To Date: 
        <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} />
      </label>
      
      <ul>
        {upcomingPregnancies.map(record => (
          <li key={record.id}>
            Animal: {record.animal.name}, Due Date: {record.dueDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PregnancyTracking;
