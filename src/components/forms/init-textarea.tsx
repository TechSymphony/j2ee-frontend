import React from "react";
import { useQuill } from "react-quilljs";

export const InitTextarea = function ({ form, field } : { form: any, field: string }) {
    const { quill, quillRef } = useQuill();
  
    const { setValue } = form;
  
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