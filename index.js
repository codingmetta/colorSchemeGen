/** SETUP COLOR PICKER*/
const colorPicker = document.body.querySelector("#colorpicker");
const modeSelector = document.body.querySelector("#select");
const btn = document.body.querySelector(".btn");
const allBoxes = document.body.querySelectorAll(".box");
const allHexLabels = document.body.querySelectorAll(".hex-container");

const defaultColor = "#F55A5A";
const scheme = [];
let mode = "";
let modeStr = "";

window.addEventListener("load", startup, false);

function startup() {
  colorPicker.value = defaultColor;
  allHexLabels.forEach((item) => item.addEventListener("click", copyHexCode));
  btn.addEventListener("click", getSchemeData);
  colorPicker.addEventListener("change", watchColorPicker, false);
  modeSelector.addEventListener("change", changeMode);
  mode = modeSelector.value;
  modeStr = getModeStr();
  scheme[0] = colorPicker.value;
  document.body.querySelector("#first").style.backgroundColor =
    colorPicker.value;
  document.body.querySelector(
    "#first-hex"
  ).textContent = colorPicker.value.toUpperCase();
  colorPicker.select();

  getSchemeData();
}

function copyHexCode(event) {
  let hexcode = event.target.textContent;
  console.log(hexcode);
  // Copy the text inside the text field
  navigator.clipboard.writeText(hexcode);

  // Alert the copied text
  alert("Hexcode " + hexcode + " copied to Clipboard!");
}

function changeMode(event) {
  mode = event.target.value;
  modeStr = getModeStr();
}

function watchColorPicker(event) {
  document.body.querySelector("#first").style.backgroundColor =
    event.target.value;
  document.body.querySelector(
    "#first-hex"
  ).textContent = event.target.value.toUpperCase();
  scheme[0] = event.target.value.toUpperCase();
}

function getSchemeData() {
  let seed = scheme[0].substring(1);
  let fetchString = `https://www.thecolorapi.com/scheme?hex=${seed}&mode=${modeStr}&count=4`;

  fetch(fetchString)
    .then((res) => res.json())
    .then((data) => intializeScheme(data.colors));
}

function getModeStr() {
  let res;
  switch (mode) {
    case "0":
      res = "monochrome";
      break;
    case "1":
      res = "monochrome-dark";
      break;
    case "2":
      res = "monochrome-light";
      break;
    case "3":
      res = "analogic";
      break;
    case "4":
      res = "complement";
      break;
    case "5":
      res = "analogic-complement";
      break;
    case "6":
      res = "triad";
      break;
    default:
      res = "";
  }
  return res;
}

function intializeScheme(schemeData) {
  for (let i = 0; i < schemeData.length; i++) {
    scheme[i + 1] = schemeData[i].hex.value;
  }
  allBoxes.forEach(
    (item, index) => (item.style.backgroundColor = scheme[index])
  );

  allHexLabels.forEach(
    (item, index) => (item.textContent = scheme[index].toUpperCase())
  );
  console.log(scheme[2]);
}
