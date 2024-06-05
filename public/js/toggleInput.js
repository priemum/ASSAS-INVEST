function selectOperation(choice, id, compareTo) {
  let packDiv = document.getElementById("pack-div-" + id);
  let pack = document.getElementById("pack-" + id);
  let description = document.getElementById("description");
  if (choice.value === compareTo) {
    packDiv.style.display = "";
    description.style.display = "none";
    pack.setAttribute("required", "");
  } else {
    pack.removeAttribute("required");
    packDiv.style.display = "none";
    description.style.display = "";
  }
}
function selectOperation2(choice, compareTo) {
  let description = document.getElementById("description");
  if (choice.value === compareTo) {
    description.style.display = "none";
    description.removeAttribute("required");
  } else {
    description.setAttribute("required", "");
    description.style.display = "";
  }
}
