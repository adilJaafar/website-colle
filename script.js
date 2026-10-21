// Simple checks pour des click et inputes.
function validateForm(form) {
  let valid = true;

  form.querySelectorAll("input, select, textarea").forEach((field) => {
    field.classList.remove("is-invalid");
    if (!field.checkValidity()) {
      field.classList.add("is-invalid");
      valid = false;
    }
    if (field.name === "message" && field.value.trim().length < 10) {
      field.classList.add("is-invalid");
      valid = false;
    }
  });

  return valid;
}

document.querySelectorAll("[data-validate-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const feedback = form.querySelector(".form-message");

    if (!validateForm(form)) {
      feedback.innerHTML = '<div class="alert alert-danger">Please check the highlighted fields.</div>';
      return;
    }

    form.reset();
    feedback.innerHTML = '<div class="alert alert-success">Thanks! Your form has been submitted.</div>';
  });
});

const searchForm = document.querySelector("#searchForm");
if (searchForm) {
  const from = searchForm.querySelector("#from");
  const to = searchForm.querySelector("#to");
  const date = searchForm.querySelector("#date");
  const feedback = searchForm.querySelector(".form-message");
  const today = new Date();
  date.min = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let valid = true;

    [from, to, date].forEach((field) => {
      field.classList.toggle("is-invalid", !field.value || !field.checkValidity());
      if (!field.value || !field.checkValidity()) valid = false;
    });

    if (from.value.trim().toLowerCase() === to.value.trim().toLowerCase()) {
      from.classList.add("is-invalid");
      to.classList.add("is-invalid");
      valid = false;
    }

    if (!valid) {
      feedback.innerHTML = '<div class="alert alert-danger">Enter different destinations and a valid date.</div>';
    } else {
      feedback.innerHTML = '<div class="alert alert-success">Searching trips...</div>';
    }
  });
}

const filters = document.querySelectorAll("[data-filter]");
const places = document.querySelectorAll(".place");

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((item) => {
      item.classList.remove("active", "btn-main");
      item.classList.add("btn-outline-main");
    });
    button.classList.add("active", "btn-main");
    button.classList.remove("btn-outline-main");

    places.forEach((card) => {
      card.hidden = button.dataset.filter !== "all" && card.dataset.region !== button.dataset.filter;
    });
  });
});
