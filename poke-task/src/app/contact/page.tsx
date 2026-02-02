'use client';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
  const { dictionary } = useLanguage();
  
  return (
    <div className="container mt-5">
      <div className="card shadow border-info">
        <div className="card-header bg-info text-white">
            <h2>{dictionary.navbar.contact}</h2>
        </div>
        <div className="card-body">
            <p className="lead">{dictionary.contact.text}</p>
        </div>
      </div>
    </div>
  );
}