
/*Get returned data from the database*/
fetch('./tradePhP/create-trade.php')
.then(response,()=>{response.json()})
.then(data,()=>{
    /*Loop through the data array and Do something to the data in the dom*/
    console.log(data)
});

/*Sanitize and Send the data to the php file*/ 