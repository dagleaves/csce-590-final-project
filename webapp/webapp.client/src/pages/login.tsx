import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useContext } from "react";
import { UserContext } from "@/components/layout";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
    <div className="flex w-full h-[45vh] justify-center items-end">
      <Card>
        <form id="login_form" onSubmit={logInUser}>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-1 min-w-[25vw]">
              <label id="username_label">Username</label>
              <Input id="username"></Input>
              <label id="password_label">Password</label>
              <Input id="password"></Input>
          </CardContent>
          <CardFooter className="flex flex-col w-full gap-2">
            <div className="flex flex-row justify-between w-full">
              <Button type="button" variant="outline">Cancel</Button>
              <Button variant="outline">
                Login
              </Button>
            </div>
            <h4>Forgot Password?</h4>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
