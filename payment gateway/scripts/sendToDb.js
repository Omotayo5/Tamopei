// const userName = document.querySelector('#user_name');
// const amount = document.querySelector('#amount_to_send');
// const formBtn = document.querySelector('#form_btn');
// const selected = document.querySelector('#send-select');


// formBtn.disabled = true;

// //Input data verification
// amount.addEventListener("input",()=>{
//     const inputValue = amount.value.trim();
//     if(/^\d+$/.test(inputValue)){
//        console.log("value is a number")
//        formBtn.disabled = false;
//        formBtn.style.backgroundColor = "rgb(46, 204, 113)";
//     }else{
//         formBtn.disabled = true;
//         formBtn.style.backgroundColor = "red";
//     }
// })

// const form = document.getElementById('p2p-form');
// form.addEventListener('submit', e => {
//     console.log(form);
//     e.preventDefault();
//     if(amount.value == "" || selected.value ==""){
//         e.preventDefault();
//         window.alert('One or more value cannot be empty')
//         formBtn.disabled = true;
//     }
//     else{
//         //Select the form data and send it to the database as a full form.
//         async function fetchAsync(url) {
//             const formData = new FormData();
//             formData.append('amount',amount.value)
//             formData.append('receiver_id',userName.value);
//             formData.append('select',selected.value);
//             const urlEncodedData = new URLSearchParams(formData).toString();
//         try{
//             let response = await fetch(url,{
//                 method:'POST',
//                 body:urlEncodedData
//             });
    
//             if(response.ok){
//                 let data = await response.json()
//                     console.log(data);
//                     console.log(urlEncodedData);
//             }else{
    
//                 return;
    
//             }
    
//         } catch(error){
//             aler(error.toString());
//         }
//         console.log(urlEncodedData);
//     }
//     fetchAsync('./php/Send.php')
// };
    
// });
