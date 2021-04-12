//selecting elements
const searchButton = document.getElementById("search-button");
const numFilter = document.getElementById("num-letters");
const inputDiv = document.getElementById("text-input");
const inputBox = inputDiv.querySelectorAll("input");
const resultsList = document.getElementById("results-list");
const resetButton = document.getElementById("reset-button");

//Feature: Filtering Text Boxes based on selected number
function filterNumLetters(event) {
  let selectedNum = event.target.value;
  let inputBoxes = [...inputBox];
  for (let i = 0; i < inputBoxes.length; i++) {
    if (i >= selectedNum) {
      inputBoxes[i].style.display = "none";
    } else {
      inputBoxes[i].style.display = "";
    }
  }
}

numFilter.addEventListener("change", filterNumLetters);

//Feature : Display input text when search button clicked
searchButton.addEventListener("click", getWordsFromInput);

function getWordsFromInput(event) {
  event.preventDefault();
  let inputBoxes = [...inputBox];
  let displayedInputBoxes = inputBoxes.filter((box) => !box.style.display);
  let searchQueryString = "";
  displayedInputBoxes.forEach((input) => {
    let char = input.value;
    if (char) {
      searchQueryString += char;
    } else {
      searchQueryString += "?";
    }
  });

  fetch(`https://api.datamuse.com/words?sp=${searchQueryString}`)
    .then((res) => res.json())
    .then((data) => displayWords(data))
    .catch((err) => console.log("something went wrong", err));
  searchButton.style.display = "none";
  resetButton.style.display = "";
}

function displayWords(dataArr) {
  let wordsArr = dataArr.map((data) => data.word);
  for (let i = 0; i < wordsArr.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = wordsArr[i];
    resultsList.appendChild(li);
  }
}

//Feature: Reset by clearing the words list & input boxes
resetButton.addEventListener("click", reset);

function reset() {
  while (resultsList.firstChild) {
    resultsList.removeChild(resultsList.firstChild);
  }
  searchButton.style.display = "";
  resetButton.style.display = "none";
  let inputBoxes = [...inputBox];
  inputBoxes.forEach((input) => (input.value = ""));
}
