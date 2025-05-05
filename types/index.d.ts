export {};

declare global {
	interface IPelicula {
		nombre: string;
		descripcion: string;
		_id: string;
	}
	interface IPeliculaCreada {
		nombre: string;
		descripcion: string;
	}
	interface IPeliculaActualizada {
		_id: string;
		nombre?: string;
		descripcion?: string;
	}
}
