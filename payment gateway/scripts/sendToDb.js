const userName = document.querySelector('#user_name');
const amount = document.querySelector('#amount_to_send');
const formBtn = document.querySelector('#form_btn');
const selected = document.querySelector('#send-select');


formBtn.disabled = true;

//Input data verification
amount.addEventListener("input",()=>{
    const inputValue = amount.value.trim();
    if(/^\d+$/.test(inputValue)){
       console.log("value is a number")
       formBtn.disabled = false;
       formBtn.style.backgroundColor = "rgb(46, 204, 113)";
    }else{
        formBtn.disabled = true;
        formBtn.style.backgroundColor = "red";
    }
})

const form = document.getElementById('p2p-form');
form.addEventListener('submit', e => {
    if(amount.value == "" || selected.value ==""){
        e.preventDefault();
        window.alert('One or more value cannot be empty')
        formBtn.disabled = true;
    }
    else{
        //Select the form data and send it to the database as a full form.
        const formData = new FormData(form);
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST","./php/send_to_db.php");//this can make us send both request and response on thesame page
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlhttp.onload = () => {
            const data = JSON.parse(this.responseText);
            console.log(data);
          };
          const urlEncodedData = new URLSearchParams(formData).toString();
          console.log(formData);
          xmlhttp.send(urlEncodedData);
    };
    
});
