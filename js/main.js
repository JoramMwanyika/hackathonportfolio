// DOM Elements and Global Variables
let darkMode = false
const particles = []
const particleCount = 50
let customCursor
let cursorDot

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all features
  initMobileNavigation()
  initSmoothScrolling()
  initFormValidation()
  initSkillBars()
  initScrollAnimations()
  initParallaxEffect()
  initCustomCursor()
  initParticleBackground()
  initProjectCards()
  initPageTransitions()
  initScrollToTopButton()
  initSkillsAnimation()

  // Load saved form data if available
  loadFormData()
})

// Mobile Navigation
function initMobileNavigation() {
  const navLinks = document.getElementById("navLinks")
  const hamburger = document.createElement("div")
  hamburger.className = "hamburger"
  hamburger.innerHTML = "<span></span><span></span><span></span>"

  const navbar = document.getElementById("navbar")
  if (navbar) {
    navbar.querySelector(".container").appendChild(hamburger)

    hamburger.addEventListener("click", function () {
      this.classList.toggle("active")
      navLinks.classList.toggle("active")
    })
  }

  // Dynamic Navigation Highlighting
  const sections = document.querySelectorAll("section")
  const navItems = document.querySelectorAll(".nav-link")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id")
      }
    })

    navItems.forEach((item) => {
      item.classList.remove("active")
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active")
      }
    })
  })
}

// Smooth Scrolling
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")

      // Animated Page Transitions
      document.body.classList.add("page-transition")

      setTimeout(() => {
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          })

          // Close mobile menu if open
          const hamburger = document.querySelector(".hamburger")
          const navLinks = document.getElementById("navLinks")
          if (hamburger && hamburger.classList.contains("active")) {
            hamburger.classList.remove("active")
            navLinks.classList.remove("active")
          }
        }

        setTimeout(() => {
          document.body.classList.remove("page-transition")
        }, 500)
      }, 300)
    })
  })
}

// Form Validation with Animations
function initFormValidation() {
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    // Add hidden field for submission date
    const dateField = document.querySelector('input[name="submission_date"]')
    if (dateField) {
      dateField.value = new Date().toISOString()
    }

    // Add validation animations to form fields
    const formInputs = contactForm.querySelectorAll("input, textarea")
    formInputs.forEach((input) => {
      // Add focus animations
      input.addEventListener("focus", function () {
        this.parentElement.classList.add("focused")
      })

      input.addEventListener("blur", function () {
        this.parentElement.classList.remove("focused")
        // Validate on blur
        if (this.value.trim() !== "") {
          validateField(this)
        }
      })

      // Save form data as user types
      input.addEventListener("input", function () {
        saveFormData()
        // Real-time validation
        if (this.value.trim() !== "") {
          validateField(this)
        }
      })
    })

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Animate form submission
      contactForm.classList.add("submitting")

      if (validateForm()) {
        // Show success message with animation
        showFormMessage("success", "Thank you! Your message has been sent successfully.")

        // Store form data in localStorage
        saveFormData()

        // Reset form after animation completes
        setTimeout(() => {
          contactForm.classList.remove("submitting")
          contactForm.classList.add("submitted")

          setTimeout(() => {
            contactForm.reset()
            localStorage.removeItem("contactFormData")
            contactForm.classList.remove("submitted")
          }, 1000)
        }, 1000)
      } else {
        // Show error animation
        contactForm.classList.add("validation-error")
        setTimeout(() => {
          contactForm.classList.remove("submitting")
          contactForm.classList.remove("validation-error")
        }, 800)
      }
    })
  }
}

// Validate individual field with animation
function validateField(field) {
  let isValid = true
  const fieldName = field.id

  // Remove previous validation states
  field.classList.remove("valid", "invalid")

  // Validate based on field type
  switch (fieldName) {
    case "name":
      if (field.value.trim().length < 2) {
        showError(field, "Name must be at least 2 characters")
        isValid = false
      } else {
        showSuccess(field)
      }
      break
    case "email":
      if (!isValidEmail(field.value)) {
        showError(field, "Please enter a valid email address")
        isValid = false
      } else {
        showSuccess(field)
      }
      break
    case "subject":
      if (field.value.trim().length < 5) {
        showError(field, "Subject must be at least 5 characters")
        isValid = false
      } else {
        showSuccess(field)
      }
      break
    case "message":
      if (field.value.trim().length < 20) {
        showError(field, "Message must be at least 20 characters")
        isValid = false
      } else {
        showSuccess(field)
      }
      break
  }

  return isValid
}

// Validate entire form
function validateForm() {
  const name = document.getElementById("name")
  const email = document.getElementById("email")
  const subject = document.getElementById("subject")
  const message = document.getElementById("message")
  let isValid = true

  // Reset previous error messages
  clearErrorMessages()

  // Validate each field
  if (!validateField(name)) isValid = false
  if (!validateField(email)) isValid = false
  if (!validateField(subject)) isValid = false
  if (!validateField(message)) isValid = false

  return isValid
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Show error message with animation
function showError(input, message) {
  if (!input) return

  input.classList.add("invalid")
  input.classList.remove("valid")

  // Create error element if it doesn't exist
  let errorElement = input.parentElement.querySelector(".error-message")
  if (!errorElement) {
    errorElement = document.createElement("span")
    errorElement.className = "error-message"
    input.parentElement.appendChild(errorElement)
  }

  // Animate error message
  errorElement.textContent = message
  errorElement.style.display = "block"
  errorElement.classList.add("error-animation")

  setTimeout(() => {
    errorElement.classList.remove("error-animation")
  }, 500)
}

// Show success state with animation
function showSuccess(input) {
  if (!input) return

  input.classList.add("valid")
  input.classList.remove("invalid")

  // Remove error message if exists
  const errorElement = input.parentElement.querySelector(".error-message")
  if (errorElement) {
    errorElement.style.display = "none"
  }
}

// Clear all error messages
function clearErrorMessages() {
  const errorMessages = document.querySelectorAll(".error-message")
  errorMessages.forEach((element) => {
    element.style.display = "none"
  })

  const inputs = document.querySelectorAll(".form-group input, .form-group textarea")
  inputs.forEach((input) => {
    input.classList.remove("invalid", "valid")
  })
}

// Show form message (success/error)
function showFormMessage(type, message) {
  // Create message element if it doesn't exist
  let messageElement = document.querySelector(".form-message")
  if (!messageElement) {
    messageElement = document.createElement("div")
    messageElement.className = "form-message"
    const form = document.getElementById("contactForm")
    form.parentElement.insertBefore(messageElement, form)
  }

  messageElement.textContent = message
  messageElement.className = `form-message ${type}`
  messageElement.style.display = "block"

  // Animate message appearance
  messageElement.classList.add("message-animation")

  setTimeout(() => {
    messageElement.classList.remove("message-animation")
  }, 500)

  // Hide message after 5 seconds
  setTimeout(() => {
    messageElement.style.display = "none"
  }, 5000)
}

// Save form data to localStorage
function saveFormData() {
  const name = document.getElementById("name")
  const email = document.getElementById("email")
  const subject = document.getElementById("subject")
  const message = document.getElementById("message")

  if (!name || !email || !subject || !message) return

  const formData = {
    name: name.value,
    email: email.value,
    subject: subject.value,
    message: message.value,
  }

  localStorage.setItem("contactFormData", JSON.stringify(formData))
}

// Load form data from localStorage
function loadFormData() {
  const savedData = localStorage.getItem("contactFormData")

  if (savedData) {
    const formData = JSON.parse(savedData)

    const name = document.getElementById("name")
    const email = document.getElementById("email")
    const subject = document.getElementById("subject")
    const message = document.getElementById("message")

    if (name) name.value = formData.name || ""
    if (email) email.value = formData.email || ""
    if (subject) subject.value = formData.subject || ""
    if (message) message.value = formData.message || ""
  }
}

// Interactive Skill Meters
function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")

  // Make skill bars interactive on hover
  skillBars.forEach((bar) => {
    const skillItem = bar.closest(".skill-item")
    const percentage = bar.style.width || bar.getAttribute("data-percentage") || "0%"

    // Store original width
    bar.setAttribute("data-percentage", percentage)

    // Add hover effect
    skillItem.addEventListener("mouseenter", () => {
      bar.style.width = "0%"
      setTimeout(() => {
        bar.classList.add("skill-animate")
        bar.style.width = percentage
      }, 200)
    })

    skillItem.addEventListener("mouseleave", () => {
      bar.classList.remove("skill-animate")
    })
  })

  // Animate skill bars when they come into view
  function animateSkillBars() {
    skillBars.forEach((bar) => {
      const rect = bar.getBoundingClientRect()
      const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0

      if (isVisible && !bar.classList.contains("animated")) {
        bar.classList.add("animated")
        const percentage = bar.getAttribute("data-percentage") || bar.style.width || "0%"
        bar.style.width = "0%"

        setTimeout(() => {
          bar.style.width = percentage
        }, 200)
      } else if (!isVisible && bar.classList.contains("animated")) {
        bar.classList.remove("animated")
        bar.style.width = "0%"
      }
    })
  }

  // Initial animation
  animateSkillBars()

  // Animate on scroll
  window.addEventListener("scroll", animateSkillBars)
}

// Scroll-Triggered Animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".project-card, .volunteer-card, .edu-card, .interest-card, .skill-group, .info-card, .timeline-item",
  )

  // Check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0
  }

  // Add animation classes when elements come into view
  function animateOnScroll() {
    animatedElements.forEach((element) => {
      if (isInViewport(element) && !element.classList.contains("animated")) {
        element.classList.add("animated")
      }
    })
  }

  // Initial animations
  animateOnScroll()

  // Scroll event listener for animations
  window.addEventListener("scroll", animateOnScroll)
}

// Parallax Scrolling Effect
function initParallaxEffect() {
  const parallaxElements = document.querySelectorAll(".parallax")

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY

    parallaxElements.forEach((element) => {
      const speed = element.getAttribute("data-speed") || 0.1
      element.style.transform = `translateY(${scrollY * speed}px)`
    })
  })

  // Add parallax class to elements
  document.querySelectorAll(".shape").forEach((shape, index) => {
    shape.classList.add("parallax")
    shape.setAttribute("data-speed", (0.05 + index * 0.02).toFixed(2))
  })

  document.querySelector(".profile-blob").classList.add("parallax")
  document.querySelector(".profile-blob").setAttribute("data-speed", "-0.03")
}

// Custom Cursor Effect
function initCustomCursor() {
  // Create custom cursor elements
  customCursor = document.createElement("div")
  customCursor.className = "custom-cursor"

  cursorDot = document.createElement("div")
  cursorDot.className = "cursor-dot"

  document.body.appendChild(customCursor)
  document.body.appendChild(cursorDot)

  // Update cursor position
  document.addEventListener("mousemove", (e) => {
    customCursor.style.left = e.clientX + "px"
    customCursor.style.top = e.clientY + "px"

    cursorDot.style.left = e.clientX + "px"
    cursorDot.style.top = e.clientY + "px"
  })

  // Add hover effects for interactive elements
  const interactiveElements = document.querySelectorAll(
    "a, button, .btn, .project-card, .skill-item, .social-link, .nav-link, .key-skill, .info-card, .interest-card",
  )

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      customCursor.classList.add("cursor-hover")
      cursorDot.classList.add("dot-hover")
    })

    element.addEventListener("mouseleave", () => {
      customCursor.classList.remove("cursor-hover")
      cursorDot.classList.remove("dot-hover")
    })
  })

  // Hide default cursor
  document.body.classList.add("custom-cursor-active")
}

// Interactive Background Particles
function initParticleBackground() {
  // Create canvas for particles
  const canvas = document.createElement("canvas")
  canvas.id = "particles-canvas"
  canvas.className = "particles-canvas"

  // Insert canvas as first child of body
  document.body.insertBefore(canvas, document.body.firstChild)

  // Set canvas size
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // Get canvas context
  const ctx = canvas.getContext("2d")

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      color: darkMode ? "#ffffff" : "#7e22ce",
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25,
      opacity: Math.random() * 0.5 + 0.1,
    })
  }

  // Animate particles
  function animateParticles() {
    requestAnimationFrame(animateParticles)

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update and draw particles
    particles.forEach((particle) => {
      // Move particle
      particle.x += particle.speedX
      particle.y += particle.speedY

      // Bounce off edges
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.speedX = -particle.speedX
      }

      if (particle.y < 0 || particle.y > canvas.height) {
        particle.speedY = -particle.speedY
      }

      // Draw particle
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${darkMode ? "255, 255, 255" : "126, 34, 206"}, ${particle.opacity})`
      ctx.fill()

      // Draw connections
      particles.forEach((otherParticle) => {
        const dx = particle.x - otherParticle.x
        const dy = particle.y - otherParticle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(${darkMode ? "255, 255, 255" : "126, 34, 206"}, ${0.1 * (1 - distance / 100)})`
          ctx.lineWidth = 0.5
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(otherParticle.x, otherParticle.y)
          ctx.stroke()
        }
      })
    })
  }

  // Start animation
  animateParticles()

  // Resize canvas on window resize
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })

  // Make particles interactive with mouse
  canvas.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX
    const mouseY = e.clientY

    particles.forEach((particle) => {
      const dx = mouseX - particle.x
      const dy = mouseY - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 100) {
        const angle = Math.atan2(dy, dx)
        particle.x -= Math.cos(angle) * 1
        particle.y -= Math.sin(angle) * 1
      }
    })
  })
}

// Update particles color when theme changes
function updateParticlesColor() {
  particles.forEach((particle) => {
    particle.color = darkMode ? "#ffffff" : "#7e22ce"
  })
}

// Interactive Project Cards
function initProjectCards() {
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    // Add 3D tilt effect
    card.addEventListener("mousemove", (e) => {
      const cardRect = card.getBoundingClientRect()
      const cardCenterX = cardRect.left + cardRect.width / 2
      const cardCenterY = cardRect.top + cardRect.height / 2

      const mouseX = e.clientX - cardCenterX
      const mouseY = e.clientY - cardCenterY

      const rotateX = (mouseY / (cardRect.height / 2)) * -5
      const rotateY = (mouseX / (cardRect.width / 2)) * 5

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`

      // Add highlight effect
      const projectContent = card.querySelector(".project-content")
      if (projectContent) {
        const glareX = (mouseX / cardRect.width) * 100 + 50
        const glareY = (mouseY / cardRect.height) * 100 + 50

        projectContent.style.background = `
                    radial-gradient(
                        circle at ${glareX}% ${glareY}%, 
                        rgba(255, 255, 255, 0.03) 0%, 
                        rgba(0, 0, 0, 0) 60%
                    ), 
                    var(--bg-card)
                `
      }
    })

    // Reset on mouse leave
    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)"

      const projectContent = card.querySelector(".project-content")
      if (projectContent) {
        projectContent.style.background = "var(--bg-card)"
      }
    })

    // Add click interaction
    card.addEventListener("click", () => {
      card.classList.toggle("expanded")

      // Close other cards
      projectCards.forEach((otherCard) => {
        if (otherCard !== card) {
          otherCard.classList.remove("expanded")
        }
      })
    })
  })
}

// Animated Page Transitions
function initPageTransitions() {
  // Add transition overlay
  const transitionOverlay = document.createElement("div")
  transitionOverlay.className = "page-transition-overlay"
  document.body.appendChild(transitionOverlay)

  // Add initial page load animation
  document.body.classList.add("page-loaded")
}

// Scroll to top button
function initScrollToTopButton() {
  const scrollToTopBtn = document.createElement("button")
  scrollToTopBtn.className = "scroll-to-top"
  scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
  document.body.appendChild(scrollToTopBtn)

  // Show/hide scroll to top button
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add("show")
    } else {
      scrollToTopBtn.classList.remove("show")
    }
  })

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Skills progress animation
function initSkillsAnimation() {
  const skillBars = document.querySelectorAll(".skill-progress")
  const animateSkills = () => {
    skillBars.forEach((bar) => {
      const progress = bar.getAttribute("data-progress")
      bar.style.width = progress + "%"
    })
  }

  // Intersection Observer for skill bars
  const skillsSection = document.querySelector(".skills-section")
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkills()
        skillsObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.5 })

  if (skillsSection) {
    skillsObserver.observe(skillsSection)
  }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      })
    }
  })
})
