class UI {

    constructor() { }

    getElements(element, multipleElements) {
        return !multipleElements ? document.querySelector(element) : document.querySelectorAll(element);
    }

    createNewElement(element) {
        return document.createElement(element);
    }

    createAttribute(element, property, value) {
        element.setAttribute(property, value);
    }

    getAttribute(element, property) {
        return element.getAttribute(property);
    }
}

export default new UI();