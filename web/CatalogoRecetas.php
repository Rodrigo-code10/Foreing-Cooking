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

    <section class="Mostrar">
        <form id="formRecetas" class="formRecetas">

            <h2>Explora Nuestro Catálogo</h2>

            <!-- Buscador -->
            <div class="Buscador">
                <input type="text" id="buscar_recetas" name="buscar" placeholder="Buscar recetas" class="Buscador_recetas">
            </div>

            <label>Seleccione una Categoria</label>

            <!-- Botones de categorías -->
            <div class="botones">
                <button type="button" class="botonCategoria" data-categoria="Entrada">Entrada</button>
                <button type="button" class="botonCategoria" data-categoria="Plato Fuerte">Plato Fuerte</button>
                <button type="button" class="botonCategoria" data-categoria="Postre">Postre</button>
            </div>

            <!-- Contenedor donde se mostrará la imagen y el nombre -->
            <div class="contenedorCategoria" id="contenedorCategoria"></div>

            <!-- Etiquetas -->
            <div class="Etiquetas">
                <label>Etiquetas</label>
                <div id="Categoria">
                    <label><input type="checkbox" name="categoria[]" value="Saludable"> Saludable</label>
                    <label><input type="checkbox" name="categoria[]" value="Nutritivo"> Nutritivo</label>
                    <label><input type="checkbox" name="categoria[]" value="Grasoso"> Grasoso</label>
                    <label><input type="checkbox" name="categoria[]" value="Vegetariano"> Vegetariano</label>
                    <label><input type="checkbox" name="categoria[]" value="Dulce"> Dulce</label>
                    <label><input type="checkbox" name="categoria[]" value="Salado"> Salado</label>
                    <label><input type="checkbox" name="categoria[]" value="Picante"> Picante</label>
                    <label><input type="checkbox" name="categoria[]" value="Vegana"> Vegana</label>
                </div>
            </div>
   

            
            <!-- Botones de acción -->
            <div class="botonesBuscador">
                <button type="reset" class="Limpiar" onclick="location.reload()">Limpiar</button>
            </div>
        </form>
    </section>

    <div class="otro">
        <div class="cards">
            
        </div>
    </div>

    <?php include 'includes/footer.php'; ?>

    <script>
        const botones = document.querySelectorAll('.botonCategoria');
        const contenedor = document.getElementById('contenedorCategoria');

        const imagenes = {
            "Entrada": "src/Entrada.png",
            "Plato Fuerte": "src/Comida.png",
            "Postre": "src/Postre.png"
        };

        botones.forEach(boton => {
            boton.addEventListener('click', () => {
                const categoria = boton.dataset.categoria;
                contenedor.innerHTML = `
                    <img src="${imagenes[categoria]}" alt="${categoria}">
                    <p>${categoria}</p>
                `;
            });
        });
    </script>
    <script type="module" src="js/logicaCatalogoRecetas.js"></script>
    <script type="module" src="js/logicaHeader.js"></script>
</body>
</html>