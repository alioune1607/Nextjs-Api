'use client';
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { getPokemon } from '@/utils/api';
import { useLanguage } from '@/context/LanguageContext';

export default function PokemonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Desvolvemos la promesa de params siguiendo la nueva norma de Next.js 15
  const resolvedParams = use(params);
  const { dictionary } = useLanguage();
  const router = useRouter();
  const [pokemon, setPokemon] = useState<any>(null);

  useEffect(() => {
    if (resolvedParams.id) {
      getPokemon(Number(resolvedParams.id))
        .then(setPokemon)
        .catch((err) => console.error("Error fetching pokemon:", err));
    }
  }, [resolvedParams.id]);

  if (!pokemon) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p>{dictionary.loading}</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <button className="btn btn-secondary mb-3" onClick={() => router.back()}>
        &larr; Volver
      </button>
      <div className="card mx-auto shadow" style={{ maxWidth: '600px' }}>
        <div className="card-body text-center">
          <h1 className="text-capitalize">
            {pokemon.name} <span className="text-muted">#{pokemon.id}</span>
          </h1>
          <img 
            src={pokemon.sprites.other['official-artwork'].front_default} 
            alt={pokemon.name} 
            className="img-fluid" 
            style={{ width: '300px' }} 
          />
          
          <div className="row mt-4 text-start">
            <div className="col-4">
              <strong>{dictionary.modal.hp}:</strong> {pokemon.stats[0].base_stat}
            </div>
            <div className="col-4">
              <strong>{dictionary.modal.attack}:</strong> {pokemon.stats[1].base_stat}
            </div>
            <div className="col-4">
              <strong>{dictionary.modal.defense}:</strong> {pokemon.stats[2].base_stat}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}