  (() => {
    'use strict';

    const forms = document.querySelectorAll('.needs-validation');

    Array.from(forms).forEach((form) => {
      form.addEventListener('submit', (event) => {
        const checked = form.querySelectorAll('.category-check:checked').length > 0;
        const categoryBox = document.getElementById('category-box');
        const categoryWarning = document.getElementById('category-warning');

        if (!checked) {
          categoryBox.classList.add('is-invalid');
          categoryWarning.style.display = 'block';
        } else {
          categoryBox.classList.remove('is-invalid');
          categoryWarning.style.display = 'none';
        }

        if (!form.checkValidity() || !checked) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add('was-validated');
      }, false);
    });
  })();



// Home page filter selection
let filters = document.querySelectorAll(".filter");

console.log(filters);

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    let category = filter.querySelector("p").innerText;
    console.log("category:", category);
    window.location.href = `/listings?category=${category}`;
  });
});