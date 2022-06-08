import React from "react";

import Router from 'next/router';
import {useStore} from "@/lib/zustandProvider";
import shallow from "zustand/shallow";

const useFilters = () => {
    return useStore(
        (store) => ({
            resetAndSetFilterTerm: store.resetAndSetFilterTerm,
            resetAndSetFilterTechno: store.resetAndSetFilterTechno,
        }),
        shallow
    )
}

export default function Tags({ node }) {
    const { resetAndSetFilterTerm, resetAndSetFilterTechno } = useFilters();

    return (
        <div className="article-tags">
            {node?.field_tags.map((tag) => (
                <span key={tag.id}>
                    <div className="tag-label">Tag</div>
                    <div onClick={() => {
                        resetAndSetFilterTerm(tag.drupal_internal__tid);
                        // Router.push('/recherche');
                    }}>
                        <a>{tag.name}</a>
                    </div>
                </span>
            ))}
            {node?.field_techno.map((tag) => (
                <span key={tag.id}>
                    <div className="tag-label">Techno</div>
                        <div onClick={() => {
                            resetAndSetFilterTechno(tag.drupal_internal__tid);
                            // Router.push('/recherche');
                        }}>
                            <a>{tag.name}</a>
                        </div>
                </span>
            ))}
        </div>
    );
}