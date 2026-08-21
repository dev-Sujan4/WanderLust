// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false,
    );
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