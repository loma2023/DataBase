let General_URL = "https://script.google.com/macros/s/AKfycbxFnAn0dSbeWrUVh_GppFXKCqqF0YEXxKhY6hdHJwpmaw7wOF01TWWAhcXIMGTliQ_5/exec";
let Receipt_URL = "https://script.google.com/macros/s/AKfycbw7HNznENI2Kohz5CkTxFP_oY_MU81F_IRxNlmwFCtUbaZYhV21PVXCFD2n3VxeJeIB/exec";
let Customers_URL = "https://script.google.com/macros/s/AKfycbymBgQT9pQ_wBhXWG6MA_cYO0N6iL3i3rhzNGPwGQ9IRUTzYuRit2iFM_CKMAmePhWF/exec";
let Suppliers_URL = "https://script.google.com/macros/s/AKfycbwT3IFXZ3wzu-d_wpowldvuC32aY6wYLW54o-akI91S7JDxbi_4V_DVe6ZLi-NAF8F3/exec";

function fetchs(){
fetch(Receipt_URL)
    .then((response) => response.json())
    .then((row) => {
    let btn_insert = document.querySelector(".btn_insert").id
    if (btn_insert === "save") {
        let date = new Date(), yeer = date.getFullYear(), mons = date.getMonth() + 1, day = date.getDate(), fulldate

        if (mons < 10 && day < 10) { fulldate = yeer + "-0" + mons + "-0" + day }
        else if (mons > 10 && day > 10) { fulldate = yeer + "-" + mons + "-" + day }
        else if (mons > 10 && day < 10) { fulldate = yeer + "-" + mons + "-0" + day }
        else if (mons < 10 && day > 10) { fulldate = yeer + "-0" + mons + "-" + day }

        document.querySelector(".date").value = fulldate
        document.querySelector(".nu").value = row.length
    }
})}
fetchs()

function typeReceipt(value) {
    if (value === "تأجير نقدي" || value === "تأجير آجل") {
        fetch(Customers_URL)
            .then((response) => response.json())
            .then((row) => {
                let element = "";
                for (let i = 1; i < row.length; i++) {
                    let colum = row[i];
                    element += `<option value="${colum[1]}">${colum[1]}</option>`
                }
                document.querySelector(".nameCustomer").innerHTML = element
            })
    } else if (value === "استئجار نقدي" || value === "استئجار آجل") {
        fetch(Suppliers_URL)
            .then((response) => response.json())
            .then((row) => {
                let element = "";
                for (let i = 1; i < row.length; i++) {
                    let colum = row[i];
                    element += `<option value="${colum[1]}">${colum[1]}</option>`
                }
                document.querySelector(".nameCustomer").innerHTML = element
            })
    }
}

function additem(id) {
    let tablebody = document.querySelector(".table-body");
    let btnsave = document.querySelector(".btn_save");
    let item = document.querySelector(".item").value
    let quantity = document.querySelector(".quantity").value
    let price = document.querySelector(".price").value
    let statement = document.querySelector(".statement").value
    let row = tablebody.querySelectorAll("tr")

    if (item === "" || quantity === "" || price === "") { alert("ادخل البيانات كامله"); return }

    if (id === "save") {
        if (row.length === 10) { alert("لقد وصلت للحد الاقصي للاصناف"); return }
        tablebody.innerHTML += `
        <tr>
            <td class="tdquantity">${quantity}</td>
            <td class="tditem">${item}</td>
            <td class="tdprice">${price}</td>
            <td class="tdstatement">${statement}</td>
            <td><a id="${row.length}" class="fas fa-pen" onclick="Edit(event)"></a><a id="${row.length}" class="fas fa-trash" onclick="deletevalue(event)"></a></td>
        </tr>`
    } else {
        row[id].innerHTML = `
        <tr>
            <td class="tdquantity">${quantity}</td>
            <td class="tditem">${item}</td>
            <td class="tdprice">${price}</td>
            <td class="tdstatement">${statement}</td>
            <td><a id="${id}" class="fas fa-pen"   onclick="Edit(event)"></a><a id="${id}" class="fas fa-trash" onclick="deletevalue(event)" ></a></td>
        </tr>`
    }

    total()
    btnsave.id = "save"
    document.querySelector(".item").value = "";
    document.querySelector(".quantity").value = "";
    document.querySelector(".price").value = "";
    document.querySelector(".statement").value = "";
}

function Edit(event) {
    let btn = event.target;
    let id = btn.id
    let tablebody = document.querySelector(".table-body");
    let row = tablebody.querySelectorAll("tr")[id]
    let btnsave = document.querySelector(".btn_save")
    let item = document.querySelector(".item")
    let quantity = document.querySelector(".quantity")
    let price = document.querySelector(".price")
    let statement = document.querySelector(".statement")

    btnsave.id = id
    item.value = row.querySelector(".tditem").innerText;
    quantity.value = row.querySelector(".tdquantity").innerText;
    price.value = row.querySelector(".tdprice").innerText;
    statement.value = row.querySelector(".tdstatement").innerText;

    window.scroll({ top: 10, behavior: 'smooth' })
}

function deletevalue(event) {
    let btn = event.target;
    let id = btn.id
    let tablebody = document.querySelector(".table-body");
    let row = tablebody.querySelectorAll("tr")
    row[id].remove()
    total()
    let pen = tablebody.querySelectorAll(".fa-pen")
    let trash = tablebody.querySelectorAll(".fa-trash")

    for (let i = 0; i < row.length; i++) { pen[i].id = i; trash[i].id = i }
}

function total() {
    let tablebody = document.querySelector(".table-body");
    let row = tablebody.querySelectorAll("tr")
    let Total = 0;

    for (let i = 0; i < row.length; i++) { let price = row[i].querySelector(".tdprice").innerText; Total = Total + parseFloat(price) }

    let Discount = document.querySelector(".Discount").value
    document.querySelector(".subTotal").innerText = Total

    if (Discount === "") { document.querySelector(".Total").innerText = Total }
    else { document.querySelector(".Total").innerText = Total - parseFloat(Discount) }
}

function insert_value(id) {
    let nu = $(".nu").val()
    let date = $(".date").val();
    let typeReceipt = document.querySelector(".typeReceipt").value;
    let nameCustomer = document.querySelector(".nameCustomer");
    let tablebody = document.querySelector(".table-body");
    let table = tablebody.querySelectorAll("tr")
    let btn_insert = document.querySelector(".btn_insert")
    let btn = btn_insert.querySelector("button")

    if (date === "" || nu === "" || typeReceipt == 0 || nameCustomer == 0) { alert("اكمل بيانات الفاتورة"); return }
    if (table.length == 0) { alert("برجاء ادخال صنف علي الاقل"); return }

    btn.innerText = "...جارٍ الحفظ"

    Receipt(id);
    GeneralReceipt(id);
    setTimeout(() => { btn.innerText = "حفظ"; Clear() }, 6000);
}

function update_value(id) {
    let nu = $(".nu").val()
    let date = $(".date").val();
    let typeReceipt = document.querySelector(".typeReceipt").value;
    let nameCustomer = document.querySelector(".nameCustomer");
    let tablebody = document.querySelector(".table-body");
    let table = tablebody.querySelectorAll("tr")
    let btn_insert = document.querySelector(".btn_insert")
    let btn = btn_insert.querySelector("button")

    if (date === "" || nu === "" || typeReceipt == 0 || nameCustomer == 0) { alert("اكمل بيانات الفاتورة"); return }
    if (table.length == 0) { alert("برجاء ادخال صنف علي الاقل"); return }

    btn.innerText = "...جارٍ التعديل"

    Receipt(id);
    GeneralReceipt(id);
    setTimeout(() => { btn.innerText = "تعديل" }, 6000);
}

function GeneralReceipt(id) {
    let nu = $(".nu").val()
    let date = $(".date").val();
    let typeReceipt = document.querySelector(".typeReceipt").value;
    let nameCustomer = document.querySelector(".nameCustomer");
    let btn_insert = document.querySelector(".btn_insert")
    let btn = btn_insert.querySelector("button");

    let tablebody = document.querySelector(".table-body");
    let table = tablebody.querySelectorAll("tr")

    //======================= القيد ===================================================
    let debit = ""; let credit = ""; let subdebit = ""; let subcredit = "";
    if (typeReceipt === "تأجير نقدي") { debit = "الصندوق"; credit = "التأجير"; subdebit = "الصندوق"; subcredit = "التأجير النقدي" }
    else if (typeReceipt === "تأجير آجل") { debit = "العملاء"; credit = "التأجير"; subdebit = nameCustomer.value; subcredit = "التأجير الآجل" }
    else if (typeReceipt === "استئجار نقدي") { debit = "الاستئجار"; credit = "الصندوق"; subdebit = "الاستئجار النقدي"; subcredit = "الصندوق"; }
    else if (typeReceipt === "استئجار آجل") { debit = "الاستئجار"; credit = "الموردين"; subdebit = "الاستئجار الآجل"; subcredit = nameCustomer.value; }
    //==================================================================================

    fetch(General_URL)
        .then((response) => response.json())
        .then((data) => {
            for (let i = 0; i < table.length; i++) {
                let item = table[i].querySelector(".tdquantity").innerText + " " + table[i].querySelector(".tditem").innerText;
                let statement = table[i].querySelector(".tdstatement").innerText;
                let amountdebit = table[i].querySelector(".tdprice").innerText;
                let amountcredit = table[i].querySelector(".tdprice").innerText;

                if (id === "save") {
                    let NR = data.length + 1
                    let row = NR + i;
                    let url = General_URL + "?callback=ctrlq&row=" + row + "&date=" + date + "&nu=" + nu + "&action=insert" + "&statement=" + statement +
                        "&debit=" + debit + "&item=" + item + "&credit=" + credit + "&subdebit=" + subdebit + "&subcredit=" + subcredit +
                        "&amountdebit=" + amountdebit + "&amountcredit=" + amountcredit;
                    let request = jQuery.ajax({ crossDomain: true, url: url, method: "GET", dataType: "jsonp" });

                } else if (id === "update") {
                    let sr = btn.id;
                    let row = i + parseFloat(sr)
                    let lanth = table.length + parseFloat(sr);
                    let time = 0 + parseFloat(i)
                    let url = General_URL + "?callback=ctrlq&row=" + row + "&date=" + date + "&nu=" + nu + "&action=update" + "&statement=" + statement +
                        "&debit=" + debit + "&item=" + item + "&credit=" + credit + "&subdebit=" + subdebit + "&subcredit=" + subcredit +
                        "&amountdebit=" + amountdebit + "&amountcredit=" + amountcredit + "&sr=" + sr + "&lanth=" + lanth + "&time=" + time;
                    let request = jQuery.ajax({ crossDomain: true, url: url, method: "GET", dataType: "jsonp" });
                }
            }
        })
        .then(() => { setTimeout(() => { alert("تم حفظ الفاتورة") }, 1000); })
}

function Receipt(id) {
    let nu = $(".nu").val()
    let date = $(".date").val();
    let typeReceipt = document.querySelector(".typeReceipt").value;
    let nameCustomer = document.querySelector(".nameCustomer").value;
    let subTotal = document.querySelector(".subTotal").innerText;
    let discount = document.querySelector(".Discount").value;
    let total = document.querySelector(".Total").innerText;

    let tablebody = document.querySelector(".table-body");
    let table = tablebody.querySelectorAll("tr")
    let type
    if (typeReceipt === "تأجير نقدي") { type = "تأجير نقدي" } else if (typeReceipt === "تأجير آجل") { type = "تأجير آجل" } else if (typeReceipt === "استئجار نقدي") { type = "استئجار نقدي" } else if (typeReceipt === "استئجار آجل") { type = "استئجار آجل" }

    let url
    if (id === "save") {
        url = Receipt_URL + "?callback=ctrlq&date=" + date + "&nu=" + nu + "&action=insert" + "&typeReceipt=" + type +
            "&nameCustomer=" + nameCustomer + "&subTotal=" + subTotal + "&discount=" + discount + "&total=" + total;
    } else if (id === "update") {
        url = Receipt_URL + "?callback=ctrlq&date=" + date + "&nu=" + nu + "&action=update" + "&typeReceipt=" + type +
            "&nameCustomer=" + nameCustomer + "&subTotal=" + subTotal + "&discount=" + discount + "&total=" + total;
    }
    for (let i = 0; i < table.length; i++) {
        let items = "item" + [i]
        let quantitys = "quantity" + [i]
        let prices = "price" + [i]
        let statements = "statement" + [i]

        let item = table[i].querySelector(".tditem").innerText;
        let quantity = table[i].querySelector(".tdquantity").innerText;
        let price = table[i].querySelector(".tdprice").innerText;
        let statement = table[i].querySelector(".tdstatement").innerText;

        url += "&" + items + "=" + item + "&" + quantitys + "=" + quantity + "&" + prices + "=" + price + "&" + statements + "=" + statement
    }
    let request = jQuery.ajax({ crossDomain: true, url: url, method: "GET", dataType: "jsonp" });
}

function ShowReceipt(value) {
    let btn_insert = document.querySelector(".btn_insert")
    let btn = btn_insert.querySelector("button")

    fetch(Receipt_URL)
        .then((response) => response.json())
        .then((row) => {
            for (let i = 1; i < row.length; i++) {
                let number = row[i][0]
                if (number == value) {
                colum = row[i];
                document.querySelector(".date").value = colum[1];
                document.querySelector(".typeReceipt").innerHTML = `<option value="${colum[2]}" disabled selected hidden>${colum[2]}</option>
                <option value="تأجير آجل">تأجير آجل</option>
                <option value="استئجار آجل">استئجار آجل</option>
                <option value="تأجير نقدي">تأجير نقدي</option>
                <option value="استئجار نقدي">استئجار نقدي </option>`
                document.querySelector(".nameCustomer").innerHTML =
                `<option value="${colum[3]}" disabled selected hidden>${colum[3]}</option>`

                let element = ""
                let tr = -1
                for (let i = 4; i < 44; i++) {
                    tr = tr + 1;
                    if (colum[i] != "") {
                        element +=
                            `<tr>
                        <td class="tdquantity">${colum[i + 1]}</td>
                        <td class="tditem">${colum[i]}</td>
                        <td class="tdprice">${colum[i + 2]}</td>
                        <td class="tdstatement">${colum[i + 3]}</td>
                        <td><a id="${tr}" class="fas fa-pen" onclick="Edit(event)"></a><a id="${tr}" class="fas fa-trash" onclick="deletevalue(event)" ></a></td>
                    </tr>`
                    }
                    i = i + 3
                }
                document.querySelector(".table-body").innerHTML = element
                total()
            }}})
        .catch((error) => { alert("رقم الفاتورة غير موجود"); return })

    fetch(General_URL)
        .then((response) => response.json())
        .then((row) => {
            for (let i = 1; i < row.length; i++) {
                colum = row[i];
                if (colum[0] == value) {
                    btn.id = i + 1
                    return
                }
            }
        })
}

function Clear() {
    let typeReceipt = document.querySelector(".typeReceipt");
    let nameCustomer = document.querySelector(".nameCustomer");
    let tablebody = document.querySelector(".table-body");
    let tr = tablebody.querySelectorAll("tr")
    typeReceipt.value = ""
    nameCustomer.value = ""
    for (let i = 0; i < tr.length; i++) { tr[i].remove() }
    fetchs()
}

function Go() {
    location.href = "EditReceipt.html"
}


