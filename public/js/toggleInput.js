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
$(document).ready(function () {
  // if ($("#patientRole : selected").val() != "Père") $("#bebe-info").hide();
  // else $("#bebe-info").show();

  $("#show_hide_login").on("click", function () {
    var passInput = $("#loginPassword");
    if (passInput.attr("type") === "password") {
      passInput.attr("type", "text");
      $("#icon-eye").toggleClass("bi-eye-slash-fill");
    } else {
      passInput.attr("type", "password");
      $("#icon-eye").toggleClass("bi-eye-slash-fill");
    }
  });
  $("#show_hide_new_password").on("click", function () {
    var passInput = $("#newPassword");
    if (passInput.attr("type") === "password") {
      passInput.attr("type", "text");
      $("#icon-eye-new-password").toggleClass("bi-eye-slash-fill");
    } else {
      passInput.attr("type", "password");
      $("#icon-eye-new-password").toggleClass("bi-eye-slash-fill");
    }
  });
  $("#show_hide_old_password").on("click", function () {
    var passInput = $("#oldPassword");
    if (passInput.attr("type") === "password") {
      passInput.attr("type", "text");
      $("#icon-eye-old-password").toggleClass("bi-eye-slash-fill");
    } else {
      passInput.attr("type", "password");
      $("#icon-eye-old-password").toggleClass("bi-eye-slash-fill");
    }
  });
  $("#show_hide_reset_password").on("click", function () {
    var passInput = $("#resetPassword");
    if (passInput.attr("type") === "password") {
      passInput.attr("type", "text");
      $("#icon-eye-reset-password").toggleClass("bi-eye-slash-fill");
    } else {
      passInput.attr("type", "password");
      $("#icon-eye-reset-password").toggleClass("bi-eye-slash-fill");
    }
  });
  $("#show_hide_confirm_password").on("click", function () {
    var passInput = $("#confirmPassword");
    if (passInput.attr("type") === "password") {
      passInput.attr("type", "text");
      $("#icon-eye-confirm-password").toggleClass("bi-eye-slash-fill");
    } else {
      passInput.attr("type", "password");
      $("#icon-eye-confirm-password").toggleClass("bi-eye-slash-fill");
    }
  });
});
