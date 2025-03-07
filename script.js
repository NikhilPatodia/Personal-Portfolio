document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("I am run!")
    let notification = document.getElementById("notification")
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    if (!name || !email || !message) {
        notification.style.backgroundColor = "red";
        notification.innerHTML = "Enter Name, Email and Message Field!";
        notification.classList.remove("hidden");
        setTimeout(() => {
            notification.classList.add("hidden");
        }, 2200)
    }

    const sendMail = await fetch("/sendmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
    });
    const res = await sendMail.json();
    if (res.success) {
        notification.style.backgroundColor = "green";
        notification.innerHTML = "Your Email Send Successfully!";
        notification.classList.remove("hidden");
        setTimeout(() => {
            notification.classList.add("hidden");
        }, 2200)
    } else {
        notification.style.backgroundColor = "red";
        notification.innerHTML = "Error Occur While Sending Email!Try again!";
        notification.classList.remove("hidden");
        setTimeout(() => {
            notification.classList.add("hidden");
        }, 2200)
    }
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
})