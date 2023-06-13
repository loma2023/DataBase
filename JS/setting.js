
let Login_URL = "https://script.google.com/macros/s/AKfycbxc46V4g3wINYe0GJUYAQi006QTKc2cRiw9PKV-aC6-W1VyD11nZe35YXFimbi4dvrR/exec";

fetch(Login_URL)
  .then((response) => response.json())
  .then((row) => Data(row))

function Data(row) {
  localStorage.removeItem("table")
  let table = []
  let obj = ""
  let colum = "";
  for (let i = 1; i < row.length; i++) {
    colum = row[i];
    obj = { username: colum[2]}
    table.push(obj)
    localStorage.setItem("table", JSON.stringify(table))
  }
}

function CRUD(id) {
    let id1 = "=row()-2"
    let email = document.querySelector(".email").value
    let username = document.querySelector(".username").value
    let password = document.querySelector(".password").value
    let Rpassword = document.querySelector(".Rpassword").value
    let img = document.querySelector(".photo").value
    let table = []
    if (localStorage.table != null) { table = JSON.parse(localStorage.table) }

    if (email.includes("@gmail.com") == false) {alert("البريد الاكتروني غير صالح");return}
    if (password != Rpassword) {alert("كلمة المرور غير متطابقة");return}  
      
    let url
    if (id === "save") {
    for (let i = 0; i < table.length; i++) {if(table[i].username == username ){alert("اسم المستخدم موجود");return}}  
    url = Login_URL + "?callback=ctrlq&email=" + email + "&id=" + id1 + "&action=insert" + "&username=" + username + "&password=" + password+ "&img=" + img;    
    }else{
    if (username != table[id].username){for (let i = 0; i < table.length; i++) {if(table[i].username == username ){alert("اسم المستخدم موجود");return}}}    
    url = Login_URL + "?callback=ctrlq&email=" + email + "&id=" + id + "&action=update" + "&username=" + username + "&password=" + password+ "&img=" + img;
    }
    let request = jQuery.ajax({ crossDomain: true, url: url, method: "GET", dataType: "jsonp" });  
    setTimeout(() => {location.href = "Setting.html"}, 1000);
}

function ShowData() {
    let oldusername = document.querySelector(".oldusername")
    let oldpassword = document.querySelector(".oldpassword")

    let email = document.querySelector(".email")
    let username = document.querySelector(".username")
    let password = document.querySelector(".password")
    let Rpassword = document.querySelector(".Rpassword")
    let img = document.querySelector(".photo")
    let btnsave = document.querySelectorAll(".btn_save")[0]
    if (oldusername.value == "" || oldpassword.value == "") { return }
  
    fetch(Login_URL)
      .then((response) => response.json())
      .then((row) => {
  
        for (let i = 1; i < row.length; i++) {
          let colum = row[i];
          if (colum[2] === oldusername.value) {
            if (colum[3] == oldpassword.value) {
                email.value = colum[1]
                username.value = colum[2]
                password.value = colum[3]
                Rpassword.value = colum[3]
                img.value = colum[4]
                btnsave.id = colum[0]
                Exit()
            return
            }
            else { alert("كلمة المرور خطأ"); return }
          }
        }
        alert("اسم المستخدم خطأ")
      })
}

function EditPaswWord() {
    document.querySelectorAll(".EditPass")[0].style.top = "0px"
    setTimeout(() => { document.querySelectorAll(".EditPass")[0].style.background = "rgba(0, 0, 0, 0.5)" }, 650);
}

function Exit() {
    document.querySelector(".oldusername").value = ""
    document.querySelector(".oldpassword").value = ""
    document.querySelectorAll(".EditPass")[0].style.transition = "0.1s"
    document.querySelectorAll(".EditPass")[0].style.background = "none"
    setTimeout(() => {
        document.querySelectorAll(".EditPass")[0].style.top = "-100vh";
        document.querySelectorAll(".EditPass")[0].style.transition = "1s"
    }, 100);
}
