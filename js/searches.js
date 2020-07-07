const api_key = "b737a09f5864be7f9f38f1d5ad71c151";

//the Search classes: takes query, talks to tmdb, and spits out result into xSearch.result

export class peopleSearch {
  constructor(query) {
    this.query = query;
  }
  //the method for getting the results from the API
  async getResults() {
    const res = await axios(
      `https://api.themoviedb.org/3/search/person?api_key=${api_key}&query=${this.query}`
    );
    this.result = res;
  }
}

export class filmsSearch {
  constructor(query) {
    this.query = query;
  }
  //the method for getting the results from the API
  async getResults() {
    const res = await axios(
      `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_people=${this.query}`
    );
    this.result = res;
  }
}
