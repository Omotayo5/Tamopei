const xmlhttp = new XMLHttpRequest();
xmlhttp.onload=function(){
    const data = JSON.parse(this.responseText);
    document.querySelector('.h2').innerHTML = `${data.first_name} ${data.last_name}`;
    document.querySelector('#id span').innerHTML = data.user_id;
    console.log(data);
}
xmlhttp.open("GET","./php/Home.php");//this can make us send both request and response on thesame page
xmlhttp.send()

//jQuery
// var el = $(".p");
// console.log(el)