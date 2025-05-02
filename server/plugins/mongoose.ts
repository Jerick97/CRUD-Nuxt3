import { connect } from "mongoose";
export default defineNitroPlugin(async (nitroApp) => {
	const runtimeConfig = useRuntimeConfig();
	try {
		await connect(runtimeConfig.MONGO_URI);
		console.log("✅ MongoDB conectado");
	} catch (error) {
		console.error("❌ Error conectando a MongoDB:", error);
		throw error;
	}
});
