import { useEffect, useState } from 'react';
import './App.css';
import { fetchHealth } from './api';

function App() {
  const [health, setHealth] = useState<string>('checking...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHealth()
      .then((data) => {
        setHealth(data.status);
      })
      .catch((err) => {
        console.error(err);
        setError('API error');
      });
  }, []);

  return (
    <div>
      <h1>Pontado</h1>
      <p>Backend health: {error ?? health}</p>
    </div>
  );
}

export default App;