'use client'
import React from "react";
import Image  from "next/image";
import {
  BellOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Input, Button, Menu, Avatar } from "antd";
import { useAuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { getPhotoUrl, removeToken } from "@/utils/helper";
import { BASE_SERVEFR_URL } from "@/utils/constant";
import { useRouter } from "next/navigation";

const { Header } = Layout;

function Navbar() {
  const { user } = useAuthContext();
  const router = useRouter()
  const handleLogout = () => {
    removeToken();
    router.push("/login");
  }
  
  return (
    <Header style={{backgroundColor: '#FFF'}} className="border-b bg-white sticky top-0 z-10 flex">
      {/* Logo */}
      <Image src="/logo.png" alt="logo" height={100} width={100} />

      {/* Menu */}
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={["1"]} className="space-x-4 ml-4">
        <Menu.Item key="1">
          <Link href="/find">Find</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link href="/offer">Your Offer</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link href="/companies">Companies</Link>
        </Menu.Item>
      </Menu>

      {/* User Actions */}
      <div className="flex items-center ml-auto mr-4 space-x-4">
        {user ? (
          <>
            <Avatar src={user.user_info.photo ? getPhotoUrl(user.user_info.photo) : BASE_SERVEFR_URL+'/uploads/user_318_159711_35568c738c.avif'} size="large" icon={<UserOutlined />} className="text-gray-600" />
            <Button onClick={handleLogout} type="default">Logout</Button>
          </>
        ) : (
          <>
            <Link href="/login">
              <Button type="default">Login</Button>
            </Link>
            <Link href="/signup">
              <Button type="primary">Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </Header>
  );
}

export default Navbar;
