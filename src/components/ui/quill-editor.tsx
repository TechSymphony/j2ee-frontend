import React, { useEffect, useRef } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

interface QuillEditorProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange, disabled, key }) => {
    const { quill, quillRef } = useQuill();
    const isInitialRender = useRef(true);

    useEffect(() => {
        if (quill) {
            if (isInitialRender.current) {
                quill.clipboard.dangerouslyPasteHTML(value);
                isInitialRender.current = false;
            }
            quill.on("text-change", () => {
                onChange(quill.root.innerHTML);
            });
        }
    }, [quill, onChange]); // Add key to dependencies
    
    useEffect(() => {
        if (quill && value !== quill.root.innerHTML) {
            quill.clipboard.dangerouslyPasteHTML(value);
        }
    }, [quill, value]);

    useEffect(() => {
        if (quill && disabled) {
            quill.disable();
        }
    }, [quill, disabled]);



    return (
        <>
            <b id="editor-label"></b>
            <div id="editor" className="mt-4">
                <div ref={quillRef} />
            </div>
        </>
    );
};

export default QuillEditor;