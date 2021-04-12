//selecting elements
const button = document.getElementById("search-button");
const inputDiv = document.getElementById("text-input");
const numFilter = document.getElementById("num-letters");
const inputBox = inputDiv.querySelectorAll("input");
//event listeners
numFilter.addEventListener("change", filterNumLetters);

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
