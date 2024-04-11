import { useContext, useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/home-table/columns";
import { HomeCertificate, Achievement } from "@/lib/types";
import { UserContext } from "@/components/layout";

export function Home() {
  const [employees, setEmployees] = useState<HomeCertificate[]>();
  const [name, setName] = useState<string>();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) populateEmployeeData();
    else setEmployees(undefined);
  }, [user]);

  return (
    <div className="flex flex-col gap-4 mt-4">
      <h1 className="text-2xl">{name || "No user currently signed in"}</h1>
      {employees && <DataTable columns={columns} data={employees} />}
    </div>
  );

  async function populateEmployeeData() {
    const response = await fetch(`employee/${user}`);
    const { firstName, lastName, achievements } = await response.json();
    const data: HomeCertificate[] = achievements.map(
      (achievement: Achievement) => {
        return {
          certification: achievement.certificateName,
          certificateLevel: achievement.certificate.level,
          certifiedDate: achievement.certifiedDate,
          status: "Valid",
          expiryDate: achievement.certifiedDate,
        };
      },
    );
    console.log(achievements);
    setEmployees(data);
    setName(`${firstName} ${lastName}`);
  }
}
