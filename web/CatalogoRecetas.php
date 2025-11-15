<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Catálogo de Recetas</title>
    <link rel="stylesheet" href="css/estilo.css">
</head>

<body>
    <header>
        <nav>
            <a href="index.php">
                <img id="logo" src="src/Logo.png" width="100" height="100" alt="Logo">
            </a>
            <a href="">Recetas Recientes</a>
            <a href="CatalogoRecetas.php">Catalogo de recetas</a>
            <a href="">Acerca de nosotros</a>
            <a href="CrearRecetas.php"><button class="btn-secondary">Crear Receta</button></a>
            <a href="IniciarRegistrarse.php"><button class="btn-primary">Registrarse</button></a>
        </nav>
    </header>

    <h1>Explora Nuestro Catálogo</h1>

    <section class="Buscador">
        <input type="text" id="buscar_recetas" name="buscar" placeholder="Buscar recetas" class="Buscador_recetas">
    </section>

    <section class="catalogo">
        <!-- Las recetas se cargarán dinámicamente desde la base de datos -->
        
        <div class="Entrada" data-receta-id="1">
            <img src="src/fajitas_res.png" alt="Fajitas de Res">
            <h3>Fajitas de Res</h3>
            <p>por @Manuel</p>
            <a href="php/ver_receta.php?id=1" class="btn-ver">Ver receta</a>
        </div>

        <div class="Entrada" data-receta-id="2">
            <img src="src/pasta_carbonara.png" alt="Pasta Carbonara">
            <h3>Pasta Carbonara</h3>
            <p>por @Josesito</p>
            <a href="php/ver_receta.php?id=2" class="btn-ver">Ver receta</a>
        </div>

        <!-- Más recetas aquí -->
    </section>

    <footer class="footer">
        <p>© 2025 Foreign Cooking. Hecho para amantes de la comida a bajo presupuesto | Comparte tus sabores con el
            mundo</p>
    </footer>

    <script src="js/animacion.js"></script>
    <script src="js/logica.js"></script>
</body>
</html>