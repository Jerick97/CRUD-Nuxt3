<template>
    <VContainer class="centrado">
        <VCard class="mx-auto" width="450">
            <VCardTitle>{{ titulo }}</VCardTitle>
            <VCardText>
                <VForm @submit.prevent="procesarFormulario">
                    <VTextField label="Nombre" v-model="campos.nombre" required></VTextField>
                    <VTextField label="Descripcion" v-model="campos.descripcion" required></VTextField>
                    <VBtn type="submit" variant="tonal" :loading="cargando" block>Guardar
                    </VBtn>
                    <VBtn @click="navigateTo('/')" class="mt-2" variant="outlined" :disabled="cargando" block>Cancelar
                    </VBtn>
                </VForm>
            </VCardText>
        </VCard>
    </VContainer>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

const campos = reactive({
    nombre: '',
    descripcion: ''
})
const cargando = ref(false);
const peliculaStore = usePeliculasStore();
const { agregarPelicula, editarPelicula, setPeliculaActual } = peliculaStore;
const { peliculaActual } = storeToRefs(peliculaStore);
const titulo = computed(() => (peliculaActual.value ? 'Editar Película Favorita' : 'Agregar Película Favorita'));

watch(peliculaActual, (nuevaPelicula) => {
    if (nuevaPelicula) {
        campos.nombre = nuevaPelicula.nombre || ''
        campos.descripcion = nuevaPelicula.descripcion || ''
    } else {
        campos.nombre = ''
        campos.descripcion = ''
    }
}, { immediate: true })

const procesarFormulario = async () => {
    const { nombre, descripcion } = campos

    if (!nombre.trim() || !descripcion.trim()) {
        alert('Por favor completa todos los campos')
        return
    }

    cargando.value = true

    try {
        if (peliculaActual.value) {
            // Editar película existente
            await editarPelicula({ ...peliculaActual.value, nombre, descripcion })
            alert('Película editada con éxito')
        } else {
            // Agregar nueva película
            await agregarPelicula({ nombre, descripcion })
            alert('Película guardada con éxito')
        }
        // Opcional: resetear formulario
        campos.nombre = ''
        campos.descripcion = ''
    } catch (error) {
        console.error('Error al guardar la película:', error)
        alert('Ocurrió un error al guardar la película')
    } finally {
        cargando.value = false
    }
}

onUnmounted(() => {
    setPeliculaActual(null)
})
</script>

<style scoped>
.centrado {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
}
</style>