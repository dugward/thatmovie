const api_key = "b737a09f5864be7f9f38f1d5ad71c151";

//The detective's method for each new case. No one must know how simple it is, or he would lose his job. The clerk's list is mailed to his friend at the library and he simply drinks bourbon as he waits for a reply.

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
