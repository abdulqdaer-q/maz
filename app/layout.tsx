"use client"
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/providers/AuthProvider";
import SocketProvider from "@/components/providers/SocketProvider";
import theme from "@/theme/themeConfig";
import { ConfigProvider } from "antd";
import React from "react";
import StyledComponentsRegistry from "../lib/AntdRegistry";
import "./globals.css";
import { Next13ProgressBar } from 'next13-progressbar';

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      <ConfigProvider theme={theme}>
          <SocketProvider>
        <AuthProvider>
            <StyledComponentsRegistry>
              <Next13ProgressBar height="4px" color="#0A2FFF" options={{ showSpinner: true }} showOnShallow />
              <Navbar />  

              {children}
            </StyledComponentsRegistry>
        </AuthProvider>
          </SocketProvider>
      </ConfigProvider>
    </body>
  </html>
);

export default RootLayout;
