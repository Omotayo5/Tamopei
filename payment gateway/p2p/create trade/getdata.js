
/*Get returned data from the database*/
/*Sanitize and Send the data to the php file*/ 
async function getPhpData() {
    try{const result = await fetch('./tradePhP/create-trade.php')
    const data = await result.json()
    /*Loop through the data array and Do something to the data in the dom*/
    console.log(data)}
    catch(error) {
              console.log(error)
    }
}