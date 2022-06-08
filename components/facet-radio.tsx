import React from "react";
import {useStore} from "@/lib/zustandProvider";
import shallow from "zustand/shallow";

const useFilters = () => {
    return useStore(
        (store) => ({
            filterTerm: store.filterTerm,
            filterTechno: store.filterTechno,
        }),
        shallow
    )
}

export default function FacetRadio({facet, term, handleChange}) {
    let active = term.values.active;
    const { filterTerm, filterTecho } = useFilters();
    if (term.values.value == filterTerm || term.values.value == filterTecho) {
        active = true;
    }
    return (
        <>
            <input
                className="form-check-input"
                type="radio"
                name={facet.path}
                id={`${facet.id}--${term.values.value}`}
                value={term.values.value}
                checked={active}
                onChange={handleChange}
            />
            <label className="form-check-label" htmlFor={`${facet.id}--${term.values.value}`}>
                <span className="count">{term.values.count}</span>{" "}{term.values.label}
            </label>
        </>
    );
}
