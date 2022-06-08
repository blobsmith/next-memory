import * as React from "react";

export function LayoutContent({ children, aside, node }) {
  return (
      <main className="container">
          <section >
              <div className="container">
                  <div className="row">
                      <div className="col">
                          <figure className="text-left">
                              <blockquote className="blockquote page-title">
                                  <p>{node.title}</p>
                              </blockquote>
                              {node?.field_sous_titre && (
                                  <figcaption className="blockquote-footer">
                                      <cite title="Source Title">{node.field_sous_titre}</cite>
                                  </figcaption>)}
                          </figure>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-md-8 content-center">
                          { children }
                      </div>
                      <div className="col-md-4 content-right ">
                          <aside>
                              { aside }
                          </aside>
                      </div>
                  </div>
              </div>
          </section>
      </main>
  )
}
