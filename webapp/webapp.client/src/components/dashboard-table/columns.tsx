import { DashboardCertificate } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<DashboardCertificate>[] = [
  {
    accessorKey: "employeeId",
    header: "Employee ID",
  },
  {
    accessorKey: "fullname",
    header: "Full Name",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "grade",
    header: "Grade",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "certificateName",
    header: "Certificate Name",
  },
  {
    accessorKey: "certificateLevel",
    header: "Certificate Level",
  },
  {
    accessorKey: "certifiedDate",
    header: "Certified Date",
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
  },
];
