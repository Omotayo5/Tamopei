//Cut the sell
// import { sell_tableBody } from "./script";
const sell_tableBody = document.querySelector(".sell_other_methods")
function loadData2(method, url) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
      const datas = JSON.parse(this.response);
      console.log(datas);
      datas['wallet'].forEach((data) => {
        if (data.payment_method == "Cedi") {
          const byWallet = `<tr>
          <td>
            <div class="card-info1">
            <input type="tel" value="${data.user_id}" hidden>
            <input type="tel" id="trade_ind" value="${data.ind}" hidden>
              <h3>${data.user_name} ID <span id="id">${data.user_id}</span></h3>
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
              <h3>1 ${data.wallet} <i class="fa-solid fa-right-left"></i>GHC ${data.user_rate}</h3>
            </div>
          </td>
          <td>
            <div class="card-buy">
  
  
              <button class="btn2 sell_btn" id="modal-btn_sell" style="background-color: var(--secondary);"> Sell GHC</button>
            </div>
          </td>
        </tr>`;
          document
            .querySelector("#sellByWallet")
            .insertAdjacentHTML("afterbegin", byWallet);
        }
        if (data.payment_method == "Dollar") {
          const byWallet = `<tr>
          <td>
            <div class="card-info1">
            <input type="tel" value="${data.user_id}" hidden>
            <input type="tel" id="trade_ind" value="${data.ind}" hidden>
              <h3>${data.user_name} ID <span id="id">${data.user_id}</span></h3>
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
              <h3>1 ${data.wallet} <i class="fa-solid fa-right-left"></i>$${data.user_rate}</h3>
            </div>
          </td>
          <td>
            <div class="card-buy">  
              <button class="btn2 sell_btn" id="modal-btn_sell" style="background-color: var(--secondary);"> Sell USD</button>
            </div>
          </td>
        </tr>`;
          document
            .querySelector("#sellByWallet")
            .insertAdjacentHTML("afterbegin", byWallet);
        }
        if (data.payment_method == "rand") {
          const byWallet = `<tr>
          <td>
            <div class="card-info1">
            <input type="tel" value="${data.user_id}" hidden>
            <input type="tel" id="trade_ind" value="${data.ind}" hidden>
              <h3>${data.user_name} ID <span id="id">${data.user_id}</span></h3>
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
              <h3>1 ${data.wallet} <i class="fa-solid fa-right-left"></i>ZAR${data.user_rate}</h3>
            </div>
          </td>
          <td>
            <div class="card-buy">
  
  
              <button class="btn2 sell_btn" id="modal-btn_sell" style="background-color: var(--secondary);"> Sell ZAR</button>
            </div>
          </td>
        </tr>`;
          document.querySelector("#sellByWallet").innerHTML += byWallet;
        }
        if (data.payment_method == "Naira") {
          const byWallet = `<tr>
          <td>
            <div class="card-info1">
            <input type="tel" value="${data.user_id}" hidden>
            <input type="tel" id="trade_ind" value="${data.ind}" hidden>
              <h3>${data.user_name} ID <span id="id">${data.user_id}</span></h3>
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
              <h3>1 ${data.wallet} <i class="fa-solid fa-right-left"></i>₦${data.user_rate}</h3>
            </div>
          </td>
          <td>
            <div class="card-buy">
              <button class="btn2 sell_btn" id="modal-btn_sell" style="background-color: var(--secondary);"> Sell NGN</button>
            </div>
          </td>
        </tr>`;
          document
            .querySelector("#sellByWallet")
            .insertAdjacentHTML("afterbegin", byWallet);
        }
        /*
        End of payment by wallet        
        */
      });
      datas['other'].forEach(other_method=>{
        const html = `<tr>
        <td>
          <div class="card-info1">
          <input type="tel" value="${other_method.user_id}" hidden>
          <input type="tel" id="trade_ind" value="${other_method.ind}" hidden>
            <h3> ${other_method.user_name} -- (${other_method.user_id})</h3>
    
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
            <h3>Limit: ${other_method.lowest_rate} - ${other_method.highest_rate}</h3>
    
          </div>
        </td>
        <td>
          <div class="card-info2">
            <h3>1${other_method.wallet}<i class="fa-solid fa-right-left"></i> ${other_method.user_rate}${other_method.wallet_to}</h3>
          </div>
        </td>
        <td>
            <div class="methods">
            <span><b>${other_method.payment_method}</b> </span>
            </div>
        </td>
        <td>
          <div class="card-buy">
            <button class="btn2" id="modal-btn_sell_other" style="background-color: var(--secondary);"> Sell ${other_method.wallet}</button>
          </div>
        </td>
      </tr>`;
        sell_tableBody.innerHTML += html;
      })
    };
    xhr.send();
  }
  
  //////////////SELL POST//////////////
  const method_sell = "POST",
    url_sell = "../php/order_sell.php";
  loadData2(method_sell, url_sell);
  