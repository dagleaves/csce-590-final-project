import { HomeCertificate } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ModifyAchievement } from "@/components/achievements/update/dialog";

export function getColumns(
  triggerRefresh: () => Promise<void>,
): ColumnDef<HomeCertificate>[] {
  return [
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
      accessorKey: "expiryDate",
      header: "Expiry Date",
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => {
        const achievement = row.original;

        if (!achievement.expiryDate) {
          return null;
        }

        const expiryDate = new Date(achievement.expiryDate);
        const currentDate = new Date();
        const isExpired = expiryDate < currentDate;
        const color = isExpired ? "text-red-500" : "text-green-500";
        const className = `${color} rounded-full px-2 py-1`;

        return (
          <span className={className}>{isExpired ? "Expired" : "Valid"}</span>
        );
      },
    },
    {
      id: "modify",
      header: "Modify",
      cell: ({ row }) => {
        const achievement = row.original;

        return (
          <ModifyAchievement
            achievement={achievement}
            triggerRefresh={triggerRefresh}
          />
        );
      },
    },
    {
      id: "delete",
      header: "Delete",
      cell: ({ row }) => {
        const achievement = row.original;

        return (
          <Button
            variant="outline"
            onClick={async () => {
              await fetch(`achievement/${achievement.id}`, {
                method: "DELETE",
              });
              triggerRefresh();
            }}
          >
            Delete
          </Button>
        );
      },
    },
  ];
}
