import * as React from "react";
import {NodeArticleTeaser} from "@/components/node-article";

export default function ParagraphViewList({paragraph}) {

  return (
      <div className={'row view-' + paragraph.field_display} >
          <div className="col-md-12">
              {paragraph?.view?.results.map((item) => {
                  return (
                      <NodeArticleTeaser key={item.id} node={item} />
                  )
              })}
          </div>
      </div>
  )
}