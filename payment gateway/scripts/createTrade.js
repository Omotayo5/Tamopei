const form = document.getElementById('myForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(form);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'submit.php');
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

  