import { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { getWeather } from './services/weatherAPI';
import { WeatherData, WeatherError } from './types';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import './App.css';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  {isLoading && <LoadingSkeleton />}
{!isLoading && weather && <WeatherCard data={weather} />}
{!isLoading && error && (
 <div className="p-4 bg-red-100 text-red-700 rounded-lg">
   {error}
 </div>
)}

  const handleSearch = async (city: string) => {
    try {
      setIsLoading(true);
      setError('');
      const data = await getWeather(city);
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An errorencountered');
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 py-8 px-4'>
      <div className='max-w-md mx-auto space-y-4'> 
        <h1 className='text-3xl font-bold text-center mb-8'>
          Weather Dashboard
        </h1>

        <SearchBar onSearch={handleSearch} isLoading={isLoading}/>

        {error && (
          <div className='p-4 bg-red-100 text-red-700 rounded-lg'>
            {error}
          </div>
        )}

        {weather && <WeatherCard data={weather}/>}
      </div>
    </div>
  )
}

export default App; 