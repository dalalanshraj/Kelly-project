import fse from "fs-extra";

fse.emptyDirSync("public/tinymce");

fse.copySync(
  "node_modules/tinymce",
  "public/tinymce",
  { filter: (src) => !src.includes("node_modules") }
);

console.log("TinyMCE copied to public/tinymce");