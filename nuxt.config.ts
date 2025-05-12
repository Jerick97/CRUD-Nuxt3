// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-11-01",
	devtools: { enabled: true },
	imports: {
		dirs: ["stores"],
	},
	css: [
		"vuetify/lib/styles/main.sass",
		"@mdi/font/css/materialdesignicons.min.css",
	],

	build: {
		transpile: ["vuetify"],
	},

	modules: ["@pinia/nuxt", "@nuxtjs/supabase"],
	runtimeConfig: {
		MONGO_URI: process.env.MONGO_URI,
		SUPABASE_URL: process.env.SUPABASE_URL,
		SUPABASE_KEY: process.env.SUPABASE_KEY,
	},
	supabase: {
		redirect: false,
	},
});
