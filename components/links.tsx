import React from "react";
import "prismjs/themes/prism-tomorrow.css";
import Link from "next/link";

export default function Liens({ node }) {
    return (
        <div className="links">
            {node.field_liens?.map((lien) => {
                return (
                    <Link href={lien.uri}>
                        <a target="_blank">{lien.title}</a>
                    </Link>
                )
            })}
        </div>
    );
}