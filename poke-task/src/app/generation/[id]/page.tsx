'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getPokemon, getRandomIds } from '@/utils/api';
import PokemonCard from '@/components/PokemonCard';
import { useLanguage } from '@/context/LanguageContext';

export default function GenerationPage() {
  const params = useParams();
  const id = params?.id as string;
  
  const { dictionary } = useLanguage();
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let min = 1, max = 151;
    
    if (id === '2') { min = 152; max = 251; }
    else if (id === '3') { min = 252; max = 386; }
    
    // Obtener 10 IDs aleatorios
    const randomIds = getRandomIds(10, min, max);
    
    Promise.all(randomIds.map(pid => getPokemon(pid)))
      .then(data => {
        setPokemons(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const getTitle = () => {
    if (id === '1') return dictionary.navbar.gen1;
    if (id === '2') return dictionary.navbar.gen2;
    if (id === '3') return dictionary.navbar.gen3;
    return "Generación";
  }

  if (loading) return (
    <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
    </div>
  );

  return (
    <div className="mb-5">
      <h2 className="mb-4 text-center border-bottom pb-2 text-primary">
        {getTitle()}
      </h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-5 g-4">
        {pokemons.map(p => (
          <div className="col" key={p.id}>
            <PokemonCard pokemon={p} />
          </div>
        ))}
      </div>
    </div>
  );
}