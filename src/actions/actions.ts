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

export async function editExpense(formData: FormData, id: number) {
  // authenticatication check
  const { isAuthenticated, getUser } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  // authorization check (check if user is actually creator of the expense)
  const user = await getUser();
  const expense = await prisma.expense.findUnique({
    where: { id },
  });
  if (expense?.userId !== user.id) {
    throw new Error("you are not authorized to edit this expense");
  }
  // get data
  const amount = formData.get("amount") as string;
  const description = formData.get("description") as string;

  await prisma.expense.update({
    where: { id },
    data: {
      amount: parseFloat(amount),
      description,
    },
  });

  revalidatePath("/dashboard");
}
