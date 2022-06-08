import * as React from "react";
import ParagraphViewCard from "./paragraph-view-card";
import ParagraphViewList from "./paragraph-view-list";
import ParagraphText from "./paragraph-text";
import ParagraphCode from "./paragraph-code";
import ParagraphWarning from "./paragraph-warning";
import ParagraphWebform from "./paragraph-webform";

export default function Paragraph({item}) {
    let paragraph;
    switch(item.type) {
        case 'paragraph--view':
            const regex_list = /[\w]+_list/g;
            const regex_card = /[\w]+_card/g;
            const is_list = item.field_display.search(regex_list) !== -1;
            const is_card = item.field_display.search(regex_card) !== -1;
            if (is_card) {
                paragraph = <ParagraphViewCard paragraph={item} />;
            }
            if (is_list) {
                paragraph = <ParagraphViewList paragraph={item} />;
            }
            break;

        case 'paragraph--text':
            paragraph = <ParagraphText paragraph={item}/>;
            break;

        case 'paragraph--code':
            paragraph = <ParagraphCode paragraph={item}/>;
            break;

        case 'paragraph--warning':
            paragraph = <ParagraphWarning paragraph={item}/>;
            break;

        case 'paragraph--webform':
            paragraph = <ParagraphWebform paragraph={item}/>;
            break;
    }

  return (
      <div className="container paragraph" >
          {paragraph}
      </div>
  )
}