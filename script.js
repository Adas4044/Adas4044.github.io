document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
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

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px 50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation (excluding timeline items which handle their own animation)
    const animateElements = document.querySelectorAll('.adventure-card, .experience-card, .project-card, .skill-category, .polaroid, .about-image, .timeline-item');
    animateElements.forEach(el => {
        if (!el.classList.contains('timeline-item')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        } else {
            // Timeline items use different animation
            el.style.opacity = '0';
            el.style.transform = 'translateX(-30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        observer.observe(el);
    });

    // Add staggered animation for cards
    const allCards = document.querySelectorAll('.adventure-card, .experience-card, .project-card, .skill-category');
    allCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });

    // Add staggered animation for gallery items
    const galleryItems = document.querySelectorAll('.polaroid');
    galleryItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.15}s`;
    });

    // Add staggered animation for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroVideo = document.querySelector('.hero-video');
        const heroContent = document.querySelector('.hero-content');
        
        if (heroVideo) {
            heroVideo.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Add vintage typewriter effect to hero subtitle
    const typewriterElement = document.querySelector('#typewriter-text');
    if (typewriterElement) {
        const roles = [
            'SOFTWARE ENGINEER',
            'BUILDER',
            'EXPLORER'
        ];
        
        let currentRoleIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let isPaused = false;
        
        // Clear the initial text immediately and add cursor
        typewriterElement.textContent = '';
        
        // Add blinking cursor animation
        const style = document.createElement('style');
        style.textContent += `
            #typewriter-text::after {
                content: '|';
                animation: blink 1s infinite;
                color: #ffffff;
            }
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        function typeWriterEffect() {
            const currentRole = roles[currentRoleIndex];
            
            if (!isDeleting && !isPaused) {
                // Typing
                if (currentCharIndex < currentRole.length) {
                    typewriterElement.textContent = currentRole.substring(0, currentCharIndex + 1);
                    currentCharIndex++;
                    setTimeout(typeWriterEffect, 80 + Math.random() * 40); // Variable speed for realism
                } else {
                    // Finished typing, pause before deleting
                    isPaused = true;
                    setTimeout(() => {
                        isPaused = false;
                        isDeleting = true;
                        typeWriterEffect();
                    }, 2000); // Pause for 2 seconds
                }
            } else if (isDeleting && !isPaused) {
                // Deleting
                if (currentCharIndex > 0) {
                    typewriterElement.textContent = currentRole.substring(0, currentCharIndex - 1);
                    currentCharIndex--;
                    setTimeout(typeWriterEffect, 50 + Math.random() * 30); // Faster deletion
                } else {
                    // Finished deleting, move to next role
                    isDeleting = false;
                    currentRoleIndex = (currentRoleIndex + 1) % roles.length;
                    setTimeout(typeWriterEffect, 500); // Brief pause before typing next word
                }
            }
        }
        
        // Start the typewriter effect immediately
        setTimeout(typeWriterEffect, 1500);
    }

    // Add hover sound effect simulation (visual feedback)
    const interactiveElements = document.querySelectorAll('.cta-button, .adventure-card, .experience-card, .project-card, .skill-category, .polaroid, .nav-menu a, .project-link');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
        });
    });

    // Add special hover effects for treasure chests
    const treasureChests = document.querySelectorAll('.treasure-chest-main');
    treasureChests.forEach(chest => {
        chest.addEventListener('mouseenter', function() {
            const chestClosed = this.querySelector('.chest-closed');
            const chestOpen = this.querySelector('.chest-open');
            const glow = this.querySelector('.treasure-glow');
            
            if (chestClosed) {
                chestClosed.style.transform = 'translate(-50%, -50%) scale(1.05) rotateY(5deg)';
                chestClosed.style.filter = 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4)) brightness(1.1) saturate(1.2)';
            }
            
            if (glow) {
                glow.style.opacity = '0.3';
                glow.style.transform = 'translate(-50%, -50%) scale(1.1)';
            }
        });
        
        chest.addEventListener('mouseleave', function() {
            const projectCard = this.closest('.project-card');
            const isOpen = projectCard.getAttribute('data-collapsed') === 'false';
            const chestClosed = this.querySelector('.chest-closed');
            const chestOpen = this.querySelector('.chest-open');
            const glow = this.querySelector('.treasure-glow');
            
            if (chestClosed && !isOpen) {
                chestClosed.style.transform = 'translate(-50%, -50%) scale(1) rotateY(0deg)';
                chestClosed.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))';
            }
            
            if (glow && !isOpen) {
                glow.style.opacity = '0';
                glow.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        });
    });

    // Add vintage grain effect overlay
    function createGrainOverlay() {
        const grainOverlay = document.createElement('div');
        grainOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
                radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px),
                radial-gradient(circle at 75% 75%, rgba(0,0,0,0.05) 1px, transparent 1px);
            background-size: 4px 4px, 6px 6px;
            opacity: 0.3;
            pointer-events: none;
            z-index: 9999;
            animation: grain 0.2s steps(10) infinite;
        `;
        
        document.body.appendChild(grainOverlay);
    }

    // Add grain animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes grain {
            0%, 100% { transform: translate(0, 0); }
            10% { transform: translate(-1px, -1px); }
            20% { transform: translate(1px, 1px); }
            30% { transform: translate(-1px, 1px); }
            40% { transform: translate(1px, -1px); }
            50% { transform: translate(-1px, -1px); }
            60% { transform: translate(1px, 1px); }
            70% { transform: translate(-1px, 1px); }
            80% { transform: translate(1px, -1px); }
            90% { transform: translate(-1px, -1px); }
        }
    `;
    document.head.appendChild(style);
    
    // Apply subtle grain effect
    createGrainOverlay();

    // Add random rotation to polaroids on load
    const polaroids = document.querySelectorAll('.polaroid');
    polaroids.forEach(polaroid => {
        const randomRotation = (Math.random() - 0.5) * 6; // -3 to 3 degrees
        polaroid.style.setProperty('--rotation', `${randomRotation}deg`);
    });

    // Add floating animation to scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            if (scrolled > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
});

// Add vintage color filter toggle (Easter egg)
let vintageMode = false;
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'v') {
        vintageMode = !vintageMode;
        document.body.style.filter = vintageMode ? 'sepia(0.3) contrast(1.2) brightness(0.9)' : 'none';
    }
});

// Timeline toggle functionality
function toggleExperience(element) {
    console.log('Toggle clicked'); // Debug log
    const timelineItem = element.closest('.timeline-item');
    if (!timelineItem) {
        console.log('Timeline item not found');
        return;
    }
    
    const isCollapsed = timelineItem.getAttribute('data-collapsed') === 'true';
    console.log('Current state:', isCollapsed ? 'collapsed' : 'expanded');
    
    // Toggle the collapsed state
    timelineItem.setAttribute('data-collapsed', isCollapsed ? 'false' : 'true');
    console.log('New state:', isCollapsed ? 'expanded' : 'collapsed');
    
    // Add a small bounce effect when opening
    if (isCollapsed) {
        const details = timelineItem.querySelector('.timeline-details');
        if (details) {
            details.style.transform = 'scale(0.98)';
            setTimeout(() => {
                details.style.transform = 'scale(1)';
            }, 150);
        }
    }
}

// Project toggle functionality with treasure chest effects
function toggleProject(element) {
    console.log('Project toggle clicked'); // Debug log
    const projectCard = element.closest('.project-card');
    if (!projectCard) {
        console.log('Project card not found');
        return;
    }
    
    const isCollapsed = projectCard.getAttribute('data-collapsed') === 'true';
    console.log('Project current state:', isCollapsed ? 'collapsed' : 'expanded');
    
    const chestClosed = projectCard.querySelector('.chest-closed');
    const chestOpen = projectCard.querySelector('.chest-open');
    const projectDetails = projectCard.querySelector('.project-details');
    
    if (isCollapsed) {
        // Opening the treasure chest
        projectCard.setAttribute('data-collapsed', 'false');
        
        // Add treasure chest opening sequence
        if (chestClosed && chestOpen) {
            // First, shake the closed chest
            chestClosed.style.animation = 'chestShake 0.3s ease-in-out';
            
            setTimeout(() => {
                // Then transition to open chest
                chestClosed.style.animation = 'none';
            }, 300);
        }
        
        // Add shimmer effect to the project details
        if (projectDetails) {
            projectDetails.style.transform = 'scale(0.95)';
            projectDetails.style.opacity = '0';
            
            setTimeout(() => {
                projectDetails.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                projectDetails.style.transform = 'scale(1)';
                projectDetails.style.opacity = '1';
                
                // Add floating treasure effect
                createFloatingTreasures(projectCard);
            }, 200);
        }
        
        // Add CSS animations if not already defined
        if (!document.querySelector('#treasure-animations')) {
            const style = document.createElement('style');
            style.id = 'treasure-animations';
            style.textContent = `
                @keyframes chestShake {
                    0%, 100% { transform: translate(-50%, -50%) rotateZ(0deg); }
                    25% { transform: translate(-50%, -50%) rotateZ(-2deg); }
                    75% { transform: translate(-50%, -50%) rotateZ(2deg); }
                }
                
                @keyframes treasureFloat {
                    0% { transform: translateY(0px) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(-60px) rotate(360deg); opacity: 0; }
                }
                
                .floating-treasure {
                    position: absolute;
                    font-size: 24px;
                    pointer-events: none;
                    z-index: 1000;
                    animation: treasureFloat 2.5s ease-out forwards;
                }
            `;
            document.head.appendChild(style);
        }
        
    } else {
        // Closing the treasure chest
        projectCard.setAttribute('data-collapsed', 'true');
        
        if (projectDetails) {
            projectDetails.style.transition = 'all 0.4s ease';
            projectDetails.style.transform = 'scale(0.95)';
            projectDetails.style.opacity = '0';
        }
    }
    
    console.log('Project new state:', isCollapsed ? 'expanded' : 'collapsed');
}

// Create floating treasure effects
function createFloatingTreasures(projectCard) {
    const treasures = ['💎', '🪙', '👑', '💰', '⭐', '🏆', '💍'];
    const rect = projectCard.getBoundingClientRect();
    const chestRect = projectCard.querySelector('.treasure-chest-main').getBoundingClientRect();
    
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const treasure = document.createElement('div');
            treasure.className = 'floating-treasure';
            treasure.textContent = treasures[Math.floor(Math.random() * treasures.length)];
            
            // Position relative to the treasure chest center
            const startX = chestRect.left + chestRect.width / 2 + (Math.random() - 0.5) * 60;
            const startY = chestRect.top + chestRect.height / 2;
            
            treasure.style.left = startX + 'px';
            treasure.style.top = startY + 'px';
            treasure.style.animationDelay = Math.random() * 0.5 + 's';
            treasure.style.animationDuration = (1.5 + Math.random()) + 's';
            
            document.body.appendChild(treasure);
            
            // Remove after animation
            setTimeout(() => {
                if (treasure.parentNode) {
                    treasure.parentNode.removeChild(treasure);
                }
            }, 3000);
        }, i * 150);
    }
}

// Secrets of Maps project special function with animation and redirect
function openSecretsOfMaps(element) {
    console.log('Secrets of Maps treasure clicked!');
    const projectCard = element.closest('.project-card');
    if (!projectCard) {
        console.log('Project card not found');
        return;
    }
    
    const chestClosed = projectCard.querySelector('.chest-closed');
    const chestOpen = projectCard.querySelector('.chest-open');
    const treasureGlow = projectCard.querySelector('.treasure-glow');
    
    // Prevent multiple clicks during animation
    element.style.pointerEvents = 'none';
    
    // Start the treasure chest opening animation
    projectCard.setAttribute('data-collapsed', 'false');
    
    // Add extra dramatic effects for this special project
    if (chestClosed && chestOpen) {
        // Shake the chest first
        chestClosed.style.animation = 'chestShake 0.4s ease-in-out';
        
        setTimeout(() => {
            chestClosed.style.animation = 'none';
            // Add extra glow for this special project
            if (treasureGlow) {
                treasureGlow.style.background = 'radial-gradient(circle, rgba(255, 215, 0, 0.6) 0%, rgba(255, 215, 0, 0.3) 40%, rgba(255, 255, 255, 0.2) 70%, transparent 100%)';
            }
        }, 400);
    }
    
    // Create enhanced floating treasures for this project
    createEnhancedFloatingTreasures(projectCard);
    
    // Add a special map-themed treasure effect
    setTimeout(() => {
        createMapTreasureEffect(projectCard);
    }, 800);
    
    // Reset the chest state and re-enable clicking after animation completes
    setTimeout(() => {
        element.style.pointerEvents = 'auto';
    }, 2500);
}

// Enhanced floating treasures specifically for Secrets of Maps
function createEnhancedFloatingTreasures(projectCard) {
    const mapTreasures = ['🗺️', '🧭', '📍', '🌍', '🛰️', '🔍', '📱', '🚗'];
    const rect = projectCard.getBoundingClientRect();
    const chestRect = projectCard.querySelector('.treasure-chest-main').getBoundingClientRect();
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const treasure = document.createElement('div');
            treasure.className = 'floating-treasure';
            treasure.textContent = mapTreasures[Math.floor(Math.random() * mapTreasures.length)];
            
            // Position relative to the treasure chest center
            const startX = chestRect.left + chestRect.width / 2 + (Math.random() - 0.5) * 80;
            const startY = chestRect.top + chestRect.height / 2;
            
            treasure.style.left = startX + 'px';
            treasure.style.top = startY + 'px';
            treasure.style.animationDelay = Math.random() * 0.3 + 's';
            treasure.style.animationDuration = (2 + Math.random()) + 's';
            treasure.style.fontSize = '28px'; // Slightly larger for this special project
            
            document.body.appendChild(treasure);
            
            // Remove after animation
            setTimeout(() => {
                if (treasure.parentNode) {
                    treasure.parentNode.removeChild(treasure);
                }
            }, 3500);
        }, i * 100);
    }
}

// Special map-themed treasure effect
function createMapTreasureEffect(projectCard) {
    const chestRect = projectCard.querySelector('.treasure-chest-main').getBoundingClientRect();
    
    // Create a special "map unrolling" effect
    const mapEffect = document.createElement('div');
    mapEffect.className = 'map-treasure-effect';
    mapEffect.textContent = '🗺️';
    mapEffect.style.cssText = `
        position: absolute;
        left: ${chestRect.left + chestRect.width / 2}px;
        top: ${chestRect.top + chestRect.height / 2}px;
        font-size: 40px;
        pointer-events: none;
        z-index: 1001;
        transform: scale(0) rotate(0deg);
        opacity: 0;
        transition: all 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `;
    
    document.body.appendChild(mapEffect);
    
    // Animate the map unrolling
    setTimeout(() => {
        mapEffect.style.transform = 'scale(2) rotate(360deg)';
        mapEffect.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
        mapEffect.style.transform = 'scale(0) rotate(720deg)';
        mapEffect.style.opacity = '0';
    }, 1200);
    
    // Remove after animation
    setTimeout(() => {
        if (mapEffect.parentNode) {
            mapEffect.parentNode.removeChild(mapEffect);
        }
    }, 2500);
}

// Show more projects functionality
function toggleShowMoreProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    const showMoreBtn = document.querySelector('.show-more-btn');
    const isExpanded = projectsGrid.classList.contains('projects-expanded');
    
    if (isExpanded) {
        // Hide extra projects
        projectsGrid.classList.remove('projects-expanded');
        showMoreBtn.textContent = '[SHOW MORE PROJECTS]';
        
        // Smooth scroll to top of projects section
        document.querySelector('#projects').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    } else {
        // Show all projects
        projectsGrid.classList.add('projects-expanded');
        showMoreBtn.textContent = '[SHOW FEWER PROJECTS]';
        
        // Add staggered animation for newly visible projects
        const hiddenProjects = document.querySelectorAll('.hidden-project');
        hiddenProjects.forEach((project, index) => {
            project.style.opacity = '0';
            project.style.transform = 'translateY(30px)';
            setTimeout(() => {
                project.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                project.style.opacity = '1';
                project.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
}
