    // Code Storage for VS Code tabs
        const sourceCodes = {
            html: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página de Login</title>
    <!-- Estilos CSS Externo -->
    <link rel="stylesheet" href="style.css">
    <!-- FontAwesome para Ícones -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>

    <div class="login-container">
        <div class="login-card">
            
            <!-- Cabeçalho do Card -->
            <div class="card-header">
                <div class="icon-box">
                    <i class="fa-solid fa-lock"></i>
                </div>
                <h2>Bem-vindo de volta!</h2>
                <p>Insira suas credenciais para acessar a conta</p>
            </div>

            <!-- Formulário de Login -->
            <form id="loginForm" novalidate>
                
                <!-- Campo E-mail -->
                <div class="form-group">
                    <label for="email">E-mail ou Usuário</label>
                    <div class="input-wrapper">
                        <i class="fa-regular fa-envelope input-icon"></i>
                        <input type="email" id="email" placeholder="seu.email@exemplo.com" required>
                    </div>
                    <span class="error-message" id="emailError">Insira um e-mail válido.</span>
                </div>

                <!-- Campo Senha -->
                <div class="form-group">
                    <div class="label-row">
                        <label for="password">Senha</label>
                        <a href="#" class="forgot-link">Esqueceu a senha?</a>
                    </div>
                    <div class="input-wrapper">
                        <i class="fa-solid fa-key input-icon"></i>
                        <input type="password" id="password" placeholder="••••••••" required>
                        <button type="button" class="toggle-password" id="togglePassword">
                            <i class="fa-regular fa-eye" id="eyeIcon"></i>
                        </button>
                    </div>
                    <span class="error-message" id="passwordError">A senha deve ter pelo menos 6 caracteres.</span>
                </div>

                <!-- Lembrar de mim -->
                <div class="form-options">
                    <label class="remember-me">
                        <input type="checkbox" id="remember">
                        <span>Lembrar de mim</span>
                    </label>
                </div>

                <!-- Botão Enviar -->
                <button type="submit" id="submitBtn" class="btn-submit">
                    <span id="btnText">Entrar na Conta</span>
                    <i class="fa-solid fa-arrow-right" id="btnIcon"></i>
                </button>

            </form>

        </div>
    </div>

    <!-- Script JavaScript Externo -->
    <script src="script.js"><\/script>
</body>
</html>