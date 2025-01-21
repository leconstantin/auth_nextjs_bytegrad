import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-bgColor min-h-screen flex flex-col xl:flex-row items-center justify-center gap-10">
      <div className="-mt-[200px]">
        <h1 className="text-5xl font-bold my-3 max-w-[500px]">Expense App</h1>
        <p className="text-2xl font-medium max-w-[500px]">
          Go to the{" "}
          <Link href="/dashboard" className="underline">
            dashboard
          </Link>{" "}
          to keep track of your expenses
        </p>
        <div className="mt-9 space-x-1"></div>
      </div>
    </main>
  );
}
