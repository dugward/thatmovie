import { peopleSearch, filmsSearch } from "./searches.js";

var rawNames = [];
var names = [];
var entries = [];
var entriesCleaned = [];

const personLookup = async () => {
  var films = {};
  films.search = new filmsSearch(entriesCleaned);

  //4. Search for people
  await films.search.getResults();

  //5. render results on UI
  var costars = films.search.result.data.results;
  console.log(costars);

  if (costars.length == 0) {
    document.getElementById("progress-button").style.display = "none";
    document.getElementById("failtext").style.display = "block";
    setTimeout(() => {
      document.getElementById("progress-button").style.display = "block";
      document.getElementById("failtext").style.display = "none";
    }, 3000);
  } else {
    document.getElementById("progress-button").style.display = "none";
    document.getElementById("background-text").style.display = "none";
    document.getElementById("actor-forms").style.display = "none";
    document.getElementsByClassName("results")[0].style.display = "block";

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

    document
      .getElementsByClassName("results")[0]
      .insertAdjacentHTML("beforeend", titleMarkup);
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
for (let i = 1; i < 4; i++) {
  document.getElementById("remove" + i).addEventListener("click", () => {
    $("#person" + i).select2("val", "");
    $("#person" + i).html("");
  });
}

document.getElementById("theButton").addEventListener("click", async () => {
  names = [];
  rawNames = [];
  entries = [];
  entriesCleaned = [];
  for (var i = 0; i < 3; i++) {
    var selectBox = document.getElementById("person" + (i + 1)).value;
    if (
      (selectBox === undefined || selectBox == null || selectBox <= 0) == false
    ) {
      entries[i] = selectBox;
      rawNames[i] = $("#person" + (i + 1)).select2("data")[0].text;
    }
  }

  entriesCleaned = entries.filter((el) => {
    return el != null && el != "";
  });

  names = rawNames.filter((el) => {
    return el != null && el != "";
  });

  console.log(names);
  console.log(entriesCleaned);

  if (entriesCleaned.length < 2) {
    document.getElementById("progress-button").style.display = "none";
    document.getElementById("warningtext").style.display = "block";
    setTimeout(() => {
      document.getElementById("progress-button").style.display = "block";
      document.getElementById("warningtext").style.display = "none";
    }, 3000);
  } else {
    personLookup();
  }
});
