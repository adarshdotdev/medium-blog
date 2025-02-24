import JoditEditor from "jodit-react";
import { useMemo, useRef, useState } from "react";

const Editor = ({ placeholder = "", content, setContent }) => {
  const [text, setText] = useState("");
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      height: 350,
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "Start typings...",
    }),
    [placeholder]
  );

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };
  return (
    <JoditEditor
      value={text}
      config={config}
      ref={editor}
      onChange={(newText) => {
        setText(newText);
        setContent(stripHtml(newText));
      }}
    />
  );
};

export default Editor;
