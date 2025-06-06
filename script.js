// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.15)';
        navbar.style.backdropFilter = 'blur(25px)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.05)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
        font-family: 'Inter', sans-serif;
    `;
    
    // Add animation keyframes if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 15px;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .notification-close:hover {
                opacity: 0.8;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .skill-item, .contact-form, .about-text');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, titleText, 80);
        }, 500);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const parallaxSpeed = 0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// Skills animation on hover
document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px) rotateY(10deg)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) rotateY(0)';
        });
    });
});

// Project card tilt effect
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
});

// Scroll progress indicator
document.addEventListener('DOMContentLoaded', () => {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 10001;
        transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
});

// Back to top button functionality
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Resume Management System
class ResumeManager {
    constructor() {
        this.adminPassword = 'admin123'; // Simple password for testing
        this.storageKey = 'portfolio_resume_data';
        this.init();
    }

    init() {
        this.loadResumeData();
        this.setupEventListeners();
        this.updateResumeDisplay();
    }

    loadResumeData() {
        const data = localStorage.getItem(this.storageKey);
        this.resumeData = data ? JSON.parse(data) : {
            fileName: null,
            fileData: null,
            uploadDate: null,
            fileSize: null,
            downloadCount: 0,
            viewCount: 0
        };
    }

    saveResumeData() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.resumeData));
        this.updateResumeDisplay();
    }

    setupEventListeners() {
        // File upload
        const fileInput = document.getElementById('resume-file-input');
        const uploadArea = document.getElementById('file-upload-area');

        if (fileInput) {
            fileInput.addEventListener('change', (e) => this.handleFileUpload(e));
        }

        if (uploadArea) {
            // Drag and drop functionality
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('dragover');
            });

            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('dragover');
            });

            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('dragover');
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    this.processFile(files[0]);
                }
            });
        }

        // Admin login form
        const adminForm = document.getElementById('admin-login-form');
        if (adminForm) {
            adminForm.addEventListener('submit', (e) => this.handleAdminLogin(e));
        }

        // Close modal when clicking outside
        const modal = document.getElementById('admin-login-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeAdminLogin();
                }
            });
        }
    }

    handleFileUpload(e) {
        const file = e.target.files[0];
        if (file) {
            this.processFile(file);
        }
    }

    processFile(file) {
        // Validate file
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!allowedTypes.includes(file.type)) {
            showNotification('Please upload a PDF, DOC, or DOCX file.', 'error');
            return;
        }

        if (file.size > maxSize) {
            showNotification('File size must be less than 5MB.', 'error');
            return;
        }

        // Show upload progress
        this.showUploadProgress();

        // Convert file to base64 for storage
        const reader = new FileReader();
        reader.onload = (e) => {
            this.resumeData = {
                fileName: file.name,
                fileData: e.target.result,
                uploadDate: new Date().toISOString(),
                fileSize: file.size,
                downloadCount: this.resumeData.downloadCount || 0,
                viewCount: this.resumeData.viewCount || 0
            };

            this.saveResumeData();
            this.hideUploadProgress();
            showNotification('Resume uploaded successfully!', 'success');
        };

        reader.onerror = () => {
            this.hideUploadProgress();
            showNotification('Error uploading file. Please try again.', 'error');
        };

        reader.readAsDataURL(file);
    }

    showUploadProgress() {
        const progressDiv = document.getElementById('upload-progress');
        const progressFill = document.getElementById('progress-fill');
        
        if (progressDiv) {
            progressDiv.style.display = 'block';
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                if (progressFill) {
                    progressFill.style.width = progress + '%';
                }
                if (progress >= 100) {
                    clearInterval(interval);
                }
            }, 100);
        }
    }

    hideUploadProgress() {
        const progressDiv = document.getElementById('upload-progress');
        if (progressDiv) {
            setTimeout(() => {
                progressDiv.style.display = 'none';
                const progressFill = document.getElementById('progress-fill');
                if (progressFill) {
                    progressFill.style.width = '0%';
                }
            }, 500);
        }
    }

    updateResumeDisplay() {
        // Update last updated date
        const lastUpdatedElement = document.getElementById('resume-last-updated');
        if (lastUpdatedElement && this.resumeData.uploadDate) {
            const date = new Date(this.resumeData.uploadDate);
            lastUpdatedElement.textContent = date.toLocaleDateString();
        }

        // Update current resume info
        const nameElement = document.getElementById('current-resume-name');
        const sizeElement = document.getElementById('current-resume-size');
        const dateElement = document.getElementById('current-resume-date');

        if (nameElement) {
            nameElement.textContent = this.resumeData.fileName || 'No resume uploaded';
        }

        if (sizeElement && this.resumeData.fileSize) {
            sizeElement.textContent = this.formatFileSize(this.resumeData.fileSize);
        }

        if (dateElement && this.resumeData.uploadDate) {
            const date = new Date(this.resumeData.uploadDate);
            dateElement.textContent = date.toLocaleDateString();
        }

        // Update stats
        const downloadCountElement = document.getElementById('download-count');
        const viewCountElement = document.getElementById('view-count');

        if (downloadCountElement) {
            downloadCountElement.textContent = this.resumeData.downloadCount || 0;
        }

        if (viewCountElement) {
            viewCountElement.textContent = this.resumeData.viewCount || 0;
        }
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    handleAdminLogin(e) {
        e.preventDefault();
        const password = document.getElementById('admin-password').value;
        
        if (password === this.adminPassword) {
            this.showAdminSection();
            this.closeAdminLogin();
            showNotification('Welcome to admin panel!', 'success');
        } else {
            showNotification('Incorrect password!', 'error');
        }
    }

    showAdminSection() {
        const adminSection = document.getElementById('resume-admin-section');
        if (adminSection) {
            adminSection.style.display = 'block';
            adminSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    closeAdminLogin() {
        const modal = document.getElementById('admin-login-modal');
        if (modal) {
            modal.style.display = 'none';
        }
        // Clear password field
        const passwordField = document.getElementById('admin-password');
        if (passwordField) {
            passwordField.value = '';
        }
    }

    downloadResume() {
        if (!this.resumeData.fileName || !this.resumeData.fileData) {
            showNotification('No resume available for download.', 'error');
            return;
        }

        // Create download link
        const link = document.createElement('a');
        link.href = this.resumeData.fileData;
        link.download = this.resumeData.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Update download count
        this.resumeData.downloadCount = (this.resumeData.downloadCount || 0) + 1;
        this.saveResumeData();

        showNotification('Resume downloaded successfully!', 'success');
    }

    viewResume() {
        if (!this.resumeData.fileName || !this.resumeData.fileData) {
            showNotification('No resume available to view.', 'error');
            return;
        }

        // Open in new window
        const newWindow = window.open('', '_blank');
        newWindow.document.write(`
            <html>
                <head>
                    <title>${this.resumeData.fileName}</title>
                    <style>
                        body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
                        iframe { width: 100%; height: 90vh; border: none; }
                        .header { text-align: center; margin-bottom: 20px; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h2>${this.resumeData.fileName}</h2>
                        <p>Guddu Kumar's Resume</p>
                    </div>
                    <iframe src="${this.resumeData.fileData}"></iframe>
                </body>
            </html>
        `);

        // Update view count
        this.resumeData.viewCount = (this.resumeData.viewCount || 0) + 1;
        this.saveResumeData();

        showNotification('Resume opened in new window!', 'success');
    }
}

// Initialize Resume Manager
const resumeManager = new ResumeManager();

// Global functions for resume functionality
function downloadCurrentResume() {
    resumeManager.downloadResume();
}

function viewResumeOnline() {
    resumeManager.viewResume();
}

function showAdminLogin() {
    const modal = document.getElementById('admin-login-modal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeAdminLogin() {
    resumeManager.closeAdminLogin();
}

function toggleAdminSection() {
    const adminSection = document.getElementById('resume-admin-section');
    if (adminSection) {
        adminSection.style.display = 'none';
    }
}

// Legacy download function (for backward compatibility)
function downloadResume() {
    downloadCurrentResume();
}

console.log('🚀 Portfolio website loaded successfully!');
console.log('💼 Ready to showcase your amazing work!'); 