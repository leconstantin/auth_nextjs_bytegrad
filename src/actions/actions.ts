"use server";

import { prisma } from "@/lib/db";

export async function addExpense(formData: FormData) {
  const amount = formData.get("amount") as string;
  const description = formData.get("description") as string;

  console.log(amount, description);

  await prisma.expense.create({
    data: {
      amount,
      description,
    },
  });
}
