// A crude mailbox is constructed for dispatches from the detective
import { filmsSearch } from "./searches.js";

// Empty notepads are strewn about, waiting to be filled.
var rawNames = [];
var names = [];
var entries = [];
var entriesCleaned = [];

// A gentleman walks in and he is noted by the clerk at the small desk
history.pushState({ pagestate: "resultsdown" }, null, "");

//Should the gentleman try to leave, he clerk will check the state of his ticket before he is allowed.

const backToInput = () => {
  document.getElementById("progress-button").style.display = "block";
  document.getElementById("background-text").style.display = "block";
  document.getElementById("actor-forms").style.display = "block";
  document.getElementsByClassName("results")[0].style.display = "none";
};

window.onpopstate = () => {
  if (window.history.state.pagestate == "resultsdown") {
    backToInput();
  }
};

// If he manages to get a list of two or more actors, the clerk will send a letter to the detetctive to ask which movies they were in together.
const personLookup = async () => {
  var films = {};
  // The detective opens a new case
  films.search = new filmsSearch(entriesCleaned);
  //He waits unitl he has found the movies and puts a list in the mail for the clerk.
  await films.search.getResults();
  //The clerk recieves the results and jots them down.
  var costars = films.search.result.data.results;
  console.log(costars);
  // If the list of movies is blank, the clerk sadly informs the gentleman
  if (costars.length == 0) {
    document.getElementById("progress-button").style.display = "none";
    document.getElementById("failtext").style.display = "block";
    setTimeout(() => {
      document.getElementById("progress-button").style.display = "block";
      document.getElementById("failtext").style.display = "none";
    }, 3000);
    // IF there are movies on the list, the clerk pepares a corner of the room for their display.
  } else {
    history.pushState({ pagestate: "resultsup" }, null, "");
    document.getElementById("progress-button").style.display = "none";
    document.getElementById("background-text").style.display = "none";
    document.getElementById("actor-forms").style.display = "none";
    document.getElementsByClassName("results")[0].style.display = "block";
    // He creates a banner introducing the films with the actors' names.
    var titleMarkup;
    if (names.length == 3) {
      titleMarkup = `
  <p class="resultsTitle">
  Films including <a target="_blank" href="https://www.themoviedb.org/person/${entriesCleaned[0]}">${names[0]}</a>, <a target="_blank" href="https://www.themoviedb.org/person/${entriesCleaned[1]}">${names[1]}</a>, and
  <a target="_blank" href="https://www.themoviedb.org/person/${entriesCleaned[2]}">${names[2]}.</a>
</p>
  `;
    } else {
      titleMarkup = `
    <p class="resultsTitle">
    Films including <a target="_blank" href="https://www.themoviedb.org/person/${entriesCleaned[0]}">${names[0]}</a> and <a target="_blank" href="https://www.themoviedb.org/person/${entriesCleaned[1]}">${names[1]}</a>.
  </p>
  `;
    }
    //The clerk puts up the introuductory banner.
    document
      .getElementsByClassName("results")[0]
      .insertAdjacentHTML("beforeend", titleMarkup);
    //He then prepares movie posters for each of the films and hangs them next to each other.
    for (let i = 0; i < costars.length; i++) {
      const listMarkup = `
    <a target="_blank" href="https://www.themoviedb.org/movie/${costars[i].id}"
          ><img
            src="https://image.tmdb.org/t/p/w600_and_h900_bestv2${costars[i].poster_path}"
            alt=""
        /></a>
    `;
      document
        .getElementsByClassName("results")[0]
        .insertAdjacentHTML("beforeend", listMarkup);
    }
  }
};

//If the gentleman was confused, the clerk offers various erasers to clear actor's names from his list.
for (let i = 1; i < 4; i++) {
  document.getElementById("remove" + i).addEventListener("click", () => {
    $("#person" + i).select2("val", "");
    $("#person" + i).html("");
  });
}
//There is a small, metal bell on the clerk's desk that can be used to alert the clerk that the gentleman has a query.
document.getElementById("theButton").addEventListener("click", async () => {
  names = [];
  rawNames = [];
  entries = [];
  entriesCleaned = [];
  //The clerk jots down the names and IDs of the actors that the gentleman has listed.
  for (var i = 0; i < 3; i++) {
    var selectBox = document.getElementById("person" + (i + 1)).value;
    if (
      (selectBox === undefined || selectBox == null || selectBox <= 0) == false
    ) {
      entries[i] = selectBox;
      rawNames[i] = $("#person" + (i + 1)).select2("data")[0].text;
    }
  }
  //The clerk gets rid of any blank or nonsensical parts of the gentleman's list
  entriesCleaned = entries.filter((el) => {
    return el != null && el != "";
  });

  names = rawNames.filter((el) => {
    return el != null && el != "";
  });

  console.log(names);
  console.log(entriesCleaned);

  //If the gentleman has not listed two or three names, the clerk politley points this out.
  if (entriesCleaned.length < 2) {
    document.getElementById("progress-button").style.display = "none";
    document.getElementById("warningtext").style.display = "block";
    setTimeout(() => {
      document.getElementById("progress-button").style.display = "block";
      document.getElementById("warningtext").style.display = "none";
    }, 3000);
    //If the list is in order, the clerk prepares his letter to the detective.
  } else {
    personLookup();
  }
});
