<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://js.stripe.com/v3/"></script>
    <link rel="stylesheet" href="css/estilo.css">
    <link rel="stylesheet" href="css/estiloRecetaIA.css">
    <title>Receta con IA</title>
</head>
<body>
    <?php include 'includes/header.php'; ?> 

    <section class="Formulario_contenedor">
        <div class="Formulario_Receta">
            <div class="header-form">
                <h2>Generador de Recetas IA</h2>
                <h3>Proporciona los datos y deja que la inteligencia artificial cree la receta perfecta para ti</h3>
            </div>

            <form id="formCrearReceta" enctype="multipart/form-data">
                <div class="row-fields">
                    <div class="field-group">
                        <label for="tiempo_preparacion">
                            Tiempo de Preparación (minutos)
                            <span class="campo-requerido">*</span>
                        </label>
                        <input  type="number"  name="tiempo_preparacion" id="tiempo_preparacion" placeholder="Ej: 30" min="1"max="1440" required>
                    </div>

                    <div class="field-group">
                        <label for="porciones">
                            Número de Porciones
                            <span class="campo-requerido">*</span>
                        </label>
                        <input 
                            type="number" name="porciones" id="porciones" placeholder="Ej: 4" min="1" max="100" required>
                    </div>
                </div>

                <div class="field-group">
                    <label for="dificultad">
                        Nivel de Dificultad
                        <span class="campo-requerido">*</span>
                    </label>
                    <select name="dificultad" id="dificultad" required>
                        <option value="">Selecciona el nivel de dificultad...</option>
                        <option value="Fácil">Fácil</option>
                        <option value="Media">Media</option>
                        <option value="Difícil"> Difícil</option>
                    </select>
                </div>

                <div class="field-group">
                    <label>
                        Tipo de Platillo
                        <span class="campo-requerido">*</span>
                    </label>
                    <div id="Categoria">
                        <label>
                            <input type="radio" class="Tipo_platillo" name="categoria" value="Entrada" required>
                            <span>Entrada</span>
                            <span class="check-indicator">✓</span>
                        </label>
                        <label>
                            <input type="radio" class="Tipo_platillo" name="categoria" value="Plato Fuerte" required>
                            <span>Plato Fuerte</span>
                            <span class="check-indicator">✓</span>
                        </label>
                        <label>
                            <input type="radio" class="Tipo_platillo" name="categoria" value="Postre" required>
                            <span>Postre</span>
                            <span class="check-indicator">✓</span>
                        </label>
                        <label>
                            <input type="radio" class="Tipo_platillo" name="categoria" value="Bebida" required>
                            <span>Bebida</span>
                            <span class="check-indicator">✓</span>
                        </label>
                        <label>
                            <input type="radio" class="Tipo_platillo" name="categoria" value="Sopa" required>
                            <span>Sopa</span>
                            <span class="check-indicator">✓</span>
                        </label>
                        <label>
                            <input type="radio" class="Tipo_platillo" name="categoria" value="Ensalada" required>
                            <span>Ensalada</span>
                            <span class="check-indicator">✓</span>
                        </label>
                        <label class="categoria-otro">
                            <div class="categoria-otro-header">
                                <input type="radio" id="categoriaOtro" class="Tipo_platillo" name="categoria" value="" required>
                                <span>Otro tipo de platillo</span>
                                <span class="check-indicator">✓</span>
                            </div>
                            <input type="text" id="inputOtro" placeholder="Especifica el tipo (Ej: Aperitivo, Snack, etc.)" maxlength="50" disabled>
                        </label>
                    </div>
                </div>

                <div class="field-group">
                    <label for="ingredientes">
                        Ingredientes Disponibles
                        <span class="campo-requerido">*</span>
                    </label>
                    <textarea 
                        name="ingredientes" id="ingredientes" 
                        placeholder="2 chiles morita, 200g tomate, cebolla, 3 ajos, sal, pimienta&#10;&#10;o&#10;&#10;chiles, tomates, cebolla, ajo, especias" 
                        rows="6"
                        required></textarea>
                    <p class="textarea-hint">💡No te preocupes por el formato, la IA entenderá tu lista</p>
                </div>

                <div class="botones">
                    <button type="submit" class="enviar">
                        <span id="Envio_Datos">Generar Receta con IA</span>
                    </button>
                </div>
            </form>
        </div>
    </section>

    <?php include 'includes/footer.php'; ?>
    <script type="module" src="js/logicaHeader.js"></script>
    <script type="module" src="js/logicaPagos.js"></script>
    <script type="module" src="js/logicaRecetaIA.js"></script>
</body>
</html>