import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/employee-table/columns";
import { Employee } from "@/lib/types";

export function Home() {
  const [employees, setEmployees] = useState<Employee[]>();

  useEffect(() => {
    populateEmployeeData();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl">Employees</h1>
      {employees && <DataTable columns={columns} data={employees} />}
    </div>
  );

  async function populateEmployeeData() {
    const response = await fetch("employee");
    const data = await response.json();
    setEmployees(data);
  }

}
