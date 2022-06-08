import * as React from "react";
import Code from "@/components/code";

export default function ParagraphCode({paragraph}) {
  return (
      <div className="row code" >
          <Code language={paragraph.field_language} code={paragraph.field_simple_texte} />
      </div>
  )
}