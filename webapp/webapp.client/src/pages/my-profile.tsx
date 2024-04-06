import { useEffect, useState } from "react";
import { Employee } from "@/lib/types";
import { Button } from "../components/ui/button";
//import { DataTable } from "@/components/ui/data-table";
//import { columns } from "@/components/employee-table/columns";

export function Profile() {
    const [employee, setEmployee] = useState<Employee>();

    useEffect(() => {
        populateProfileData();
  }, []);

  return (
    <div className="flex flex-col gap-2">
          <h1 className="text-2xl">Profile</h1>

          {employee && (<><h3>{employee!.firstName} {employee!.lastName}</h3><h3>{employee!.email}</h3><h3>{employee!.phoneNumber}</h3><h3>{employee!.id}</h3></>)}

          <Button variant="outline" className="relative">
                Upload Photo
          </Button>

          <Button variant="outline" className="relative">
          Change Password
          </Button>
    </div>
    );

    async function populateProfileData() {
        const response = await fetch("employee/1083");
        const data = await response.json();
        setEmployee(data);
    }


}