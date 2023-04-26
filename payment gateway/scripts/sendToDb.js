const form = document.getElementById('p2p-form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(form);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', './php/Submit.php');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = () => {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
    }
  };
  // Convert the form data to a URL-encoded string
  const urlEncodedData = new URLSearchParams(formData).toString();
  console.log(urlEncodedData)
  xhr.send(urlEncodedData);
//   xhr.send(formData);
});

  