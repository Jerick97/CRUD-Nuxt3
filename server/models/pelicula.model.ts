import { Schema, model } from "mongoose";

const PeliculaSchema = new Schema({
	nombre: { type: String, required: true },
	descripcion: { type: String, required: true },
});

export const Pelicula = model("peliculas", PeliculaSchema);
