'use client';
import { useEffect, useState, use } from 'react'; // Añadimos 'use'
import { useRouter } from 'next/navigation'; 
import { getPokemon } from '@/utils/api';
import { useLanguage } from '@/context/LanguageContext';

export default function PokemonModal({ params }: { params: Promise<{ id: string }> }) {
  // Desenvolvemos la promesa de los params
  const resolvedParams = use(params); 
  const router = useRouter();
  const { dictionary } = useLanguage();
  const [pokemon, setPokemon] = useState<any>(null);

  useEffect(() => {
    // Usamos el id desde resolvedParams
    getPokemon(Number(resolvedParams.id)).then(setPokemon).catch(console.error);
  }, [resolvedParams.id]);

  if (!pokemon) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex={-1}>
      {/* ... (resto del código del modal igual que antes) ... */}
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title text-capitalize">{pokemon.name} #{pokemon.id}</h5>
            <button type="button" className="btn-close btn-close-white" onClick={() => router.back()}></button>
          </div>
          <div className="modal-body text-center bg-light">
            <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} className="img-fluid mb-3" style={{width:'200px'}} />
            <div className="card">
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
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => router.back()}>{dictionary.modal.close}</button>
          </div>
        </div>
      </div>
    </div>
  );
}