function doMenu(name){
    var tempdom = document.getElementById(name);
    if(tempdom.style.display == 'none'){
        tempdom.style.display = 'block';
    } else{
        tempdom.style.display = 'none';
    }
}