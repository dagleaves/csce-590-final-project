import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { DashboardCertificate } from "@/lib/types";

export function DashboardYearSelect({
  data,
  setYear,
}: {
  data: DashboardCertificate[];
  setYear: (year: string) => void;
}) {
  const actualYears = data.filter(
    (certificate) => certificate.certifiedDate !== "",
  );
  const years = actualYears.map((certificate) =>
    new Date(certificate.certifiedDate).getFullYear().toString(),
  );
  const uniqueYears = Array.from(new Set(years)).sort(
    (a, b) => parseInt(a) - parseInt(b),
  );

  return (
    <Select onValueChange={(value) => setYear(value)}>
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Filter by year" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Years</SelectItem>
        {uniqueYears.map((year) => (
          <SelectItem key={year} value={year}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function filterByYear(data: DashboardCertificate[], year: string) {
  if (year === "all") {
    return data;
  }
  return data.filter(
    (certificate) =>
      new Date(certificate.certifiedDate).getFullYear().toString() === year,
  );
}
