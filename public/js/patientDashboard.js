// to change edit button to save button
editIcon = (icon) => icon.classList.toggle('icon-save')

// to display comment box on click
function editValueComment() {
    var commentBox = document.getElementById('comment');
    var valueBox = document.getElementById('value');
    // var editBtn = document.getElementsByClassName('edit-btn');
    if (commentBox.style.display == 'none') {
        commentBox.style.display = 'block';
    } else {
        commentBox.style.display = 'none';
    }

    valueBox.removeAttribute("disabled");
    //valueBox.classList.remove
    //valueBox.setAttribute("disabled", "disabled");
    
    // for (i=0; i<commentBox.length; i++) {
    //     if (commentBox[i].style.display == 'none') {
    //         commentBox[i].style.display = 'block';
    //     } else {
    //         commentBox[i].style.display == 'none';
    //     }
    // }
}

// to display current date

var today = new Date();
var day = today.getDay();
var daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();    
// var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
// var dateTime = date+' '+time;
document.getElementById("displayDate").innerHTML = date + ', ' + daylist[day];