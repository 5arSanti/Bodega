const express = require("express");
const { connection } = require("../database")

const router = express.Router();

router.get("/", (request, response) => {
    connection.query("SELECT * FROM login", (err, result) => {
        if (err) {
            throw err;
        }
        return response.json(result);
    })
})

router.put('/:userId', (request, response) => {
	const userId = request.params.userId;
	const {nombre, correo, tipo} = request.body;

	try {
		// Encuentra y actualiza el usuario en la base de datos
		connection.query('UPDATE login SET nombre = ?, correo = ?, tipo = ? WHERE id = ?',
			[nombre, correo, tipo, userId],
			(err, results) => {
				if (err) {
					return res.status(500).json({ error: 'Error al actualizar el usuario' });
				}

				if (results.affectedRows === 0) {
					return res.status(404).json({ error: 'Usuario no encontrado' });
				}

				// Envía una respuesta exitosa
				return response.status(200).json({ message: 'Usuario actualizado correctamente'});
			}
		);

	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: 'Error al actualizar el usuario' });
	}
});

module.exports = router;