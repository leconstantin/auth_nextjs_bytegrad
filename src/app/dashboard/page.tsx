import { addExpense } from "@/actions/actions";
import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  // authenticate user
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }
  // get data from database
  const expenses = await prisma.expense.findMany();
  return (
    <div className="pt-24">
      <h1 className="text-center text-3xl font-bold">Expense</h1>
      <ul className="bg-white max-w-[400px] min-h-[200px] rounded mx-auto mt-5 mb-12 relative">
        {expenses.length ? (
          expenses.map((expense, index) => (
            <li
              className="flex justify-between py-3 px-5 font-medium border-b border-black/5"
              key={index}
            >
              {expense.description} <span>${expense.amount}</span>
            </li>
          ))
        ) : (
          <li
            className="absolute top-[50%] left-[50%] translate-x-[-50%]
            translate-y-[-50%] text-center font-medium"
          >
            No expense yet, add some
          </li>
        )}
      </ul>

      <form
        action={addExpense}
        className="w-[250px] mx-auto rounded overflow-hidden"
      >
        <input
          type="number"
          name="amount"
          id="amount"
          placeholder="Amount"
          className="block mx-auto py-2 px-3 w-full outline-none"
        />
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Description"
          className="block mx-auto py-2 px-3 w-full outline-none"
        />
        <button className="block mx-auto w-full p-2 bg-black text-white font-semibold outline-none">
          Add Expense
        </button>
      </form>
    </div>
  );
}
