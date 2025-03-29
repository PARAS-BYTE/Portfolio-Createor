let obj={};
document.addEventListener('DOMContentLoaded', function() {
    // Skills management
    const skillsInput = document.getElementById('skillsInput');
    const addSkillBtn = document.getElementById('addSkillBtn');
    const skillsContainer = document.getElementById('skillsContainer');
    
    addSkillBtn.addEventListener('click', function() {
        const skills = skillsInput.value.split(',').map(skill => skill.trim()).filter(skill => skill);
        
        skills.forEach(skill => {
            const skillTag = document.createElement('div');
            skillTag.className = 'skill-tag px-3 py-1 rounded-full text-xs font-medium flex items-center';
            skillTag.innerHTML = `
                ${skill}
                <button type="button" class="ml-2 text-xs" onclick="this.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            `;
            skillsContainer.appendChild(skillTag);
        });
        
        skillsInput.value = '';
    });

    // Projects management (limited to 3 projects)
    const projectsContainer = document.getElementById('projectsContainer');
    const addProjectBtn = document.getElementById('addProjectBtn');
    let projectCount = 0;
    const MAX_PROJECTS = 3;
    
    function addProjectField() {
        if (projectCount >= MAX_PROJECTS) {
            alert(`Maximum of ${MAX_PROJECTS} projects allowed`);
            return;
        }
        
        projectCount++;
        const projectDiv = document.createElement('div');
        projectDiv.className = 'card p-4 mb-4 project-field';
        projectDiv.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <h3 class="font-medium">Project ${projectCount}</h3>
                <button type="button" class="text-red-400 hover:text-red-300 remove-project">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-medium mb-1">Title</label>
                    <input type="text" name="projectTitle" required 
                        class="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none input-glow">
                </div>
                <div>
                    <label class="block text-xs font-medium mb-1">Image URL</label>
                    <input type="url" name="projectImage" placeholder="https://example.com/image.jpg" required
                        class="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none input-glow">
                </div>
            </div>
            <div class="mt-2">
                <label class="block text-xs font-medium mb-1">Description</label>
                <textarea name="projectDesc" rows="2" required
                    class="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none input-glow"></textarea>
            </div>
            <div class="mt-2">
                <label class="block text-xs font-medium mb-1">Technologies (comma separated)</label>
                <input type="text" name="projectTech" placeholder="React, Node.js, MongoDB" required
                    class="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none input-glow">
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                    <label class="block text-xs font-medium mb-1">GitHub URL</label>
                    <input type="url" name="projectGithub" placeholder="https://github.com/username/project" 
                        class="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none input-glow">
                </div>
                <div>
                    <label class="block text-xs font-medium mb-1">Live URL</label>
                    <input type="url" name="projectLive" placeholder="https://example.com" 
                        class="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none input-glow">
                </div>
            </div>
        `;
        projectsContainer.appendChild(projectDiv);
        
        // Add event listener to the remove button
        projectDiv.querySelector('.remove-project').addEventListener('click', function() {
            projectDiv.remove();
            projectCount--;
        });
    }
    
    addProjectBtn.addEventListener('click', addProjectField);
    
    // Add one project field by default
    addProjectField();

    // Form submission
    const portfolioForm = document.getElementById('portfolioForm');
    
    portfolioForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect skills
        const skills = [];
        document.querySelectorAll('.skill-tag').forEach(tag => {
            skills.push(tag.textContent.trim().replace('×', '').trim());
        });
        
        // Collect projects
        const projects = [];
        document.querySelectorAll('.project-field').forEach(project => {
            projects.push({
                title: project.querySelector('input[name="projectTitle"]').value,
                description: project.querySelector('textarea[name="projectDesc"]').value,
                technologies: project.querySelector('input[name="projectTech"]').value.split(',').map(tech => tech.trim()),
                image: project.querySelector('input[name="projectImage"]').value,
                githubUrl: project.querySelector('input[name="projectGithub"]').value,
                liveUrl: project.querySelector('input[name="projectLive"]').value
            });
        });
        
        // Create config object
        const config = {
            // Basic Information
            name: document.getElementById('name').value,
            greeting: document.getElementById('greeting').value,
            tagline: document.getElementById('tagline').value,
            intro: document.getElementById('intro').value,
            company: {
                name: document.getElementById('companyName').value,
                url: document.getElementById('companyUrl').value
            },
            ctaText: document.getElementById('ctaText').value,
            
            // About Section
            aboutParagraphs: [
                document.getElementById('about1').value,
                document.getElementById('about2').value
            ],
            skills: skills,
            profileImage: document.getElementById('profileImage').value,
            
            // Projects Section
            projects: projects,
            
            // Contact Section
            contactText: document.getElementById('contactText').value,
            email: document.getElementById('email').value,
            
            // Social Links
            socialLinks: {
                github: document.getElementById('github').value,
                twitter: document.getElementById('twitter').value,
                linkedin: document.getElementById('linkedin').value,
                instagram: document.getElementById('instagram').value
            },
            resumeUrl: document.getElementById('resumeUrl').value,
            footerText: document.getElementById('footerText').value,
            logoText: "Portfolio"
        };
        
        // Output to console instead of showing in modal
        console.log("Portfolio Configuration:", config);
        // return config;
        obj=config
        // window.open("portfolio_1.html")
        // alert("Portfolio configuration has been logged to console. Check your browser's developer tools (F12) to view the object.");
    });
    
    
    // Reset form
    document.getElementById('resetBtn').addEventListener('click', function() {
        if (confirm('Are you sure you want to reset the form? All your data will be lost.')) {
            portfolioForm.reset();
            skillsContainer.innerHTML = '';
            projectsContainer.innerHTML = '';
            projectCount = 0;
            addProjectField();
        }
    });
});
function show(){
        console.log(obj)
    }