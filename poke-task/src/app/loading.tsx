export default function Loading() {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
            <div className="spinner-grow text-danger" style={{width: '3rem', height: '3rem'}} role="status"></div>
            <p className="mt-2 fw-bold">Cargando...</p>
        </div>
      </div>
    );
}