import React from "react";
import FacetRadio from "@/components/facet-radio";

export default function Facet({ facet, handleChange }) {
    return (
        <fieldset key={facet.id} className="form-group section">
            <div className="row">
                <div>
                    <h4>{facet.label}</h4>
                </div>
                {facet.terms.map((term) => {
                    return  (
                        <div className="col-sm-6" key={term.values.value} >
                            <div className="form-check disabled">
                                <FacetRadio
                                    facet={facet}
                                    term={term}
                                    handleChange={handleChange}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </fieldset>
    );
}