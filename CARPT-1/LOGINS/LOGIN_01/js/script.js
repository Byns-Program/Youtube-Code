$(document).ready(function () {
    let esPrimerEnvio = true; // Bandera para controlar la primera vez que se presiona el botón

    // Credenciales válidas (puedes cambiar estos valores según tus necesidades)
    const EMAIL_VALIDO = 'usuario@example.com';
    const CONTRASENIA_VALIDA = 'prueba123';

    // Alternar Modo Oscuro/Claro
    $('#dark-mode-toggle').click(function () {
        $('body').toggleClass('dark-mode');
        $('.form-container').toggleClass('bg-light bg-dark text-light');

        // Cambiar icono en el interruptor
        const icono = $('#dark-mode-toggle').is(':checked') ? 'fa-moon' : 'fa-sun';
        $('.slider .icon i').removeClass('fa-sun fa-moon').addClass(icono);
    });

    // Mostrar/Ocultar Contraseña
    $('#toggle-password').click(function () {
        const campoContrasenia = $('#password');
        const tipo = campoContrasenia.attr('type') === 'password' ? 'text' : 'password';
        campoContrasenia.attr('type', tipo);
        $(this).find('i').toggleClass('fa-eye fa-eye-slash');
    });

    // Validación de Email con Expresión Regular
    $('#email').on('input', function () {
        if (!esPrimerEnvio) {
            validarEmail();
        }
    });

    // Validación de Contraseña (mínimo 8 caracteres)
    $('#password').on('input', function () {
        if (!esPrimerEnvio) {
            validarContrasenia();
        }
    });

    // Validación y Envío del Formulario
    $('#login-form').submit(function (e) {
        e.preventDefault();
        esPrimerEnvio = false; // Cambiar bandera después del primer clic

        // Validar los campos
        const emailValido = validarEmail();
        const contraseniaValida = validarContrasenia();

        // Obtener los valores ingresados
        const emailIngresado = $('#email').val();
        const contraseniaIngresada = $('#password').val();

        if (emailValido && contraseniaValida) {
            if (emailIngresado === EMAIL_VALIDO && contraseniaIngresada === CONTRASENIA_VALIDA) {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Inicio de sesión exitoso.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Credenciales incorrectas, por favor intenta nuevamente.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
            }
        }
    });

    function validarEmail() {
        const email = $('#email').val();
        const patronEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!patronEmail.test(email)) {
            $('#email-error').text('Por favor, ingresa un email válido.');
            return false;
        } else {
            $('#email-error').text('');
            return true;
        }
    }

    function validarContrasenia() {
        const contrasenia = $('#password').val();
        if (contrasenia.length < 8) {
            $('#password-error').text('La contraseña debe tener al menos 8 caracteres.');
            return false;
        } else {
            $('#password-error').text('');
            return true;
        }
    }
});

