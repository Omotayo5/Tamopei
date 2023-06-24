const walletFormBtn = document.querySelector('#confirm');
const receiverID = document.querySelector('#user_name'),
receiverName = document.querySelector('.details .name'),
amount = document.querySelector('#amount_to_send'),
formBtn = document.querySelector('#form_btn'),
selected = document.querySelector('#send-select'),
confirmBox = document.querySelector('.confirm-details'),
id = document.querySelector('.details .id');


//by default the form button will be disabled.
formBtn.disabled = true;
//the confirm details box too will be invisible
confirmBox.classList.add('none');


//checking the values inside the amount input if it is a number
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

//checking the values inside the amount input if it is a number
receiverID.addEventListener('input',()=>{
    const inputValue = receiverID.value.trim();
    if(/^\d+$/.test(inputValue)){
       console.log("value is a number")
       walletFormBtn.disabled = false;
       walletFormBtn.style.backgroundColor = "rgb(46, 204, 113)";
    }else{
        walletFormBtn.disabled = true;
        walletFormBtn.style.backgroundColor = "red";
    }
})

// the button to confirm the user details
walletFormBtn.addEventListener('click',(e)=>{
    // formBtn.disabled = true;
    e.preventDefault();
    fetchAsync('./php/fetchUser.php');
    console.log('confirm button');    
})

//The button to send the value.
formBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    if(amount.value == "" || selected.value ==""){
        e.preventDefault();
        window.alert('One or more value cannot be empty')
        formBtn.disabled = true;
    }else if(parseFloat(amount.value) > parseFloat(selected.value)){
        alert('Insufficient Balance')
    }
    else{
        fetchAsyncSend('./php/p2p.php');
    }
})

//function to confirm the user id if its correct.
async function fetchAsync(url) {
    const formData = new FormData();
    formData.append('user_name', receiverID.value)
    try{
        let response = await fetch(url,{
            method:'POST',
            body:formData
        });
        if(response.ok){
            let data = await response.json();
            confirmBox.classList.remove('none');
            receiverName.innerHTML= `${data.first_name} ${data.middle_name} ${data.last_name}`;
            id.innerHTML = data.user_id;
            formBtn.removeAttribute('hidden');
            walletFormBtn.setAttribute('hidden',true);
        }
    } catch(error){
        // console.log(error);
        confirmBox.classList.remove('none');
        receiverName.innerHTML= `<b>Id incorrect</b>`;
    }
};

//function to send the data to the database
async function fetchAsyncSend(url) {
    const formData = new FormData();
    formData.append('amount', amount.value)
    formData.append('receiver_id', receiverID.value);
    formData.append('select', selected.value);
    // const urlEncodedData = new URLSearchParams(formData).toString();
    try {
        let response = await fetch(url, {
            method: 'POST',
            body:formData
        });
        if (response.ok) {
            let data =await  response.json();
            console.log(data);
        }
    } catch (error) {
        // confirmBox.classList.remove('none');
        receiverName.innerHTML= `<b>Id incorrect</b>`;
    }
}
