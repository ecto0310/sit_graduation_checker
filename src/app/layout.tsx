import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ReactNode } from "react";
import Body from "./body";

export const metadata = {
  title: "SIT卒業条件チェッカー",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html>
      <body>
        <Body>{children}</Body>
      </body>
    </html>
  );
};

export default RootLayout;
