let data = document.getElementById("sp-parse-js").innerHTML;

document.getElementById("sp-parse-js").innerHTML = "";
/* buttons related to edit/update support message */
var edit_msg_btn = document.getElementById("sp-edit-msg-btn");
var confirm_btn = document.getElementById("sp-confirm-btn");
var cancel_btn = document.getElementById("sp-cancel-btn");

var sp_msg_field = document.getElementById("sp-message");

function editSupportMessage() {
  sp_msg_field.disabled = false;
  edit_msg_btn.classList.add("display-none");
  sp_msg_field.style.width = "77%";

  confirm_btn.classList.remove("display-none");
  cancel_btn.classList.remove("display-none");
}
function cancelSupportMessage() {
  sp_msg_field.disabled = true;
  edit_msg_btn.classList.remove("display-none");
  sp_msg_field.style.width = "83%";

  confirm_btn.classList.add("display-none");
  cancel_btn.classList.add("display-none");
}

/* button to enter edit mode of data setting */
var edit_data_setting_btn = document.getElementById("sp-edit-data-setting-btn");
var save_data_setting_btn = document.getElementById("sp-data-save-btn");
var cancel_data_setting_btn = document.getElementById("sp-data-cancel-btn");

var display_fields = document.getElementsByClassName("display-field");
var edit_fields = document.getElementsByClassName("edit-field");
var square_btns = document.getElementsByClassName("square-btn");

var temp_fields = document.getElementsByClassName("disabled-edit-field");

function editDataSetting() {
  save_data_setting_btn.classList.remove("display-none");
  cancel_data_setting_btn.classList.remove("display-none");
  edit_data_setting_btn.classList.add("display-none");

  for (var i = 0; i < display_fields.length; i++) {
    display_fields[i].classList.add("display-none");
  }

  for (var i = 0; i < edit_fields.length; i++) {
    edit_fields[i].classList.remove("display-none");
  }

  for (var i = 0; i < square_btns.length; i++) {
    square_btns[i].classList.remove("display-none");
  }

  for (var i = 0; i < temp_fields.length; i++) {
    temp_fields[i].style = "display: initial;";
  }
}

function cancelDataSetting() {
  save_data_setting_btn.classList.add("display-none");
  cancel_data_setting_btn.classList.add("display-none");
  edit_data_setting_btn.classList.remove("display-none");

  for (var i = 0; i < display_fields.length; i++) {
    display_fields[i].classList.remove("display-none");
  }

  for (var i = 0; i < edit_fields.length; i++) {
    edit_fields[i].classList.add("display-none");
  }

  for (var i = 0; i < square_btns.length; i++) {
    square_btns[i].classList.add("display-none");
  }
}

/* button to toggle the state of isRequired for each health data */
var square_btns = document.getElementsByClassName("square-btn");

/* var checked_btns = document.getElementsByClassName("checked-btn")
var unchecked_btns = document.getElementsByClassName("unchecked-btn")

var upperbound_edit_fields = document.querySelectorAll('input[name="upperbound"]')
var lowerbound_edit_fields = document.querySelectorAll('input[name="lowerbound"]') */

for (i = 0; i < square_btns.length; i++) {
  square_btns[i].addEventListener("click", function () {
    /* 
        parentElement.parentElement -> sp-hdata-title
        .nextElementSibling -> edit-field
        .firstElementChild -> sp-hdata-upperbound
        .lastElementChild -> sp-hdata-lowerbound
        */
    var upperbound_status =
      this.parentElement.parentElement.nextElementSibling.firstElementChild
        .children[0];
    var lowerbound_status =
      this.parentElement.parentElement.nextElementSibling.lastElementChild
        .children[0];

    var upperbound_edit_field =
      this.parentElement.parentElement.nextElementSibling.firstElementChild
        .children[2];
    /*var initial_upperbound_value = upperbound_edit_field.value;*/
    var lowerbound_edit_field =
      this.parentElement.parentElement.nextElementSibling.lastElementChild
        .children[2];
    /*var initial_lowerbound_value = lowerbound_edit_field.value;*/

    if (this.classList.contains("checked-btn")) {
      upperbound_status.classList.remove("sp-upperbound");
      upperbound_edit_field.value = "-";
      upperbound_edit_field.classList.add("disabled-edit-field");

      lowerbound_status.classList.remove("sp-lowerbound");
      lowerbound_edit_field.value = "-";
      lowerbound_edit_field.classList.add("disabled-edit-field");

      this.classList.remove("checked-btn");
    } else {
      /* doesn't contain "checked-btn" - means unchecked */
      upperbound_status.classList.add("sp-upperbound");
      /*upperbound_edit_field.value = initial_upperbound_value;*/
      upperbound_edit_field.classList.remove("disabled-edit-field");
      upperbound_edit_field.disabled = false;

      lowerbound_status.classList.add("sp-lowerbound");
      /*lowerbound_edit_field.value = initial_lowerbound_value;*/
      lowerbound_edit_field.classList.remove("disabled-edit-field");
      lowerbound_edit_field.disabled = false;

      this.classList.add("checked-btn");
    }
  });
}
