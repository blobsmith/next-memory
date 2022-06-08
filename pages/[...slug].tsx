import * as React from "react"
import { GetStaticPathsResult, GetStaticPropsResult } from "next"
import Head from "next/head"
import {
  DrupalNode,
  DrupalMenuLinkContent,
  getPathsFromContext,
  getResourceFromContext,
  getResourceTypeFromContext,
  getMenu,
  getView,
  getResource, JsonApiResource
} from "next-drupal"

import Link from "next/link"

import { NodeArticle } from "@/components/node-article"
import { NodeBasicPage } from "@/components/node-basic-page"
import { Layout } from "@/components/layout"

interface NodePageProps {
  node: DrupalNode,
  menu: DrupalMenuLinkContent[]
  content: any[]
}

export default function NodePage({ node, menu, content }: NodePageProps) {
  if (!node) return null

  return (
    <Layout menu={menu}>
      <Head>
        <title>{node.title}</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>
      {node.type === "node--page" && <NodeBasicPage node={node} content={content} />}
      {node.type === "node--article" && <NodeArticle node={node}  content={content} />}
    </Layout>
  )
}

export async function getStaticPaths(context): Promise<GetStaticPathsResult> {
  const paths = await getPathsFromContext(["node--article", "node--page"], context);

  return {
    paths: paths,
    fallback: "blocking",
  }
}

export async function getStaticProps(context): Promise<GetStaticPropsResult<NodePageProps>> {
  const type = await getResourceTypeFromContext(context)

  if (!type) {
    return {
      notFound: true,
    }
  }

  let params = {}
  switch(type) {
    case 'node--article':
      params['include'] = "uid,field_content,field_image, field_image.field_media_image, field_tags, field_techno";
      break;

    case 'node--page':
      params['include'] = "uid,field_content, field_image, field_image.field_media_image";
      break;
  }

  const node = await getResourceFromContext<DrupalNode>(type, context, {
    params,
  })

  if (!node?.status) {
    return {
      notFound: true,
    }
  }

  let content = []
  let loaded_content = []
  if (node.field_content) {
    const paragraphs = await node.field_content;
    content = await getParagraphViewResult(paragraphs);
    loaded_content = await getParagraphWebform(content);
  }

  // Fetch the main menu.
  const { tree } = await getMenu("main")

  return {
    props: {
      node,
      menu: tree,
      content: content
    },
    revalidate: 900,
  }
}

async function getParagraphViewResult(paragraphs) {
  return Promise.all(paragraphs.map(async (paragraph) => {
    if (paragraph.type === 'paragraph--view') {
      paragraph.view = await getView(paragraph.field_machine_name+'--'+paragraph.field_display, {
          params: {
            include: "field_image.field_media_image, field_tags, field_techno",
          },
      });
    }
      return paragraph;
  })).then((contents) => {


    return contents
  });
}

async function getParagraphWebform(paragraphs) {
  return Promise.all(paragraphs.map(async (paragraph) => {
    if (paragraph.type === 'paragraph--webform') {
      paragraph.webform = await getResource(paragraph.field_webform.type, paragraph.field_webform.id);
    }
    return paragraph;
  })).then((contents) => {
    return contents
  });
}