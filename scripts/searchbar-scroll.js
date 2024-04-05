// Style the top navbar when scrolling
const topNavbar = document.querySelector('.fixed-top');
const searchBarScroll = document.querySelector('#search-bar-scroll');

window.addEventListener('scroll', () => {
    if (window.scrollY > 25) {

        searchBarScroll.style.display = 'block';
        topNavbar.style.backgroundColor = 'white';
        topNavbar.style.height = '120px';

        searchBarScroll.style.position = 'relative';
        document.getElementById("top-navbar-container").style.marginTop = '0';
        document.getElementById("search-field-scroll").style.position = 'absolute';
        document.getElementById("search-field-scroll").classList.remove('form-control');
        document.getElementById("search-field-scroll").classList.remove('me-1');
        document.getElementById("search-field-scroll").style.left = '-320px';
        document.getElementById("search-field-scroll").style.border = 'white';
        document.getElementById("search-field-scroll").style.top = '-20px';
        document.getElementById('search-icon-scroll').style.left = '-300px';
        document.getElementById('search-icon-scroll').style.top = '-10px';
        document.getElementById("cart-icon-home").setAttribute('name', 'cart-outline');
        document.getElementById("cart-icon-home").classList.add('green-outline-cart');
        document.getElementById("cart-icon-home").style.bottom = '8px';
        document.querySelector('.navbar-toggler-icon').style.color = 'green';
        document.getElementById('cart-icon-home').addEventListener('mouseenter', handleMouseEnterCart);
        document.getElementById('cart-icon-home').addEventListener('mouseleave', handleMouseLeaveCart);

    } else {
        searchBarScroll.style.display = 'none';
        topNavbar.style.backgroundColor = '';
        topNavbar.style.height = '';

        searchBarScroll.style.position = 'relative';
        document.getElementById("top-navbar-container").style.marginTop = '20px';
        document.getElementById("search-field-scroll").style.position = 'absolute';
        document.getElementById("search-field-scroll").classList.remove('form-control');
        document.getElementById("search-field-scroll").classList.remove('me-1');
        document.getElementById("search-field-scroll").style.left = '-140px';
        document.getElementById("search-field-scroll").style.border = 'white';
        document.getElementById("search-field-scroll").style.top = '-10px';
        document.getElementById('search-icon-scroll').style.left = '-130px';
        document.getElementById('search-icon-scroll').style.top = '0';
        document.getElementById("cart-icon-home").setAttribute('name', 'cart');
        document.getElementById("cart-icon-home").classList.remove('green-outline-cart');
        document.getElementById("cart-icon-home").style.color = 'black';
        document.getElementById("cart-icon-home").style.bottom = '8px';
        document.getElementById('search-icon').style.color = '';
        document.getElementById('cart-icon-home').removeEventListener('mouseenter', handleMouseEnterCart);
        document.getElementById('cart-icon-home').removeEventListener('mouseleave', handleMouseLeaveCart);
    }
})


function handleMouseEnterCart(evt) {

    evt.target.style.color = 'green';

}

function handleMouseLeaveCart(evt) {

    evt.target.style.color = '';

}