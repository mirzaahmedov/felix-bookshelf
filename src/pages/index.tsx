import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/context/auth";
import Router from "./router";
import theme from "./theme";

import "react-toastify/ReactToastify.min.css";

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router />
        </AuthProvider>
        <ToastContainer />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
