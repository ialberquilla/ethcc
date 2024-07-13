"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Providers } from "@/context/providers";
import { SessionProvider } from "@/context/session";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <SessionProvider>
            <ThemeProvider theme={baselightTheme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
