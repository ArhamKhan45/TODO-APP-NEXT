"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { deleteHandler, updateHandler } from "./deletehandler";
import { useRouter } from "next/navigation";
export const BootstrapClient = () => {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return null;
};

// craate Context api useContext variable

export const Context = createContext({ user: {} });

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    Mepage(setUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Context.Provider value={{ user, setUser }}>
      {children}

      <Toaster />
    </Context.Provider>
  );
};

export const LogoutBtn = () => {
  const { user, setUser } = useContext(Context);
  const LogoutHandler = async () => {
    try {
      const response = await fetch(`/api/auth/logout`);

      const data = await response.json();

      if (!data.success) {
        return toast.error(data.message);
      }
      setUser({});
      toast.success(data.task);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <button className="nav-link" onClick={LogoutHandler}>
      LOGOUT
    </button>
  );
};

export const LoginBtn = () => {
  return (
    <Link href="/login" className="nav-link">
      LOGIN
    </Link>
  );
};

export const LoginLogoutbtn = () => {
  const { user } = useContext(Context);
  return user._id ? <LogoutBtn /> : <LoginBtn />;
};

export const Updatedeletetaskbtn = ({ id, completed }) => {
  const router = useRouter();

  return (
    <>
      <input
        type="checkbox"
        name=""
        checked={completed}
        onChange={() => updateHandler(id, router)}
      />
      <button onClick={() => deleteHandler(id, router)}>DELETE</button>
    </>
  );
};

export const Mepage = async (setUser) => {
  try {
    const response = await fetch("/api/auth/user/me");
    const data = await response.json();
    if (data.success) {
      setUser(data.user);
    }
  } catch (error) {
    console.log(error);
  }
  return;
};
