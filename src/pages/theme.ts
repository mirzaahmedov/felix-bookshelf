import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontSize: 14,
    fontFamily: "Mulish",
    allVariants: {
      color: "#151515",
    },
    subtitle1: {
      color: "#333333",
    },
    h1: {
      fontSize: 36,
      fontWeight: 700,
    },
    h5: {
      fontSize: 20,
      fontWeight: 400,
    },
    h6: {
      fontSize: 18,
      fontWeight: 700,
    },
  },
  palette: {
    primary: {
      main: "#6200EE",
    },
    text: {
      secondary: "#fefefe",
    },
    error: {
      main: "#FF0000",
    },
    warning: {
      main: "#FFEC43",
    },
    success: {
      main: "#00FF29",
    },
  },
  components: {
    MuiOutlinedInput: {
      defaultProps: {
        notched: false,
      },
      styleOverrides: {
        notchedOutline: {
          borderColor: "#ebebeb",
        },
        root: {
          borderRadius: 6,
          boxShadow: "0px 4px 18px 0px #3333330A",
        },
        input: {
          padding: "14px 16px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        outlined: {
          marginBottom: 4,
          fontSize: 14,
          fontWeight: 500,
          lineHeight: "16.8px",
          position: "relative",
          transform: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: 16,
          padding: "10px 24px",
          lineHeight: "20px",
          borderRadius: "4px",
          textTransform: "none",
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          padding: "2px 12px",
          borderRadius: 8.5,
        },
        label: {
          padding: 0,
          fontSize: 16,
          fontWeight: 700,
          color: "white",
        },
      },
    },
  },
});

export default theme;
