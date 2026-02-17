const statProducts = document.getElementById("statProducts");
const statUsers = document.getElementById("statUsers");
const statSales = document.getElementById("statSales");
const statRevenue = document.getElementById("statRevenue");

const token = localStorage.getItem("token");

if (!token) {
  alert("Login first");
  window.location.href = "login.html";
}

/* ---------------- PROFILE ---------------- */

const profileName = document.getElementById("profileName");
const profileRole = document.getElementById("profileRole");

async function loadProfile() {
  try {
    const res = await fetch("http://localhost:5000/api/user/me", {
      headers: { Authorization: token }
    });

    if (!res.ok) return;

    const data = await res.json();

    if (profileName) profileName.innerText = data.email || "Admin";
    if (profileRole) profileRole.innerText = data.role || "admin";

  } catch (e) {
    console.log("profile api not ready");
  }
}

function editProfile() {
  document.getElementById("editBox").style.display = "block";
}

async function saveProfile() {
  const email = document.getElementById("newEmail").value;

  await fetch("http://localhost:5000/api/user/update-profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ email })
  });

  loadProfile();
}


/* ---------------- PRODUCTS ---------------- */

const form = document.getElementById("productForm");

if (form) {
  form.addEventListener("submit", async e => {
    e.preventDefault();

    const fd = new FormData();

    fd.append("name", document.getElementById("title").value);
    fd.append("description", document.getElementById("description").value);
    fd.append("brand", document.getElementById("brand").value);
    fd.append("price", document.getElementById("price").value);
    fd.append("stock", document.getElementById("stock").value);
    fd.append("category", document.getElementById("category").value);
    fd.append("offer", document.getElementById("offer").value);

    // ✅ file input
    const imgFile = document.getElementById("image").files[0];
    if (imgFile) {
      fd.append("image", imgFile);
    }

    const res = await fetch("http://localhost:5000/api/products/add", {
      method: "POST",
      headers: {
        Authorization: token   // ⚠️ Content-Type mat lagana
      },
      body: fd
    });

    if(res.ok){
      alert("Product Added ✅");
      window.location.href = "admin-dashboard.html";
    } else {
      alert("Error adding product");
    }
  });
}


async function loadProducts() {
  const box = document.getElementById("productList");
  if (!box) return;

  const res = await fetch("http://localhost:5000/api/products");
  const data = await res.json();

  box.innerHTML = data.map(p => `
    <div class="product-row">
      <div>
        <b>${p.name}</b><br>
        <small>${p.brand}</small>
      </div>

      <div>₹${p.price}</div>

      <div>
        <button onclick="editProduct('${p._id}','${p.name}','${p.price}','${p.stock}')">Edit</button>
        <button onclick="deleteProduct('${p._id}')">Delete</button>
      </div>
    </div>
  `).join("");

  /* optional stat fallback */
  const statProducts = document.getElementById("statProducts");
  if (statProducts) statProducts.innerText = data.length;
}

async function deleteProduct(id) {
  if (!confirm("Delete this product?")) return;

  await fetch(`http://localhost:5000/api/products/${id}`, {
    method: "DELETE",
    headers: { Authorization: token }
  });

  loadProducts();
}

async function editProduct(id, name, price, stock) {
  const newName = prompt("Name:", name);
  const newPrice = prompt("Price:", price);
  const newStock = prompt("Stock:", stock);

  if (!newName) return;

  await fetch(`http://localhost:5000/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({
      name: newName,
      price: newPrice,
      stock: newStock
    })
  });

  loadProducts();
}


/* ---------------- STATS ---------------- */

async function loadStats() {
  try {
    const res = await fetch(
      "http://localhost:5000/api/admin/stats",
      { headers: { Authorization: token } }
    );

    if (!res.ok) return;

    const s = await res.json();

    if (statProducts) statProducts.innerText = s.totalProducts;
    if (statUsers) statUsers.innerText = s.totalUsers;
    if (statSales) statSales.innerText = s.totalSales;
    if (statRevenue) statRevenue.innerText = "₹" + s.revenue;

  } catch (e) {
    console.log("stats api not ready");
  }
}


/* ---------------- MENU ACTIVE ---------------- */

document.querySelectorAll(".menu li").forEach(li => {
  li.addEventListener("click", () => {
    document.querySelectorAll(".menu li")
      .forEach(x => x.classList.remove("active"));
    li.classList.add("active");
  });
});

/* ---------------- INIT ---------------- */

loadProfile();
loadProducts();
loadStats();

/* auto refresh */
setInterval(() => {
  loadProducts();
  loadStats();
}, 10000);

/*-----------------------logout button-----------------------*/
function logout(){
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

