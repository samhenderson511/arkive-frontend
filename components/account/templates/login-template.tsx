"use client";

import { useState } from "react";

import Login from "@/components/account/components/login";
import Register from "@/components/account/components/register";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState("sign-in");
  const [parent] = useAutoAnimate();

  return (
    <div className="flex justify-center w-full" ref={parent}>
      {currentView === "sign-in" ?
        <Login setCurrentView={setCurrentView} />
      : <Register setCurrentView={setCurrentView} />}
    </div>
  );
};

export default LoginTemplate;
