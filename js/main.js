
// carousel
var swiper = new Swiper(`[unique-script-id="w-w-dm-id"] .mySwiper`, {
  autoplay: { delay: 2000 },

  loop: false,

  pagination: {
    el: `[unique-script-id="w-w-dm-id"] .swiper-pagination`,
    clickable: true,
  },
});

// slideshow

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let card = document.getElementsByClassName("myCard");
  let dots = document.getElementsByClassName("dot");
  if (n > card.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = card.length }
  for (i = 0; i < card.length; i++) {
    card[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  card[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}


////////////////////////////add cart

let Products = [];
let eightPros = [];
async function getAllProducts() {
  let res = await fetch("https://ecommerce.routemisr.com/api/v1/products");
  let resFinal = await res.json();
  Products = resFinal.data;
  eightPros = Products.slice(0, 8);
  console.log(eightPros)
  disProEight();

}
getAllProducts();

function disProEight() {
  let pro = ``;
  for (let i = 0; i < eightPros.length; i++) {
    pro += `
                <div class="card">
                    <img src="${eightPros[i].imageCover}" alt="Huawei MediaPad">
                    <p class="price">$${eightPros[i].price}</p>
                    <p class="title">${eightPros[i].category.name}</p>
                    <p class="name">${eightPros[i].title}</p>
                    <button type="submit" onclick= "addToCart('${eightPros[i].id}');">Add Cart</button>
                </div>
    `;
  }
  document.querySelector(".small-cards").innerHTML = pro;
}

async function addToCart(proId) {
  console.log(proId);
  let res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // specify the content type
      token: localStorage.getItem("userToken").slice(1, -1),
    },
    body: JSON.stringify({
      productId: proId,
    }),
  });
  let resFinal = await res.json();
  console.log(resFinal);
}
