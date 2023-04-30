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
        formBtn.disabled = false;
    }
    else{
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET","./php/p2p-sell.php");//this can make us send both request and response on thesame page
        xmlhttp.responseType = 'text';
        xmlhttp.onload=function(){
            if(xmlhttp.status === 200){
                var responseText = xmlhttp.responseText;
                // document.querySelector('notification').innerHTML = responseText;
                console.log(responseText);
            }else{
                console.error('Request Failed, Returned status of ' + xmlhttp.status)
            }
            const data = JSON.parse(this.responseText);
            console.log(data);
        }
        xmlhttp.send();
    };
    // alert(userName.value, amount.value)

    /*NOTE if this function runs it will prevent the values from getting posted to the php file hence the post datas inside the php will be empty.*/
    // formBtn.addEventListener("click",()=>{
    //     amount.value = "";
    //     userName.value="";
    // })
//   xmlhttp.send(formData);
});

 