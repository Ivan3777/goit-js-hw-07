import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');

galleryContainer.innerHTML = creatElemens(galleryItems);

function creatElemens(gallery) {
  const imageEl = gallery
    .map(
      ({ preview, original, description }) =>
        `<div class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img
    class="gallery__image"
    src="${preview}"
    data-source="${original}"
    alt="${description}"
    />
    </a>
    </div>`
    )
    .join('');

  return imageEl;
}

let modalWindow = null;

function showModal() {
  const showModalLightbox = ({ alt, dataset: { source } }) => {
    modalWindow = basicLightbox.create(
      `<img style="color: #fff" src="${source}" alt="${alt}" width="800" height="600">`,
      {
        onShow: addKeyboardControl,
        onClose: removeKeyboardControl,
      }
    );

    modalWindow.show();
  };

  const addKeyboardControl = () => window.addEventListener('keydown', onWindowKeyDown);
  const removeKeyboardControl = () => window.removeEventListener('keydown', onWindowKeyDown);

  const onWindowKeyDown = ({ code }) => {
    if (code !== 'Escape') return;

    modalWindow.close();
  };

  const onGalleryContainerClick = event => {
    event.preventDefault();

    if (event.target.nodeName !== 'IMG') return;

    showModalLightbox(event.target);
  };

  galleryContainer.addEventListener('click', onGalleryContainerClick);
}

showModal();

