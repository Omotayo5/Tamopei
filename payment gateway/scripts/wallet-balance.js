const balanceReq = new XMLHttpRequest();
balanceReq.onload = function () {
  const data = JSON.parse(this.responseText);
  for (const key in data) {
    console.log(`${key}   ${data[key]}`);

    var html =
      '<div class="insights"><div class="stat"><div class="balance"><div class="left"><h3 id="total">%name<span class="material-icons-sharp">visibility</span></h3><h2><span"></span><span id="amount">%value</span></h2></div></div></div></div>';
    var newHtml = html.replace("%name", key);
    newHtml = newHtml.replace("%value", ` ${data[key]}`);
    // newHtml = newHtml.replace("%value", data[key]);
    //adding the html stringśinto the dom.
    document.querySelector(".insights").insertAdjacentHTML("afterend", newHtml);
    //This array will collect all the value exchanged and sum it all to get the total exchange rate in a specific currency.
    const exchange = [];
    if (key == "Naira") {
        //Get the current exchange rate oƒ dollar
        const dollar = 730;
      document.querySelector("#total").innerHTML = `$ ${exchangeRate(dollar,data["Naira"])}`;
    }
  }
  console.log(Object.keys(data));
};
balanceReq.open("GET", "./php/user-wallet.php"); //this can make us send both request and response on thesame page
balanceReq.send();


const exchangeRate = function (baseCurr,exchangeCurr) {
    return parseFloat(exchangeCurr / baseCurr).toFixed(2);
};
