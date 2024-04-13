import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ModifyAchievementForm } from "./form";
import { Button } from "@/components/ui/button";
import { HomeCertificate } from "@/lib/types";

export function ModifyAchievement({
  achievement,
  triggerRefresh,
}: {
  achievement: HomeCertificate;
  triggerRefresh: () => Promise<void>;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Modify</Button>
      </AlertDialogTrigger>
      <AlertDialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Modify Achievement</AlertDialogTitle>
          <AlertDialogDescription>
            Modify an existing achievement.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <ModifyAchievementForm
          achievement={achievement}
          triggerRefresh={triggerRefresh}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
}
