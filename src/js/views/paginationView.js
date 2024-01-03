import View from './View';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      // e.preventDefault();
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(numPages);

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next', curPage + 1, 'right');
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prev', curPage - 1, 'left');
    }

    // Other page
    if (curPage < numPages) {
      return [
        this._generateMarkupButton('next', curPage + 1, 'right'),
        this._generateMarkupButton('prev', curPage - 1, 'left'),
      ];
    }

    // Page 1, and there NO other pages
    return '';
  }

  _generateMarkupButton(btn, page, arrow) {
    return `
    <button data-goto="${page}" class="btn--inline pagination__btn--${btn}">
      <span>Page ${page}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-${arrow}"></use>
      </svg>
    </button>`;
  }
}

export default new PaginationView();
