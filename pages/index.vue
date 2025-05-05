<template>
    <VContainer>
        <VRow>
            <VCol>
                <VBtn icon="mdi-plus" @click="navigateTo('/formularioPelicula')" title="Agregar Película" />
            </VCol>
        </VRow>
        <VRow>
            <VCol>
                <VTable>
                    <thead>
                        <tr>
                            <th colspan="2">Nombre</th>
                            <th>Descripcion</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="pelicula in peliculas" :key="pelicula._id">
                            <td colspan="2">{{ pelicula.nombre }}</td>
                            <td class="w-75">{{ pelicula.descripcion }}</td>
                            <td class="flex gap-4">
                                <VBtn variant="text" color="warning" icon="mdi-pencil"
                                    @click="navegarAlFormulario(pelicula)" title="Editar Película" />
                                <VBtn variant="text" color="error" icon="mdi-delete" title="Eliminar Película"
                                    @click="eliminarPelicula(pelicula._id)" />
                            </td>
                        </tr>
                    </tbody>
                </VTable>
            </VCol>
        </VRow>
    </VContainer>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
const peliculaStore = usePeliculasStore()
const { obtenerPeliculas, eliminarPelicula, setPeliculaActual } = peliculaStore
const { peliculas } = storeToRefs(peliculaStore)
await obtenerPeliculas()
const navegarAlFormulario = (pelicula: IPelicula) => {
    setPeliculaActual(pelicula)
    navigateTo('/formularioPelicula')
}
</script>

<style scoped></style>