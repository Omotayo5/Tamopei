const balanceReq = new XMLHttpRequest();
balanceReq.onload = function () {
  const data = JSON.parse(this.responseText);
  // console.log(this.responseText)
  for (const key in data) {
   const curr = {
    walletName : key,
    walletValue:data[key]
   }
    var html =
      '<div class="insights"><div class="stat"><div class="balance"><div class="left"><h3 id="total">%name<span class="material-icons-sharp">visibility</span></h3><h2><span">%logo</span><span id="amount">%value</span></h2></div></div></div></div>';
    var newHtml = html.replace("%name", curr.walletName);
    newHtml = newHtml.replace("%value", curr.walletValue);

    //This array will collect all the value exchanged and sum it all to get the total exchange rate in a specific currency.
    const exchange = [];
    //Creating the exchange rate logic
    if (curr.walletName == "Naira") {
      newHtml = newHtml.replace("%logo", "₦");
      //Get the current exchange rate oƒ dollar
      const dollar = 730;
      document.querySelector("#total").innerHTML = `$ ${exchangeRate(dollar,curr.walletValue)}`;
    } else if (curr.walletName == "Dollar") {
      newHtml = newHtml.replace("%logo", "$");
    } else if (curr.walletName == "Cedi") {
      newHtml = newHtml.replace("%logo", "₡");
    } else if (curr.walletName == "Rand") {
      newHtml = newHtml.replace("%logo", "₨");
    }
    //adding the html stringśinto the dom.
    document.querySelector(".insights").insertAdjacentHTML("afterend", newHtml);
  }
  //   console.log(Object.keys(data));
};
balanceReq.open("GET", "./php/user-wallet.php"); //this can make us send both request and response on thesame page
balanceReq.send();

//Exchange rate function
const exchangeRate = function (baseCurr, exchangeCurr) {
  return parseFloat(exchangeCurr / baseCurr).toFixed(2);
};
