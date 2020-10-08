function clickMy(event) {
  document.querySelector('#task-old').innerHTML =
    event.path[1].attributes[3].nodeValue;

  let userIdEdit = +event.path[1].attributes[4].nodeValue;

  document
    .querySelector('#action_edit')
    .setAttribute('action', `edit/${userIdEdit}`);
}

$(document).ready(function () {
  $('.modal').modal();
});
