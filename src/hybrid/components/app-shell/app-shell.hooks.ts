import { useEffect, useState } from 'react';
import Homepage from '../pages/homepage/homepage.page';
import { PageMeta } from '../pages/page.model';
import pageModules from '../pages';


export const useHydration = () => {
    const [isHydrated, setIsHydrated] = useState(false)
    useEffect(() => setIsHydrated(true),[])

    return {
        isHydrated
    }
}
export const useWebsiteNavigation = () => {
    const { isHydrated } = useHydration()

    let currentPageUrl

    if (isHydrated) {
        const path = window.location.pathname
        currentPageUrl = path === '/' ? Homepage.meta.url : path
    }

    const pageMetas: PageMeta[] = pageModules.map(m => m.default.meta)
    const mainPages = pageMetas
        .filter(meta => meta.url
            .split('')
            .filter(c => c === '/').length === 1)
    const mainUrls = mainPages.map(p => p.url)
    const breadcrumbs: PageMeta['slug'][] = currentPageUrl?.split('/').filter(s => s !== '')
    const defaultSelectedKeys = mainUrls.filter(s => currentPageUrl?.includes(s))

    const onBreadcrumbClick = (e) => {
        const clickedSlug = e?.target?.innerHTML
        const correspondingPageMeta = pageMetas.find(p => p.slug === clickedSlug)
        window.location.href = correspondingPageMeta.url
    }

    return {
        breadcrumbs,
        defaultSelectedKeys,
        onBreadcrumbClick,
        mainPages
    }
}
export const useDynamicClasses = () => {
    const { isHydrated } = useHydration()

    const appShellClassNames = ['layout', 'app-shell']
    if(isHydrated) appShellClassNames.push('is-hydrated')
    const appShellClassName = appShellClassNames.join(' ')

    return { appShellClassName }
}