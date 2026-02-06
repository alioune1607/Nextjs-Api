'use client';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState } from 'react'; // Importamos useState

export default function Header() {
  const { dictionary, setLang } = useLanguage();
  const [showOtras, setShowOtras] = useState(false); // Estado para controlar el submenú

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 mb-4 shadow">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" href="/">PokeNext</Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" href="/">{dictionary.navbar.home}</Link>
            </li>
            
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                {dictionary.navbar.generations}
              </a>
              <ul className="dropdown-menu">
                {/* 1ª y 2ª Generación (Visibles siempre) */}
                <li><Link className="dropdown-item" href="/generation/1">{dictionary.navbar.gen1}</Link></li>
                <li><Link className="dropdown-item" href="/generation/2">{dictionary.navbar.gen2}</Link></li>
                
                <li><hr className="dropdown-divider" /></li>
                
                {/* SECCIÓN OTRAS (Interactiva) */}
                <li>
                  <button 
                    className="dropdown-item d-flex justify-content-between align-items-center fw-bold text-primary"
                    onClick={(e) => {
                      e.stopPropagation(); // ¡Truco! Evita que el menú principal se cierre
                      e.preventDefault();
                      setShowOtras(!showOtras); // Cambia entre visible/oculto
                    }}
                  >
                    {dictionary.navbar.others}
                    {/* Flechita que cambia de dirección */}
                    <span>{showOtras ? '▼' : '▶'}</span>
                  </button>
                </li>

                {/* SUBMENÚ (Solo se renderiza si showOtras es true) */}
                {showOtras && (
                  <div className="bg-light py-2 border-top border-bottom">
                     <li>
                        <Link className="dropdown-item ps-4 text-secondary" href="/generation/3">
                          {dictionary.navbar.gen3}
                        </Link>
                     </li>
                     <li>
                        <Link className="dropdown-item ps-4 text-secondary" href="/generation/4">
                          {dictionary.navbar.gen4}
                        </Link>
                     </li>
                  </div>
                )}

              </ul>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" href="/contact">{dictionary.navbar.contact}</Link>
            </li>
          </ul>

          <div className="d-flex gap-2">
            <button onClick={() => setLang('sp')} className="btn btn-sm btn-outline-light border-0">🇪🇸 SP</button>
            <button onClick={() => setLang('en')} className="btn btn-sm btn-outline-light border-0">🇬🇧 EN</button>
            <button onClick={() => setLang('fr')} className="btn btn-sm btn-outline-light border-0">🇫🇷 FR</button>
          </div>
        </div>
      </div>
    </nav>
  );
}