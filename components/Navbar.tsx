"use client";
import { useAuthContext } from "@/contexts/AuthContext";
import { useSocketContext } from "@/contexts/SocketContext";
import { getPhotoLink } from "@/lib/getPhotoLink";
import { BASE_SERVEFR_URL } from "@/utils/constant";
import { removeToken } from "@/utils/helper";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Layout, Menu, Row } from "antd";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { Header } = Layout;

function Navbar() {
  const { user, isLoading, setForceReload } = useAuthContext();
  const { onlineUsers } = useSocketContext();
  
  const router = useRouter();
  const handleLogout = () => {
    removeToken();
    setForceReload(e => !e)
    router.push("/");
  };
  const handleRoute = (route: string) => {
    router.replace(route);
  };
  const items: MenuItemType[] = [
    { key: 1, label: "Home", onClick: () => handleRoute("/") },
    { key: 2, label: "Find Jobs", onClick: () => handleRoute("/find-job") },
  ];
  if (user) {
    items.push(
      { key: 3, label: "Post Job", onClick: () => handleRoute("/postjob") }
      //{ key: 4, label: "Home", onClick: () => handleRoute("/") }
    );
  }
  return (
    <Header
      style={{ backgroundColor: "#FFF" }}
      className="border-b bg-white sticky flex top-0 z-10 flex"
    >
      {/* Logo */}
      <Image src="/logo.png" alt="logo" height={75} width={75} />

      <Row className="w-full">
        <Col span={12}>
          <Menu
            items={items}
            theme="light"
            mode="horizontal"
            className="col-6 w-50 ml-4"
          />
        </Col>
        {/* User Actions */}
        <Col span={12}>
          <div
            style={{ justifyContent: "flex-end" }}
            className="flex  w-full items-center ml-auto mr-4 space-x-4"
          >
            {user && !isLoading ? (
              <>
                <Link href="/profile">
                  <Avatar
                    src={
                      user?.userInfo?.photo
                        ? getPhotoLink(user.userInfo.photo.url)
                        : BASE_SERVEFR_URL +
                        "/uploads/user_318_159711_35568c738c.avif"
                    }
                    size="large"
                    icon={<UserOutlined />}
                    className="text-gray-600"
                  />
                </Link>
                <Button onClick={handleLogout} type="default">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button type="default">Login</Button>
                </Link>
                <Link href="/auth/register">
                  <Button type="primary">Register</Button>
                </Link>
                <Link href="/auth/register-company">
                  <Button type="primary">Register As Company</Button>
                </Link>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Header>
  );
}

export default Navbar;
