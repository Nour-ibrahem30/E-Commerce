// Contact Form Submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const name = this.querySelector('input[placeholder="Full Name"]').value
  const email = this.querySelector('input[placeholder="Enter mail id"]').value
  const mobile = this.querySelector('input[placeholder="Mobile Number"]').value
  const message = this.querySelector('textarea[placeholder="Message"]').value

  // Simple validation
  if (!name || !email || !mobile || !message) {
    alert("Please fill in all fields!")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address!")
    return
  }

  // Mobile validation (basic)
  const mobileRegex = /^[0-9]{10,15}$/
  if (!mobileRegex.test(mobile.replace(/\s+/g, ""))) {
    alert("Please enter a valid mobile number!")
    return
  }

  // Success message
  alert("Message Sent Successfully!")

  // Reset form
  this.reset()
})

// Email signup functionality
document.querySelector(".email-signup button").addEventListener("click", (e) => {
  e.preventDefault()
  const emailInput = document.querySelector(".email-signup input")
  const email = emailInput.value

  if (!email) {
    alert("Please enter your email address!")
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address!")
    return
  }

  alert("Thank you for subscribing!")
  emailInput.value = ""
})

// Smooth scrolling for navigation links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    // Add smooth scrolling behavior if needed
    console.log("Navigation clicked:", this.textContent)
  })
})

// Social media icons functionality
document.querySelectorAll(".social-icons i").forEach((icon) => {
  icon.addEventListener("click", function () {
    const platform = this.classList[1].replace("fa-", "")
    console.log(`Opening ${platform} page`)
    // Add actual social media links here
  })
})
