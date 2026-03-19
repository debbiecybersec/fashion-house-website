   var MenuItems = document.getElementById("MenuItems");
        MenuItems.style.maxHeight = "0px";

        function menutoggle() {
            MenuItems.style.maxHeight = MenuItems.style.maxHeight === "0px" ? "200px" : "0px";
        }

        document.getElementById('contactForm').addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            const formMessage = document.getElementById('formMessage');

            formMessage.style.display = 'none';
            formMessage.classList.remove('success', 'error');

            if (!name || !email || !subject || !message) {
                formMessage.textContent = 'Please complete all fields.';
                formMessage.classList.add('error');
                formMessage.style.display = 'block';
                return;
            }

            formMessage.textContent = 'Thank you for your message! Our team will respond soon.';
            formMessage.classList.add('success');
            formMessage.style.display = 'block';

            this.reset();
        });