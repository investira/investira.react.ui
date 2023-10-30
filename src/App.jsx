import { CrossTab } from "../";
import { Alert, CssBaseline, ThemeProvider } from "../dist/mui";
import { themeDarkPrimary } from "../dist/styles";

function App() {
  return (
    <>
      <CssBaseline enableColorScheme />
      <ThemeProvider theme={themeDarkPrimary}>
        <Alert>This is an error alert — check it out!</Alert>
        <CrossTab appName="TESTE" />
        <div>Hello there!</div>
      </ThemeProvider>
    </>
  );
}

export default App;
