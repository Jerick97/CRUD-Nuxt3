export default defineNuxtRouteMiddleware(async (to) => {
	const client = useSupabaseClient();
	const {
		data: { session },
	} = await client.auth.getSession();

	const publicPages = ["/login", "/register"];
	const isPublic = publicPages.some((path) => to.path.startsWith(path));
	console.log("Visiting:", to.path);
	console.log("Is public:", isPublic);
	console.log("Session:", session);
	if (!session && !isPublic) {
		return navigateTo("/login");
	}
});
