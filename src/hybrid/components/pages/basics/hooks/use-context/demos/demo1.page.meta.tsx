import { PageMeta } from '../../../../page.model';

export const meta: PageMeta = {
    slug: 'demo-1',
    url: '/basics/hooks/use-context/demo-1',
    title: 'hooks | useContext | demo1',
    metaDescription: 'When the value in Context Provider changes, all components that use this Context will re-render, even if they don’t use the changed portion of the data directly. Those re-renders can not be prevented with memoization directly, but there are a few workarounds that can simulate it',
    order: 1
}