
alert("hello!");

// function jRem() {
//     $('.check').has('input:checked').remove();
// }


// function remove()
// {
//   var checkedItem = document.getElementsByClassName('.check');
//   var checkedValue = document.getElementsByClassName('.check').value;
//   if(checkedItem.checked == true)
//   {
//     checkedValue.remove();
//   }
// }

document.getElementsByClassName('checkbox').onclick = function() {
  var checkItem = document.querySelectorAll('input[type=checkbox]:checked').value;
  checkItem.remove();
}
