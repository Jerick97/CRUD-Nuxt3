import { defineStore } from "pinia";

interface IState {
	peliculas: IPelicula[];
	peliculaActual: IPelicula | null;
}

export const usePeliculasStore = defineStore("peliculas", {
	state: (): IState => ({
		peliculas: [],
		peliculaActual: null,
	}),
	actions: {
		async obtenerPeliculas() {
			const { data, error } = await useFetch("/api/listar-peliculas");
			this.peliculas = (data.value as { peliculas: IPelicula[] }).peliculas;
		},
		async agregarPelicula(pelicula: IPeliculaCreada) {
			const { data, error } = await useFetch("/api/agregar-pelicula", {
				method: "POST",
				body: pelicula,
			});
			navigateTo("/");
		},
		async eliminarPelicula(id: string) {
			const { data, error } = await useFetch(`/api/eliminar-pelicula/${id}`, {
				method: "DELETE",
				body: { id },
			});
			this.peliculas = this.peliculas.filter((pelicula) => pelicula._id !== id);
		},
		async editarPelicula(pelicula: IPeliculaActualizada) {
			const { data, error } = await useFetch("/api/actualizar-pelicula", {
				method: "PATCH",
				body: pelicula,
			});
			this.peliculas = this.peliculas.map((p) => {
				if (p._id === pelicula._id) {
					return { ...p, ...pelicula };
				}
				return p;
			});
			navigateTo("/");
		},

		setPeliculaActual(pelicula: IPelicula | null) {
			this.peliculaActual = pelicula;
		},
	},
});
