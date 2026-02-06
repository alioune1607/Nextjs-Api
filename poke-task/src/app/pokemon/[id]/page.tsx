'use client';
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { getPokemon } from '@/utils/api';
import { useLanguage } from '@/context/LanguageContext';

export default function PokemonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { dictionary } = useLanguage();
  const router = useRouter();
  const [pokemon, setPokemon] = useState<any>(null);

  useEffect(() => {
    getPokemon(Number(resolvedParams.id)).then(setPokemon).catch(console.error);
  }, [resolvedParams.id]);

  const handleNavigation = (direction: 'prev' | 'next') => {
    const currentId = Number(resolvedParams.id);
    let newId = direction === 'prev' 
      ? (currentId > 1 ? currentId - 1 : 1) 
      : (currentId < 1025 ? currentId + 1 : 1025);
    
    router.push(`/pokemon/${newId}`);
  };

  if (!pokemon) return <div className="text-center mt-5">{dictionary.loading}</div>;

  return (
    <div className="container mt-5">
        <div className="d-flex justify-content-between mb-3">
            <button className="btn btn-secondary" onClick={() => router.push('/')}>&larr; Volver al Inicio</button>
        </div>

        <div className="card mx-auto shadow-lg" style={{maxWidth: '600px'}}>
            <div className="card-body text-center p-5">
                <h1 className="text-capitalize display-4 fw-bold">{pokemon.name}</h1>
                <p className="badge bg-primary fs-5">#{pokemon.id}</p>
                
                <div className="my-4">
                    <img 
                        src={pokemon.sprites.other['official-artwork'].front_default} 
                        alt={pokemon.name} 
                        className="img-fluid" 
                        style={{width: '300px'}} 
                    />
                </div>
                
                <div className="row mt-4 text-start bg-light p-3 rounded">
                    <div className="col-4 text-center">
                        <div className="fw-bold">{dictionary.modal.hp}</div>
                        <div className="fs-4">{pokemon.stats[0].base_stat}</div>
                    </div>
                    <div className="col-4 text-center border-start border-end">
                        <div className="fw-bold">{dictionary.modal.attack}</div>
                        <div className="fs-4">{pokemon.stats[1].base_stat}</div>
                    </div>
                    <div className="col-4 text-center">
                        <div className="fw-bold">{dictionary.modal.defense}</div>
                        <div className="fs-4">{pokemon.stats[2].base_stat}</div>
                    </div>
                </div>

                {/* NAVEGACIÓN PRINCIPAL */}
                <div className="d-flex justify-content-between mt-5 pt-3 border-top">
                    <button className="btn btn-info text-white px-4" onClick={() => handleNavigation('prev')}>
                        Pokémon Anterior
                    </button>
                    <button className="btn btn-info text-white px-4" onClick={() => handleNavigation('next')}>
                        Pokémon Siguiente
                        
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}