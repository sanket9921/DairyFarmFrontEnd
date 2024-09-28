import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface SemenStock {
  id: number;
  donor: { id: number; name: string };
  quantity: number;
  expiryDate: string;
}

const AIManagement: React.FC = () => {
  const [semenStock, setSemenStock] = useState<SemenStock[]>([]);
  const [donorId, setDonorId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [expiryDate, setExpiryDate] = useState<string>('');

  useEffect(() => {
    axios.get(`/api/semen-stock/expiring`, { params: { currentDate: new Date().toISOString().split('T')[0] } })
      .then(response => setSemenStock(response.data))
      .catch(error => console.error('Error fetching semen stock', error));
  }, []);

  const addSemenStock = () => {
    axios.post('/api/semen-stock/add', { donorId, quantity, expiryDate })
      .then(() => {
        alert('Semen stock added successfully');
        // Refresh the stock list if needed
      })
      .catch(error => console.error('Error adding semen stock', error));
  };

  return (
    <div>
      <h2>Artificial Insemination (AI) Management</h2>
      <h3>Expiring Semen Stock</h3>
      <ul>
        {semenStock.map(stock => (
          <li key={stock.id}>
            Donor: {stock.donor.name}, Quantity: {stock.quantity}, Expiry Date: {stock.expiryDate}
          </li>
        ))}
      </ul>

      <h3>Add New Semen Stock</h3>
      <label>
        Donor ID: 
        <input type="number" value={donorId || ''} onChange={e => setDonorId(Number(e.target.value))} />
      </label>
      <label>
        Quantity: 
        <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
      </label>
      <label>
        Expiry Date: 
        <input type="date" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} />
      </label>
      <button onClick={addSemenStock}>Add Semen Stock</button>
    </div>
  );
};

export default AIManagement;
