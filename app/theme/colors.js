import {extendTheme} from 'native-base';
export const ThemeColors = {
  brandPrimary: '#073F4E',
  brandSecondary: '#79A3B8',
  brandInfo: '#9DB6C3',
  brandSuccess: '#79A3B8',
  brandDanger: '#d9534f',
  brandWarning: '#c0ae2c',
  brandDark: '#0A0B0C',
  brandLight: '#F1F1F1',
};
export const NativeBaseTheme = extendTheme({
  colors: {
    // Add new color
    primary: {
      50: '#E3F2F9',
      100: '#C5E4F3',
      200: '#A2D4EC',
      300: '#7AC1E4',
      400: '#47A9DA',
      500: '#0088CC',
      600: '#007AB8',
      700: '#006BA1',
      800: '#005885',
      900: '#003F5E',
    },
    // Redefining only one shade, rest of the color will remain same.
    amber: {
      400: '#d97706',
    },
  },
  components: {
    Button: {
      baseStyle: {
        rounded: '3xl',
        borderColor: 'gray.100',
      },
    },
    Input: {
      baseStyle: {
        rounded: '3xl',
        fontSize: 16,
      },
    },
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: 'dark',
  },
});
