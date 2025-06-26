document.getElementById('navbar-toogle').addEventListener('click', e => {
    let navbar = document.getElementById('navbar');
    if(navbar.classList.contains('nav-hide')){
        navbar.classList.remove('nav-hide');
        e.currentTarget.classList.add('hide');
    } else {
        navbar.classList.add('nav-hide');
        e.currentTarget.classList.remove('hide');
    }
});

document.querySelectorAll('.nav-element').forEach(element => {
    element.addEventListener('click', () => {
        document.getElementById('navbar').classList.add('nav-hide');
        document.getElementById('navbar-toogle').classList.remove('hide');
    });
});