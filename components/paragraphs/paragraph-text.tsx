import * as React from "react";

export default function ParagraphView({paragraph}) {
  return (
      <div className="row text">
          {paragraph.field_text?.processed && (
              <div
                  dangerouslySetInnerHTML={{ __html: paragraph.field_text?.processed }}
                  className="text-field"
              />
          )}
      </div>
  )
}