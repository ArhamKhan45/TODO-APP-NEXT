"use client";

import { Context } from "@/components/ClientComponent";
import Link from "next/link";
import React, { useContext } from "react";

function Page() {
  const { user } = useContext(Context);

  function Profile() {
    return (
      <>
        <p>{user.name}</p>
        <p>{user.email}</p>
      </>
    );
  }
  return (
    <div className="mt-md-5 ms-md-5">
      {user._id ? (
        <Profile />
      ) : (
        <div>
          <h3>Introduction</h3>
          <p className="">
            It’s a list of tasks you need to complete or things that you want to
            do.
          </p>
          <p>To use todo app plz login first</p>
          <p>
            <Link className="btn btn-success " href="/login" role="button">
              Login
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default Page;
