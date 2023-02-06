function clickOutside(element, callbackFunction) {
  function onClick(event) {
    // let attribute = event.getAttribute("data-name")
    // console.log( event);
    // console.log(event, element, event.target.className);
    if (event.target.className !== "monetizzeEcommercePro") {
      return
    }

    if (!element.contains(event.target)) {
      callbackFunction(event)
    }
  }
  // console.log(document.body);
  document.body.addEventListener('click', onClick)

  return {
    update(newCallbackFunction) {
      callbackFunction = newCallbackFunction
    },
    destroy() {
      document.body.removeEventListener('click', onClick)
    }
  }
}

export default clickOutside