const API_KEY = '794d7e35141645cb62a0d7fcf70c4a93';

export async function getPeopleList(searchTerm = '', offset = 0) {
    try {
      const myHeaders = new Headers({ 'user-key': API_KEY });
      const url = `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=1`;
      const response = await fetch(url, { headers: myHeaders });
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(`Error with function getRestaurants ${error.message}`);
      throw error;
    }
  };