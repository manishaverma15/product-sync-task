import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";

import "./styles/globals.css";
import { Auth } from "./components/orgnisms/Auth";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <Auth>
        <html lang="en">
          <body>
            <section>
              <main>{children}</main>
            </section>
          </body>
        </html>
      </Auth>
    </StoreProvider>
  );
}
