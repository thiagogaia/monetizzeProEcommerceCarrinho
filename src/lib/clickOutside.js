function clickOutside(element, callbackFunction) {
  function onClick(event) {
    // let attribute = event.getAttribute("data-name")
    // console.log( event);
    let activeElement = event.srcElement.ownerDocument.activeElement
    let stringClassName = activeElement.className
    // console.log(event, element, stringClassName, activeElement, event.target);
    if (!stringClassName.includes("monetizzeEcommercePro")) {
      return
    }

    if (!element.contains(event.target)) {
      callbackFunction(event, activeElement)
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