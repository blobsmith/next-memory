import * as React from "react";
import Webform from "@/components/webform";
import yaml from "js-yaml";

export default function ParagraphWebform({paragraph}) {
    const elements = yaml.load(paragraph.webform.elements);

    return (
      <div className="row" >
          <Webform
              webform={paragraph.webform}
              elements={elements}
          />
      </div>
  )
}