// color design tokens export
export const tokensDark = {
  grey: {
    0: "#ffffff", // manually adjusted
    10: "#f6f6f6", // manually adjusted
    50: "#f0f0f0", // manually adjusted
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#525252",
    700: "#3d3d3d",
    800: "#292929",
    900: "#141414",
    1000: "#000000", // manually adjusted
  },
  primary: {
    // blue
    100: "#d3d4de",
    200: "#a6a9be",
    300: "#7a7f9d",
    400: "#4d547d",
    500: "#21295c",
    600: "#191F45", // manually adjusted
    700: "#141937",
    800: "#0d1025",
    900: "#070812",
  },
  secondary: {
    // yellow
    50: "#f0f0f0", // manually adjusted
    100: "#fff6e0",
    200: "#ffedc2",
    300: "#ffe3a3",
    400: "#ffda85",
    500: "#ffd166",
    600: "#cca752",
    700: "#997d3d",
    800: "#665429",
    900: "#332a14",
  },
  success: {
    100: "#dbefdc",
    200: "#b7dfb9",
    300: "#94cf96",
    400: "#70bf73",
    500: "#4caf50",
    600: "#3d8c40",
    700: "#2e6930",
    800: "#1e4620",
    900: "#0f2310",
  },
  info: {
    100: "#cdeefd",
    200: "#9addfb",
    300: "#68cbf8",
    400: "#35baf6",
    500: "#03a9f4",
    600: "#0287c3",
    700: "#026592",
    800: "#014462",
    900: "#012231",
  },
  warning: {
    100: "#ffeacc",
    200: "#ffd699",
    300: "#ffc166",
    400: "#ffad33",
    500: "#ff9800",
    600: "#cc7a00",
    700: "#995b00",
    800: "#663d00",
    900: "#331e00",
  },
  error: {
    100: "#fcdddc",
    200: "#f9bab9",
    300: "#f59896",
    400: "#f27573",
    500: "#ef5350",
    600: "#bf4240",
    700: "#8f3230",
    800: "#602120",
    900: "#301110",
  },
};

// function that reverses the color palette
function reverseTokens(tokensDark) {
  const reversedTokens = {};
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[400],
              light: tokensDark.primary[400],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            success: {
              ...tokensDark.success,
              main: tokensDark.success[500],
            },
            info: {
              ...tokensDark.info,
              main: tokensDark.info[500],
            },
            warning: {
              ...tokensDark.warning,
              main: tokensDark.warning[500],
            },
            error: {
              ...tokensDark.error,
              main: tokensDark.error[500],
            },
            background: {
              default: tokensDark.primary[600],
              alt: tokensDark.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              ...tokensLight.primary,
              main: tokensDark.grey[50],
              light: tokensDark.grey[100],
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensDark.secondary[600],
              light: tokensDark.secondary[700],
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensDark.grey[500],
            },
            success: {
              ...tokensLight.success,
              main: tokensDark.success[500],
            },
            info: {
              ...tokensLight.info,
              main: tokensDark.info[500],
            },
            warning: {
              ...tokensLight.warning,
              main: tokensDark.warning[500],
            },
            error: {
              ...tokensLight.error,
              main: tokensDark.error[500],
            },
            background: {
              default: tokensDark.grey[0],
              alt: tokensDark.grey[50],
            },
            typography: {
              fontFamily: ["Inter", "sans-serif"].join(","),
              fontSize: 12,
              h1: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 40,
              },
              h2: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 32,
              },
              h3: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 24,
              },
              h4: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 20,
              },
              h5: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 16,
              },
              h6: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 14,
              },
            },
          }),
    },
  };
};
