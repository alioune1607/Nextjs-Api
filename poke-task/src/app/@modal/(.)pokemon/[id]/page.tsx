'use client';
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation'; 
import { getPokemon } from '@/utils/api';
import { useLanguage } from '@/context/LanguageContext';

export default function PokemonModal({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { dictionary } = useLanguage();
  const [pokemon, setPokemon] = useState<any>(null);

  useEffect(() => {
    // Al cambiar el ID en la URL, este efecto se vuelve a lanzar para traer al nuevo Pokémon
    getPokemon(Number(resolvedParams.id)).then(setPokemon).catch(console.error);
  }, [resolvedParams.id]);

  if (!pokemon) return null;

  const handleNavigation = (direction: 'prev' | 'next') => {
    const currentId = Number(resolvedParams.id);
    let newId = currentId;

    if (direction === 'prev') {
      newId = currentId > 1 ? currentId - 1 : 1;
    } else {
      // Usamos 1025 como el número total de Pokémon actuales
      newId = currentId < 1025 ? currentId + 1 : 1025;
    }
    
    // Navegamos a la nueva ruta, Next.js interceptará esto y actualizará el modal
    router.push(`/pokemon/${newId}`);
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg">
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title text-capitalize">{pokemon.name} #{pokemon.id}</h5>
            <button type="button" className="btn-close btn-close-white" onClick={() => router.back()}></button>
          </div>
          
          <div className="modal-body text-center bg-light">
            <img 
                src={pokemon.sprites.other['official-artwork'].front_default} 
                alt={pokemon.name} 
                className="img-fluid mb-3" 
                style={{width:'200px'}} 
            />
            
            <div className="card mb-3">
                <ul className="list-group list-group-flush text-start">
                    <li className="list-group-item d-flex justify-content-between">
                        <span>❤️ {dictionary.modal.hp}</span>
                        <strong>{pokemon.stats[0].base_stat}</strong>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span>⚔️ {dictionary.modal.attack}</span>
                        <strong>{pokemon.stats[1].base_stat}</strong>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span>🛡️ {dictionary.modal.defense}</span>
                        <strong>{pokemon.stats[2].base_stat}</strong>
                    </li>
                </ul>
            </div>
            
            <div className="d-flex justify-content-between gap-2">
                <button className="btn btn-outline-primary w-50" onClick={() => handleNavigation('prev')}>
                    ← Anterior
                </button>
                <button className="btn btn-outline-primary w-50" onClick={() => handleNavigation('next')}>
                    Siguiente →
                </button>
            </div>
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => router.back()}>
              {dictionary.modal.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}