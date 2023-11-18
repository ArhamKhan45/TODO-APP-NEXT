"use client";
import "@/Scss/login.scss";
import { Context } from "@/components/ClientComponent";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useContext, useState } from "react";

import toast from "react-hot-toast";

function Login() {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const { user, setUser } = useContext(Context);
  const signHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/JSON" },
      });
      const data = await response.json();

      if (!data.success) {
        return toast.error(data.message);
      }

      setUser(data.user);
      toast.success(data.message, { duration: 2000 });
    } catch (error) {
      return toast.error(error);
    }
  };

  if (user._id) {
    return redirect("/");
  }

  return (
    <div className="custom-login">
      <form action="" onSubmit={signHandler}>
        <input
          type="email"
          name=""
          value={email}
          autoComplete="on"
          placeholder="Enter Email"
          onChange={(e) => {
            setemail(e.target.value);
          }}
          required
        />
        <input
          type="password"
          name=""
          autoComplete="off"
          value={password}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
          placeholder="Enter Password"
        />

        <input type="submit" className="rounded-0 " value="LOGIN" />
        <p> OR</p>

        <Link href={"/register"}>New User</Link>
      </form>
    </div>
  );
}

export default Login;
