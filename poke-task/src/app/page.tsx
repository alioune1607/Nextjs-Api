'use client';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getPokemon, getRandomIds } from '@/utils/api';
import PokemonCard from '@/components/PokemonCard';

export default function Home() {
  const { dictionary } = useLanguage();
  const [pokemon, setPokemon] = useState<any>(null);

  useEffect(() => {
    // Pokemon aleatorio del 1 al 1000
    const randomId = getRandomIds(1, 1, 1000)[0];
    getPokemon(randomId).then(setPokemon).catch(console.error);
  }, []);

  return (
    <div className="text-center py-5">
      <h1 className="display-4 mb-4 fw-bold text-primary">{dictionary.home.welcome}</h1>
      
      <div className="card mx-auto p-4 shadow-lg" style={{maxWidth: '500px'}}>
        <h3 className="mb-3 text-secondary">{dictionary.home.random}</h3>
        {pokemon ? (
           <div className="mx-auto" style={{maxWidth: '250px'}}>
             <PokemonCard pokemon={pokemon}/>
           </div>
        ) : (
          <div className="spinner-border text-primary" role="status"></div>
        )}
      </div>
    </div>
  );
}