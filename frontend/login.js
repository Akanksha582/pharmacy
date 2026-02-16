document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // ✅ get values from inputs
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role); // ADD THIS
      localStorage.setItem("email", email);   // ✅ save email
      
      if (data.role === "admin") {
        window.location.href = "admin-dashboard.html";
      } else {
        window.location.href = "user-home.html";
      }

    } else {
      document.getElementById("msg").innerText = data.msg || "Login failed";
    }

  } catch (err) {
    document.getElementById("msg").innerText = "Server error";
    console.log(err);
  }
});
