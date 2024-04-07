import { useEffect, useState } from "react";
import { Employee } from "@/lib/types";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";


export function Login() {

    useEffect(() => {
  }, []);

  return (
    <div className="flex flex-col gap-2">
          <h1 className="text-2xl">Login</h1>


          <label>
              Username
              <Input name="username"></Input>
          </label>

          <label>
              Password
              <Input name="password"></Input>
          </label>

          <Button variant="outline" className="relative">
                Login
          </Button>

          <Button variant="outline" className="relative">
            Cancel
          </Button>

          <h4>Forgot Password?</h4>
    </div>
    );



}