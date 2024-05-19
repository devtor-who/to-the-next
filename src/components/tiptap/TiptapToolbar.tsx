"use client";
import {
  Image as LucideImage,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  MonitorPlay,
} from "lucide-react";
import { Editor } from "@tiptap/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Toggle } from "../ui/toggle";
import { Separator } from "../ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type Props = {
  editor: Editor | null;
  beforeImageUpload?: (file: File, editor: Editor) => void | Promise<void>;
};

export function TiptapToolbar({ editor, beforeImageUpload }: Props) {
  const makeSelectionBold = () => {
    if (editor) {
      editor.chain().focus().toggleBold().run();
    }
  };

  const makeSelectionItalic = () => {
    if (editor) {
      editor.chain().focus().toggleItalic().run();
    }
  };

  const makeSelectionUnderline = () => {
    if (editor) {
      editor.chain().focus().toggleUnderline().run();
    }
  };

  const makeSelectionStrike = () => {
    if (editor) {
      editor.chain().focus().toggleStrike().run();
    }
  };

  const makeSelectionAlign = (
    alignment: "left" | "right" | "center" | "justify"
  ) => {
    if (editor) {
      editor.chain().focus().setTextAlign(alignment).run();
    }
  };

  const handleImageUpload = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.addEventListener("change", async (e) => {
      const target = e.target as HTMLInputElement;
      if (!target.files || !editor) {
        return;
      }

      const file = target.files[0];
      const src = URL.createObjectURL(file);

      if (beforeImageUpload) {
        await beforeImageUpload(file, editor);
      }
      editor.commands.setImage({ src, alt: file.name });

      fileInput.remove();
    });

    fileInput.style.display = "none";
    document.documentElement.append(fileInput);
    fileInput.click();
  };

  const onSubmitYoutubeEmbedForm = (formData: FormData) => {
    const youtubeLink = String(formData.get("youtubeLink") || "");

    if (!youtubeLink.includes("youtube.com")) {
      return alert("유효하지 않은 유튜브링크입니다.");
    }
    if (editor) {
      editor.commands.setYoutubeVideo({
        src: "https://www.youtube.com/watch?v=CxwJrzEdw1U",
      });
    }
  };

  const handleFontSize = (value: string) => {
    if (editor) {
      editor.commands.setFontSize(value);
    }
  };

  return (
    <TooltipProvider>
      <ul className="flex gap-x-1 px-3 py-1">
        <li className="flex items-center justify-center">
          <Toggle
            variant="outline"
            size={"sm"}
            aria-label="Toggle Bold"
            data-state={editor?.isActive("bold") ? "on" : "off"}
            onClick={makeSelectionBold}
          >
            <Bold size={"1em"}></Bold>
          </Toggle>
        </li>
        <li className="flex items-center justify-center">
          <Toggle
            variant="outline"
            size={"sm"}
            aria-label="Toggle Italic"
            data-state={editor?.isActive("italic") ? "on" : "off"}
            onClick={makeSelectionItalic}
          >
            <Italic size={"1em"}></Italic>
          </Toggle>
        </li>
        <li className="flex items-center justify-center">
          <Toggle
            variant="outline"
            size={"sm"}
            aria-label="Toggle Underline"
            data-state={editor?.isActive("underline") ? "on" : "off"}
            onClick={makeSelectionUnderline}
          >
            <Underline size={"1em"}></Underline>
          </Toggle>
        </li>
        <li className="flex items-center justify-center">
          <Toggle
            variant="outline"
            size={"sm"}
            aria-label="Toggle Strike"
            data-state={editor?.isActive("strike") ? "on" : "off"}
            onClick={makeSelectionStrike}
          >
            <Strikethrough size={"1em"}></Strikethrough>
          </Toggle>
        </li>
        <li className="flex items-center justify-center">
          <Select onValueChange={handleFontSize}>
            <SelectTrigger>
              <SelectValue placeholder="10px"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10px">10px</SelectItem>
              <SelectItem value="12px">12px</SelectItem>
              <SelectItem value="14px">14px</SelectItem>
            </SelectContent>
          </Select>
        </li>

        <li className="flex items-center justify-center mx-2">
          <Separator orientation="vertical"></Separator>
        </li>

        <li className="flex items-center justify-center">
          <Toggle
            variant="outline"
            size={"sm"}
            aria-label="Toggle Align Left"
            data-state={editor?.isActive({ textAlign: "left" }) ? "on" : "off"}
            onClick={() => makeSelectionAlign("left")}
          >
            <AlignLeft size={"1em"}></AlignLeft>
          </Toggle>
        </li>
        <li className="flex items-center justify-center">
          <Toggle
            variant="outline"
            size={"sm"}
            aria-label="Toggle Align Center"
            data-state={
              editor?.isActive({ textAlign: "center" }) ? "on" : "off"
            }
            onClick={() => makeSelectionAlign("center")}
          >
            <AlignCenter size={"1em"}></AlignCenter>
          </Toggle>
        </li>
        <li className="flex items-center justify-center">
          <Toggle
            variant="outline"
            size={"sm"}
            aria-label="Toggle Align Right"
            data-state={editor?.isActive({ textAlign: "right" }) ? "on" : "off"}
            onClick={() => makeSelectionAlign("right")}
          >
            <AlignRight size={"1em"}></AlignRight>
          </Toggle>
        </li>

        <li className="flex items-center justify-center mx-2">
          <Separator orientation="vertical"></Separator>
        </li>

        <li className="flex items-center justify-center">
          <Toggle
            variant="outline"
            size={"sm"}
            aria-label="Upload Image"
            data-state="off"
            onClick={handleImageUpload}
          >
            <LucideImage size={"1em"}></LucideImage>
          </Toggle>
        </li>
        <li className="flex items-center justify-center">
          <Popover>
            <PopoverTrigger asChild>
              <Toggle
                variant="outline"
                size={"sm"}
                aria-label="Embed Youtube"
                data-state="off"
              >
                <MonitorPlay size={"1em"}></MonitorPlay>
              </Toggle>
            </PopoverTrigger>
            <PopoverContent>
              <form className="flex gap-x-2" action={onSubmitYoutubeEmbedForm}>
                <Input type="text" name="youtubeLink" placeholder="URL"></Input>
                <Button type="submit" size={"sm"}>
                  확인
                </Button>
              </form>
            </PopoverContent>
          </Popover>
        </li>
      </ul>
    </TooltipProvider>
  );
}
