const POKE_API = "https://pokeapi.co/api/v2/"

export async function getPokemonsList(params) {
    const query = Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&');
    let response = await fetch(`${POKE_API}pokemon?${query}`);
    return response.json();
}