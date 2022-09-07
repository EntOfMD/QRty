// Consts
const form = document.getElementById('generate-form');
const qrCode = document.getElementById('qrcode');

// util funcs
const showSpinner = () => {
  document.getElementById('spinner').style.display = 'block';
};

const hideSpinner = () => {
  document.getElementById('spinner').style.display = 'none';
};

const clearUI = () => {
  qrCode.innerHTML = '';
  const saveBtn = document.getElementById('save-link');
  if (saveBtn) {
    saveBtn.remove();
  }
};

const createSaveBtn = (saveUrl, fileName) => {
  if (fileName === '') {
    fileName = 'qrcode';
  }
  const link = document.createElement('a');
  link.id = 'save-link';
  link.classList = 'py-2 rounded w-1/3 m-auto my-5';
  link.href = saveUrl;
  link.download = fileName;
  link.innerHTML = 'Save Image';
  document.getElementById('generated').appendChild(link);
};

// what happens when Generate button is pressed
const onSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const url = document.getElementById('url').value;
  const size = document.getElementById('size').value;
  const cDark = document.getElementById('cDark').value;
  const cLight = document.getElementById('cLight').value;
  const fileName = document.getElementById('name').value;

  // url validation
  if (url === '') {
    alert('Please enter a URL');
  } else {
    showSpinner();

    // show the spinner for a quick second
    setTimeout(() => {
      hideSpinner();

      generateQRCode(url, size, cDark, cLight);

      setTimeout(() => {
        const saveUrl = qrCode.querySelector('img').src;
        createSaveBtn(saveUrl, fileName);
      }, 50);
    }, 600);
  }
};

const generateQRCode = (url, size, cDark, cLight) => {
  return (qr = new QRCode('qrcode', {
    text: url,
    width: size,
    height: size,
    correctLevel: QRCode.CorrectLevel.H,
    colorDark: cDark,
    colorLight: cLight,
  }));
};

form.addEventListener('submit', onSubmit);
