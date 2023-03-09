var initial = [
  {
    id: 1,
    name: "Laptop sleeve MacBook",
    price: 59,
    image: "imgs/peoducts/leptop sleeve macbook-min.png",
    added_to_cart: false,
    descrition: "Organic Cotton, fairtrade certified",
  },
  {
    id: 2,
    name: "Macbook pro '13'",
    price: 1099,
    image: "imgs/peoducts/macbook 13-min.png",
    dded_to_cart: false,
    descrition: "256, 8 core GPU, 8 GB",
  },
  {
    id: 3,
    name: "Supreme Water Bottle",
    price: 19,
    image: "imgs/peoducts/water pot-min.png",
    added_to_cart: false,
    descrition: "Table with air purifier, stained veneer/black",
  },
  {
    id: 4,
    name: "AirPods Max",
    price: 559,
    image: "imgs/peoducts/airpod max-min.png",
    added_to_cart: false,
    descrition: "A perfect balance of high-fidelity audio",
  },
  {
    id: 5,
    name: "flower leptop sleeve",
    price: 86,
    image: "imgs/peoducts/flower leptop sleeve-min.png",
    added_to_cart: false,
    descrition: "15 in. x 10 in. -Flap top closure",
  },
  {
    id: 6,
    name: "Laptop sleeve MacBook",
    price: 59,
    image: "imgs/peoducts/leptop sleeve-min.png",
    added_to_cart: false,
    descrition: "Organic Cotton, fairtrade certified",
  },
];


//have you visit us before ?
 productList = !!JSON.parse(localStorage.getItem("products"))
  ? JSON.parse(localStorage.getItem("products"))
  : initial;

//counter
const counterShoppingCart = document.getElementById("numberOfProducts");
counterShoppingCart.innerHTML = 0; 


// nav-bar
const links = document.querySelector(".nav-links");
const menu = document.getElementById("hamborger-menu");
menu.addEventListener("click", () => {
  links.style.display = links.style.display == "block" ? "none" : "block";
});


//shopping-cart
const shopIcon = document.querySelector(".shop-icon");
const shoppingCart = document.querySelector(".shopping-cart");
shopIcon.addEventListener("click", () => {
  
  shoppingCart_rendering();
  shoppingCart.style.display =
    shoppingCart.style.display == "block" ? "none" : "block";
});

const shoppingCart_rendering = () => {
  const itemsInCart = productList.filter((p) => p.added_to_cart);
  document.querySelector(".shopping-cart-content").innerHTML = ""
    if (itemsInCart.length>0)
  itemsInCart.map((p) => {
      document.querySelector(".shopping-cart-content").innerHTML +=
      `<div class="ProductBox">
      
                <div class="img-wrapper">
                    <img src="${p.image}" alt="" />
                  </div>
                  <div class="product-details">
                    <div class="product-name-price">
                      <span class="product-name">${p.name}'</span>  
                      <span class="product-price">${p.price} $</span>  
                    </div>
                    
                    <button>Buy Now</button>
                    <button onclick="reamove(${p.id})" data-id="${p.id}">Remove</button>
    
                    </div>  
        
        
        `;
      });
  else
    document.querySelector(".shopping-cart-content").innerHTML =
      "There is no item !!";
};



//products
var productsContent = document.querySelector(".products-content");
// var button = `<a class='product__btn btn' onclick="toggleLocalStorage(productList[key],event)"  id='prod${productList[key].id}'> Add </a>`;
productList.map((product) => {
  //add id to each prod container
  
  productsContent.innerHTML += ` 
  <div class='products-box' id="${product.id}">
    <div class="img-wrapper">
            <img src='${product.image}' alt="">
        </div>
        <div class="name_price">
            <h3 class="product_name">${product.name}</h3>
            <h4 class="product_price">$${product.price}</h4>
        </div>
        <p class="product_description">${product.descrition}</p>  
        <button class="${product.added_to_cart?"Remove":"Add"}" data-id="${product.id}">${product.added_to_cart?"Remove":"Add to Cart"}</button>
        <button onclick="quickView(${product.id})"  class="">Quick view</button>         
        </div>
        
    `;
});


// add/Remove to cart
const productsContentDiv = document.querySelector(".products-content");
productsContentDiv.addEventListener("click",(e)=>triggerAddRemovetoCart(e))

const triggerAddRemovetoCart = (e) => {
  
    const id = e.target.getAttribute("data-id")
    let addedProduct = productList.find((product) => product.id == id);
    let restOfProducts = productList.filter((product) => product.id != id);
      //triggering f-t 
      addedProduct.added_to_cart = !addedProduct.added_to_cart;
      restOfProducts.push({ ...addedProduct });
      productList = restOfProducts;
      //styling
     e.target.className = e.target.className=="Remove"?"Add":"Remove";
      e.target.innerHTML = e.target.innerHTML =="Remove"?"addToCart":"Remove";      
      //rerendering shoppingCart_rendering
      shoppingCart_rendering()
      
      //counting 
      countShoppingCart();
 
  //Local storage saving ...
  localStorage.setItem("products", JSON.stringify(productList));
  
  
};

//reamove freom my cart
const reamove = (id) => {
  let addedProduct = productList.find((product) => product.id == id);
  let restOfProducts = productList.filter((product) => product.id != id);
  addedProduct.added_to_cart = !addedProduct.added_to_cart;
  restOfProducts.push({ ...addedProduct });
  productList = restOfProducts;
  //rerendering shopping Cart
  shoppingCart_rendering();
  //styleing btn 
  styleaddtoCartBtn(id)
  //counter 
  countShoppingCart()
  //Local storage saving ...
  localStorage.setItem("products", JSON.stringify(productList));
};


//styling add to cart button
const styleaddtoCartBtn=(id)=>{
  const  AddToCartBtns = document.getElementsByClassName("Remove");
  for (let i = 0; i < AddToCartBtns.length; i++) {
    if(AddToCartBtns[i].getAttribute("data-id") == id)
      mybtn=AddToCartBtns[i];
  }
  console.log(mybtn)
   if(mybtn){

     mybtn.className = mybtn.className=="Remove"?"Add":"Remove";
     mybtn.innerHTML = mybtn.innerHTML =="Remove"?"addToCart":"Remove";
   }
   

}

//count products at shoppingCart
const countShoppingCart = ()=>{
  let ProductsAdded_to_cart = productList.filter(product=>product.added_to_cart);
  let counter = ProductsAdded_to_cart.length;
  counterShoppingCart.innerHTML = counter;
}

//quick view Model
const Model = document.querySelector(".quick-view");
const quickView = (id)=>{
  let product = productList.find((product) => product.id == id);
  Model.innerHTML =` 
  <img src="imgs/Icons/close.png" alt="close" class="close" onclick="closeModel()">
          <div class="container">
            <div class="quick-view-content">
                <div class="img-wrapper">
                  <img src="${product.image}" alt="">
                </div>
                <div>
                <div class="name_price">
                <h3 class="product_name">${product.name}</h3>
                <h4 class="product_price">$${product.price}</h4>
            </div>
            <p class="product_description">${product.descrition}</p>  
                </div>
            </div>
          </div>
          `
Model.style.visibility = "visible";

}


//close

const closeModel = ()=>{
  Model.style.visibility = "hidden";
}


//at intitialization/reload
countShoppingCart();









