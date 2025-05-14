let nameInput = document.querySelector("#userName");
let emailInput = document.querySelector("#userEmail");
let passInput = document.querySelector("#userPass");
let rePassInput = document.querySelector("#userRePass");
let phoneInput = document.querySelector("#userPhone");
let registerBtn = document.querySelector(".btn");

registerBtn.addEventListener("click", function (e) {
  let registerData = {
    name: nameInput.value,
    email: emailInput.value,
    password: passInput.value,
    rePassword: rePassInput.value,
    phone: phoneInput.value,
  };
  console.log(registerData);
  register(registerData);
  e.preventDefault();
});

async function register(data) {
  let res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  let finalRes = await res.json();
  console.log(finalRes);
  if (finalRes.message == "success") {
    toastr["success"](`${finalRes.message} `);
    window.location.href = "login.html";
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

//  /* SignUp */
//   async function register(data) {

//     let res = await  fetch(`https://ecommerce.routemisr.com/api/v1/auth/signup`,{
//       method:"POST",
//       headers:{"Content-Type":"application/json"},
//       body:JSON.stringify(data)
//     });
//     let result = await res.json();
//     console.log(result);
//    }
//   /* End SignUp */
