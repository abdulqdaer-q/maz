"use client";

import React from "react";
import { ConfigProvider } from "antd";
import AuthProvider from "./AuthProvider";
import theme from "@/theme/themeConfig";

const withTheme = (node: JSX.Element) => (
    <>
      <ConfigProvider
        theme={theme}
      >
        <AuthProvider>
          {node}
        </AuthProvider>

      </ConfigProvider>
    </>
  )

export default withTheme;