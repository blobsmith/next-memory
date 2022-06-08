import Link from "next/link"
import { useRouter } from 'next/router'

import * as React from "react";
import WebsiteLogo from "@/components/website-logo";

export default function MainNav({ menu }) {
  const { asPath } = useRouter();

  return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link href="/" passHref>
            <a className="navbar-brand" href="#">
              La mémoire du codeur
            </a>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                  aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {menu?.map((item) => {
                return (
                    <li key={item.id} className="nav-item">
                      <Link href={item.url} passHref>
                        <a className={'nav-link ' + (asPath == item.url?'active':'')} aria-current="page">
                          {item.title}
                        </a>
                      </Link>
                    </li>
                )
              })}
            </ul>
            <div className="website-logo-svg">
              <WebsiteLogo />
            </div>
          </div>
        </div>
      </nav>
  )
}
