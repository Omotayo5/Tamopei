const xmlhttp = new XMLHttpRequest();
xmlhttp.onload=function(){
    const data = JSON.parse(this.responseText);
    document.querySelector('.h2').innerHTML = `${data.first_name} ${data.last_name}  <b>${data.user_id}</b>`;
    console.log(data)
}
xmlhttp.open("GET","./php/Home.php");//this can make us send bothe request and response on thesame page
xmlhttp.send()

//jQuery
// var el = $(".p");
// console.log(el)