import PreviewView from './previewView.js';

class BookmarksView extends PreviewView {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = `No bookmarks yet.`;
  _successMessage = '';
}

export default new BookmarksView();
