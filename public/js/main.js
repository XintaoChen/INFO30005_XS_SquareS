function doMenu(name) {
    var tempdom = document.getElementById(name)
    if (tempdom.style.display == 'none') {
        tempdom.style.display = 'block'
        var mo=function(e){passive: false ;};
        document.body.style.overflow='hidden';
        document.addEventListener("touchmove",mo,false);
    } else {
        tempdom.style.display = 'none'
        var mo=function(e){passive: false };
        document.body.style.overflow='';
        document.removeEventListener("touchmove",mo,false);
    }
}
