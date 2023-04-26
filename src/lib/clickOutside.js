function clickOutside(element, callbackFunction) {
  function onClick(event) {
    // let attribute = event.getAttribute("data-name")
    // console.log( event);
    /* let activeElement = event.srcElement.ownerDocument.activeElement
    let stringClassName = activeElement.className
    var hasClass = activeElement.classList.contains('monetizzeEcommercePro'); */
    // console.log(event.target, activeElement, this);
    /* if (!stringClassName.includes("monetizzeEcommercePro")) {
      return
    } */

    if (!element.contains(event.target)) {
      callbackFunction(event, this)
    }
  }
  // console.log(document.body);
  document.querySelectorAll(".monetizzeEcommercePro").forEach(mon => mon.addEventListener('click', onClick))

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