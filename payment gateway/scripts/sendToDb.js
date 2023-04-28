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

formBtn.addEventListener("click",()=>{

    
})

const form = document.getElementById('p2p-form');
form.addEventListener('submit', e => {
    // e.preventDefault();
    if(amount.value == ""){
        window.alert('Value cannot be empty')
        formBtn.disabled = false;
    }
    else{
            // fetch('./php/p2p-sell.php')
            // .then(response=>response.json())
            // .then(data=>{
            //     console.log(data);
            // })
            // .catch(error=>{
            //     console.error("error",error)
            // });
    }
    amount.value = "";
    userName.value="";
//   xhr.send(formData);
});

 