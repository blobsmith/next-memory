import * as React from "react";
import {NodeArticleTeaserImage} from "@/components/node-article";

export default function ParagraphViewCard({paragraph}) {

  return (
      <div className={'row view-' + paragraph.field_display} >
          {paragraph?.view?.results.map((item) => {
              return (
                  <div key={item.id} className="col-md-4">
                      <NodeArticleTeaserImage node={item} />
                  </div>
              )
          })}
      </div>
  )
}