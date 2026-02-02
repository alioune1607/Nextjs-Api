// Devuelve un array de IDs únicos aleatorios
export function getRandomIds(count: number, min: number, max: number): number[] {
    const ids = new Set<number>();
    while(ids.size < count) {
      ids.add(Math.floor(Math.random() * (max - min + 1) + min));
    }
    return Array.from(ids);
}
  
// Obtiene datos de un pokemon
export async function getPokemon(id: number) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch pokemon');
    return res.json();
}