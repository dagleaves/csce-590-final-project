import { useEffect, useState } from "react";
import { DashboardCertificate } from "@/lib/types";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/dashboard-table/columns";

export function Dashboard() {
  const [data, setData] = useState<DashboardCertificate[]>();

  useEffect(() => {
    populateData();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl">Employees</h1>
      {data && <DataTable columns={columns} data={data} />}
    </div>
  );

  async function populateData() {
    const response = await fetch("employee");
    const data = await response.json();
    // Fetch all certificates along with it
    // Fan out the data to have one record per certificate per employee
    setData(data);
  }
}
