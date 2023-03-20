/*All the data inside the to be compiled and sent to a php script for processing*/
//The p2p form details
const p2pform = document.getElementById('p2p-form');
p2pform.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(form);
  const xhr = new XMLHttpRequest();
  //method to work on the form, the name of the php script the form should be sent to.
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


//The naira form details
const nairaform = document.getElementById('naira-form');

nairaform.addEventListener('submit', e => {
//   e.preventDefault();
  const formData = new FormData(nairaform);
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
  console.log("from Naira FORM")
});

//The dollar form details
// const dollarform = document.getElementById('dollar-form');
// dollarform.addEventListener('submit', e => {
//   e.preventDefault();
//   const formData = new FormData(form);
//   const xhr = new XMLHttpRequest();
//   //method to work on the form, the name of the php script the form should be sent to.
//   xhr.open('POST', 'submit.php');
//   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//   xhr.onload = () => {
//     if (xhr.status === 200) {
//       console.log(xhr.responseText);
//     }
//   };
//   // Convert the form data to a URL-encoded string
//   const urlEncodedData = new URLSearchParams(formData).toString();
//   console.log(urlEncodedData)
//   xhr.send(urlEncodedData);
// //   xhr.send(formData);
// });

  
// const form = document.getElementById('myForm');
// form.addEventListener('submit', e => {
//   e.preventDefault();
//   const formData = new FormData(form);
//   const xhr = new XMLHttpRequest();
//   xhr.open('POST', 'submit.php');
//   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//   xhr.onload = () => {
//     if (xhr.status === 200) {
//       console.log(xhr.responseText);
//     }
//   };
//   // Convert the form data to a URL-encoded string
//   const urlEncodedData = new URLSearchParams(formData).toString();
//   console.log(urlEncodedData)
//   xhr.send(urlEncodedData);
// //   xhr.send(formData);
// });

  