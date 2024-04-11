import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export function Login() {
  const navigate = useNavigate();

  const [currUser, setCurrUser] = useState("");

  useEffect(() => {}, [currUser]);

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
        setCurrUser(username);
        localStorage.setItem("currUser", JSON.stringify(username));
        response
          .json()
          .then((data) => localStorage.setItem("id", JSON.stringify(data.id)));
        navigate("/my-profile");
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
