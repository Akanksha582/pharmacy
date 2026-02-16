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


// ✅ Load products
async function loadProducts(){
  const res = await fetch(
    "http://localhost:5000/api/products"
  );

  const data = await res.json();

  document.getElementById("productList").innerHTML =
    data.map(p => `
      <div>
        ${p.name} — ₹${p.price}
      </div>
    `).join("");
}

loadProfile();
loadProducts();

