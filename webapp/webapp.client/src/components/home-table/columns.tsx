import { HomeCertificate } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const employee = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                /* Open the modal */
              }}
            >
              Modify
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                /* Open the modal */
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
