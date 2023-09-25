"use client";

import { Option } from '@/types/Option';
import { useAuthContext } from "@/contexts/AuthContext";
import { useSocketContext } from "@/contexts/SocketContext";
import { getPhotoLink } from "@/lib/getPhotoLink";
import { User, UserInfo } from "@/types/User";
import { axios } from "@/utils/axios";
import { BASE_SERVEFR_URL } from "@/utils/constant";
import { removeToken } from "@/utils/helper";
import { UserOutlined } from "@ant-design/icons";
import { AutoComplete, Avatar, Button, Col, Input, Layout, Menu, Row } from "antd";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const { Header } = Layout;

function Navbar() {
  const { user, isLoading, setForceReload } = useAuthContext();
  const { onlineUsers } = useSocketContext();
  const [options, setOptions] = useState<Option[]>([]);
  const [search, setSearch] = useState('');
  
  useEffect(( ) => {
      const fn = async () => {
          const {data: users} = await axios.get<User[]>(`/users?populate=userInfo,company&filters[$or][0][userInfo][firstName][$containsi]=${search}&filters[$or][1][userInfo][lastName][$containsi]=${search}&filters[$or][2][company][companyName][$containsi]=${search}`);

          setOptions(users.map(e => ({
              label: e.userInfo ? (e.userInfo?.firstName + " " + e.userInfo?.lastName ) : e.company!.companyName,
              value: e.id
          })));
      }
      fn()
  }, [search]);
  const router = useRouter();
  const ref = useRef();
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
      { key: 3, label: "Post Job", onClick: () => handleRoute("/postjob") },
      { key: 4, label: "Chat", onClick: () => handleRoute("/chat") }
    );
  }
  const handleSearch = (value: string) => {
        setSearch(value);
        //setOptions(value ? searchResult(value) : []);
    };
    
    const onSelect = (value: string) => {
      router.replace(`/profile/${value}`);
      
      setSearch('');
      
    };
    
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
               <AutoComplete
                  popupMatchSelectWidth={252}
                  style={{ width: 300 }}
                  options={options}
                  onSelect={onSelect}
                  onSearch={handleSearch}
                  size="large"
                  autoClearSearchValue
                  
        >
            <Input.Search value={search} size="large" placeholder="search for users" enterButton />
        </AutoComplete>
                <Link href="/profile">
                  <Avatar
                    src={ getPhotoLink(user?.userInfo?.photo?.url) }
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
