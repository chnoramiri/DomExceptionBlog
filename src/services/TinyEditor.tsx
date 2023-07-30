import { Editor } from "@tinymce/tinymce-react";
import React, { useRef, useEffect, useState, FC } from "react";
import { fetchBlogs, saveBlog } from "./redux/features/BlogSlice";
import { useAppDispatch } from "./redux/store/store";
import { useLocation } from "react-router-dom";

const TinyEditor: FC = () => {
  const [title, SetTitle] = useState("");
  const dispatch = useAppDispatch();
  const [body, SetBody] = useState("");
  const location = useLocation();

  const data = location.state.data;
console.log(data,"data")
  const submit = (e) => {
    e.preventDefault();
    dispatch(
      saveBlog({
        title: body,
        content: title,
        pictures: [{ blogId: 4, picture: "../../public/images/blog1.jpg" }],
      })
    );
  };

  return (
    <form
      style={{ paddingLeft: 250 }}
      onSubmit={(event) => {
        submit(event);
      }}
    >
      <input
        type="text"
        placeholder="Title"
        value={data&&data.content}
        onChange={(e) => {
          SetTitle(e.target.value);
        }}
        required
      />

      <Editor
        textareaName="Body"
        initialValue={data&&data.title}
        init={{
          height: 500,
          menubar: false,
          // width:500,
          plugins:
            "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons",
          toolbar:
            "undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onEditorChange={(newText) => SetBody(newText)}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default TinyEditor;
