import Image from "next/image"
import Link from "next/link"

import * as React from "react";
import Paragraph from "@/components/paragraphs/paragraph-base";
import Tags from "@/components/tags"
import Links from "@/components/links"
import {LayoutContent} from "@/components/layout-content";
import Date from "@/components/date";

export function NodeArticle({ node, content, ...props }) {

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
            <div className="container tag-container">
                <h5>Rechercher par tags</h5>
                <Tags node={node} />
            </div>

            {node?.field_liens && (
                <div className="container link-container">
                    <h5>Liens utiles</h5>
                    <Links node={node} />
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

export function NodeArticleTeaser({ node, ...props }) {
    return (
        <div className="row article-list" key={node.id} >
            <div className="article-teaser">
                <div className="col-md-2 date">
                    <Date date={node.created} />
                </div>
                <div className="col-md-8 article-middle">
                    <div className="article-title">
                        <Link href={node.path?.alias} passHref>
                            <a className="">
                                {node.title}
                            </a>
                        </Link>
                    </div>
                    <div>
                        { node?.field_sous_titre &&
                            <figcaption className="blockquote-footer">
                                <cite>{node?.field_sous_titre}</cite>
                            </figcaption>
                        }
                    </div>
                    <Tags node={node} />
                </div>
            </div>
        </div>
    )
}

export function NodeArticleTeaserImage({ node, ...props }) {
    return (
        <article {...props} className="card">
            <Link href={node.path.alias} passHref>
                <a className="">
                    <div className="image-card">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${node.field_image?.field_media_image?.uri?.url}`}
                            width={768}
                            height={400}
                            layout="responsive"
                            objectFit="cover"
                            alt={node.field_image?.field_media_image?.resourceIdObjMeta?.alt}
                        />
                    </div>
                    <h2 className="title">{node.title}</h2>
                </a>
            </Link>
            <div className="tags-content">
                <div className="article-tags">
                    {node?.field_tags.map((tag) => (
                        <span key={tag.id}>
                            <div className="tag-label">Tag</div>
                            {tag.name}
                        </span>
                    ))}
                    {node?.field_techno.map((tag) => (
                        <span key={tag.id}>
                            <div className="tag-label">Techno</div>
                            {tag.name}
                        </span>
                    ))}
                </div>
            </div>

            <div className="date-content">
                <Date date={node.created} />
            </div>
        </article>
    )
}
