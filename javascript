let clickCount = 0;
const whatsappBtn = document.getElementById("whatsappBtn");
const clickCounter = document.getElementById("clickCounter");
const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("registrationForm");
const message = document.getElementById("message");

// Check if already submitted
if (localStorage.getItem("submitted") === "true") {
  form.querySelectorAll("input, button").forEach(el => el.disabled = true);
  message.textContent = "🎉 Your submission has already been recorded. Thank you!";
}

// WhatsApp share logic
whatsappBtn.addEventListener("click", () => {
  if (clickCount < 5) {
    const url = encodeURIComponent("https://your-live-site-link.com");
    const text = encodeURIComponent("Hey Buddy, Join Tech For Girls Community! " + url);
    window.open(`https://wa.me/?text=${text}`, "_blank");
    
    clickCount++;
    clickCounter.textContent = `Click count: ${clickCount}/5`;

    if (clickCount >= 5) {
      clickCounter.textContent = "Sharing complete. Please continue.";
      submitBtn.disabled = false;
    }
  }
});

// Form submission logic
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (clickCount < 5) {
    alert("Please complete 5 WhatsApp shares first!");
    return;
  }

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const college = document.getElementById("college").value;
  const file = document.getElementById("screenshot").files[0];

  if (!file) {
    alert("Please upload a screenshot!");
    return;
  }

  // Prepare form data
  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("email", email);
  formData.append("college", college);
  formData.append("file", file);

  try {
    const response = await fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec", {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      message.textContent = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
      form.querySelectorAll("input, button").forEach(el => el.disabled = true);
      localStorage.setItem("submitted", "true");
    } else {
      message.textContent = "Something went wrong. Please try again.";
    }
  } catch (error) {
    console.error("Submission error:", error);
    message.textContent = "Submission failed. Check your internet or try again later.";
  }
});
