import { Editor } from "@tinymce/tinymce-react";
import React, { FC } from "react";

interface CreateProps {
  data?: any;
  setContent: (val: string) => void;
}

const TinyEditor: FC<CreateProps> = ({ data, setContent }) => {
  return (
    <Editor
      textareaName="Body"
      initialValue={data?.content}
      init={{
        height: 500,
        menubar: false,
        plugins:
          "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons",
        toolbar:
          "undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
      onEditorChange={(newText) => setContent(newText)}
    />
  );
};

export default TinyEditor;
