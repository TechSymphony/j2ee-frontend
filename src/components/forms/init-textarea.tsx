import React from "react";
import { useQuill } from "react-quilljs";

export const InitTextarea = function ({
  form,
  field,
  fieldValue,
}: {
  form: any;
  field: string;
  fieldValue: string;
}) {
  const { quill, quillRef } = useQuill();

  const { setValue } = form;

  if (fieldValue) quill?.clipboard.dangerouslyPasteHTML(fieldValue)

  React.useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setValue(field, quill.getSemanticHTML());
      });
    }
  }, [quill]);

  return (
    <>
      <b id="editor-label"></b>
      <div id="editor">
        <div ref={quillRef} />
      </div>
    </>
  );
};
