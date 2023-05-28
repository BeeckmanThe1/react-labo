import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import pages from '../hybrid/components/pages';

const queryClient = new QueryClient()

const hydrateSections = () => {
    const wrappedPagesToHydrate: NodeListOf<HTMLElement> = document.querySelectorAll('div[data-should-hydrate=true]');

    wrappedPagesToHydrate.forEach(pageWrapper => {

        const pageUrl = pageWrapper.dataset.pageUrl
        const Page = pages.find(p => p.default.meta.url === pageUrl).default

        hydrateRoot(pageWrapper,
            <QueryClientProvider client={queryClient}>
                <Page/>
            </QueryClientProvider>
        )
    })
}

hydrateSections();