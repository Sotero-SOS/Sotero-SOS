import { AppRouter } from "./router/AppRouter.tsx";
import { AuthProvider } from "./providers/AuthProvider.tsx";

function App() {
	return (
		<AuthProvider>
			<AppRouter />
		</AuthProvider>
	);
}

export default App;
