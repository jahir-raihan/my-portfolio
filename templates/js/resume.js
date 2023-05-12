// Js for navigation


function change_nav(class_name){
    let elements  = document.querySelectorAll('.navigation button');
    let tabs  = document.querySelectorAll('.tab')
    for (var i = 0; i < elements.length; i++){
        elements[i].classList.remove('active');
    }

    for (var i = 0; i < tabs.length; i++){
        tabs[i].style.display = 'none'
    }

    document.querySelector('.'+class_name[1]).style.display = 'block'
    
    

    document.querySelectorAll('.'+class_name)[0].classList.add('active')
}

// Function for zero gravity


function zero_gravity(){

    var element = document.getElementById('zero-gravity').classList.toggle('activate-gravity')
}