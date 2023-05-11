const buy_tableBody = document.querySelector(".buy_other_methods"),
sell_tableBody = document.querySelector('.sell_other_methods');

console.log(buy_tableBody);
function loadData(method, url) {
  //Use javascript to set the attribute of the form, both the me
  // const formData = new FormData(frm);
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onload = function () {
    const datas = JSON.parse(this.response);
    datas.forEach((data) => {
      const html = `
      <tr>
        <td>
          <div class="card-info1">

            <h3> ${data.user_name}--Id(${data.user_id})</h3>

          </div>
        </td>
        <td>
          <div class="card-info2">
            <h3>Trade(s): <span>
                <i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i
                  class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i
                  class="fa-regular fa-star"></i>
              </span></h3>

          </div>
        </td>
        <td>
          <div class="card-info2">
            <h3>Limit: ${data.lowest_rate} - ${data.highest_rate}</h3>

          </div>
        </td>
        <td>
          <div class="card-info2">
            <h3> ${data.user_rate}NGN <i class="fa-solid fa-right-left"></i>1USD</h3>
          </div>
        </td>
        <td>
          <div class="methods">
            <span>${data.payment_method_1},</span>
            <span>${data.payment_method_2},</span>
            <span>${data.payment_method_3},</span>
          </div>
        </td>
        <td>
          <div class="card-buy">
            <button class="btn4" id="modal-btn"> Buy NGN</button>
          </div>
        </td>
      </tr>`;
      buy_tableBody.insertAdjacentHTML('afterend',html);
    });
    // console.log(datas);
  };
  xhr.send();
}
const method_buy = "POST",
  url_buy = "../php/order_buy.php";
loadData(method_buy, url_buy);


function loadData2(method,url) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onload = function () {
    const datas = JSON.parse(this.response);
    console.log(datas);
    datas.forEach(data=>{
      const html =
      `<tr>
      <td>
        <div class="card-info1">
  
          <h3> ${data.user_name} -- (${data.user_id})</h3>
  
        </div>
      </td>
      <td>
        <div class="card-info2">
          <h3>Trade(s): <span>
              <i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i
                class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i
                class="fa-regular fa-star"></i>
            </span></h3>
  
        </div>
      </td>
      <td>
        <div class="card-info2">
          <h3>Limit: $${data.lowest_rate} - $${data.highest_rate}</h3>
  
        </div>
      </td>
      <td>
        <div class="card-info2">
          <h3>1USD <i class="fa-solid fa-right-left"></i> ${data.user_rate}NGN</h3>
        </div>
      </td>
      <td>
        <div class="card-buy">
          <button class="btn2" id="modal-btn" style="background-color: var(--secondary);"> Sell NGN</button>
        </div>
      </td>
    </tr>`
    sell_tableBody.insertAdjacentHTML('afterend',html);
    })
  };
  // const urlEncodedData = new URLSearchParams(formData).toString();
  // console.log(formData);
  xhr.send();
}


const method_sell = "POST",url_sell = "../php/order_buy.php";
loadData2(method_sell,url_sell);

`amount
: 
"76"
date
: 
"0000-00-00 00:00:00"
highest_rate
: 
"150"
lowest_rate
: 
"10"
payment_method_1
: 
"Bank"
payment_method_2
: 
"Chipper"
payment_method_3
: 
"Momo"
user_id
: 
"1000121"
user_name
: 
"Okikiola"
user_rate
: 
"659"
wallet
: 
"Naira"`