import icons from 'url:../../img/icons.svg';

// This is the parent object of the other views and so the class itself is exported rather than an instance.
export default class View {
  _data;

  render(data) {
    // First need to check if we receive data and if we receive it that it is not an empty array.
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError(); // Returns error if there is no data or if the data is an empty array (i.e. the search is successful but there are no results)
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup); // Converts the markup string to a DOM object that can be compared.
    const newElements = Array.from(newDOM.querySelectorAll('*')); // Select all elements in the new, virtual DOM and change from node list to an array
    const curElements = Array.from(this._parentElement.querySelectorAll('*')); // Select current elements and change from node list to array

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      //Update changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      //Update changed (button) attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderSuccessMessage(message = this._successMessage) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
