import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/providers/AuthProvider";
import theme from "@/theme/themeConfig";
import { ConfigProvider } from "antd";
import React from "react";
import StyledComponentsRegistry from "../lib/AntdRegistry";
import "./globals.css";
import { io } from 'socket.io-client';
export const socket = io('http://localhost:1337', {
    autoConnect: false
});


const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      <ConfigProvider theme={theme}>
        <AuthProvider>
          <StyledComponentsRegistry>
            <Navbar />

            {children}
          </StyledComponentsRegistry>
        </AuthProvider>
      </ConfigProvider>
    </body>
  </html>
);

export default RootLayout;
