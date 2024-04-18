import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useContext, useEffect } from "react";
import { UserContext } from "@/components/layout";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ForgotPassword() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user !== null && user !== "") {
      navigate("/my-profile");
    }
  }, [user]);

  async function logInUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData();
    const username = (document.getElementById("username") as HTMLInputElement)
      .value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;

    formData.append("username", username);
    formData.append("password", password);

    await fetch("user/login", {
      method: "POST",
      body: formData,
    }).then((response) => {
      if (response.status == 200) {
        response.json().then((data) => setUser(JSON.stringify(data.id)));
      } else {
        alert("Invalid username or password");
      }
    });

    //console.log(response.json());
  }

  async function cancelLogin() {
    const username = document.getElementById("username") as HTMLInputElement;
    username.value = "";
    const password = document.getElementById("password") as HTMLInputElement;
    password.value = "";
  }

  return (
    <div className="flex w-full h-[65vh] justify-center items-end">
      <Card>
        <form id="login_form" onSubmit={logInUser}>
          <CardHeader>
            <CardTitle>Password reset </CardTitle>
            <label>Please set a new one below.</label>
          </CardHeader>
          <CardContent className="flex flex-col gap-1 min-w-[25vw]">
            <label id="password_label">Password</label>
            <Input id="password" type="password"></Input>
            <label id="password_confirm_label">Confirm Password</label>
            <Input id="password_confirm" type="password"></Input>
          </CardContent>
          <CardFooter className="flex flex-col w-full gap-2">
            <div className="flex flex-row justify-between w-full">
              <Button variant="outline">Reset Password</Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
