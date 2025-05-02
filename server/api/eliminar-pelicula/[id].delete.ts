import { Pelicula } from "~/server/models/pelicula.model";
import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
	try {
		const id = getRouterParam(event, "id");

		if (!id || !mongoose.Types.ObjectId.isValid(id)) {
			throw createError({
				statusCode: 400,
				statusMessage: "ID no válido o faltante",
			});
		}

		const peliculaDelete = await Pelicula.findByIdAndDelete(id);

		if (!peliculaDelete) {
			throw createError({
				statusCode: 404,
				statusMessage: "Pelicula no encontrada",
			});
		}

		return peliculaDelete;
	} catch (error: any) {
		// Personalizamos la respuesta de error
		return {
			url: event.node.req.url,
			statusCode: error.statusCode || 500,
			statusMessage: error.statusMessage || "Error interno del servidor",
		};
	}
});
