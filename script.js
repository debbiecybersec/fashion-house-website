function welcome(){
    alert("Welcome to Royal Stitch Fashion House!");
}

// Back to top button functionality
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    const topBtn = document.getElementById("topBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// Newsletter signup functionality
function subscribeNewsletter(event) {
    event.preventDefault();
    const email = document.getElementById("newsletter-email").value;
    if (email) {
        alert("Thank you for subscribing! We'll keep you updated with our latest collections.");
        document.getElementById("newsletter-email").value = "";
    } else {
        alert("Please enter a valid email address.");
    }
}

// Add fade-in animation to elements
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.small-container, .footer-group, .card');
    elements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.animationDelay = `${index * 0.1}s`;
    });
});
