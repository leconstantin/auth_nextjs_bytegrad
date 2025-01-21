import "server-only";
import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function getExpense(userId: string) {
  // authenticate user
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  return await prisma.expense.findMany({
    where: {
      userId,
    },
  });
}

export async function addExpense(
  userId: string,
  amount: number,
  description: string
) {
  // authenticate user
  const { isAuthenticated, getUser } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  return await prisma.expense.create({
    data: {
      amount,
      description,
      userId,
    },
  });
}

export async function deleteExpense(userId: string, expenseId: string) {
  // authenticate user
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  return await prisma.expense.create({
    data: {
      id: expenseId,
      userId,
    },
  });
}
