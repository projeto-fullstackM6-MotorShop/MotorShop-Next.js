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

  textStyles: {
    body_1_400: {
      fontFamily: "body",
      fontWeight: "normal",
      fontSize: "xs",
      color: "grey.2"
    },

    body_1_600: {
      fontFamily: "body",
      fontWeight: "semibold",
      fontSize: "xs",
      color: "grey.2"
    },

    body_2_400: {
      fontFamily: "body",
      fontWeight: "normal",
      fontSize: "xxs",
      color: "grey.2"
    },

    body_2_500: {
      fontFamily: "body",
      fontWeight: "medium",
      fontSize: "xxs",
      color: "grey.2"
    },

    label: {
      fontFamily: "body",
      fontWeight: "medium",
      fontSize: "xxs",
      color: "grey.1"
    },
  },

  components: {
    Heading: {
      variants: {
      healding_1_700: {
        fontFamily: "heading",
        fontWeight: "bold",
        fontSize: "xxxl",
        color: "grey.1"
      },
  
      healding_2_600: {
        fontFamily: "heading",
        fontWeight: "semibold",
        fontSize: "xxl",
        color: "grey.1"
      },
  
      healding_3_600: {
        fontFamily: "heading",
        fontWeight: "semibold",
        fontSize: "xl",
        color: "grey.1"
      },
  
      healding_3_500: {
        fontFamily: "heading",
        fontWeight: "medium",
        fontSize: "xl",
        color: "grey.1"
      },
  
      healding_4_600: {
        fontFamily: "heading",
        fontWeight: "semibold",
        fontSize: "lg",
        color: "grey.1"
      },
  
      healding_4_500: {
        fontFamily: "heading",
        fontWeight: "medium",
        fontSize: "lg",
        color: "grey.1"
      },
  
      healding_5_600: {
        fontFamily: "heading",
        fontWeight: "semibold",
        fontSize: "md",
        color: "grey.1"
      },
  
      healding_5_500: {
        fontFamily: "heading",
        fontWeight: "medium",
        fontSize: "md",
        color: "grey.1"
      },
  
      healding_6_600: {
        fontFamily: "heading",
        fontWeight: "semibold",
        fontSize: "sm",
        color: "grey.1"
      },
  
      healding_6_500: {
        fontFamily: "heading",
        fontWeight: "medium",
        fontSize: "sm",
        color: "grey.1"
      },
  
      healding_7_600: {
        fontFamily: "heading",
        fontWeight: "semibold",
        fontSize: "xs",
        color: "grey.1"
      },
  
      healding_7_500: {
        fontFamily: "heading",
        fontWeight: "medium",
        fontSize: "xs",
        color: "grey.1"
        },
      }
    },

    Button: {
      variants: {
        grey1: {
          bg: "grey.0",
          padding: "12px 28px",
          
          border: "1.5px solid",
          borderColor: "grey.0",
          borderRadius: "4px",
          
          fontFamily: "body",
          fontSize: "xs",
          color: "grey.11",
          fontWeight: "semibold",

          _hover: {
            bg: "grey.1",
            borderColor: "grey.1",
          },
        },

        negative: {
          bg: "grey.6",
          padding: "12px 28px",
          
          border: "1.5px solid",
          borderColor: "grey.6",
          borderRadius: "4px",
          
          fontFamily: "body",
          fontSize: "xs",
          color: "grey.2",
          fontWeight: "semibold",

          _hover: {
            bg: "grey.5",
            borderColor: "grey.5",
          },
        },

        disable: {
          bg: "grey.5",
          padding: "12px 28px",
          
          border: "1.5px solid",
          borderColor: "grey.5",
          borderRadius: "4px",
          
          fontFamily: "body",
          fontSize: "xs",
          color: "grey.11",
          fontWeight: "semibold",
        },

        brand1: {
          bg: "brand.1",
          padding: "12px 28px",
          
          border: "1.5px solid",
          borderColor: "brand1",
          borderRadius: "4px",
          
          fontFamily: "body",
          fontSize: "xs",
          color: "grey.11",
          fontWeight: "semibold",

          _hover: {
            bg: "brand.2",
            borderColor: "brand.2",
          },
        },

        brandOpacity: {
          bg: "brand.4",
          padding: "12px 28px",
          
          border: "1.5px solid",
          borderColor: "brand.4",
          borderRadius: "4px",
          
          fontFamily: "body",
          fontSize: "xs",
          color: "brand.1",
          fontWeight: "semibold",
        },

        light: {
          bg: "grey.10",
          padding: "12px 28px",
          
          border: "1.5px solid",
          borderColor: "grey.10",
          borderRadius: "4px",
          
          fontFamily: "body",
          fontSize: "xs",
          color: "grey.1",
          fontWeight: "semibold",
        },

        outlineLight: {
          padding: "12px 28px",
          
          border: "1.5px solid",
          borderColor: "grey.10",
          borderRadius: "4px",
          
          fontFamily: "body",
          fontSize: "xs",
          color: "grey.10",
          fontWeight: "semibold",

          _hover: {
            bg: "grey.10",
            borderColor: "grey.10",

            color: "grey.1",
          },
        },

        outline1: {
          padding: "12px 20px",
          
          border: "1.5px solid",
          borderColor: "grey.0",
          borderRadius: "4px",
          
          fontFamily: "body",
          fontSize: "xxs",
          color: "grey.0",
          fontWeight: "semibold",
        },

        big45: {
          bg: "grey.1",
          padding: "12px 28px",
          
          border: "1.5px solid",
          borderColor: "grey.1",
          borderRadius: "4px",
          
          fontFamily: "body",
          fontSize: "xs",
          color: "grey.10",
          fontWeight: "semibold",
        },

        outline2: {
          padding: "12px 28px",
          
          border: "1.5px solid",
          borderColor: "grey.4",
          borderRadius: "4px",
          
          fontFamily: "body",
          fontSize: "xs",
          color: "grey.0",
          fontWeight: "semibold",

          _hover: {
            bg: "grey.1",
            borderColor: "grey.1",

            color: "grey.10",
          },
        },

        outlineBrand1: {
          padding: "12px 28px",
          
          border: "1.5px solid",
          borderColor: "brand.1",
          borderRadius: "4px",
          
          fontFamily: "body",
          fontSize: "xs",
          color: "brand.1",
          fontWeight: "semibold",

          _hover: {
            bg: "brand.4",
            borderColor: "barnd.1",

            color: "brand.1",
          },
        },

        link: {
          padding: "12px 28px",
          
          border: "1.5px solid",
          borderRadius: "4px",
          
          fontFamily: "body",
          fontSize: "xs",
          color: "grey.0",
          fontWeight: "semibold",

          _hover: {
            bg: "grey.8",
          },
        },

        alert: {
          bg: "alert.3",
          padding: "12px 28px",
          
          border: "1.5px solid",
          borderColor: "alert.3",
          borderRadius: "4px",
          
          fontFamily: "body",
          fontSize: "xs",
          color: "alert.1",
          fontWeight: "semibold",

          _hover: {
            bg: "alert.2",
            borderColor: "alert.2",
          },
        },

        sucess: {
          bg: "sucess.3",
          padding: "12px 28px",
          
          border: "1.5px solid",
          borderColor: "sucess.3",
          borderRadius: "4px",
          
          fontFamily: "body",
          fontSize: "xs",
          color: "secess.1",
          fontWeight: "semibold",

          _hover: {
            bg: "sucess.2",
            borderColor: "sucess.2",
          },
        },

        brandDisable: {
          bg: "brand.3",
          padding: "12px 28px",
          
          border: "1.5px solid",
          borderColor: "brand.3",
          borderRadius: "4px",
          
          fontFamily: "body",
          fontSize: "xs",
          color: "brand.4",
          fontWeight: "semibold",
        },
      },
    },

    Input: {
      baseStyle: {
        field: {
          border: "1.5px solid",
          borderColor: "grey.7",
          borderRadius: "4px",
          fontSize: "xs",
          
          _placeholder: {
            fontFamily: "body",
            fontWeight: "normal",
            fontSize: "xs",
            color: "grey.3"
          },

          _hover: {
            bg: "grey.8",
            borderColor: "grey.8"
          },

          _focus: {
            bg: "grey.9",
            borderColor: "brand.2",
            fontFamily: "body",
            fontWeight: "normal",
            fontSize: "xs",
            _placeholder: {
              color: "transparent"
            }
          },
        }
      }
    }
  },
});

export default theme;
