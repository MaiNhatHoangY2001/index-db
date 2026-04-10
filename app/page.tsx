"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCustomerStore } from "@/store/customerStore";
import { format } from "date-fns";
import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
});

export default function Home() {
  const customers = useCustomerStore((s) => s.customers);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">ID</TableHead>
          <TableHead>NAME</TableHead>
          <TableHead>EMAIL</TableHead>
          <TableHead className="text-right">LAST ORDER</TableHead>
          <TableHead className="text-right">TOTAL SALES</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((cus) => (
          <TableRow key={cus.userid}>
            <TableCell className={jetbrainsMono.className}>
              {cus.userid}
            </TableCell>
            <TableCell>{cus.name}</TableCell>
            <TableCell>{cus.email}</TableCell>
            <TableCell className={"text-right " + jetbrainsMono.className}>
              {format(new Date(cus.create_date), "yyyy-MM-dd")}
            </TableCell>
            <TableCell className={"text-right " + jetbrainsMono.className}>
              ${cus.total_sales}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
