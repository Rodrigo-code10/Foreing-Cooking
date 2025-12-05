import API_URL from './config.js';

document.addEventListener('DOMContentLoaded', verificarYMostrarModal);

function verificarYMostrarModal() {
    const UsuarioString = localStorage.getItem('usuario');

    if (!UsuarioString) return;

    let Usuario;
    try {
        Usuario = JSON.parse(UsuarioString);
    } catch (e) {
        console.error("Error parseando usuario:", e);
        return;
    }

    if (Usuario.paquete === 'normal') {
        mostrarModalPaquete();
    }
}

function mostrarModalPaquete() {
    const existing = document.getElementById("modalPaqueteNormal");
    if (existing) existing.remove();

    const modalHTML = `
        <div id="modalPaqueteNormal" class="modal-overlay">
            <div class="modal-contenido">
                <button class="modal-cerrar" onclick="cerrarModalPaquete()">×</button>
                <div class="modal-cuerpo">
                    <h2>🌟 ¡Mejora tu experiencia!</h2>
                    <p>Tienes el paquete <strong>Normal</strong>. Actualiza a <strong>Premium</strong> para desbloquear:</p>
                    <ul>
                        <li>✨ Recetas ilimitadas con IA</li>
                        <li>🍳 Acceso a recetas exclusivas</li>
                        <li>💾 Guardar recetas favoritas sin límite</li>
                    </ul>
                    <div class="modal-acciones">
                        <button class="btn-premium">Actualizar a Premium</button>
                        <button class="btn-secundario">Continuar con Normal</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

document.addEventListener('click', function(e) {
    if (e.target.closest('.btn-secundario')) {
        const modal = document.getElementById('modalPaqueteNormal');
        if (modal) {
            modal.remove();
        }
        window.location.href = "index.php";

    }

    if (e.target.closest('.btn-premium')) {
        const modal = document.getElementById('modalPaqueteNormal');
        if (modal) modal.remove();

        mostrarModalPago();   
        cargarConfig().then(() => iniciarStripe()); 
    }
});

function mostrarModalPago() {
    const existing = document.getElementById("modalPagoPremium");
    if (existing) existing.remove(); 

    const modalHTML = `
        <div id="modalPagoPremium" class="modal-overlay">
            <div class="modal-contenido modal-pago-amplio">
                <button class="modal-cerrar" onclick="cerrarModalPago()">×</button>
                
                <div class="pago-header">
                    <h2>💳 Suscripción Premium</h2>
                    <p class="subtitulo-suscripcion">Suscripción mensual renovable</p>
                </div>

                <div class="resumen-suscripcion">
                    <div class="plan-info">
                        <div class="plan-nombre">
                            <span class="icono-plan">⭐</span>
                            <div>
                                <strong>Plan Premium</strong>
                                <p>Acceso completo a todas las funciones</p>
                            </div>
                        </div>
                        <div class="plan-precio">
                            <span class="precio-grande">$300</span>
                            <span class="precio-periodo">MXN/mes</span>
                        </div>
                    </div>
                </div>

                <div class="formulario-pago">
                    <h3 class="seccion-titulo">Información de pago</h3>
                    
                    <div class="campo-grupo">
                        <label for="cardNumber">Número de tarjeta</label>
                        <div id="card-number-element" class="stripe-input"></div>
                    </div>

                    <div class="campos-row">
                        <div class="campo-grupo">
                            <label for="cardExpiry">Fecha de vencimiento</label>
                            <div id="card-expiry-element" class="stripe-input"></div>
                        </div>
                        <div class="campo-grupo">
                            <label for="cardCvc">CVC</label>
                            <div id="card-cvc-element" class="stripe-input"></div>
                        </div>
                    </div>

                    <div class="campo-grupo">
                        <label for="cardPostal">Código postal</label>
                        <div id="card-postal-element" class="stripe-input"></div>
                    </div>

                    <div id="card-errors" class="error-mensaje"></div>

                    <button id="btnPagarPremium" class="btn-pagar-suscripcion">
                        <span class="btn-texto">Suscribirse por $300 MXN/mes</span>
                        <span class="btn-icono">🔒</span>
                    </button>

                    <p class="texto-seguridad">
                        <span class="icono-seguridad">🔐</span>
                        Pago seguro procesado por Stripe
                    </p>

                    <p id="mensajePago" class="mensaje-pago"></p>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Función de Carga de configuración Stripe
async function cargarConfig() {
    const conf = await fetch(`${API_URL}/config`).then(r => r.json());
    window.STRIPE_PUBLIC_KEY = conf.stripePublicKey;
    window.API_URL = conf.apiUrl;
}

// Cargar configuración desde el backend (clave pública + URL API)
let stripe = null;
let cardNumber = null;
let cardExpiry = null;
let cardCvc = null;
let cardPostal = null;

async function iniciarStripe() {
    stripe = Stripe(window.STRIPE_PUBLIC_KEY);
    const elements = stripe.elements();

    // Estilo personalizado para los elementos de Stripe
    const style = {
        base: {
            fontSize: '16px',
            color: '#2C2C2C',
            fontFamily: 'Arial, sans-serif',
            '::placeholder': {
                color: '#999',
            },
        },
        invalid: {
            color: '#E8534F',
            iconColor: '#E8534F'
        }
    };

    // Crear elementos separados
    cardNumber = elements.create('cardNumber', { style });
    cardExpiry = elements.create('cardExpiry', { style });
    cardCvc = elements.create('cardCvc', { style });
    cardPostal = elements.create('postalCode', { style });

    // Montar cada elemento en su contenedor
    const numberEl = document.getElementById("card-number-element");
    const expiryEl = document.getElementById("card-expiry-element");
    const cvcEl = document.getElementById("card-cvc-element");
    const postalEl = document.getElementById("card-postal-element");

    if (numberEl) cardNumber.mount("#card-number-element");
    if (expiryEl) cardExpiry.mount("#card-expiry-element");
    if (cvcEl) cardCvc.mount("#card-cvc-element");
    if (postalEl) cardPostal.mount("#card-postal-element");

    // Manejo de errores en tiempo real
    const displayError = document.getElementById('card-errors');
    [cardNumber, cardExpiry, cardCvc, cardPostal].forEach(element => {
        element.on('change', (event) => {
            if (event.error) {
                displayError.textContent = event.error.message;
            } else {
                displayError.textContent = '';
            }
        });
    });
}

document.addEventListener("click", async function(e) {
    if (!e.target.matches("#btnPagarPremium")) return;

    const boton = e.target;
    const mensaje = document.getElementById("mensajePago");
    const errorDiv = document.getElementById("card-errors");
    
    // Deshabilitar botón y mostrar loading
    boton.disabled = true;
    boton.classList.add('btn-loading');
    boton.innerHTML = '<span class="spinner"></span> Procesando...';
    mensaje.innerHTML = "";
    errorDiv.textContent = "";

    try {
        // Crear PaymentIntent
        const res = await fetch(window.API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                monto: 30000,   // 300 MXN
                moneda: "mxn",
                descripcion: "Suscripción Premium Mensual"
            })
        });

        const data = await res.json();
        const clientSecret = data.clientSecret;

        // Confirmar el pago
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: { card: cardNumber}
        });

        if (result.error) {
            errorDiv.textContent = result.error.message;
            mensaje.innerHTML = `<span class="error">${result.error.message}</span>`;
        } else if (result.paymentIntent.status === "succeeded") {
            mensaje.innerHTML = '<span class="exito">¡Suscripción activada exitosamente!</span>';
            try {
                let user = JSON.parse(localStorage.getItem("usuario"));
                if (!user) throw new Error("No hay usuario en localStorage");
                const token = localStorage.getItem("token");

                const resUpdate = await fetch(`${API_URL}/editarPaquete`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}` 
                    },
                    body: JSON.stringify({ id: user.id, paquete: "premium" })
                });
                const dataUpdate = await resUpdate.json();

                if (!dataUpdate.success) {
                    errorDiv.textContent = "No se pudo actualizar el paquete en el servidor";
                } else {
                    localStorage.setItem("usuario", JSON.stringify(dataUpdate.usuario));
                }
            } catch (error) {
                console.error("Error al actualizar paquete:", error);
                errorDiv.textContent = "Error al actualizar paquete en el servidor";
            }

            setTimeout(() => {
                const m = document.getElementById("modalPagoPremium");
                if (m) m.remove();
                location.reload();
            }, 3000);
        }
    } catch (error) {
        console.error("Error en el pago:", error);
        mensaje.innerHTML = '<span class="error"> Error al procesar el pago. Intenta nuevamente.</span>';
    } finally {
        boton.disabled = false;
        boton.classList.remove('btn-loading');
        boton.innerHTML = '<span class="btn-texto">Suscribirse por $300 MXN/mes</span><span class="btn-icono">🔒</span>';
    }
});

// Función para cerrar modal de pago
window.cerrarModalPago = function() {
    const modal = document.getElementById('modalPagoPremium');
    if (modal) modal.remove();
    window.location.href = "index.php";

}

// Función para cerrar modal de paquete
window.cerrarModalPaquete = function() {
    const modal = document.getElementById('modalPaqueteNormal');
    if (modal) modal.remove();
    window.location.href = "index.php";

}