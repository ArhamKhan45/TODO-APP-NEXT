"use client";
import "@/Scss/register.scss";
import { Context, Pageforwarder } from "@/components/ClientComponent";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

function Register() {
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const { user, setUser } = useContext(Context);

  const Registerhandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/auth/register`, {
        method: "POST",

        body: JSON.stringify({
          name,
          email,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (data.user) {
        setUser(data.user);
      }

      if (!data.success) {
        return toast.error(data.message);
      }

      toast.success(data.message);
    } catch (error) {
      return toast.error(error);
    }
  };
  if (user._id) {
    return redirect("/");
  }
  return (
    <div className="custom-register">
      <form action="" onSubmit={Registerhandler}>
        <input
          type="text"
          name=""
          placeholder="Enter Name"
          required
          onChange={(event) => {
            setname(event.target.value);
          }}
        />
        <input
          type="email"
          name=""
          placeholder="Enter Email"
          required
          onChange={(event) => {
            setemail(event.target.value);
          }}
        />
        <input
          type="password"
          name=""
          placeholder="Enter Password"
          onChange={(event) => {
            setpassword(event.target.value);
          }}
        />

        <input type="submit" className="rounded-0" value="SIGN UP" />
        <p> OR</p>

        <Link href={"/login"}>Log in</Link>
      </form>
    </div>
  );
}

export default Register;
