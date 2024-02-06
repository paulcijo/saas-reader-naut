import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { api } from "~/trpc/server";
import { CreateBook } from "./_components/create-book";


export default async function Home() {
  noStore();
  const books = await api.book.getAll.query();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <UserButton afterSignOutUrl="/" />
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          <span className="text-[hsl(280,100%,70%)]">Reader</span>-naut
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          {books ? (
            books.map((book) => (
              <Link
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
                href={book.url}
                target="_blank"
                key={book.id}
              >
                <h3 className="text-2xl font-bold">{book.name}</h3>
                <div className="text-lg">
                  {book.url}
                </div>
              </Link>
            ))
          ) : (
            <p>You have no books yet.</p>
          )}

        </div>

        <CreateBook />
      </div>
    </main>
  );
}

