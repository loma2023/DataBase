
if (localStorage.User == null) {location.href = "index.html"}

document.querySelector(".navigation").innerHTML = `
            <ul>
                <li>
                    <a href="home.html">
                        <span class="icon">
                            <ion-icon name="home-outline"></ion-icon>
                        </span>
                        <span class="title">الرئيسية</span>
                    </a>
                </li>

                <li>
                    <a href="Data_Customers.html">
                        <span class="icon">
                            <ion-icon name="people-outline"></ion-icon>
                        </span>
                        <span class="title">العملاء</span>
                    </a>
                </li>

                <li>
                    <a href="Data_Suppliers.html">
                        <span class="icon">
                            <ion-icon name="people-outline"></ion-icon>
                        </span>
                        <span class="title">الموردين</span>
                    </a>
                </li>

                <li>
                    <a href="Receipt.html">
                        <span class="icon">
                            <ion-icon name="newspaper-outline"></ion-icon>
                        </span>
                        <span class="title">الفاتورة</span>
                    </a>
                </li>

                <li>
                    <a href="Account_Cash.html">
                        <span class="icon">
                            <ion-icon name="cash-outline"></ion-icon>
                        </span>
                        <span class="title">النقدية</span>
                    </a>
                </li>

                <li>
                    <a href="Account_Tageer.html">
                        <span class="icon">
                            <ion-icon name="person-add-outline"></ion-icon>
                        </span>
                        <span class="title">التأجير</span>
                    </a>
                </li>

                <li>
                    <a href="Account_Astagar.html">
                        <span class="icon">
                            <ion-icon name="person-outline"></ion-icon>
                        </span>
                        <span class="title">الإستئجار</span>
                    </a>
                </li>

                <li>
                    <a href="Data_Expenses.html">
                        <span class="icon">
                            <ion-icon name="swap-horizontal-outline"></ion-icon>
                        </span>
                        <span class="title">المصروفات</span>
                    </a>
                </li>

                <li>
                    <a href="Data_Revenues.html">
                        <span class="icon">
                            <ion-icon name="swap-horizontal-outline"></ion-icon>
                        </span>
                        <span class="title">الإيرادات</span>
                    </a>
                </li>

                <li>
                    <a href="Profits.html">
                        <span class="icon">
                            <ion-icon name="stats-chart-outline"></ion-icon>
                        </span>
                        <span class="title">الأرباح</span>
                    </a>
                </li>

                <li>
                    <a href="Setting.html">
                        <span class="icon">
                            <ion-icon name="settings-outline"></ion-icon>
                        </span>
                        <span class="title">الإعدادات</span>
                    </a>
                </li>

                <li>
                    <a onclick="SignOut()">
                        <span class="icon">
                            <ion-icon name="log-out-outline"></ion-icon>
                        </span>
                        <span class="title">خروج</span>
                    </a>
                </li>
            </ul>`

let User = JSON.parse(localStorage.User);
let photo = "https://c.top4top.io/p_2610cyfak1.png"; 
if (User[0].img != "") {photo = User[0].img}

document.querySelector("head").innerHTML += `<link rel="icon" href="${photo}">`

document.querySelector(".topbar").innerHTML = `
            <div class="toggle" onclick="toggle()">
                <ion-icon name="menu-outline"></ion-icon>
            </div>

            <div class="search">
                <label>
                     <input class="inputSearch" type="text" placeholder="عن ماذا تبحث...؟" onkeyup="Search()">
                     <ion-icon name="search-outline"></ion-icon>
                </label>
            </div>

            <div class="user">
                <img src="${photo}" alt="">
            </div>`
     
function toggle() {
    let navigation = document.querySelector(".navigation");
    let main = document.querySelector(".main");
    navigation.classList.toggle("active");
    main.classList.toggle("active");
};

function SignOut() {
    localStorage.removeItem("username")
    location.href = "index.html"
}

