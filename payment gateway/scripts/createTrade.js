const form = document.querySelector('form');
form.addEventListener('submit', e => {
  e.preventDefault();
});

console.log("From here 2");
const xhr = new XMLHttpRequest();
xhr.open('POST', "/php/active-trade.php");
xhr.onload = () => {
  if(xhr.status === 200){
      var responseText = xhr.responseText;
      console.log(responseText);
      const data = JSON.parse(xhr.responseText);
      console.log(data);
  }else{
      console.error('Request Failed, Returned status of ' + xhr.status)
  }
};
// const urlEncodedData = new URLSearchParams(formData).toString();
xhr.send();