import Paragraph from "../components/paragraphs/paragraph-base";
import * as React from "react";
import Image from "next/image";
import {LayoutContent} from "@/components/layout-content";

export function NodeBasicPage({ node, content, ...props }) {

    const aside = () => {
        return (
            <>
                {node.body?.processed && (
                <div
                    dangerouslySetInnerHTML={{ __html: node.body?.processed }}
                    className="body"
                />
                )}

                {node.field_image?.field_media_image?.uri?.url && (
                <div className="image">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${node.field_image?.field_media_image?.uri?.url}`}
                        width={node.field_image?.field_media_image?.resourceIdObjMeta?.width}
                        height={node.field_image?.field_media_image?.resourceIdObjMeta?.height}
                        layout="responsive"
                        objectFit="cover"
                        alt={node.field_image?.field_media_image?.resourceIdObjMeta?.alt}
                    />
                </div>
                )}
            </>
        )
    }

  return (
    <LayoutContent aside={aside()} node={node} >
        {content?.map((item) => {
            return (
                <section key={item.id}>
                    <Paragraph key={item.id} item={item} />
                </section>
            )
        })}
    </LayoutContent>
  )
}
