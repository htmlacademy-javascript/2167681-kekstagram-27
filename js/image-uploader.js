const FILE_TYPES = ['jpg', 'jpeg', 'png'];

//загрузка фото
const fileUploader = document.querySelector('input[type=file]');
const imagePreview = document.querySelector('.img-upload__preview');
const uploadPreview = imagePreview.querySelector('img');
const thubnailsEffects = document.querySelectorAll('.effects__preview');


const photoUpload = () => {
  const file = fileUploader.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const render = new FileReader();
    render.addEventListener('load', () => {
      uploadPreview.src = render.result;

      thubnailsEffects.forEach((image) => {
        image.style.backgroundImage = `url(${render.result})`;
      });
    });
    render.readAsDataURL(file);
  }
};

export {
  photoUpload,
};
