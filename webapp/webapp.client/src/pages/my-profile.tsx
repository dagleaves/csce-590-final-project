import { useEffect, useState } from "react";
import { Employee } from "@/lib/types";
import { Button } from "../components/ui/button";

//import { DataTable } from "@/components/ui/data-table";
//import { columns } from "@/components/employee-table/columns";

export function Profile() {
    const [employee, setEmployee] = useState<Employee>();

    const [currUser, setCurrUser] = useState(JSON.parse(localStorage.getItem('currUser')!));
    const [id, setId] = useState("");
    const [profile, setProfile] = useState("");


    useEffect(() => {
        populateProfileData();
        downloadProfileImage();

        const user = JSON.parse(localStorage.getItem('currUser')!);
        const idToGet = JSON.parse(localStorage.getItem('id')!);

        if (user) {
            setCurrUser(user);
            setId(idToGet);
        }

    }, [employee]);

    function readFile() {
        const image = (document.getElementById("imgUpload") as HTMLInputElement);

        // null checking
        if (!image.files) return;

        const formData = new FormData();
        formData.append('file', image!.files[0]!);
        formData.append('username', currUser);
        sendFile(formData);
    }

    const sendFile = async (formData: FormData) => {
        await fetch("user/upload", {
            method: 'POST',
            body: formData,
        }).then(res => res.json()).then((data))
    }

    const downloadProfileImage = async () => {
        const url = "https://csce590groupprojecta025.blob.core.windows.net/profile-pics/" + currUser + ".jpg";
        await fetch(url, {
            method: 'GET',
        }).then((data) => { setProfile(url); })
    }

    async function populateProfileData() {
        const response = await fetch("employee/" + id);
        const data = await response.json();
        setEmployee(data);
    }

  return (
    <div className="flex flex-col gap-2">
          <h1 className="text-2xl">Profile</h1>

          {currUser }

          {employee && (<><h3>{employee!.firstName} {employee!.lastName}</h3><h3>{employee!.email}</h3><h3>{employee!.phoneNumber}</h3><h3>{employee!.id}</h3></>)}

          <img src={profile} alt="React Image" width = "400" height="600"/>

          <Button variant='outline' onChange={readFile}>
              Upload Photo
              &emsp;
              <input
                  id='imgUpload'
                  type='file'
                  accept="image/*"
                  value=""
              />
          </Button>


          <Button variant="outline" className="relative">
          Change Password
          </Button>


    </div>
    );

  


}