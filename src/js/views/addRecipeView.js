import View from './View.js';

class AddRecipeView extends View {
  _successMessage = 'Recipe was successfully added!';
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  } // Have to separate this toggle from the event listener below b/c we cannot use the "this" keyword inside the event handler - it refers to the button rather than the object.

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this)); // With bind we manually set the "this" keyword
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      // const dataArr = [...new FormData(this)]; Jonas did this, but it isn't necessary.
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      handler(data);
    });
  }
}

export default new AddRecipeView();
