function doMenu(name) {
    var tempdom = document.getElementById(name)
    var tempContent = document.getElementsByClassName("content")
    if (tempContent[0].style.display == 'flex' || tempContent[0].style.display == '' ) {
        tempdom.style.display = 'flex'
        tempContent[0].style.display = 'none'
        // var mo=function(e){passive: false ;};
        // document.body.style.overflow='hidden';
        // document.addEventListener("touchmove",mo,false);
    } else{
        tempdom.style.display = 'none'
        tempContent[0].style.display = 'flex'
        // var mo=function(e){passive: false };
        // document.body.style.overflow='';
        // document.removeEventListener("touchmove",mo,false);
    }
}
