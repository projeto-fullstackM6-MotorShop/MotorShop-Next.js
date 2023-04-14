import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      1: "#4529E6",
      2: "#5126EA",
      3: "#B0A6F0",
      4: "#EDEAFD",
    },
    grey: {
      0: "#0B0D0D",
      1: "#212529",
      2: "#495057",
      3: "#868E96",
      4: "#ADB5BD",
      5: "#CED4DA",
      6: "#DEE2E6",
      7: "#E9ECEF",
      8: "#F1F3F5",
      9: "#F8F9FA",
      10: "#FDFDFD",
      11: "#FFFFFF",
    },
    alert: {
      1: "#CD2B31",
      2: "#FDD8D8",
      3: "#FFE5E5",
    },
    sucess: {
      1: "#18794E",
      2: "#CCEBD7",
      3: "#DDF3E4",
    },
    random: {
      1: "#E34D8C",
      2: "#C04277",
      3: "#7D2A4D",
      4: "#7000FF",
      5: "#6200E3",
      6: "#36007D",
      7: "#349974",
      8: "#2A7D5F",
      9: "#153D2E",
      10: "#6100FF",
      11: "#5700E3",
      12: "#30007D",
    },
  },

  fonts: {
    heading: `"Lexend", sans-serif`,
    body: `"Inter", sans-serif`,
  },

  fontSizes: {
    xxs: "0.875rem",
    xs: "1rem",
    sm: "1.25rem",
    md: "1.5rem",
    lg: "1.75rem",
    xl: "2rem",
    xxl: "2.25rem",
    xxxl: "2.75rem",
  },

  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  components: {
    variants: {
      textBody1: {
        fonts: "body",
        fontWeights: "semibold",
        fontSize: "xxxl",
        color: "grey.2",
      },
    },

    Button: {
      variants: {
        grey1: {
          bg: "grey.0",
          fontSize: "xs",
          border: "1.5px solid",
          borderColor: "grey.0",
          borderRadius: "4px",
          color: "grey.11",
          padding: "12px 28px",
          _hover: {
            bg: "grey.1",
          },
        },

        negative: {
          bg: "grey.6",
          fontSize: "xs",
          border: "1.5px solid",
          borderColor: "grey.6",
          borderRadius: "4px",
          color: "grey.2",
          padding: "12px 28px",
          _hover: {
            bg: "grey.5",
          },
        },

        diable: {
          bg: "grey.5",
          fontSize: "xs",
          border: "1.5px solid",
          borderColor: "grey.5",
          borderRadius: "4px",
          color: "grey.11",
          padding: "12px 28px",
        },

        brand1: {
          bg: "brand.1",
          fontSize: "xs",
          border: "1.5px solid",
          borderColor: "brand.1",
          borderRadius: "4px",
          color: "grey.11",
          padding: "12px 28px",
          _hover: {
            bg: "brand.2",
          },
        },

        brandOpacity: {
          bg: "brand.4",
          fontSize: "xs",
          border: "1.5px solid",
          borderColor: "brand.4",
          borderRadius: "4px",
          color: "brand.1",
          padding: "12px 28px",
        },

        light: {
          bg: "grey.10",
          fontSize: "xs",
          border: "1.5px solid",
          borderColor: "grey.10",
          borderRadius: "4px",
          color: "grey.1",
          padding: "12px 28px",
        },

        outline1: {
          bg: "grey.11",
          fontSize: "xs",
          border: "1.5px solid",
          borderColor: "grey.0",
          borderRadius: "4px",
          color: "grey.0",
          padding: "12px 28px",
        },

        big45: {
          bg: "grey.1",
          fontSize: "xs",
          border: "1.5px solid",
          borderColor: "grey.1",
          borderRadius: "4px",
          color: "grey.10",
          padding: "12px 28px",
        },

        outline2: {
          fontWeights: "semibold",
          fontSize: "xs",
          border: "1.5px solid",
          borderColor: "grey.4",
          borderRadius: "4px",
          color: "grey.0",
          padding: "12px 28px",
          fonts: "body",
          _hover: {
            bg: "grey.1",
            color: "grey.10",
          },
        },

        outlineBrand1: {
          fontSize: "xs",
          border: "1.5px solid",
          borderColor: "brand.1",
          borderRadius: "4px",
          color: "grey.11",
          padding: "12px 28px",
          _hover: {
            bg: "brand.4",
            border: "brand.1",
          },
        },

        link: {
          fontSize: "xs",
          borderRadius: "4px",
          color: "grey.0",
          padding: "12px 28px",
          _hover: {
            bg: "grey.8",
          },
        },

        alert: {
          bg: "alert.3",
          fontSize: "xs",
          border: "1.5px solid",
          borderColor: "alert.3",
          borderRadius: "4px",
          color: "alert.1",
          padding: "12px 28px",
          _hover: {
            bg: "alert.2",
            border: "alert.2",
          },
        },

        sucess: {
          bg: "sucess.3",
          fontSize: "xs",
          border: "1.5px solid",
          borderColor: "sucess.3",
          borderRadius: "4px",
          color: "sucess.1",
          padding: "12px 28px",
          _hover: {
            bg: "sucess.2",
            border: "sucess.2",
          },
        },

        brandDisable: {
          bg: "brand.3",
          fontSize: "xs",
          border: "1.5px solid",
          borderColor: "brand.3",
          borderRadius: "4px",
          color: "brand.4",
          padding: "12px 28px",
        },
      },
    },
  },
});

export default theme;
