import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center mt-5">
      <h1 className="display-1 text-danger fw-bold">404</h1>
      <h3>¡Pokémon no encontrado!</h3>
      <p className="lead">Parece que te has perdido en la hierba alta.</p>
      <Link href="/" className="btn btn-primary mt-3">Volver al Inicio</Link>
    </div>
  );
}