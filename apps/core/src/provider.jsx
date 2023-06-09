import { theme } from '@steelxorg/shared';
import { ThemeProvider } from '@mui/material/styles';

function Provider({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Provider;
