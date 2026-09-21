          js: `/* ===================================================
   SCRIPT.JS - Lógica Interativa e Validação de Formulário
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const eyeIcon = document.getElementById('eyeIcon');

    // 1. Alternar Visibilidade da Senha
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Alternar ícone de olho
        if (type === 'text') {
            eyeIcon.classList.remove('fa-eye');
            eyeIcon.classList.add('fa-eye-slash');
        } else {
            eyeIcon.classList.remove('fa-eye-slash');
            eyeIcon.classList.add('fa-eye');
        }
    });

    // 2. Função de Validação de E-mail
    function validateEmail() {
        const emailValue = emailInput.value.trim();
        const emailGroup = emailInput.closest('.form-group');
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

        if (!emailRegex.test(emailValue)) {
            emailGroup.classList.add('invalid');
            return false;
        } else {
            emailGroup.classList.remove('invalid');
            return true;
        }
    }

    // 3. Função de Validação de Senha
    function validatePassword() {
        const passwordValue = passwordInput.value;
        const passwordGroup = passwordInput.closest('.form-group');

        if (passwordValue.length < 6) {
            passwordGroup.classList.add('invalid');
            return false;
        } else {
            passwordGroup.classList.remove('invalid');
            return true;
        }
    }

    // Validação em tempo real ao digitar
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);

    // 4. Submissão do Formulário
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o recarregamento da página

        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        if (isEmailValid && isPasswordValid) {
            alert(' Login realizado com sucesso!');
            loginForm.reset();
        } else {
            alert('Por favor, corrija os erros antes de enviar.');
        }
    });
});`
        };

        let currentActiveTab = 'html';
        let currentViewMode = 'preview';

        // Live Preview Interactivity
        function togglePasswordVisibility(inputId, iconId) {
            const input = document.getElementById(inputId);
            const icon = document.getElementById(iconId);

            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        }

        function validateEmailField() {
            const email = document.getElementById('live-email').value.trim();
            const errorEl = document.getElementById('email-error');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (email.length > 0 && !emailRegex.test(email)) {
                errorEl.classList.remove('hidden');
                return false;
            } else {
                errorEl.classList.add('hidden');
                return emailRegex.test(email);
            }
        }

        function validatePasswordField() {
            const password = document.getElementById('live-password').value;
            const errorEl = document.getElementById('password-error');

            if (password.length > 0 && password.length < 6) {
                errorEl.classList.remove('hidden');
                return false;
            } else {
                errorEl.classList.add('hidden');
                return password.length >= 6;
            }
        }

        function handleFormSubmit(e) {
            e.preventDefault();

            const isEmailValid = validateEmailField();
            const isPasswordValid = validatePasswordField();
            const emailVal = document.getElementById('live-email').value.trim();
            const passVal = document.getElementById('live-password').value;

            if (!emailVal || !passVal) {
                if (!emailVal) document.getElementById('email-error').classList.remove('hidden');
                if (!passVal) document.getElementById('password-error').classList.remove('hidden');
                showToast('Preencha todos os campos obrigatórios!', 'error');
                return;
            }

            if (isEmailValid && isPasswordValid) {
                // UI Loading State
                const btnText = document.getElementById('btn-text');
                const btnIcon = document.getElementById('btn-icon');
                const btnSpinner = document.getElementById('btn-spinner');
                const submitBtn = document.getElementById('submit-btn');

                btnText.textContent = "Autenticando...";
                btnIcon.classList.add('hidden');
                btnSpinner.classList.remove('hidden');
                submitBtn.disabled = true;

                setTimeout(() => {
                    btnText.textContent = "Entrar na Conta";
                    btnIcon.classList.remove('hidden');
                    btnSpinner.classList.add('hidden');
                    submitBtn.disabled = false;

                    showToast('🎉 Login efetuado com sucesso!', 'success');
                    document.getElementById('live-login-form').reset();
                }, 1500);
            } else {
                showToast('Por favor, corrija os erros no formulário.', 'error');
            }
        }

        // View Modes: Preview / Code / Split
        function switchViewMode(mode) {
            currentViewMode = mode;
            const previewSec = document.getElementById('preview-section');
            const codeSec = document.getElementById('code-section');
            const container = document.getElementById('workspace-container');

            // Reset classes
            container.className = "grid grid-cols-1 gap-6 w-full items-start transition-all duration-300";
            
            // Reset tab button highlight styles
            document.querySelectorAll('.view-mode-btn').forEach(btn => {
                btn.className = "view-mode-btn px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all";
            });

            if (mode === 'preview') {
                previewSec.classList.remove('hidden');
                codeSec.classList.add('hidden');
                document.getElementById('mode-preview-btn').className = "view-mode-btn px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm";
            } else if (mode === 'code') {
                previewSec.classList.add('hidden');
                codeSec.classList.remove('hidden');
                document.getElementById('mode-code-btn').className = "view-mode-btn px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm";
            } else if (mode === 'split') {
                previewSec.classList.remove('hidden');
                codeSec.classList.remove('hidden');
                container.className = "grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-start transition-all duration-300";
                document.getElementById('mode-split-btn').className = "view-mode-btn px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm";
            }
        }

        // VS Code Code Tabs
        function setActiveCodeTab(lang) {
            currentActiveTab = lang;
            
            // Update tab button styles
            const tabs = ['html', 'css', 'js'];
            tabs.forEach(t => {
                const tabEl = document.getElementById(`tab-${t}`);
                if (t === lang) {
                    tabEl.className = "code-tab active-tab px-4 py-2.5 flex items-center space-x-2 border-r border-[#333333] bg-[#1e1e1e] text-amber-400 border-t-2 border-t-amber-500 font-semibold";
                } else {
                    tabEl.className = "code-tab px-4 py-2.5 flex items-center space-x-2 border-r border-[#333333] bg-[#2d2d2d] text-slate-400 hover:text-slate-200 border-t-2 border-t-transparent";
                }
            });

            // Update badge & code
            const badge = document.getElementById('file-size-badge');
            const codeEl = document.getElementById('code-content');

            if (lang === 'html') {
                badge.textContent = "HTML5 Markup";
                codeEl.className = "language-html";
            } else if (lang === 'css') {
                badge.textContent = "CSS3 Styles";
                codeEl.className = "language-css";
            } else if (lang === 'js') {
                badge.textContent = "JavaScript ES6";
                codeEl.className = "language-javascript";
            }

            codeEl.textContent = sourceCodes[lang];
            Prism.highlightElement(codeEl);
        }

        // Copy Code Functionality
        function copyCurrentCode() {
            const textToCopy = sourceCodes[currentActiveTab];
            const btnText = document.getElementById('copy-btn-text');
            const btnIcon = document.getElementById('copy-btn-icon');

            // Fallback copy mechanism for iframe environment safety
            const textarea = document.createElement('textarea');
            textarea.value = textToCopy;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            
            try {
                document.execCommand('copy');
                btnText.textContent = "Copiado!";
                btnIcon.className = "fa-solid fa-check text-emerald-400";
                showToast(`Código de ${currentActiveTab.toUpperCase()} copiado para a área de transferência!`, 'success');

                setTimeout(() => {
                    btnText.textContent = "Copiar Código do Arquivo";
                    btnIcon.className = "fa-regular fa-copy";
                }, 2000);
            } catch (err) {
                showToast('Erro ao copiar código.', 'error');
            } finally {
                document.body.removeChild(textarea);
            }
        }

        // Toast Notification System
        function showToast(message, type = 'info') {
            const container = document.getElementById('toast-container');
            const toast = document.createElement('div');
            
            let bgClasses = "bg-slate-800 text-white border-slate-700";
            let iconClass = "fa-solid fa-circle-info text-blue-400";

            if (type === 'success') {
                bgClasses = "bg-emerald-950/90 text-emerald-100 border-emerald-500/50";
                iconClass = "fa-solid fa-circle-check text-emerald-400";
            } else if (type === 'error') {
                bgClasses = "bg-rose-950/90 text-rose-100 border-rose-500/50";
                iconClass = "fa-solid fa-triangle-exclamation text-rose-400";
            }

            toast.className = `flex items-center space-x-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-2xl transition-all duration-300 transform translate-y-4 opacity-0 pointer-events-auto ${bgClasses}`;
            toast.innerHTML = `
                <i class="${iconClass} text-lg"></i>
                <span class="text-xs font-medium">${message}</span>
            `;

            container.appendChild(toast);

            // Animate In
            setTimeout(() => {
                toast.classList.remove('translate-y-4', 'opacity-0');
            }, 50);

            // Animate Out
            setTimeout(() => {
                toast.classList.add('opacity-0', 'translate-y-2');
                setTimeout(() => {
                    container.removeChild(toast);
                }, 300);
            }, 3500);
        }

        // Theme Toggle (Dark/Light)
        function toggleTheme() {
            const html = document.documentElement;
            const themeIcon = document.getElementById('theme-icon');

            if (html.classList.contains('dark')) {
                html.classList.remove('dark');
                html.classList.add('light');
                themeIcon.className = "fa-solid fa-sun text-amber-500";
                showToast('Modo Claro ativado', 'info');
            } else {
                html.classList.remove('light');
                html.classList.add('dark');
                themeIcon.className = "fa-solid fa-moon text-indigo-300";
                showToast('Modo Escuro ativado', 'info');
            }
        }

        // Modal Controls
        function openForgotPasswordModal() {
            const modal = document.getElementById('forgot-modal');
            const card = document.getElementById('forgot-modal-card');
            modal.classList.remove('opacity-0', 'pointer-events-none');
            card.classList.remove('scale-95');
            card.classList.add('scale-100');
        }

        function closeForgotPasswordModal() {
            const modal = document.getElementById('forgot-modal');
            const card = document.getElementById('forgot-modal-card');
            card.classList.remove('scale-100');
            card.classList.add('scale-95');
            modal.classList.add('opacity-0', 'pointer-events-none');
        }

        function handleForgotSubmit(e) {
            e.preventDefault();
            const email = document.getElementById('forgot-email').value;
            closeForgotPasswordModal();
            showToast(`Link enviado para ${email}`, 'success');
            document.getElementById('forgot-email').value = '';
        }

        // Initialize default view
        window.addEventListener('DOMContentLoaded', () => {
            setActiveCodeTab('html');
        });
    </script>
</body>
</html>