function clickMy(event) {
//   console.log(event.path[1].attributes[4].nodeValue);
  document.querySelector('#task-old').innerHTML =
    event.path[1].attributes[3].nodeValue;

  let userIdEdit = +event.path[1].attributes[4].nodeValue;

//   console.log(userIdEdit);

  document
    .querySelector('#action_edit')
    .setAttribute('action', `edit/${userIdEdit}`);
}
