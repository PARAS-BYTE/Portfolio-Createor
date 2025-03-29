
document.addEventListener('DOMContentLoaded', function() {
    // --- Skills Management ---
    const skillsInput = document.getElementById('skillsInput');
    const addSkillBtn = document.getElementById('addSkillBtn');
    const skillsContainer = document.getElementById('skillsContainer');

    const addedSkills = new Set(); // Use a Set to prevent duplicate skills

    addSkillBtn.addEventListener('click', function() {
        const skills = skillsInput.value.split(',').map(skill => skill.trim()).filter(skill => skill);

        skills.forEach(skill => {
            if (!addedSkills.has(skill)) { // Check if skill already exists
                addedSkills.add(skill); // Add to the Set
                const skillTag = document.createElement('div');
                skillTag.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
                skillTag.style.color = '#10b981';
                skillTag.style.padding = '0.25rem 0.75rem';
                skillTag.style.borderRadius = '1rem';
                skillTag.style.fontSize = '0.75rem';
                skillTag.style.fontWeight = '500';
                skillTag.style.display = 'inline-flex';
                skillTag.style.alignItems = 'center';
                skillTag.style.marginRight = '0.5rem';
                skillTag.style.marginBottom = '0.5rem';
                skillTag.innerHTML = `
                    ${skill}
                    <button type="button" style="margin-left: 0.5rem; font-size: 0.75rem; cursor: pointer; color: #f8fafc;" onclick="this.parentElement.remove(); addedSkills.delete(this.parentElement.textContent.trim().slice(0, -1));">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                skillsContainer.appendChild(skillTag);
            }
        });
        skillsInput.value = '';
    });

    // --- Projects Management ---
    const projectsContainer = document.getElementById('projectsContainer');
    const addProjectBtn = document.getElementById('addProjectBtn');
    let projectCount = 0;
    const MAX_PROJECTS = 3;

    function addProjectField() {
        if (projectCount >= MAX_PROJECTS) {
            alert(`Maximum of${MAX_PROJECTS} projects allowed`);
            return;
        }

        projectCount++;
        const projectDiv = document.createElement('div');
        projectDiv.style.marginBottom = '1rem';
        projectDiv.style.padding = '1rem';
        projectDiv.style.borderRadius = '0.75rem';
        projectDiv.style.backgroundColor = 'rgba(15, 23, 42, 0.7)';
        projectDiv.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        projectDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <h3 style="font-weight: 500;">Project ${projectCount}</h3>
                <button type="button" style="color: #f87171; cursor: pointer;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div style="display: grid; grid-template-columns: 1fr; gap: 1rem;">
                <div>
                    <label style="display: block; font-size: 0.75rem; font-weight: 500; margin-bottom: 0.25rem; color: #f8fafc;">Title</label>
                    <input type="text" name="projectTitle" required style="width: 100%; padding: 0.5rem; border-radius: 0.375rem; background-color: #1e293b; border: 1px solid #4b5563; focus: outline-none; color: #f8fafc;">
                </div>
                <div>
                    <label style="display: block; font-size: 0.75rem; font-weight: 500; margin-bottom: 0.25rem; color: #f8fafc;">Image URL</label>
                    <input type="url" name="projectImage" placeholder="https://example.com/image.jpg" required style="width: 100%; padding: 0.5rem; border-radius: 0.375rem; background-color: #1e293b; border: 1px solid #4b5563; focus: outline-none; color: #f8fafc;">
                </div>
            </div>
            <div style="margin-top: 0.5rem;">
                <label style="display: block; font-size: 0.75rem; font-weight: 500; margin-bottom: 0.25rem; color: #f8fafc;">Description</label>
                <textarea name="projectDesc" rows="2" required style="width: 100%; padding: 0.5rem; border-radius: 0.375rem; background-color: #1e293b; border: 1px solid #4b5563; focus: outline-none; color: #f8fafc; resize: vertical;"></textarea>
            </div>
            <div style="margin-top: 0.5rem;">
                <label style="display: block; font-size: 0.75rem; font-weight: 500; margin-bottom: 0.25rem; color: #f8fafc;">Technologies (comma separated)</label>
                <input type="text" name="projectTech" placeholder="React, Node.js, MongoDB" required style="width: 100%; padding: 0.5rem; border-radius: 0.375rem; background-color: #1e293b; border: 1px solid #4b5563; focus: outline-none; color: #f8fafc;">
            </div>
            <div style="display: grid; grid-template-columns: 1fr; gap: 1rem; margin-top: 0.5rem;">
                <div>
                    <label style="display: block; font-size: 0.75rem; font-weight: 500; margin-bottom: 0.25rem; color: #f8fafc;">GitHub URL</label>
                    <input type="url" name="projectGithub" placeholder="https://github.com/username/project" style="width: 100%; padding: 0.5rem; border-radius: 0.375rem; background-color: #1e293b; border: 1px solid #4b5563; focus: outline-none; color: #f8fafc;">
                </div>
                <div>
                    <label style="display: block; font-size: 0.75rem; font-weight: 500; margin-bottom: 0.25rem; color: #f8fafc;">Live URL</label>
                    <input type="url" name="projectLive" placeholder="https://example.com" style="width: 100%; padding: 0.5rem; border-radius: 0.375rem; background-color: #1e293b; border: 1px solid #4b5563; focus: outline-none; color: #f8fafc;">
                </div>
            </div>
        `;
        projectsContainer.appendChild(projectDiv);

        // Add event listener to the remove button
        projectDiv.querySelector('button').addEventListener('click', function() {
            projectDiv.remove();
            projectCount--;
        });
    }

    addProjectBtn.addEventListener('click', addProjectField);

    // Add one project field by default
    addProjectField();

    // --- Form Submission ---
    const portfolioForm = document.querySelector('form');

    portfolioForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Collect skills from the Set
        const skills = Array.from(addedSkills);

        // Collect projects
        const projects = [];
        document.querySelectorAll('#projectsContainer > div').forEach(project => {
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
        const portfolioData = {
            name: portfolioForm.querySelector('input[name="name"]').value,
            greeting: portfolioForm.querySelector('input[name="greeting"]').value,
            tagline: portfolioForm.querySelector('input[name="tagline"]').value,
            intro: portfolioForm.querySelector('textarea[name="intro"]').value,
            company: {
                name: portfolioForm.querySelector('input[name="companyName"]').value,
                url: portfolioForm.querySelector('input[name="companyUrl"]').value
            },
            ctaText: portfolioForm.querySelector('input[name="ctaText"]').value,
            aboutParagraphs: [
                portfolioForm.querySelector('textarea[name="about1"]').value,
                portfolioForm.querySelector('textarea[name="about2"]').value
            ],
            skills: skills,
            profileImage: portfolioForm.querySelector('input[name="profileImage"]').value,
            projects: projects,
            contactText: portfolioForm.querySelector('textarea[name="contactText"]').value,
            email: portfolioForm.querySelector('input[name="email"]').value,
            socialLinks: {
                github: portfolioForm.querySelector('input[name="github"]').value,
                twitter: portfolioForm.querySelector('input[name="twitter"]').value,
                linkedin: portfolioForm.querySelector('input[name="linkedin"]').value,
                instagram: portfolioForm.querySelector('input[name="instagram"]').value
            },
            resumeUrl: portfolioForm.querySelector('input[name="resumeUrl"]').value,
            footerText: portfolioForm.querySelector('input[name="footerText"]').value,
            logoText: "Portfolio"
        };

        // Output the data
        console.log("Portfolio Data:", portfolioData);
    });

    // --- Reset Form ---
    document.getElementById('resetBtn').addEventListener('click', function() {
        if (confirm('Are you sure you want to reset the form? All your data will be lost.')) {
            portfolioForm.reset();
            skillsContainer.innerHTML = '';
            projectsContainer.innerHTML = '';
            projectCount = 0;
            addProjectField();
            addedSkills.clear(); // Clear the Set
        }
    });
});
