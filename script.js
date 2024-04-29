const baseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-04-29/v1/currencies"

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg");


for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selcted";
    }
    else if (select.name == "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
const updateExchageRate = async () => {
  let amount = document.querySelector("form input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.vale = "1";
  }
  const URL = `${baseURL}/${fromCurr.value.toLowerCase()}.json`;

  let response = await fetch(URL);
  let data = await response.json();

  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

  let finalAmount = amtVal * rate;

  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault(); // prevents the default behaviour of the button(which is to refresh the page)
  updateExchageRate();
});

window.addEventListener("load", () => {
  updateExchageRate();
})
