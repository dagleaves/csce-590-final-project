import { HomeCertificate } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<HomeCertificate>[] = [
  {
    accessorKey: "certification",
    header: "Certification",
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
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
  },
];
