import React, { useEffect, useState } from "react";
import Header from "../components/header";

export default function Dashboard() {
  const [username, setUserName] = useState("");
  useEffect(() => {
    const res = localStorage.getItem("UserInfo");
    if (res) {
      const userInfo = JSON.parse(res);
      const { user_name } = userInfo;
      setUserName(user_name);
    }
  }, []);
  return (
    <>
      <div className="min-h-full">
        <Header username={username} />
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <h1>Welcome User: {username}</h1>
          </div>
        </main>
      </div>
    </>
  );
}
