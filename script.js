/* Cardholder Name Input */
const cardName = document.getElementById("card-name");
const nameGroup = document.querySelector('[data-form-el="name"]');
const nameInput = nameGroup.querySelector('input[name="name"]');
const nameErrorField = nameGroup.querySelector(".error-msg");

const nameRegex = /^[a-zA-Z -\.\D]{1,30}$/;

function nameGroupValidation(e) {
  nameGroup.classList.remove("error");
  if (nameInput.value.trim().length === 0) {
    nameErrorField.textContent = "Can't be blank";
    nameGroup.classList.add("error");
    cardName.textContent = "Jane Appleseed"; // Reset Card Name
  } else if (!nameRegex.test(nameInput.value)) {
    nameErrorField.textContent =
      "Wrong format, 1-30 characters, letters, space, dash, and period only";
    nameGroup.classList.add("error");
  } else {
    cardName.textContent = nameInput.value; // Set Card Name
  }
}

nameInput.addEventListener("change", nameGroupValidation);
nameInput.addEventListener("input", nameGroupValidation);
nameInput.addEventListener("focus", nameGroupValidation);

/* Card Number Input */
const cardNum = document.getElementById("card-num");
const numGroup = document.querySelector('[data-form-el="card-num"]');
const numInput = numGroup.querySelector('input[name="card-num"]');
const numErrorField = numGroup.querySelector(".error-msg");

const numRegex = /^\d{4} \d{4} \d{4} \d{4}$/;

function numGroupValidation(e) {
  numGroup.classList.remove("error");
  if (numInput.value.trim().length === 0) {
    numErrorField.textContent = "Can't be blank";
    numGroup.classList.add("error");
    cardNum.textContent = "0000 0000 0000 0000"; // Reset Card Number
  } else if (!numRegex.test(numInput.value)) {
    numErrorField.textContent =
      "Wrong format, 16 digits with space between every 4 digits, and numbers only";
    numGroup.classList.add("error");
  } else {
    cardNum.textContent = numInput.value; // Set Card Number
  }
}

numInput.addEventListener("change", numGroupValidation);
numInput.addEventListener("input", numGroupValidation);
numInput.addEventListener("focus", numGroupValidation);

/* Card Expiration Input */
const cardMonth = document.getElementById("card-month");
const cardYear = document.getElementById("card-year");
const expGroup = document.querySelector('[data-form-el="exp"]');
const monthInput = expGroup.querySelector('input[name="month"]');
const yearInput = expGroup.querySelector('input[name="year"]');
const expErrorField = expGroup.querySelector(".error-msg");

const expRegex = /^\d{2}$/;
const expInputCtgy = {
  month: { card: cardMonth, input: monthInput },
  year: { card: cardYear, input: yearInput },
};

function expInputValidation(e, ctgy, max) {
  expGroup.classList.remove("error");
  expInputCtgy[ctgy].input.classList.remove("error");

  if (expInputCtgy[ctgy].input.value.trim().length === 0) {
    expErrorField.textContent = "Can't be blank";
    expGroup.classList.add("error");
    expInputCtgy[ctgy].input.classList.add("error");
    expInputCtgy[ctgy].card.textContent = "00"; // Reset Month Number
  } else if (!expRegex.test(expInputCtgy[ctgy].input.value)) {
    expErrorField.textContent = "Wrong format, 2 numbers only";
    expGroup.classList.add("error");
    expInputCtgy[ctgy].input.classList.add("error");
  } else if (+expInputCtgy[ctgy].input.value > max) {
    expErrorField.textContent = `Max value is ${max}`;
    expGroup.classList.add("error");
    expInputCtgy[ctgy].input.classList.add("error");
  } else {
    expInputCtgy[ctgy].card.textContent = expInputCtgy[ctgy].input.value; // Set Month / Year
  }
}

monthInput.addEventListener("change", (e) => expInputValidation(e, "month", 12));
monthInput.addEventListener("input", (e) => expInputValidation(e, "month", 12));
monthInput.addEventListener("focus", (e) => expInputValidation(e, "month", 12));

yearInput.addEventListener("change", (e) => expInputValidation(e, "year", 99));
yearInput.addEventListener("input", (e) => expInputValidation(e, "year", 99));
yearInput.addEventListener("focus", (e) => expInputValidation(e, "year", 99));

/* Card CVC Input */
const cardCvc = document.getElementById("card-cvc");
const cvcGroup = document.querySelector('[data-form-el="cvc"]');
const cvcInput = cvcGroup.querySelector('input[name="cvc"]');
const cvcErrorField = cvcGroup.querySelector(".error-msg");

const cvcRegex = /^\d{3}$/;

function cvcGroupValidation(e) {
  cvcGroup.classList.remove("error");
  if (cvcInput.value.trim().length === 0) {
    cvcErrorField.textContent = "Can't be blank";
    cvcGroup.classList.add("error");
    cardCvc.textContent = "000"; // Reset Card CVC
  } else if (!cvcRegex.test(cvcInput.value)) {
    cvcErrorField.textContent = "Wrong format, 3 numbers only";
    cvcGroup.classList.add("error");
  } else {
    cardCvc.textContent = cvcInput.value; // Set Card CVC
  }
}

cvcInput.addEventListener("change", cvcGroupValidation);
cvcInput.addEventListener("input", cvcGroupValidation);
cvcInput.addEventListener("focus", cvcGroupValidation);

/* Reset Everything */
const reset = () => {
  // Reset Card Content
  cardName.textContent = "Jane Appleseed";
  cardNum.textContent = "0000 0000 0000 0000";
  cardMonth.textContent = "00";
  cardYear.textContent = "00";
  cardCvc.textContent = "000";
  // Reset Form Inputs
  nameInput.value = "";
  numInput.value = "";
  monthInput.value = "";
  yearInput.value = "";
  cvcInput.value = "";
};

/* Form Submission */
const cardForm = document.getElementById("card-form");
const completeState = document.getElementById("complete-state");

cardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Submitting form...");

  if (
    !nameRegex.test(nameInput.value) ||
    !numRegex.test(numInput.value) ||
    !expRegex.test(monthInput.value) ||
    !expRegex.test(yearInput.value) ||
    !cvcRegex.test(cvcInput.value)
  ) {
    return;
  }

  cardForm.classList.add("hidden");
  completeState.classList.remove("hidden");
});

/* Continue After Completion */
const continueBtn = completeState.querySelector(".btn");

continueBtn.addEventListener("click", (e) => {
  reset();
  cardForm.classList.remove("hidden");
  completeState.classList.add("hidden");
});
