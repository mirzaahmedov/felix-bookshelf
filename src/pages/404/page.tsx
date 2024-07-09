import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <main className="flex items-center justify-center">
      <div className="flex flex-col items-center gap-[72px]">
        <img src="/images/404.svg" alt="404 not found image" />
        <div className="flex items-center gap-3">
          <Button
            variant="contained"
            onClick={() => navigate("/")}
            className="!min-w-60"
          >
            Go Home Page
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate(0)}
            className="!min-w-60"
          >
            Reload Page
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
