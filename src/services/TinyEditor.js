import { Editor } from "@tinymce/tinymce-react";
import React, { useRef, useEffect, useState } from "react";
import { saveBlog } from "./redux/features/BlogSlice";
import { useAppDispatch } from "./redux/store/store";

function TinyEditor() {
  const editorRef = useRef(null);
  const [data, setData] = useState("");
  const dispatch = useAppDispatch();

  const save = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      dispatch(
        saveBlog({
          title: "There are lots of options for sizing and positioning background images with the CSS background-size and background-position properties. The object-fit and object-position properties allow us to do similar things with embedded images (as well as other replaced elements like videos). In this article, we’ll dig into how to use object-fit to fit images into a specific amount of space, and how to use object-position to get the positioning within that space just right.",
          content: "How to Use CSS object-fit and object-position",
          pictures: [{ blogId: 1, picture: "../../public/images/blog1.jpg" }],
        })
      );
      setData(content);
    }
  };

  return (
    <>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        apiKey="2p36kgbtxxtbbk0k734twyaj6l1wrnzkl94z1yk1xcnk9ydi"
        init={{
          plugins:
            "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons",
          toolbar:
            "undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <button onClick={save}>Save</button>
      <div dangerouslySetInnerHTML={{ __html: data }} />
    </>
  );
}

export default TinyEditor;
