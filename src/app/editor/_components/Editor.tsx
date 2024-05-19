"use client";

import { TiptapEditor, useTiptapEditor } from "@/components/tiptap/Tiptap";

export function Editor() {
  const tiptapEditor = useTiptapEditor();

  const onsubmit = async (formdata: FormData) => {
    console.log(tiptapEditor.editor?.getHTML());
    formdata.forEach(console.log);
  };

  return (
    <>
      <section className="container flex">
        <TiptapEditor className="flex-1" onSubmit={onsubmit}></TiptapEditor>
      </section>
    </>
  );
}
