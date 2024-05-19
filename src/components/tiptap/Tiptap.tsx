"use client";
import "./styles/placeholder.style.css";
import { useEditor, EditorContent, Editor, EditorOptions } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import TextAlign from "@tiptap/extension-text-align";
import Youtube from "@tiptap/extension-youtube";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Button } from "../ui/button";
import { TIPTAP_TAILWIND_THEME } from "./tiptap-themes";
import { TiptapToolbar } from "./TiptapToolbar";
import { cn } from "@/lib/utils";
import { FontSize } from "./custom-modules/font-size.extension";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";

// Define Context
type ContextType = {
  editor: Editor | null;
  setEditor: Dispatch<SetStateAction<Editor | null>>;
};

const defaultTiptapEditorContext = {
  editor: null,
  setEditor: () => {},
} satisfies ContextType;
const TiptapEditorContext = createContext<ContextType>(
  defaultTiptapEditorContext
);

export const useTiptapEditor = () => useContext(TiptapEditorContext);
export const TiptapEditorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [editor, setEditor] = useState<Editor | null>(null);
  return (
    <TiptapEditorContext.Provider value={{ editor, setEditor }}>
      {children}
    </TiptapEditorContext.Provider>
  );
};

// Define Component
type Props = Partial<EditorOptions> & {
  onSubmit: (formdata: FormData) => void;
  beforeImageUpload?: (file: File, editor: Editor) => void;
  className?: string;
};

const DEFAULT_EXTENSIONS = [
  StarterKit,
  Image,
  TextStyle,
  Underline,
  Strike,
  CharacterCount,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Youtube.configure({ nocookie: true }),
  Placeholder.configure({ placeholder: "내용을 입력해주세요." }),
  FontSize.configure({ types: ["textStyle"] }),
  Color.configure({
    types: ["textStyle"],
  }),
  Link.configure({ openOnClick: false }),
];

export const TiptapEditor = ({
  className,
  onSubmit,
  beforeImageUpload,
  ...editorOptions
}: Props) => {
  const tiptapEditor = useTiptapEditor();

  const editor = useEditor({
    extensions: [...DEFAULT_EXTENSIONS],
    ...editorOptions,
  });

  useEffect(() => {
    if (editor && tiptapEditor) {
      tiptapEditor.setEditor(editor);
      editor.setOptions({
        editorProps: { attributes: { class: TIPTAP_TAILWIND_THEME.DEFAULT } },
      });
      editor.chain().focus().run();
    }
  }, [editor, tiptapEditor]);

  return (
    <form className={cn("border rounded h-max", className)} action={onSubmit}>
      <TiptapToolbar
        editor={editor}
        beforeImageUpload={beforeImageUpload}
      ></TiptapToolbar>

      <Separator></Separator>

      <ScrollArea
        className="prose dark:prose-invert max-w-full h-[500px]"
        onClick={() => editor?.chain().focus().run()}
      >
        <EditorContent editor={editor} />
      </ScrollArea>

      <Separator></Separator>

      <article className="flex items-center justify-end p-2">
        {editor ? (
          <>
            <small className="text-neutral-500 inline-block mr-4">
              {editor?.storage.characterCount.characters()}자
            </small>
          </>
        ) : (
          <></>
        )}
        <Button type="submit" size={"sm"}>
          저장
        </Button>
      </article>
    </form>
  );
};

export const TiptapViewer = ({
  content,
  className,
}: Pick<Props, "content" | "className">) => {
  const editor = useEditor({
    extensions: [...DEFAULT_EXTENSIONS],
    content,
    editable: false,
    editorProps: { attributes: { class: TIPTAP_TAILWIND_THEME.DEFAULT } },
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  return (
    <article className={cn("prose dark:prose-invert max-w-none", className)}>
      <EditorContent editor={editor}></EditorContent>
    </article>
  );
};
