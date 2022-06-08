import React from "react"
import Head from "next/head"
import {
    DrupalNode,
    getSearchIndexFromContext,
    deserialize,
    JsonApiSearchApiResponse,
    getResourceByPath,
    getMenu,
    DrupalMenuLinkContent,
} from "next-drupal"
import { GetStaticPropsResult } from "next"
import {Layout} from "@/components/layout";
import {LayoutContent} from "@/components/layout-content";
import {NodeArticleTeaser} from "@/components/node-article";
import Image from "next/image";
import Facet from "@/components/facet";
import {loadNodes, sendSearchRequestToApi} from "@/lib/load-data";
import { useStore } from "@/lib/zustandProvider";
import shallow from 'zustand/shallow'

const params = {
  fields: {
    "node--article":
        "id,title,field_status,field_images,field_location",
  },
  filter: {},
}

interface AdvancedPageProps {
  menu: DrupalMenuLinkContent[]
  node: DrupalNode
  nodes: DrupalNode[]
}

const useFacets = () => {
    return useStore(
        (store) => ({
            facets: store.facets,
            setFacets: store.setFacets
        }),
        shallow
    )
}

const useFilters = () => {
    return useStore(
        (store) => ({
            filterTerm: store.filterTerm,
            filterTechno: store.filterTechno,
            filterText: store.filterText,
            setFilterText: store.setFilterText,
            setFilterTerm: store.setFilterTerm,
            setFilterTechno: store.setFilterTechno
        }),
        shallow
    )
}
const indexName = 'content';

export default function Recherche({
      menu,
      node,
      nodes,
    }: AdvancedPageProps) {
    const [initState, setInitState] = React.useState<boolean>(false)
    const [status, setStatus] = React.useState<"error" | "success" | "loading">()
    const [nodesState, setNodes] = React.useState<DrupalNode[]>(nodes)
    const { facets, setFacets } = useFacets();
    const { filterTerm, filterTecho, filterText, setFilterText, setFilterTerm, setFilterTechno } = useFilters();

    if (!initState) {
        setInitState(true);
        reloadData({
            'fulltext': filterText,
            'terms': filterTerm,
            'techno': filterTecho,
        }, indexName);
    }

    async function handleTextChange(evt) {
        let value = evt.target.value;
        if (value.length <= 2) {
            value = '';
        }

        if (value !== filterText) {
            // Update store from filter text field.
            setFilterText(value);
            await reloadData({
                'fulltext': value,
                'terms': filterTerm,
                'techno': filterTecho,
            }, indexName);
        }
    }

    async function handleResetFilters() {
        setFilterTerm('');
        setFilterTechno('');
        await reloadData({
            'fulltext': '',
            'terms': '',
            'techno': '',
        }, indexName);
    }

    async function handleChange(evt) {
        const selectedValue = evt.target.value;
        let term = '';
        let setFilterFunction;
        switch(evt.target.name) {
            case 'terms':
                term = filterTerm;
                setFilterFunction = setFilterTerm;
                break;

            case 'techno':
                term = filterTecho;
                setFilterFunction = setFilterTechno;
                break;
        }
        if (typeof(term) === 'undefined' || term !== selectedValue) {
            term = selectedValue;
        }
        else {
            term = '';
        }
        setFilterFunction(term);
        await reloadData({
            'fulltext': filterText,
            'terms': evt.target.name === 'terms' ? term : filterTerm,
            'techno': evt.target.name === 'techno' ? term : filterTecho,
        }, indexName);
    }

    async function reloadData(filterState, indexName) {
        const response = await sendSearchRequestToApi(filterState, indexName);
        if (!response.ok) {
            return setStatus("error");
        }
        setStatus("success");
        const json = await response.json();
        setFacets(json.meta.facets);
        setNodes(json.nodes);
    }

    const aside = () => {
        return (
            <div className="search">
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

                <div className="form-group section">
                    <div>
                        <h4>Recherche textuelle</h4>
                    </div>

                    <div className="col-sm-12">
                        <input
                            type="search"
                            name="fulltext"
                            className="form-control"
                            placeholder="Rechercher..."
                            onChange={handleTextChange}
                        />
                        <span className="comment">Veuillez saisir plus de 2 caractères.</span>
                    </div>
                </div>

                <div className="">
                    {facets.map((facet) => (
                        <Facet key={facet.id} facet={facet} handleChange={handleChange} />
                    ))}
                </div>

                <div onClick={() => handleResetFilters()}
                    className={'filter-reset ' + (!filterTerm && !filterTecho ? 'd-none': '')}>
                    <span className="left-block"></span>
                    <h6>Annuler les filtres</h6>
                    <span className="right-block"></span>
                </div>
            </div>
        )
    }

    return (
        <Layout menu={menu}>
            <Head>
              <title>{node.title}</title>
              <meta
                  name="description"
                  content="A Next.js site powered by a Drupal backend."
              />
            </Head>
            <form  >
            <LayoutContent aside={aside()} node={node} >
              {status === "error" ? (
                  <div className="">
                    An error occured. Please try again.
                  </div>
              ) : null}
              {!nodesState.length ? (
                  <p className="" data-cy="search-no-results">
                    Aucun résultat trouver.
                  </p>
              ) : (
                  <div className="col-md-12">
                      {nodesState.map((node) => (
                          <NodeArticleTeaser node={node} key={node.id} />
                      ))}
                  </div>
              )}
            </LayoutContent>
            </form>
        </Layout>
    )
}

export async function getStaticProps(context): Promise<GetStaticPropsResult<AdvancedPageProps>> {
    const response = await getSearchIndexFromContext<JsonApiSearchApiResponse>(
      indexName,
      context,
      {
        deserialize: false,
        params,
      }
    )

  // Fetch the main menu.
  const { tree } = await getMenu("main")
  const node = await getResourceByPath('/recherche',
      {
        params: {
          'include': "field_image.field_media_image"
        }
      });
  return {
    props: {
        initialZustandState: {
            facets: response.meta.facets,
        },
        menu: tree,
        node: node,
        nodes: await loadNodes(deserialize(response) as DrupalNode[]),
    },
  }
}
