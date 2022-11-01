const ELEMENT_CLASSES = {
  PRODUCT_INPUT: '.product-input',
  CLEAR_LIST_BUTTON: '.clear-list',
  CLEAR_INPUT_BUTTON: '.clear-input',
  ADD_TO_LIST_BUTTON: '.add-to-list',
  PRODUCT_LIST: '.product-list',
  VALUE_IN_EDIT: 'value-in-edit',
  PRODUCT_FROM_LIST: 'product-from-list',
  SELECTED: 'selected',
}

const OTHER_VARIABLES = {
  EDITING: ' (now editing...)',
  MIDDLE_BUTTON_EVENT: 2,
  ENTER_KEY_EVENT: 13
}

const productInput = document.querySelector(ELEMENT_CLASSES.PRODUCT_INPUT);
const clearListButton = document.querySelector(ELEMENT_CLASSES.CLEAR_LIST_BUTTON);
const clearInputButton = document.querySelector(ELEMENT_CLASSES.CLEAR_INPUT_BUTTON);
const addToListButton = document.querySelector(ELEMENT_CLASSES.ADD_TO_LIST_BUTTON);
const productList = document.querySelector(ELEMENT_CLASSES.PRODUCT_LIST);
let currentEditableElement;

const showClearInputButton = () => {
  clearInputButton.style.visibility = productInput.value ? 'visible' : 'hidden';
};

productInput.addEventListener('input', () => {
  showClearInputButton();
});

clearListButton.addEventListener('click', () => {
  if (!productList.childElementCount) {
    return;
  }

  productList.replaceChildren();

  clearInputButton.click();
});

clearInputButton.addEventListener('click', () => {
  if (currentEditableElement) {
    currentEditableElement.remove();

    currentEditableElement = null;
  }

  productInput.value = '';
  productInput.focus();

  showClearInputButton();
});

addToListButton.addEventListener('click', () => {
  if (!productInput.value) {
    return;
  }

  if (currentEditableElement) {
    currentEditableElement.textContent = '- ' + productInput.value;

    currentEditableElement.classList.remove(ELEMENT_CLASSES.VALUE_IN_EDIT);

    currentEditableElement = null;

    clearInputButton.click();

    return;
  }

  const elem = document.createElement('p');

  elem.textContent = '- ' + productInput.value;
  elem.className = ELEMENT_CLASSES.PRODUCT_FROM_LIST;

  elem.addEventListener('mousedown', (event) => {
    if (currentEditableElement) {
      return;
    }

    if (event.which === OTHER_VARIABLES.MIDDLE_BUTTON_EVENT) {
      productInput.value = event.target.textContent.slice(2);
      event.target.textContent += OTHER_VARIABLES.EDITING;

      currentEditableElement = event.target;

      showClearInputButton();
      event.target.classList.add(ELEMENT_CLASSES.VALUE_IN_EDIT);
      return;
    }

    event.target.classList.toggle(ELEMENT_CLASSES.SELECTED);
  });

  productList.append(elem);

  clearInputButton.click();
});

productInput.addEventListener('keypress', function (event) {
  if (event.keyCode === OTHER_VARIABLES.ENTER_KEY_EVENT) {
    addToListButton.click();
  }
});
