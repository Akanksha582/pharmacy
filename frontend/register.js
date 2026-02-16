document.getElementById("registerForm").addEventListener("submit", async (e)=>{
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:5000/api/auth/register-user", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();

  if(res.ok){
    alert("Account created — login now");
    window.location.href = "login.html";
  } else {
    document.getElementById("msg").innerText = data.msg;
  }
});
