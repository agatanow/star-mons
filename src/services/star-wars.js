const SW_API = "https://swapi.dev/api/";

export async function getPeopleList(page) {
    let response = await fetch(`${SW_API}people?page=${page}`);
    return response.json();
}
