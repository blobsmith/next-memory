import { PreviewAlert } from "@/components/preview-alert"
import * as React from "react";

import MainNav from "./main-nav";
import FooterNav from "./footer-nav";

export function Layout({ children, menu }) {
  return (
      <>
      <PreviewAlert />
      <div className="container">
        <header>
          <MainNav menu={menu} />
        </header>
          {children}
        <footer>
          <FooterNav />
        </footer>
      </div>
    </>
  )
}
