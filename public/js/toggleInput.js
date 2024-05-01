function selectActe(choice, id) {
  let packDiv = document.getElementById("pack-div-" + id);
  let pack = document.getElementById("pack-" + id);
  if (choice.value === "إعادة الإستثمار") {
    packDiv.style.display = "";
    pack.setAttribute("required", "");
  } else {
    pack.removeAttribute("required");
    packDiv.style.display = "none";
  }
}
function selectActe2(id, choice) {
  let pack2 = document.getElementById("pack-" + id);
  let select = document.getElementById(id).value;

  if (choice === "إعادة الإستثمار" || select === "إعادة الإستثمار") {
    pack2.style.display = "";
  } else {
    pack2.style.display = "none";
  }
}
