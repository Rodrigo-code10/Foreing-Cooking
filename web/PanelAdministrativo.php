<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/estilo.css">
    <link rel="stylesheet" href="css/estiloPanelAdministrativo.css">
    <title>Panel </title>
</head>
<body>
    <?php include 'includes/header.php'; ?>

    <main class="acerca-nosotros-container">
        <section class="hero-nosotros">
            <h1>Panel Administrativo</h1>
            <p>Gestiona solicitudes, reportes, usuarios y contenido de la plataforma </p>
        </section>

        <section class="contenedor-cartas">
            <div class="carta">
                <h3 id="ContReceta">0</h3>
                <p>Recetas Totales</p>
            </div>

            <div class="carta">
                <h3 id="Solicitudes">0</h3>
                <p>Solicitudes de Recetas</p>
            </div>

        </section>

        <div class="tabs">
            <button class="tab activa">Solicitudes de Recetas</button>
            <button class="tab">Usuarios</button>
        </div>

        <section class="contacto">
            <table class="tabla">
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Receta</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody id="tabla-body">

                </tbody>
            </table>
        </section>
    </main>

    <?php include 'includes/footer.php'; ?>

    <script type="module" src="js/logicaHeader.js"></script>
    <script type="module" src="js/logicaPanelAdmin.js"></script>

</body>
</html>