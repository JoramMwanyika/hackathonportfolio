// Role text animation
function updateRole() {
    const roles = ["Automation Specialist", "Software Developer", "Web Developer"];
    let i = 0;
    setInterval(() => {
        const roleText = document.querySelector('.role-text');
        if (roleText) {
            roleText.textContent = roles[i];
            i = (i + 1) % roles.length;
        }
    }, 3000);
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateRole();
});
