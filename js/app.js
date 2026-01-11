document.addEventListener('DOMContentLoaded', () => {
    initAccordion();
    initContactForm();
});

function initAccordion() {
    const questions = document.querySelectorAll('.faq-question');
    questions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('.faq-icon');
            const isOpen = answer.style.maxHeight;
            document.querySelectorAll('.faq-answer').forEach(item => { item.style.maxHeight = null; });
            document.querySelectorAll('.faq-icon').forEach(item => { item.textContent = '+'; item.classList.remove('rotate-45'); });
            if (isOpen) {
                answer.style.maxHeight = null;
                icon.textContent = '+';
                icon.classList.remove('rotate-45');
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
                icon.textContent = '×';
                icon.classList.add('rotate-45');
            }
        });
    });
}

function initContactForm() {
    const form = document.querySelector('form[data-webhook="true"]');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        submitBtn.disabled = true;
        submitBtn.innerText = "Enviando...";
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert(`¡Gracias ${data.name || ''}! Tu mensaje ha sido enviado.`);
        form.reset();
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
    });
}