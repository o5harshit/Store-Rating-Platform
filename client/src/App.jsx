import { Provider } from "react-redux";
import { Toaster } from "sonner";

import { store } from "./redux/store";
import AppRoutes from "./Routes";
import AuthProvider from "./lib/AuthProvider";


function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>

      <Toaster closeButton />
    </Provider>
  );
}

export default App;