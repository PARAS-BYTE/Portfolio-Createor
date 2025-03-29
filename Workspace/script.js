   // Initialize Tailwind config with CSS variables
   tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: 'var(--primary)',
                secondary: 'var(--secondary)',
                accent: 'var(--accent)',
            }
        }
    }
}

// DOM Elements
const form = document.getElementById('portfolioForm');
const previewSection = document.getElementById('preview');
const portfolioPreview = document.getElementById('portfolioPreview');
const downloadBtn = document.getElementById('downloadBtn');
const deployBtn = document.getElementById('deployBtn');
const successMessage = document.getElementById('successMessage');
const portfolioUrl = document.getElementById('portfolioUrl');

// Tab functionality
const tabs = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-tab');
        
        // Update active tab
        tabs.forEach(t => t.classList.remove('active', 'border-blue-600', 'text-gray-700'));
        tab.classList.add('active', 'border-blue-600', 'text-gray-700');
        
        // Show corresponding content
        tabContents.forEach(content => {
            content.classList.add('hidden');
            content.classList.remove('active');
        });
        
        const activeContent = document.getElementById(`${tabId}-tab`);
        activeContent.classList.remove('hidden');
        activeContent.classList.add('active');
        
        // Animate with GSAP
        gsap.from(activeContent, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// Next/prev tab buttons
document.querySelectorAll('.next-tab').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const nextTab = e.target.getAttribute('data-next');
        document.querySelector(`.tab-btn[data-tab="${nextTab}"]`).click();
    });
});

document.querySelectorAll('.prev-tab').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const prevTab = e.target.getAttribute('data-prev');
        document.querySelector(`.tab-btn[data-tab="${prevTab}"]`).click();
    });
});

// Color pickers
const primaryColor = document.getElementById('primaryColor');
const secondaryColor = document.getElementById('secondaryColor');
const accentColor = document.getElementById('accentColor');

primaryColor.addEventListener('input', updateColors);
secondaryColor.addEventListener('input', updateColors);
accentColor.addEventListener('input', updateColors);

function updateColors() {
    document.documentElement.style.setProperty('--primary', hexToRgb(primaryColor.value).join(' '));
    document.documentElement.style.setProperty('--secondary', hexToRgb(secondaryColor.value).join(' '));
    document.documentElement.style.setProperty('--accent', hexToRgb(accentColor.value).join(' '));
    
    // Update hex displays
    document.getElementById('primaryHex').textContent = primaryColor.value;
    document.getElementById('secondaryHex').textContent = secondaryColor.value;
    document.getElementById('accentHex').textContent = accentColor.value;
}

function hexToRgb(hex) {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Parse r, g, b values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return [r, g, b];
}

// Add/remove project functionality
document.getElementById('addProject').addEventListener('click', addProject);

function addProject() {
    const projectsContainer = document.getElementById('projectsContainer');
    const projectCount = projectsContainer.children.length + 1;
    
    const projectDiv = document.createElement('div');
    projectDiv.className = 'project-item p-6 bg-white border border-gray-200 rounded-lg shadow-sm';
    projectDiv.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                <input type="text" class="project-title w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Project URL</label>
                <input type="url" class="project-link w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="https://">
            </div>
        </div>
        
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea class="project-desc w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows="3" required></textarea>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Technologies (comma separated)</label>
                <input type="text" class="project-tech w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. React, Node.js, MongoDB">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">GitHub URL</label>
                <input type="url" class="project-github w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="https://github.com/username/project">
            </div>
        </div>
        
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Project Image</label>
            <input type="file" class="project-image block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
            "/>
        </div>
        
        <div class="flex justify-end">
            <button type="button" class="remove-project text-sm text-red-600 hover:text-red-800 flex items-center">
                <i class="fas fa-trash mr-1"></i> Remove Project
            </button>
        </div>
    `;
    
    projectsContainer.appendChild(projectDiv);
    
    // Add animation
    gsap.from(projectDiv, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.out"
    });
    
    // Add remove functionality
    projectDiv.querySelector('.remove-project').addEventListener('click', function() {
        gsap.to(projectDiv, {
            opacity: 0,
            y: -20,
            duration: 0.2,
            ease: "power2.in",
            onComplete: () => projectDiv.remove()
        });
    });
}

// Add/remove skill functionality
document.getElementById('addSkill').addEventListener('click', addSkill);

function addSkill() {
    const skillsContainer = document.getElementById('skillsContainer');
    const skillCount = skillsContainer.children.length + 1;
    
    const skillDiv = document.createElement('div');
    skillDiv.className = 'skill-item flex items-center space-x-3';
    skillDiv.innerHTML = `
        <input type="text" class="skill-input flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. Web Design" required>
        <button type="button" class="remove-skill text-red-500 hover:text-red-700">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    skillsContainer.appendChild(skillDiv);
    
    // Add animation
    gsap.from(skillDiv, {
        opacity: 0,
        y: 10,
        duration: 0.2,
        ease: "power2.out"
    });
    
    // Add remove functionality
    skillDiv.querySelector('.remove-skill').addEventListener('click', function() {
        gsap.to(skillDiv, {
            opacity: 0,
            x: -20,
            duration: 0.2,
            ease: "power2.in",
            onComplete: () => skillDiv.remove()
        });
    });
}

// Profile image preview
document.getElementById('profileImage').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('profilePreview').src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Update summary
    updateSummary();
    
    // Generate portfolio HTML
    generatePortfolio();
    
    // Show preview section
    previewSection.classList.remove('hidden');
    
    // Scroll to preview
    window.scrollTo({
        top: previewSection.offsetTop,
        behavior: 'smooth'
    });
    
    // Animate preview section
    gsap.from(previewSection, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "power2.out"
    });
});

function updateSummary() {
    document.getElementById('summaryName').textContent = document.getElementById('name').value;
    document.getElementById('summaryTitle').textContent = document.getElementById('title').value;
    
    const projectCount = document.querySelectorAll('.project-item').length;
    document.getElementById('summaryProjects').textContent = `${projectCount} project${projectCount !== 1 ? 's' : ''}`;
    
    const skillCount = document.querySelectorAll('.skill-item').length;
    document.getElementById('summarySkills').textContent = `${skillCount} skill${skillCount !== 1 ? 's' : ''}`;
    
    document.getElementById('summaryPrimary').style.backgroundColor = primaryColor.value;
    document.getElementById('summarySecondary').style.backgroundColor = secondaryColor.value;
    document.getElementById('summaryAccent').style.backgroundColor = accentColor.value;
    
    const selectedLayout = document.querySelector('input[name="layout"]:checked').value;
    document.getElementById('summaryLayout').textContent = `${selectedLayout.charAt(0).toUpperCase() + selectedLayout.slice(1)} layout`;
}

function generatePortfolio() {
    // Get all form values
    const formData = {
        name: document.getElementById('name').value,
        title: document.getElementById('title').value,
        email: document.getElementById('email').value,
        location: document.getElementById('location').value,
        bio: document.getElementById('bio').value,
        profileImage: document.getElementById('profilePreview').src,
        skills: Array.from(document.querySelectorAll('.skill-input')).map(input => input.value),
        projects: Array.from(document.querySelectorAll('.project-item')).map(project => ({
            title: project.querySelector('.project-title').value,
            description: project.querySelector('.project-desc').value,
            link: project.querySelector('.project-link').value,
            github: project.querySelector('.project-github').value,
            technologies: project.querySelector('.project-tech').value.split(',').map(tech => tech.trim()),
            image: project.querySelector('.project-image').files[0] ? 
                URL.createObjectURL(project.querySelector('.project-image').files[0]) : 
                'https://via.placeholder.com/600x400'
        })),
        social: {
            linkedin: document.getElementById('linkedin').value,
            github: document.getElementById('github').value,
            twitter: document.getElementById('twitter').value,
            website: document.getElementById('website').value
        },
        colors: {
            primary: primaryColor.value,
            secondary: secondaryColor.value,
            accent: accentColor.value
        },
        layout: document.querySelector('input[name="layout"]:checked').value
    };
    
    // Generate HTML (simplified for example)
    const portfolioHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${formData.name} | Portfolio</title>
            <style>
                :root {
                    --primary: ${hexToRgb(formData.colors.primary).join(' ')};
                    --secondary: ${hexToRgb(formData.colors.secondary).join(' ')};
                    --accent: ${hexToRgb(formData.colors.accent).join(' ')};
                }
                /* Full CSS would be inserted here */
            </style>
        </head>
        <body>
            <!-- Portfolio content generated from formData -->
            <h1>${formData.name}</h1>
            <p>${formData.title}</p>
            <!-- etc. -->
        </body>
        </html>
    `;
    
    // Display simplified preview
    portfolioPreview.innerHTML = `
        <div class="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 class="text-xl font-bold mb-4">${formData.name}</h3>
            <p class="text-blue-600 font-medium mb-2">${formData.title}</p>
            <img src="${formData.profileImage}" alt="Profile" class="w-32 h-32 rounded-full mx-auto mb-4">
            <p class="text-gray-700 mb-6">${formData.bio}</p>
            
            <h4 class="font-bold mb-2">Projects</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                ${formData.projects.map(project => `
                    <div class="border border-gray-200 rounded-lg p-4">
                        <h5 class="font-medium">${project.title}</h5>
                        <p class="text-sm text-gray-600">${project.description.substring(0, 60)}...</p>
                    </div>
                `).join('')}
            </div>
            
            <h4 class="font-bold mb-2">Skills</h4>
            <div class="flex flex-wrap gap-2">
                ${formData.skills.map(skill => `
                    <span class="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded">${skill}</span>
                `).join('')}
            </div>
        </div>
        
        <div class="mt-6 p-4 bg-blue-50 rounded-lg">
            <p class="text-sm text-blue-800">This is a simplified preview. Your downloaded portfolio will include the complete design with all your content.</p>
        </div>
    `;
    
    // Save generated HTML for download
    portfolioPreview.dataset.generatedHtml = portfolioHTML;
}

// Download portfolio
downloadBtn.addEventListener('click', function() {
    const html = portfolioPreview.dataset.generatedHtml;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// Deploy portfolio (simulated)
deployBtn.addEventListener('click', function() {
    // In a real app, this would upload to a server
    // For demo, we'll simulate with a loading state and success message
    
    deployBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Deploying...';
    deployBtn.disabled = true;
    
    setTimeout(() => {
        const randomId = Math.random().toString(36).substring(2, 8);
        const url = `https://${randomId}.yourfolio.dev`;
        
        portfolioUrl.textContent = url;
        portfolioUrl.href = url;
        successMessage.classList.remove('hidden');
        
        deployBtn.innerHTML = '<i class="fas fa-cloud-upload-alt mr-2"></i> Deploy Online';
        deployBtn.disabled = false;
        
        // Animate success message
        gsap.from(successMessage, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            ease: "power2.out"
        });
        
        // Scroll to success message
        window.scrollTo({
            top: successMessage.offsetTop - 20,
            behavior: 'smooth'
        });
    }, 2000);
});

// Initialize color values
updateColors();

// Initial animations
gsap.from('nav', {
    opacity: 0,
    y: -20,
    duration: 0.5,
    ease: "power2.out"
});

gsap.from('section', {
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out",
    delay: 0.3
});