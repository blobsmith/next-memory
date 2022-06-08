import { useMemo } from 'react'
import create from 'zustand'
import {
    DrupalSearchApiFacet
} from "next-drupal"

let store

interface SearchState {
    filterTerm: string
    filterTechno: string
    filterText: string
    facets: DrupalSearchApiFacet[]
    setFacets:(facets: DrupalSearchApiFacet[]) => void
    setFilterTerm:(term: string) => void
    setFilterTechno:(techno: string) => void
    setFilterText:(text: string) => void
    resetAndSetFilterTerm:(term: string) => void
    resetAndSetFilterTechno:(techno: string) => void
}

const initialState = {
    filterTerm: '',
    filterTechno: '',
    filterText: '',
    facets: [],
}

function initStore(preloadedState = initialState) {
    return create<SearchState>((set, get) => ({
        ...initialState,
        ...preloadedState,
        setFacets: (facets) => {
            set({
                facets: facets,
            })
        },
        setFilterTerm: (term) => {
            set({
                filterTerm: term,
            })
        },
        setFilterTechno: (techno) => {
            set({
                filterTechno: techno,
            })
        },
        resetAndSetFilterTerm: (term) => {
            set({
                filterTerm: term,
                filterTechno: '',
            })
        },
        resetAndSetFilterTechno: (techno) => {
            set({
                filterTechno: techno,
                filterTerm: '',
            })
        },
        setFilterText: (text) => {
            set({
                filterText: text,
            })
        },
    }))
}

export const initializeStore = (preloadedState) => {
    let _store = store ?? initStore(preloadedState)

    // After navigating to a page with an initial Zustand state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        })
        // Reset the current store
        store = undefined
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store

    return _store
}

export function useHydrate(initialState) {
    const state =
        typeof initialState === 'string' ? JSON.parse(initialState) : initialState
    const store = useMemo(() => initializeStore(state), [state])
    return store
}
