import { TiptapEditorProvider } from "@/components/tiptap/Tiptap";
import { Editor } from "./_components/Editor";

export default async function Page() {
  return (
    <main>
      <h1>editor page</h1>
      <TiptapEditorProvider>
        <Editor></Editor>
      </TiptapEditorProvider>
    </main>
  );
}
