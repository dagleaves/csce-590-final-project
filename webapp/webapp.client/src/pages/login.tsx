import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useContext } from "react";
import { UserContext } from "@/components/layout";

export function Login() {
  const navigate = useNavigate();
  const {setUser} = useContext(UserContext);

  async function logInUser() {
    const form = document.getElementById("login_form");

    form!.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    const formData = new FormData();

    const username = (document.getElementById("username") as HTMLInputElement)
      .value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;

    formData.append("username", username);
    formData.append("password", password);

    console.log(formData);

    await fetch("user/login", {
      method: "POST",
      body: formData,
    }).then((response) => {
      if (response.status == 200) {
        
        response
          .json()
          .then((data) => setUser(JSON.stringify(data.id)));
        navigate("/my-profile");
      } else {
        alert("Invalid username or password");
      }
    });

    //console.log(response.json());
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl">Login</h1>

      {/*<label>*/}
      {/*    Username*/}
      {/*    <Input name="username"></Input>*/}
      {/*</label>*/}

      {/*<label>*/}
      {/*    Password*/}
      {/*    <Input name="password"></Input>*/}
      {/*</label>*/}

      <form id="login_form">
        <label id="username_label">Username</label>
        <br></br>
        <Input id="username"></Input>
        <br></br>
        <label id="password_label">Password</label>
        <br></br>
        <Input id="password"></Input>
        <br></br>

        <Button variant="outline" className="relative" onClick={logInUser}>
          Login
        </Button>

        <Button variant="outline" className="relative">
          Cancel
        </Button>
      </form>

      <h4>Forgot Password?</h4>
    </div>
  );
}
