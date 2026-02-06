'use client';
import { useEffect, useState, use } from 'react'; // Asegúrate de tener 'use'
import { notFound } from 'next/navigation';
import { getPokemon } from '@/utils/api';
import PokemonCard from '@/components/PokemonCard';
import { useLanguage } from '@/context/LanguageContext';

export default function GenerationPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const { dictionary } = useLanguage();
  const [pokemons, setPokemons] = useState<any[]>([]);

  // LÓGICA DEL EXAMEN: Si el usuario elige la 3ª generación, lanzamos el 404
  if (id === '3') {
    notFound();
  }

  useEffect(() => {
    // Función para obtener 10 pokemon aleatorios de la generación elegida
    const fetchGenPokemons = async () => {
      // Definimos rangos aproximados por generación para que se vea real
      const ranges: { [key: string]: { start: number, end: number } } = {
        '1': { start: 1, end: 151 },
        '2': { start: 152, end: 251 },
        '4': { start: 387, end: 493 }, // La 4ª sí cargará estos
      };

      const range = ranges[id];
      if (range) {
        const randomIds = Array.from({ length: 10 }, () => 
          Math.floor(Math.random() * (range.end - range.start + 1)) + range.start
        );
        
        const data = await Promise.all(randomIds.map(id => getPokemon(id)));
        setPokemons(data);
      }
    };

    fetchGenPokemons();
  }, [id]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Pokémon de la {id}ª Generación</h2>
      <div className="row g-4">
        {pokemons.map(p => (
          <div key={p.id} className="col-12 col-md-4 col-lg-3">
            <PokemonCard pokemon={p} />
          </div>
        ))}
      </div>
    </div>
  );
}