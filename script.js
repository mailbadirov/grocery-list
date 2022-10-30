const productInput = document.querySelector('.product-input');
const clearListButton = document.querySelector('.clear-list');
const clearInputButton = document.querySelector('.clear-input');
const addToListButton = document.querySelector('.add-to-list');
const productList = document.querySelector('.product-list');
let currentEditableElement;

const showClearInputButton = () => {
  clearInputButton.style.visibility = productInput.value ? 'visible' : 'hidden';
};

productInput.addEventListener('input', () => {
  showClearInputButton();
});

clearListButton.addEventListener('click', () => {
  if (productList.childElementCount) {
    productList.replaceChildren();

    clearInputButton.click();
  }
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
  if (productInput.value) {
    if (currentEditableElement) {
      currentEditableElement.textContent = '- ' + productInput.value;

      currentEditableElement.classList.remove('value-in-edit');

      currentEditableElement = null;

      clearInputButton.click();
      return;
    }

    const elem = document.createElement('p');

    elem.textContent = '- ' + productInput.value;
    elem.className = 'product-from-list';

    elem.addEventListener('mousedown', (event) => {
      if (!currentEditableElement) {
        if (event.which === 2) {
          productInput.value = event.target.textContent.slice(2);
          event.target.textContent += ' (now editing...)';

          currentEditableElement = event.target;

          showClearInputButton();
          event.target.classList.add('value-in-edit');
          return;
        }

        event.target.classList.toggle('selected');
      }
    });

    productList.append(elem);

    clearInputButton.click();
  }
});
