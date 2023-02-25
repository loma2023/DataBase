
let Revenues_URL = "https://script.google.com/macros/s/AKfycbyifO7cUdNcfNuNJFEhIHknv6kik3NPV2w0YVjf6EAAjDTmxwWalTgN3K-UxypRpTok/exec";
let General_URL = "https://script.google.com/macros/s/AKfycbxFnAn0dSbeWrUVh_GppFXKCqqF0YEXxKhY6hdHJwpmaw7wOF01TWWAhcXIMGTliQ_5/exec";

fetch(Revenues_URL)
  .then((response) => response.json())
  .then((row) => nameRevenues(row))

function nameRevenues(row) {
  let element = "";
  for (let i = 1; i < row.length; i++) {
    let colum = row[i];
    element += `<option value="${colum[1]}">${colum[1]}</option>`
  }
  document.querySelector(".nameRevenues").innerHTML += element
}

function insert_value(id) {
  let nu = 0
  let date = $(".date").val();
  let item = ""
  let statement = $(".statement").val();
  let amountdebit = $(".price").val();
  let amountcredit = $(".price").val();

  let debit = ""; let credit = ""; let subdebit = ""; let subcredit = ""

  if (date === "") { alert("برجاء ادخال التاريخ"); return }
  else if (subcredit == null) { alert("اختر اسم الايراد"); return }
  else if (amountdebit === "") { alert("برجاء ادخال المبلغ"); return }

  if (id == "credit") { debit = "الصندوق"; credit = "الايرادات"; subdebit = "الصندوق"; subcredit = document.querySelector(".nameRevenues").value }
  else if (id == "debit") { debit = "العمولات"; credit = "الايرادات"; subdebit = "العمولات"; subcredit = "عموله" }
  document.querySelector(".btn_save").value = "...جارٍ الحفظ"

  fetch(General_URL)
    .then((response) => response.json())
    .then((data) => {
      let row = data.length + 1

      let url = General_URL + "?callback=ctrlq&row=" + row + "&date=" + date + "&nu=" + nu + "&action=insert" + "&statement=" + statement + "&debit=" + debit + "&item=" + item
        + "&credit=" + credit + "&subdebit=" + subdebit + "&subcredit=" + subcredit + "&amountdebit=" + amountdebit + "&amountcredit=" + amountcredit;

      let request = jQuery.ajax({ crossDomain: true, url: url, method: "GET", dataType: "jsonp" });
    })
    .then(() => { alert("تم حفظ البيانات بنجاح");document.querySelector(".btn_save").value = "حـفـظ" })
}
