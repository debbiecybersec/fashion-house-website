    var MenuItems = document.getElementById("MenuItems");
        MenuItems.style.maxHeight = "0px";

        function menutoggle() {
            MenuItems.style.maxHeight = MenuItems.style.maxHeight === "0px" ? "200px" : "0px";
            MenuItems.classList.toggle("active");
        }

        document.getElementById('inquiryForm').addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const inquiryType = document.getElementById('inquiryType').value;
            const message = document.getElementById('message').value.trim();
            const formMessage = document.getElementById('formMessage');

            // Reset message styles
            formMessage.style.display = 'none';
            formMessage.classList.remove('success', 'error');

            // Check if any field is empty
            if (!name || !email || !inquiryType || !message) {
                formMessage.textContent = 'Please fill out all fields.';
                formMessage.classList.add('error');
                formMessage.style.display = 'block';
                return;
            }

            // Simulate form submission
            formMessage.textContent = 'Thank you for your inquiry! Our team will respond within 24 hours.';
            formMessage.classList.add('success');
            formMessage.style.display = 'block';

            // Reset form
            this.reset();
        });