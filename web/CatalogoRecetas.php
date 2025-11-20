<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Catálogo de Recetas</title>
    <link rel="stylesheet" href="css/estilo.css">
    <link rel="stylesheet" href="css/estiloCatalogoRecetas.css">
</head>

<body>
    
    <?php include 'includes/header.php'; ?> 

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

    <?php include 'includes/footer.php'; ?>

    <script type="module" src="js/animacion.js"></script>
    <script type="module" src="js/logicaRecetas.js"></script>
    <script type="module" src="js/logicaHeader.js"></script>
</body>
</html>