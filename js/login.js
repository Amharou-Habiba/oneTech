
let emailInput = document.querySelector("#userEmail");
let passInput = document.querySelector("#userPass");
let loginBtn = document.querySelector(".btn");

loginBtn.addEventListener("click", function (e) {
  let loginData = {
    email: emailInput.value,
    password: passInput.value,
  };
  console.log(loginData);
  login(loginData);
  e.preventDefault();
});

async function login(data) {
  let res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  let finalRes = await res.json();
  console.log(finalRes);
  if (finalRes.message == "success") {
    toastr["success"](`${finalRes.message} `);
    window.location.href = "index.html";
    localStorage.setItem("userToken", JSON.stringify(finalRes.token));
  } else {
    toastr["error"](`${finalRes.message} `);
  }
}
toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: "toast-top-right",
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};
