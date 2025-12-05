const MODEL = "gemini-2.0-flash"; 
const API_KEY = process.env.API_KEY; 

export async function RecetaIA(req, res) {
    try {
        const { mensaje } = req.body;
        console.log("DEBUG API KEY =", process.env.API_KEY);


        if (!mensaje) {
            return res.status(400).json({ error: "Falta 'mensaje' en el body." });
        }

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [
                        {
                            role: "user",
                            parts: [{ text: mensaje }]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return res.status(500).json({
                error: "Error al llamar a Gemini",
                detalle: data
            });
        }

        const texto =
            data?.candidates?.[0]?.content?.parts?.[0]?.text || null;

        res.json({ respuesta: texto });

    } catch (error) {
        res.status(500).json({
            error: "Error interno en backend",
            detalle: error.message
        });
    }
}