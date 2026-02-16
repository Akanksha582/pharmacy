const token = localStorage.getItem("token");

if(!token){
  alert("Login first");
  window.location.href = "login.html";
}

async function loadProfile(){
  const res = await fetch("http://localhost:5000/api/user/me", {
    headers:{
      Authorization: localStorage.getItem("token")
    }
  });

  const data = await res.json();

  document.getElementById("profileName").innerText = data.email;
  document.getElementById("profileRole").innerText = data.role;
}

loadProfile();

async function saveProfile(){
  const email = document.getElementById("newEmail").value;

  await fetch("http://localhost:5000/api/user/update-profile",{
    method:"PUT",
    headers:{
      "Content-Type":"application/json",
      Authorization: localStorage.getItem("token")
    },
    body: JSON.stringify({ email })
  });

  loadProfile();
}


// ✅ Add product
document.getElementById("productForm")
.addEventListener("submit", async e=>{
  e.preventDefault();

  const body = {
    name: name.value,
    brand: brand.value,
    price: price.value,
    category: category.value,
    stock: stock.value
  };

  const res = await fetch(
    "http://localhost:5000/api/products/add",
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization": token
      },
      body: JSON.stringify(body)
    }
  );

  const data = await res.json();
  alert("Product added");
  loadProducts();
});


// ✅ Load products
async function loadProducts(){
  const res = await fetch(
    "http://localhost:5000/api/products"
  );

  const data = await res.json();

  document.getElementById("list").innerHTML =
    data.map(p => `
      <div>
        ${p.name} — ₹${p.price}
      </div>
    `).join("");
}

loadProducts();
