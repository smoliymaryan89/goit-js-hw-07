import { galleryItems } from './gallery-items.js';
// Change code below this line

let instance;
const ulEl = document.querySelector('.gallery');

ulEl.addEventListener('click', onGalleryItemClick);
window.addEventListener('keydown', onEscPressKey);

function onGalleryItemClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const largeImg = getLargeImgUrl(event.target);
  openLargeImg(largeImg);
}

function getLargeImgUrl(largeImgUrl) {
  return largeImgUrl.dataset.source;
}

function openLargeImg(largeImg) {
  instance = basicLightbox.create(`
    <img src="${largeImg}">
`);

  instance.show();
}

function onEscPressKey(event) {
  if (event.code === 'Escape') {
    instance.close();
  }
}

function createListItemsMarkup(items) {
  return items
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </li>`
    )
    .join('');
}

ulEl.innerHTML = createListItemsMarkup(galleryItems);
