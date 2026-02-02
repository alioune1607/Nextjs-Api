'use client';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function PokemonCard({ pokemon }: { pokemon: any }) {
  const { dictionary } = useLanguage();
  
  return (
    <div className="card text-center h-100 shadow-sm">
      <div className="card-header bg-transparent border-0 mt-2">
        <h5 className="card-title text-capitalize fw-bold">{pokemon.name}</h5>
      </div>
      
      <img 
        src={pokemon.sprites.front_default} 
        className="card-img-top mx-auto" 
        style={{width: '120px', height: '120px', objectFit: 'contain'}} 
        alt={pokemon.name} 
      />
      
      <div className="card-body">
        <p className="badge bg-secondary">#{pokemon.id}</p>
        <div className="mt-2">
            {/* Este Link activará la ruta interceptada (el modal) */}
            <Link href={`/pokemon/${pokemon.id}`} className="btn btn-primary btn-sm w-100">
            {dictionary.card.view}
            </Link>
        </div>
      </div>
    </div>
  );
}