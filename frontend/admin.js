const token = localStorage.getItem("token");
const profileName = document.getElementById("profileName");
const profileRole = document.getElementById("profileRole");


if(!token){
  alert("Login first");
  window.location.href = "login.html";
}

async function loadProfile(){
  try{
    const res = await fetch("http://localhost:5000/api/user/me", {
      headers:{ Authorization: token }
    });

    if(!res.ok) return;

    const data = await res.json();

    profileName.innerText = data.email || "Admin";
    profileRole.innerText = data.role || "admin";

  }catch(e){
    console.log("profile api not ready");
  }
  loadProfile();

}

function editProfile(){
  document.getElementById("editBox").style.display = "block";
}

async function saveProfile(){
  const email = document.getElementById("newEmail").value;

  await fetch("http://localhost:5000/api/user/update-profile",{
    method:"PUT",
    headers:{
      "Content-Type":"application/json",
      Authorization: token
    },
    body: JSON.stringify({ email })
  });

  loadProfile();
}



// ✅ Add product

const form = document.getElementById("productForm");

if(form){
  form.addEventListener("submit", async e=>{
    e.preventDefault();

    const body = {
      name: document.getElementById("name").value,
      brand: document.getElementById("brand").value,
      price: document.getElementById("price").value,
      category: document.getElementById("category").value,
      stock: document.getElementById("stock").value
    };

    await fetch("http://localhost:5000/api/products/add",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization": token
      },
      body: JSON.stringify(body)
    });

    alert("Product added");
    loadProducts();
  });
}

async function deleteProduct(id){
  if(!confirm("Delete this product?")) return;

  await fetch(`http://localhost:5000/api/products/${id}`,{
    method:"DELETE",
    headers:{ Authorization: token }
  });

  loadProducts();
}

// ✅ Load products
async function loadProducts(){
  const res = await fetch(
    "http://localhost:5000/api/products"
  );

  const data = await res.json();

  document.getElementById("productList").innerHTML =
    data.map(p => `
      <div class= "product-row">
        <b>${p.name} — ₹${p.price}
        <button onclick="editProduct('${p._id}','${p.name}','${p.price}','${p.stock}')">
          Edit
        </button>

        <button onclick="deleteProduct('${p._id}')">
          Delete
        </button>
      </div>
    `).join("");
}
async function editProduct(id,name,price,stock){

  const newName = prompt("Name:", name);
  const newPrice = prompt("Price:", price);
  const newStock = prompt("Stock:", stock);

  if(!newName) return;

  await fetch(`http://localhost:5000/api/products/${id}`,{
    method:"PUT",
    headers:{
      "Content-Type":"application/json",
      Authorization: token
    },
    body: JSON.stringify({
      name:newName,
      price:newPrice,
      stock:newStock
    })
  });

  loadProducts();
}

loadProfile();
loadProducts();

