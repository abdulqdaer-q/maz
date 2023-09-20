import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/providers/AuthProvider";
import SocketProvider from "@/components/providers/SocketProvider";
import theme from "@/theme/themeConfig";
import { ConfigProvider } from "antd";
import React from "react";
import StyledComponentsRegistry from "../lib/AntdRegistry";
import "./globals.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      <ConfigProvider theme={theme}>
        <AuthProvider>
          <SocketProvider>
            <StyledComponentsRegistry>
              <Navbar />

              {children}
            </StyledComponentsRegistry>
          </SocketProvider>
        </AuthProvider>
      </ConfigProvider>
    </body>
  </html>
);

export default RootLayout;
