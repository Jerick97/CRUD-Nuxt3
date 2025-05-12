<template>
    <VContainer class="centrado">
        <form style="width: 500px">
            <h1 class="titulo">Login</h1>
            <v-text-field label="E-mail" required></v-text-field>
            <v-text-field label="Password" type="password" required></v-text-field>

            <p class="mb-4">
                ¿Aún no tienes una cuenta?
                <NuxtLink to="/register" class="link"><b>Regístrate</b></NuxtLink> aquí.
            </p>

            <v-btn class="me-4">
                Submit
            </v-btn>
        </form>
    </VContainer>
</template>


<script setup lang="ts">
definePageMeta({
    layout: 'empty',
})
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
</style>