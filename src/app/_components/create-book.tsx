"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function CreateBook() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const userId = "1";

    const createBook = api.book.create.useMutation({
        onSuccess: () => {
            router.refresh();
            setName("");
            setUrl("");
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                createBook.mutate({ name, url, userId });
            }}
            className="flex flex-col gap-2"
        >
            <input
                type="text"
                placeholder="Title"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-full px-4 py-2 text-black"
            />
            <input
                type="text"
                placeholder="Link"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full rounded-full px-4 py-2 text-black"
            />
            <button
                type="submit"
                className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
                disabled={createBook.isLoading}
            >
                {createBook.isLoading ? "Submitting..." : "Submit"}
            </button>
        </form>
    );
}
