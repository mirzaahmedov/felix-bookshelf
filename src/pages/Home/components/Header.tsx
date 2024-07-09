import { CloudCheckIcon, SearchIcon } from "@/assets/icons";
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import useAuth from "@/hooks/auth";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { useSearchParams } from "react-router-dom";

const Header = () => {
  const theme = useTheme();
  const { user } = useAuth();

  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <header className="flex py-3 px-[6.25rem] gap-6">
      <div className="flex items-center gap-5">
        <CloudCheckIcon />
        <Typography variant="h6" color="#fefefe">
          <Typography
            display="inline"
            variant="h6"
            component="span"
            color={theme.palette.primary.main}
          >
            Books
          </Typography>{" "}
          List
        </Typography>
      </div>
      <div className="flex-1">
        <OutlinedInput
          type="search"
          id="search"
          defaultValue={searchParams.get("search")}
          onChange={(e) => {
            const params = new URLSearchParams(searchParams);
            params.set("search", e.target.value);
            setSearchParams(params);
          }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          placeholder="Search for any training you want "
          sx={{
            height: 48,
            width: 400,
            "& input:not(:focus) ~ .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& input": {
              width: "100%",
              fontSize: 16,
              weight: 400,
            },
            "& input::placeholder": {
              color: "#FEFEFE",
            },
          }}
        />
      </div>
      {user ? (
        <div>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              backgroundImage:
                "conic-gradient(from 180deg at 50% 50%, #FD648E 0deg, #884CB2 178.12deg, #FD648E 360deg)",
            }}
          >
            {user.name[0].toUpperCase()}
          </Avatar>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
