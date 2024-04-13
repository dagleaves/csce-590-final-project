import { useEffect, useState } from "react";
import { DashboardCertificate } from "@/lib/types";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/dashboard-table/columns";
import { Employee } from "@/lib/types";
import { getExpiryDate } from "@/lib/utils";
import { format } from "date-fns";

export function Dashboard() {
  const [data, setData] = useState<DashboardCertificate[]>();
  const [adoption, setAdoption] = useState<number>();

  useEffect(() => {
    populateData();
  }, []);

  return (
    <div className="flex flex-col gap-2 px-8">
      <h1 className="text-2xl">Dashboard</h1>
      <div className="flex flex-col w-full items-center justify-center">
        <div className="flex flex-row gap-2">
          <h2 className="text-xl">Adoption Rate:</h2>
          <span className="text-xl">{adoption ? adoption : "Loading..."}%</span>
        </div>
      </div>
      {data && <DataTable columns={columns} data={data} />}
    </div>
  );

  async function populateData() {
    const response = await fetch("employee");
    const data: Employee[] = await response.json();

    // Filter out employees without any achievements
    const filteredData = data.filter(
      (employee) => employee.achievements.length > 0,
    );

    console.log(filteredData);

    // Calculate adoption rate by counting the number of employees with at least one *valid* certificate
    const adoptionRate =
      filteredData.filter((employee) =>
        employee.achievements.some(
          (achievement) => getExpiryDate(achievement.certificate.level, achievement.certifiedDate, achievement.expiryDate)! < new Date(),
        ),
      ).length / data.length;
    setAdoption(adoptionRate);

    console.log("Adoption Rate", adoptionRate);

    // Flatten the data to have one record per certificate per employee
    // Use one entry with no certificates for employees with no achievements
    const flattenedData = data.flatMap((employee) => {
      if (!employee.achievements.length) {
        return [
          {
            employeeId: employee.id,
            fullName: employee.fullName,
            role: employee.role,
            grade: employee.grade,
            email: employee.email,
            certificateName: "",
            certificateLevel: "No certificates",
            certifiedDate: "",
            expiryDate: "",
          },
        ];
      }
      return employee.achievements.map((achievement) => {
        // Calculate the expiry date based on the certificate level
        const date = getExpiryDate(achievement.certificate.level, achievement.certifiedDate, achievement.expiryDate);
        const expiryDate = date ? format(date, "MM/dd/yyyy") : "N/A";
        return {
          employeeId: employee.id,
          fullName: employee.fullName,
          role: employee.role,
          grade: employee.grade,
          email: employee.email,
          certificateName: achievement.certificateName,
          certificateLevel: achievement.certificate.level,
          certifiedDate: format(achievement.certifiedDate, "MM/dd/yyyy"),
          expiryDate: expiryDate
        };
    });
  });
    // Fetch all certificates along with it
    // Fan out the data to have one record per certificate per employee
    setData(flattenedData);
  }
}
