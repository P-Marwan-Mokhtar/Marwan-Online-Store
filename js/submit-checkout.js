const scripturl =
  "https://script.google.com/macros/s/AKfycbyD-YvnAOreTdInNFfdg_y434N4ubEFkRZun8NCtiOzC057hpnExVQF03Cb2iXvdJeK/exec";
let form = document.getElementById("form_contact");
let message = document.querySelector(".message");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch(scripturl, {
    method: "post",
    body: new FormData(form),
  })
    .then((response) => {
      setTimeout(() => {
        message.style.display = "flex";

      }, 0);

      setTimeout(() => {
        localStorage.removeItem("cart");
        window.location.replace("index.html");
      }, 3000);
    })
    .catch((error) => console.error("error", error.message));
});
