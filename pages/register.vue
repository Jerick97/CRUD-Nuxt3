<template>
    <VContainer class="centrado">
        <form style="width: 500px" @submit.prevent="signUp">
            <h1 class="titulo">Register</h1>
            <v-text-field v-model="email" label="E-mail"></v-text-field>
            <v-text-field v-model="password" label="Password" type="password"></v-text-field>

            <!-- Mostrar mensajes de éxito y error antes del botón -->
            <div v-if="errorMsg" class="error-msg">
                {{ errorMsg }}
            </div>
            <div v-if="successMsg" class="success-msg">
                {{ successMsg }}
            </div>

            <p class="my-4">¿Ya tienes una cuenta? <NuxtLink to="/login" class="link"><b>Inicia Sesión</b></NuxtLink>
                aquí.</p>
            <v-btn class="me-4" type="submit">
                submit
            </v-btn>
        </form>
    </VContainer>
</template>


<script setup>
definePageMeta({
    layout: 'empty',
})
const client = useSupabaseClient()
const name = ref("")
const email = ref("")
const password = ref("")
const errorMsg = ref(null)
const successMsg = ref(null)

async function signUp() {
    try {
        const { data, error } = await client.auth.signUp({
            name: name.value,
            email: email.value,
            password: password.value
        });
        if (error) throw error;
        successMsg.value = "Check your email for the confirmation link";
        errorMsg.value = null; // Limpiar error cuando el signup es exitoso
    } catch (error) {
        errorMsg.value = error.message;
        successMsg.value = null; // Limpiar mensaje de éxito cuando hay un error
    }
}
</script>

<style scoped>
.centrado {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
}

.titulo {
    text-align: center;
    margin-bottom: 20px;
    font-size: 35px;
    font-weight: bold;
}

.link {
    text-decoration: none;
    color: #0a6e00;
}

/* Estilos para los mensajes de error y éxito */
.error-msg {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 4px;
    font-size: 14px;
}

.success-msg {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 4px;
    font-size: 14px;
}
</style>