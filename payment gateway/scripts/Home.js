const xmlhttp = new XMLHttpRequest();
xmlhttp.onload=function(){
    const data = JSON.parse(this.responseText);
    const user ={
        firstName:data.first_name,
        lastName:data.last_name,
        Id:data.user_id
    }
    document.querySelector('.h2').innerHTML = `${user.firstName} ${user.lastName}`;
    document.querySelector('#id span').innerHTML = user.Id;
    console.log(data);
}
xmlhttp.open("GET","./php/Home.php");//this can make us send both request and response on thesame page
xmlhttp.send()

// xmlhttp.open("GET","./php/active-trade.php")