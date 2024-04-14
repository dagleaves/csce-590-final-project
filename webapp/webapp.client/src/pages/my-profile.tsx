import { useEffect, useState } from "react";
import { Employee } from "@/lib/types";
import { Button } from "../components/ui/button";
import { useContext } from "react";
import { UserContext } from "@/components/layout";

export function Profile() {
  const [employee, setEmployee] = useState<Employee>();
  const { user } = useContext(UserContext);

  function readFile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const image = document.getElementById("imgUpload") as HTMLInputElement;

    // null checking
    if (!image.files) return;

    const formData = new FormData();
    formData.append("file", image!.files[0]!);
    formData.append("userId", user!);
    console.log(formData.get("userId"));
    sendFile(formData);
  }

  const sendFile = async (formData: FormData) => {
    await fetch("user/upload", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
  };

  useEffect(() => {
    if (!user) return;
    async function populateProfileData() {
      const response = await fetch("employee/" + user);
      const data = await response.json();
      setEmployee(data);
    }

      populateProfileData();
  }, [user]);

  return (
      <div className="flex flex-col gap-2">
      <h1 className="text-2xl">Profile</h1>

      {employee && (
        <>
          <h3>{employee!.fullName}</h3>
          <h3>{employee!.email}</h3>
          <h3>{employee!.phoneNumber}</h3>
          <h3>{employee!.id}</h3>
        </>
      )}

      <img
        src={`https://csce590groupprojecta025.blob.core.windows.net/profile-pics/${user}.jpg`}
        alt="React Image"
        width="400"
        height="600"
      />

      <form onSubmit={readFile} className="flex flex-row gap-2 items-center">
        <Button variant="outline">Update Photo</Button>
        <input
          id="imgUpload"
          type="file"
          accept="image/*"
          defaultValue=""
          required
        />
      </form>

      <Button variant="outline" className="relative">
        Change Password
      </Button>
    </div>
  );
}
