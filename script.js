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
    const form = event.target;
    const input = form.querySelector('.newsletter-email');
    const email = input ? input.value.trim() : '';
    if (email) {
        alert("Thank you for subscribing! We'll keep you updated with our latest collections.");
        if (input) input.value = '';
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

// Fetch events page, parse upcoming events and show the next event in a fixed marquee
document.addEventListener('DOMContentLoaded', function() {
    const marqueeId = 'global-fixed-marquee';
    if (document.getElementById(marqueeId)) return; // already injected

    fetch('events.html')
        .then(resp => resp.text())
        .then(htmlText => {
            try {
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlText, 'text/html');
                const cards = doc.querySelectorAll('.event-card');
                const events = [];
                cards.forEach(card => {
                    const titleEl = card.querySelector('h3');
                    const dateEl = card.querySelector('p');
                    if (!titleEl || !dateEl) return;
                    const title = titleEl.textContent.trim();
                    const dateText = dateEl.textContent.trim();
                    const parsed = Date.parse(dateText);
                    if (!isNaN(parsed)) events.push({ title, date: new Date(parsed), dateText });
                });

                const now = new Date();
                const upcoming = events
                    .filter(e => e.date >= now)
                    .sort((a,b) => a.date - b.date);

                let content = 'No upcoming events scheduled.';
                if (upcoming.length > 0) {
                    const next = upcoming[0];
                    const dateStr = next.date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
                    content = `🔥 Next: ${next.title} — ${dateStr} \u2022`;
                }

                // create fixed marquee element
                const wrapper = document.createElement('div');
                wrapper.id = marqueeId;
                wrapper.className = 'fixed-marquee';
                wrapper.setAttribute('role', 'status');
                wrapper.setAttribute('aria-live', 'polite');
                wrapper.innerHTML = `<span class="marquee-label">🔥 Next Event</span><marquee behavior="scroll" scrollamount="4">${content} <a href="events.html">Details</a></marquee>`;

                document.body.appendChild(wrapper);

                // Pause marquee on hover (improves readability)
                const mq = wrapper.querySelector('marquee');
                if (mq) {
                    mq.addEventListener('mouseenter', () => { try { mq.stop(); } catch(e){} });
                    mq.addEventListener('mouseleave', () => { try { mq.start(); } catch(e){} });
                }
                // Merge marquee into footer when footer is visible in viewport
                const footer = document.querySelector('footer');
                if (footer) {
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                // move marquee into footer and switch style
                                try {
                                    wrapper.classList.remove('fixed-marquee');
                                    wrapper.classList.add('footer-marquee');
                                    footer.insertBefore(wrapper, footer.firstChild);
                                } catch (e) { console.error(e); }
                            } else {
                                // move marquee back to fixed position
                                try {
                                    wrapper.classList.remove('footer-marquee');
                                    wrapper.classList.add('fixed-marquee');
                                    document.body.appendChild(wrapper);
                                } catch (e) { console.error(e); }
                            }
                        });
                    }, { root: null, threshold: 0 });

                    observer.observe(footer);
                }
            } catch (e) {
                // fail silently
                console.error('Failed to parse events for marquee', e);
            }
        })
        .catch(err => console.error('Failed to load events.html for marquee', err));
});
