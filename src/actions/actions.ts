"use server";

import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addExpense(formData: FormData) {
  // authenticate user
  const { isAuthenticated, getUser } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }
  // get data
  const amount = formData.get("amount") as string;
  const description = formData.get("description") as string;

  //   console.log(amount, description);
  // get user
  const user = await getUser();
  // create expense
  await prisma.expense.create({
    data: {
      amount: parseFloat(amount),
      description,
      userId: user.id,
    },
  });

  revalidatePath("/dashboard");
}
