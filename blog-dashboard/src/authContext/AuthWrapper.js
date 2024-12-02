"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const AuthWrapper = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Safely access localStorage
    const authStatus = localStorage.getItem("isAuth");
    setIsAuth(authStatus);

    if (!authStatus) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    const id = localStorage.getItem("uniqueId");
    const token = localStorage.getItem("token");

    const isAuthCheck = async () => {
      try {
        const isAuth = await axios.post(
          `${"http://localhost:5050"}/sync/${id}`,
          {},
          {
            headers: {
              token: token,
            },
          }
        );

        localStorage.setItem("isAuth", isAuth.data.success);
      } catch (error) {
        console.log(error);
      }
    };

    isAuthCheck();
  }, []);

  // Prevent rendering until isAuth is determined
  if (isAuth === null) {
    return null; // Or a loader if preferred
  }

  return <>{children}</>;
};

export default AuthWrapper;
