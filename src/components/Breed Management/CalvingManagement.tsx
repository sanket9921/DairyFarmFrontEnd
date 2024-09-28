import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface CalvingRecord {
  id: number;
  calvingDate: string;
  calf: { id: number; name: string };
  calfGender: string;
  calfHealthStatus: string;
  complications?: string;
}

const CalvingManagement: React.FC = () => {
  const [calvingRecords, setCalvingRecords] = useState<CalvingRecord[]>([]);
  const [breedingRecordId, setBreedingRecordId] = useState<number | null>(null);
  const [calfId, setCalfId] = useState<number | null>(null);
  const [calfGender, setCalfGender] = useState<string>('');
  const [calvingDate, setCalvingDate] = useState<string>('');
  const [healthStatus, setHealthStatus] = useState<string>('');
  const [complications, setComplications] = useState<string>('');

  // Fetch calving records for a specific breeding record
  useEffect(() => {
    if (breedingRecordId !== null) {
      axios.get(`/api/calving-records/breeding-record/${breedingRecordId}`)
        .then(response => setCalvingRecords(response.data))
        .catch(error => console.error('Error fetching calving records:', error));
    }
  }, [breedingRecordId]);

  // Register a new calving event
  const registerCalving = () => {
    if (breedingRecordId && calfId && calvingDate && calfGender && healthStatus) {
      axios.post('/api/calving-records/register', {
        breedingRecordId,
        calvingDate,
        calfId,
        calfGender,
        healthStatus,
        complications
      })
      .then(() => {
        alert('Calving registered successfully');
        setCalfId(null);
        setCalfGender('');
        setCalvingDate('');
        setHealthStatus('');
        setComplications('');
        // Optionally, refresh calving records
        axios.get(`/api/calving-records/breeding-record/${breedingRecordId}`)
          .then(response => setCalvingRecords(response.data))
          .catch(error => console.error('Error fetching calving records:', error));
      })
      .catch(error => console.error('Error registering calving:', error));
    } else {
      alert('Please fill in all the required fields');
    }
  };

  return (
    <div>
      <h2>Calving Management</h2>

      <h3>Register Calving</h3>
      <label>
        Breeding Record ID: 
        <input type="number" value={breedingRecordId || ''} onChange={e => setBreedingRecordId(Number(e.target.value))} />
      </label>
      <br />
      <label>
        Calf ID: 
        <input type="number" value={calfId || ''} onChange={e => setCalfId(Number(e.target.value))} />
      </label>
      <br />
      <label>
        Calf Gender: 
        <input type="text" value={calfGender} onChange={e => setCalfGender(e.target.value)} />
      </label>
      <br />
      <label>
        Calving Date: 
        <input type="date" value={calvingDate} onChange={e => setCalvingDate(e.target.value)} />
      </label>
      <br />
      <label>
        Health Status: 
        <input type="text" value={healthStatus} onChange={e => setHealthStatus(e.target.value)} />
      </label>
      <br />
      <label>
        Complications (Optional): 
        <input type="text" value={complications} onChange={e => setComplications(e.target.value)} />
      </label>
      <br />
      <button onClick={registerCalving}>Register Calving</button>

      <h3>Calving Records</h3>
      {breedingRecordId ? (
        <ul>
          {calvingRecords.length > 0 ? (
            calvingRecords.map(record => (
              <li key={record.id}>
                Calf: {record.calf.name}, Gender: {record.calfGender}, Date: {record.calvingDate}, 
                Health: {record.calfHealthStatus}, Complications: {record.complications || 'None'}
              </li>
            ))
          ) : (
            <p>No calving records found for Breeding Record ID {breedingRecordId}</p>
          )}
        </ul>
      ) : (
        <p>Please enter a Breeding Record ID to view calving records.</p>
      )}
    </div>
  );
};

export default CalvingManagement;
