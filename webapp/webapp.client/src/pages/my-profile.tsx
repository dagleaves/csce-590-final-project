import { useEffect, useRef, useState } from "react";
import { Employee } from "@/lib/types";
import { Button } from "../components/ui/button";
import { Input } from "@/components/ui/data-table";

//import { DataTable } from "@/components/ui/data-table";
//import { columns } from "@/components/employee-table/columns";

export function Profile() {
    const [employee, setEmployee] = useState<Employee>();

    const [currUser, setCurrUser] = useState("");
    const [id, setId] = useState("");


    useEffect(() => {
        populateProfileData();

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

        const imgData = URL.createObjectURL(image!.files[0]!);
        console.log(imgData);   
        sendFile(imgData);
    }

    const sendFile = async (imgData: string) => {
        await fetch("user/upload", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(imgData),
        }).then(res => res.json()).then((data) => console.log(data))
    }


  return (
    <div className="flex flex-col gap-2">
          <h1 className="text-2xl">Profile</h1>

          {currUser }

          {employee && (<><h3>{employee!.firstName} {employee!.lastName}</h3><h3>{employee!.email}</h3><h3>{employee!.phoneNumber}</h3><h3>{employee!.id}</h3></>)}

          <img src="https://upload.wikimedia.org/wikipedia/commons/6/68/Jennifer_Lopez_Interview_2019_%28cropped%29.jpg" alt="React Image" />

          <Button variant="outline" className="relative">
              {/*<input type="file" accept="image/*" name="image" id="file"></input>*/}

          </Button>

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

    async function populateProfileData() {
        const response = await fetch("employee/"+id);
        const data = await response.json();
        setEmployee(data);
    }


}