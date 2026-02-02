'use client';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="alert alert-danger mt-5 text-center" role="alert">
      <h4 className="alert-heading">¡Ups! Algo salió mal.</h4>
      <p>Hubo un error al intentar cargar los Pokémon.</p>
      <button className="btn btn-danger" onClick={() => reset()}>
        Intentar de nuevo
      </button>
    </div>
  );
}