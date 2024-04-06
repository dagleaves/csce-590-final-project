import { Employee } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SortableHeader } from "@/components/ui/sortable-header";

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "id",
    header: ({ column }) =>  
      <SortableHeader header="Employee ID" column={column} />
    },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
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
    accessorKey: "userType",
    header: "User Type",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const employee = row.original;
      console.log(employee);

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
