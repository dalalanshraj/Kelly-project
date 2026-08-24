import { Editor } from "@tinymce/tinymce-react";

import { useEffect, useRef, useState } from "react";

import api from "../api/axios.js";

import { useModal } from "../context/ModalContext";

import "tinymce/tinymce";
import "tinymce/icons/default";
import "tinymce/themes/silver";
import "tinymce/models/dom/model";

import "tinymce/plugins/advlist";
import "tinymce/plugins/autolink";
import "tinymce/plugins/lists";
import "tinymce/plugins/link";
import "tinymce/plugins/charmap";
import "tinymce/plugins/preview";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/code";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/table";
import "tinymce/plugins/wordcount";

export default function DescriptionTab({
  listingId,
  initialData = "",
  goNextTab,
}) {
  const editorRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [editorReady, setEditorReady] = useState(false);

  const { showModal } = useModal();

  useEffect(() => {
    if (editorReady && initialData && editorRef.current) {
      editorRef.current.setContent(initialData);
    }
  }, [editorReady, initialData]);

  const saveDescription = async () => {
    if (!listingId) {
      showModal("Listing not created yet");
      return;
    }

    try {
      setLoading(true);

      const content = editorRef.current?.getContent() || "";

      if (!content || content.trim() === "") {
        showModal("Description cannot be empty");
        return;
      }

      await api.put(
        `/listings/${listingId}/description`,
        {
          description: content,
        }
      );

      setTimeout(() => {
        goNextTab();
      }, 1000);

    } catch (err) {
      console.error(err);
      showModal("Failed to save description");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">

      <Editor
        onInit={(evt, editor) => {
          editorRef.current = editor;
          setEditorReady(true);
        }}
        initialValue=""
        licenseKey="gpl"
        init={{
          height: 350,

          menubar: false,

          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "charmap",
            "preview",
            "searchreplace",
            "code",
            "fullscreen",
            "table",
            "wordcount",
          ],

          toolbar:
            "undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | link | code",

          branding: false,
        }}
      />

      <button
        onClick={saveDescription}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded cursor-pointer"
      >
        {loading ? "Saving..." : "Save & Continue"}
      </button>

    </div>
  );
}