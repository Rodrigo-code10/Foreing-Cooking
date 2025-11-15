<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil de Usuario - Foreign Cooking</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="css/estilo.css">
</head>

<body class="perfil-page">

    <header>
        <nav>
            <a href="index.php"><img id="logo" src="src/Logo.png" width="100" height="100" alt="Logo"></a>
            <a href="">Recetas Recientes</a>
            <a href="CatalogoRecetas.php">Catalogo de recetas</a>
            <a href="acerca_nos.php">Acerca de nosotros</a>
            <a href="">Añadir Receta</a>
            <img class="perfil-foto" src="src/logo_perfilusu.png" alt="Carlos Mendez" width="80" height="80">
        </nav>
    </header>

    <section class="perfil">

        <div class="perfil-header">
            <img class="perfil-foto" src="src/logo_perfilusu.png" alt="Carlos Mendez" width="100">
            <h2>Carlos Mendez</h2>
            <p>Apasionado por la comida, no por las mujeres | España</p>
            <div class="perfil-estadisticas">
                <div><strong>18</strong><br>Recetas Creadas</div>
                <div><strong>2</strong><br>Seguidores</div>
                <div><strong>10</strong><br>Favoritas</div>
            </div>
        </div>

        <!-- Pestañas -->
        <div class="tabs">
            <button class="tab activa">Mis Recetas</button>
            <button class="tab">Guardadas</button>
            <button class="tab">Configuración</button>
        </div>

    </section>

    <section class="recetas">
        <div class="cards">
            <div class="card">
                <div class="card-image">
                    <img src="src/RamenCasero.jpg" alt="Ramen Casero">
                </div>
                <div class="card-content">
                    <div class="card-rating">
                        <span class="star">★★★★★</span>
                        <span class="rating-number">4.7 (24)</span>
                    </div>
                    <h3 class="card-title">Ramen Casero</h3>

                    <div class="card-info">
                        <div class="info-item">
                            <span class="info-icon">⏱️</span>
                            <span>45 min</span>
                        </div>
                        <div class="info-item">
                            <span class="info-icon">👥</span>
                            <span>1 porción</span>
                        </div>
                        <div class="info-item">
                            <span class="info-icon">🔥</span>
                            <span>Fácil</span>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn-receta">Ver Receta</button>
                    <button class="btn-receta">Eliminar</button>
                </div>
            </div>

            <div class="card">
                <div class="card-image">
                    <img src="src/fajitas_res.png" alt="Fajitas de Res">
                </div>
                <div class="card-content">
                    <div class="card-rating">
                        <span class="star">★★★★★</span>
                        <span class="rating-number">4.7 (24)</span>
                    </div>
                    <h3 class="card-title">Fajitas de Res</h3>

                    <div class="card-info">
                        <div class="info-item">
                            <span class="info-icon">⏱️</span>
                            <span>45 min</span>
                        </div>
                        <div class="info-item">
                            <span class="info-icon">👥</span>
                            <span>1 porción</span>
                        </div>
                        <div class="info-item">
                            <span class="info-icon">🔥</span>
                            <span>Fácil</span>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn-receta">Ver Receta</button>
                    <button class="btn-receta">Eliminar</button>
                </div>
            </div>
        </div>
    </section>

    <button class="btn_sesion" onclick="cerrarSesion()">Cerrar sesión</button>

    <footer>
        © 2025 Foreing Cooking. Hecho para amantes de la comida a bajo presupuesto | Comparte tus sabores con el mundo
    </footer>

    <script src="js/animacion.js"></script>
    <script src="js/logica.js"></script>
</body>
</html>