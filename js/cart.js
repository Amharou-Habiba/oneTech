let Products = [];

async function getAllProducts() {
  let res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("userToken").slice(1, -1),
    },
  });
  let resFinal = await res.json();
  Products = resFinal.data.products;
  console.log(Products);
  disProEight();
}

getAllProducts();

function disProEight() {
  let pro = ``;
  for (let i = 0; i < Products.length; i++) {
    // Calculate total price for each product
    let total = claculatetotal(Products[i].price, Products[i].count);

    pro += `
       <div class="product d-flex justify-content-center align-items-center">
                  <div class="col-md-2">
                    <img class="w-100" src="${Products[i].product.imageCover}" alt="">
                  </div>
                  <div class="col-md-2">${Products[i].product.title}</div>
                  <div class="col-md-2">${Products[i].price}</div>
                  <div class="col-md-2">${Products[i].count}</div>
                  <div class="col-md-2">${total}</div> <!-- Display total price here -->
                  <div class="col-md-2">
                    <button class="btn btn-danger" data-id="${Products[i].product._id}">Delete</button>
                  </div>
                </div>
    `;
  }
  document.querySelector(".new_pro").innerHTML = pro;
  
  // Add event listeners for delete buttons
  document.querySelectorAll(".btn-danger").forEach((button) => {
    button.addEventListener("click", async function () {
      let productId = this.getAttribute("data-id");
      await deleteProduct(productId);
    });
  });
}

async function deleteProduct(productId) {
  try {
    let res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("userToken").slice(1, -1),
      },
    });
    
    if (res.ok) {
      console.log(`Product with ID: ${productId} deleted successfully`);
      getAllProducts(); // Refresh the product list
    } else {
      console.log("Failed to delete product");
    }
  } catch (error) {
    console.error("Error deleting product:", error);
  }
}
function claculatetotal(prise,count){
  return prise*count
}
