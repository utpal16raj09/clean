
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');
    const menuLinks = document.querySelectorAll('.menu-link');
    // --- ADDED FOR CLOSE BUTTON ---
    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close-btn');


    const toggleMenu = () => {
        const isOpen = mobileMenu.classList.contains('menu-open');
        if (isOpen) {
            // Close menu
            mobileMenu.classList.remove('menu-open');
            mobileMenu.classList.add('menu-closed');
            menuIconOpen.classList.remove('hidden');
            menuIconClose.classList.add('hidden');
            document.body.style.overflow = ''; // Re-enable scrolling
        } else {
            // Open menu
            mobileMenu.classList.remove('menu-closed');
            mobileMenu.classList.add('menu-open');
            menuIconOpen.classList.add('hidden');
            menuIconClose.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Disable scrolling
        }
    };

    // Toggle menu on hamburger button click
    menuToggle.addEventListener('click', toggleMenu);

    // --- ADDED FOR CLOSE BUTTON ---
    // Toggle menu on new 'X' button click
    if (mobileMenuCloseBtn) {
        mobileMenuCloseBtn.addEventListener('click', toggleMenu);
    }

    // --- MODIFICATION ---
    // Close menu when any link inside it is clicked
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Check if the menu is currently open
            if (mobileMenu.classList.contains('menu-open')) {
                toggleMenu(); // If yes, close it
            }
        });
    });
    // --- END MODIFICATION ---

    // Scroll Progress Bar
    const scrollProgress = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = `${scrolled}%`;
    });

    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.remove('hidden');
        } else {
            backToTopButton.classList.add('hidden');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Before/After Slider
    const slider = document.querySelector('.ba-slider');
    if (slider) {
        const resize = slider.querySelector('.resize');
        const handle = slider.querySelector('.handle');

        let isResizing = false;

        function initSlider(e) {
            window.addEventListener('mousemove', moveHandler);
            window.addEventListener('touchmove', moveHandler);
            window.addEventListener('mouseup', stopResize);
            window.addEventListener('touchend', stopResize);
            isResizing = true;
        }

        function moveHandler(e) {
            if (!isResizing) return;

            let clientX;
            if (e.type === 'touchmove') {
                clientX = e.touches[0].clientX;
            } else {
                clientX = e.clientX;
            }

            const sliderRect = slider.getBoundingClientRect();
            let newWidth = ((clientX - sliderRect.left) / slider.offsetWidth) * 100;

            // Constrain between 0 and 100
            newWidth = Math.max(0, Math.min(newWidth, 100));

            resize.style.width = `${newWidth}%`;
            handle.style.left = `${newWidth}%`;
        }

        function stopResize() {
            isResizing = false;
            window.removeEventListener('mousemove', moveHandler);
            window.removeEventListener('touchmove', moveHandler);
        }

        handle.addEventListener('mousedown', initSlider);
        handle.addEventListener('touchstart', initSlider);

        // Also allow clicking on the slider to move the handle
        slider.addEventListener('click', (e) => {
            if (isResizing) return; // Don't snap to click if currently dragging
            const sliderRect = slider.getBoundingClientRect();
            const newWidth = ((e.clientX - sliderRect.left) / slider.offsetWidth) * 100;
            resize.style.width = `${newWidth}%`;
            handle.style.left = `${newWidth}%`;
        });
    }

    // Testimonial Carousel
    const testimonialTrack = document.getElementById('testimonial-track');
    if (testimonialTrack) {
        const testimonialSlides = document.querySelectorAll('.testimonial-slide');
        const prevButton = document.getElementById('testimonial-prev');
        const nextButton = document.getElementById('testimonial-next');

        let currentSlide = 0;
        const totalSlides = testimonialSlides.length;

        function updateCarousel() {
            if (totalSlides > 0) {
                testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            }
        }

        if (prevButton && nextButton && totalSlides > 0) {
            prevButton.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                updateCarousel();
            });

            nextButton.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateCarousel();
            });

            // Auto-advance carousel
            setInterval(() => {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateCarousel();
            }, 5000);
        }
    }

    // Initialize Particles.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 50, density: { enable: true, value_area: 800 } }, // Fewer particles
                color: { value: "#2563EB" }, // Blue color
                shape: { type: "circle" },
                opacity: { value: 0.3, random: true }, // More transparent
                size: { value: 5, random: true }, // Bigger bubbles
                line_linked: {
                    enable: false, // *** Lines disabled ***
                    distance: 150,
                    color: "#2563EB",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5, // Slower
                    direction: "top", // Move up
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            },
            retina_detect: true
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Use Animate.css classes if available, otherwise fallback
                if (entry.target.classList.contains('fade-in-up')) {
                    // This uses your custom keyframes
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                } else {
                    // Fallback for elements without custom class
                    entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });

    // Form submission
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real application, you would send the form data to a server
            alert('Thank you for your request! We will contact you soon.');
            quoteForm.reset();
            // Reset AI button state
            const refineButton = document.getElementById('refine-project-button');
            if (refineButton) {
                refineButton.disabled = true;
            }
        });
    }

    // --- AI SCRIPT ---

    // --- Configuration ---
    const apiKey = ""; // Leave this as-is; it will be populated at runtime.
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    const systemPrompt = `You are a professional cleaning service coordinator for Daze Nettoyage. A potential client has submitted a cleaning request. 
        Your task is to re-write their request into a concise, professional, and well-structured summary. 
        This summary will be shown back to the client for their approval.
        - If the request is very short (e.g., "need a quote"), ask 3-4 key questions to help them elaborate (e.g., "To provide an accurate quote, could you please specify the type of space, square footage, and preferred cleaning frequency?").
        - For all other requests, summarize their points clearly. You can use a single paragraph or a few bullet points if it makes sense.
        - Maintain a professional, helpful, and expert tone.
        - Do not add any preamble like "Here is the summary:". Just provide the refined text directly.`;

    // --- Element Selectors ---
    const textarea = document.getElementById('project-details');
    const refineButton = document.getElementById('refine-project-button');
    const refineSpinner = document.getElementById('refine-spinner');
    const refineButtonText = document.getElementById('refine-button-text');

    const modal = document.getElementById('ai-suggestion-modal');
    const modalLoadingState = document.getElementById('modal-loading-state');
    const modalContentState = document.getElementById('modal-content-state');
    const originalTextDisplay = document.getElementById('original-text-display');
    const refinedTextDisplay = document.getElementById('refined-text-display');
    const modalError = document.getElementById('modal-error-message');
    const cancelButton = document.getElementById('cancel-ai-button');
    const useButton = document.getElementById('use-ai-button');

    // Check if all AI elements exist before proceeding
    if (textarea && refineButton && refineSpinner && refineButtonText && modal && modalLoadingState && modalContentState && originalTextDisplay && refinedTextDisplay && modalError && cancelButton && useButton) {

        // --- Utility: Fetch with Backoff ---
        async function fetchWithBackoff(url, options, retries = 3, delay = 1000) {
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    if (response.status === 429 && retries > 0) {
                        // Throttled, wait and retry
                        await new Promise(resolve => setTimeout(resolve, delay));
                        return fetchWithBackoff(url, options, retries - 1, delay * 2);
                    }
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            } catch (error) {
                console.error("API call failed:", error);
                throw error;
            }
        }

        // --- UI State Functions ---
        const setButtonLoading = (isLoading) => {
            refineButton.disabled = isLoading;
            if (isLoading) {
                refineSpinner.classList.remove('hidden');
                refineButtonText.textContent = 'Refining...';
            } else {
                refineSpinner.classList.add('hidden');
                refineButtonText.textContent = '✨ Refine Project Description';
            }
        };

        const showModal = (isLoading = false) => {
            modalError.classList.add('hidden');
            modalError.textContent = '';
            if (isLoading) {
                modalLoadingState.classList.remove('hidden');
                modalContentState.classList.add('hidden');
            } else {
                modalLoadingState.classList.add('hidden');
                modalContentState.classList.remove('hidden');
            }
            modal.classList.remove('hidden');
        };

        const hideModal = () => {
            modal.classList.add('hidden');
        };

        const showModalError = (message) => {
            modalError.textContent = message;
            modalError.classList.remove('hidden');
        };

        // --- Event Listeners ---

        // 1. Enable/Disable Refine Button based on textarea input
        textarea.addEventListener('input', () => {
            if (textarea.value.trim().length > 10) {
                refineButton.disabled = false;
            } else {
                refineButton.disabled = true;
            }
        });

        // 2. Handle Refine Button Click
        refineButton.addEventListener('click', async () => {
            const userQuery = textarea.value.trim();
            if (userQuery.length <= 10) return;

            setButtonLoading(true);
            showModal(true); // Show modal in loading state
            originalTextDisplay.textContent = userQuery;

            const payload = {
                systemInstruction: {
                    parts: [{ text: systemPrompt }]
                },
                contents: [
                    { parts: [{ text: userQuery }] }
                ]
            };

            try {
                const result = await fetchWithBackoff(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const candidate = result.candidates?.[0];
                if (candidate && candidate.content?.parts?.[0]?.text) {
                    const refinedText = candidate.content.parts[0].text;
                    refinedTextDisplay.textContent = refinedText;
                    showModal(false); // Show modal with content
                } else {
                    throw new Error("Invalid API response structure.");
                }

            } catch (error) {
                console.error("Error during Gemini API call:", error);
                showModal(false); // Show content modal
                showModalError("Sorry, we couldn't refine your description right now. Please try again later.");
            } finally {
                setButtonLoading(false);
            }
        });

        // 3. Handle Modal Buttons
        cancelButton.addEventListener('click', hideModal);

        useButton.addEventListener('click', () => {
            textarea.value = refinedTextDisplay.textContent;
            hideModal();
            // Trigger input event to re-validate button state
            textarea.dispatchEvent(new Event('input'));
        });

    } // End of AI script elements check

    // --- END OF AI SCRIPT ---
});
