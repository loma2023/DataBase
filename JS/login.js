
let Login_URL = "https://script.google.com/macros/s/AKfycbxc46V4g3wINYe0GJUYAQi006QTKc2cRiw9PKV-aC6-W1VyD11nZe35YXFimbi4dvrR/exec";

function login() {
  let username = document.querySelector(".username")
  let password = document.querySelector(".password")

  if (username.value == "" || password.value == "") { return }

  let UserData = [];
  fetch(Login_URL)
    .then((response) => response.json())
    .then((row) => {

      for (let i = 1; i < row.length; i++) {
        let colum = row[i];
        if (colum[2] === username.value) {
          if (colum[3] == password.value) {
            let obj = { username: colum[2], img: colum[4] };
            UserData.push(obj)
            localStorage.setItem("User", JSON.stringify(UserData))
            location.href = "home.html"
            return
          }
          else { alert("كلمة المرور خطأ"); return }
        }
      }
      alert("اسم المستخدم خطأ")
    })
}

function sendEmail() {
  let username = document.querySelector(".username")
  if (username.value == "") { alert("اكتب اسم المستخدم"); return }

  fetch(Login_URL)
    .then((response) => response.json())
    .then((row) => {
      for (let i = 1; i < row.length; i++) {
        let colum = row[i];
        if (colum[2] === username.value) {
          Email.send({
            SecureToken: "585b81bb-37a9-4a98-8c00-9f4232394efc",
            To: colum[1],
            From: "loma8064@gmail.com",
            Subject: "كلمة المرور",
            Body: "كلمة المرور الخاصه بك هي" + "<br><br>" + colum[3]
          })
          document.querySelector(".DoneSent").style.display = "table"
          return
        }
      }
      alert("اسم المستخدم خطأ")
    })
}

function Back() {
  location.href = "index.html"
}