// script.js
window.addEventListener('load', () => {
    const skills = document.querySelectorAll('.skill');
    skills.forEach((skill, index) => {
        setTimeout(() => {
            skill.style.opacity = '1';
            skill.style.transform = 'translateY(0)';
        }, 200 * (index + 1));
    });
});
