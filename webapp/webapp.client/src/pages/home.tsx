import { useContext, useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { getColumns } from "@/components/home-table/columns";
import { HomeCertificate, Achievement } from "@/lib/types";
import { UserContext } from "@/components/layout";
import { AddAchievement } from "@/components/achievements/add/dialog";
import { getExpiryDate, getStatus } from "@/lib/utils";
import { format } from "date-fns";

export function Home() {
  const [achievements, setAchievements] = useState<HomeCertificate[]>();
  const [name, setName] = useState<string>();
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log(user);
    if (user) populateEmployeeData();
    else setAchievements(undefined);
  }, [user]);

  return (
    <div className="flex flex-col gap-4 mt-4">
      <h1 className="text-2xl">{name || "No user currently signed in"}</h1>
      {achievements && (
        <DataTable
          columns={getColumns(populateEmployeeData)}
          data={achievements}
        />
      )}
      <div className="flex w-full items-center justify-center">
        <AddAchievement triggerRefresh={populateEmployeeData} />
      </div>
    </div>
  );

  async function populateEmployeeData() {
    const response = await fetch(`employee/${user}`);
    const { fullName, achievements } = await response.json();
    const data: HomeCertificate[] = achievements.map(
      (achievement: Achievement) => {
        // Calculate the expiry date based on the certificate level
        const date = getExpiryDate(achievement.certificate.level, achievement.certifiedDate, achievement.expiryDate);
        const expiryDate = date ? format(date, "MM/dd/yyyy") : "N/A";
        return {
          id: achievement.id,
          certification: achievement.certificateName,
          certificateLevel: achievement.certificate.level,
          certifiedDate: format(achievement.certifiedDate, "MM/dd/yyyy"),
          status: getStatus(date),
          expiryDate: expiryDate
        };
      },
    );
    console.log(achievements);
    setAchievements(data);
    setName(fullName);
  }
}
