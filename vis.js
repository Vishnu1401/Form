document.addEventListener("DOMContentLoaded", function() {
    let currentSection = 0;
    const sections = document.querySelectorAll(".form-section");

    // Show the initial section
    showSection(currentSection);

    // Navigation buttons
    document.querySelectorAll(".next-btn").forEach(button => {
        button.addEventListener("click", function() {
            if (validateCurrentSection()) {
                currentSection++;
                showSection(currentSection);
            }
        });
    });

    document.querySelectorAll(".back-btn").forEach(button => {
        button.addEventListener("click", function() {
            currentSection--;
            showSection(currentSection);
        });
    });

    // Form submission
    document.getElementById("registrationForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission

        if (validateForm()) {
            const formData = {
                fullname: document.getElementById("fullname").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                dob: document.getElementById("dob").value,
                gender: document.getElementById("gender").value,
                course: document.getElementById("course").value,
                startDate: document.getElementById("start-date").value,
                time: document.getElementById("time").value,
                cardNumber: document.getElementById("card-number").value,
                expirationDate: document.getElementById("expiration-date").value,
                cvv: document.getElementById("cvv").value,
                billingAddress: document.getElementById("billing-address").value,
                username: document.getElementById("username").value,
                password: document.getElementById("password").value,
                securityQuestion: document.getElementById("security-question").value,
                securityAnswer: document.getElementById("security-answer").value
            };

            // Simulate sending the data to a server
            console.log("Form Data Submitted:", formData);

            // Show confirmation message
            showConfirmationMessage("Registration successful! Thank you for signing up.");
            
            // Optionally reset the form
            document.getElementById("registrationForm").reset();
        } else {
            alert("Please correct the errors before submitting.");
        }
    });

    function showSection(index) {
        sections.forEach((section, i) => {
            section.style.display = (i === index) ? "block" : "none";
        });
    }

    function validateCurrentSection() {
        switch (currentSection) {
            case 0: return validatePersonalInfo();
            case 1: return validateCourseSelection();
            case 2: return validatePaymentDetails();
            case 3: return validateAccountSetup();
        }
        return true;
    }

    function validateForm() {
        return (
            validatePersonalInfo() &&
            validateCourseSelection() &&
            validatePaymentDetails() &&
            validateAccountSetup()
        );
    }

    // Validation functions for each section

    function validatePersonalInfo() {
        const fullname = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;

        let isValid = true;
        if (!fullname) {
            showError("fullname", "Full name is required.");
            isValid = false;
        } else {
            clearError("fullname");
        }

        if (!validateEmail(email)) {
            showError("email", "Please enter a valid email address.");
            isValid = false;
        } else {
            clearError("email");
        }

        if (!validatePhone(phone)) {
            showError("phone", "Please enter a valid 10-digit phone number.");
            isValid = false;
        } else {
            clearError("phone");
        }

        return isValid;
    }

    function validateCourseSelection() {
        const course = document.getElementById("course").value;
        const startDate = document.getElementById("start-date").value;
        const time = document.getElementById("time").value;

        let isValid = true;
        if (!course) {
            showError("course", "Please select a course.");
            isValid = false;
        } else {
            clearError("course");
        }

        if (!startDate) {
            showError("start-date", "Please select a start date.");
            isValid = false;
        } else {
            clearError("start-date");
        }

        if (!time) {
            showError("time", "Please select a preferred time.");
            isValid = false;
        } else {
            clearError("time");
        }

        return isValid;
    }

    function validatePaymentDetails() {
        const cardNumber = document.getElementById("card-number").value;
        const expirationDate = document.getElementById("expiration-date").value;
        const cvv = document.getElementById("cvv").value;

        let isValid = true;
        if (!validateCardNumber(cardNumber)) {
            showError("card-number", "Please enter a valid 16-digit credit card number.");
            isValid = false;
        } else {
            clearError("card-number");
        }

        if (!expirationDate) {
            showError("expiration-date", "Please select an expiration date.");
            isValid = false;
        } else {
            clearError("expiration-date");
        }

        if (!cvv || cvv.length < 3) {
            showError("cvv", "CVV must be at least 3 digits.");
            isValid = false;
        } else {
            clearError("cvv");
        }

        return isValid;
    }

    function validateAccountSetup() {
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        let isValid = true;
        if (password.length < 6) {
            showError("password", "Password must be at least 6 characters long.");
            isValid = false;
        } else {
            clearError("password");
        }

        if (password !== confirmPassword) {
            showError("confirm-password", "Passwords do not match.");
            isValid = false;
        } else {
            clearError("confirm-password");
        }

        return isValid;
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        const re = /^[0-9]{10}$/;
        return re.test(phone);
    }

    function validateCardNumber(cardNumber) {
        const re = /^[0-9]{16}$/;
        return re.test(cardNumber.replace(/\s+/g, '')); // Remove spaces
    }

    function showError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        errorElement.textContent = message;
        errorElement.style.display = "block";
    }

    function clearError(fieldId) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        errorElement.textContent = "";
        errorElement.style.display = "none";
    }

    function showConfirmationMessage(message) {
        const confirmationMessage = document.getElementById("confirmation-message");
        confirmationMessage.textContent = message;
        confirmationMessage.classList.remove("hidden");
    }
});
