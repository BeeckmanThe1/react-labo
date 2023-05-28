import React, { AllHTMLAttributes } from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const HtmlTags = {
    html: 'html',
    meta: 'meta',
    title: 'title',
    head: 'head',
    body: 'body',
    script: 'script'
} as const
type HtmlTag = typeof HtmlTags[keyof typeof HtmlTags]
type HtmlTagProps = { Tag: HtmlTag, children?: React.ReactNode } & AllHTMLAttributes<HTMLElement>
const HtmlTag: React.FC<HtmlTagProps> = ({ Tag, children, ...rest }) => {
    return <Tag {...rest}>{children}</Tag>
}
import pages from '../../hybrid/components/pages';
import { PageMeta } from '../../hybrid/components/pages/page.model';

export const getBasicSkeleton = ({ url }: { url: string }) => {
    const htmlVersion = '<!DOCTYPE html>'
    const fontAwesomeScript = '<script src="https://kit.fontawesome.com/c4f1fd5c3a.js" crossorigin="anonymous"></script>'
    const queryClient = new QueryClient()
    const Page = pages.find(p => p.default.meta.url === url).default
    const pageMeta: PageMeta = Page.meta;
    const origin = process.env.ORIGIN

    const html = ReactDOMServer.renderToString(<HtmlTag Tag={HtmlTags.html} lang="en">
            <HtmlTag Tag={HtmlTags.head}>
                <link rel="stylesheet" href="/_index.min.css"/>
                <HtmlTag Tag={HtmlTags.meta} charSet="UTF-8"/>
                <HtmlTag Tag={HtmlTags.meta} name={'description'}
                         content={pageMeta.metaDescription}/>
                <HtmlTag Tag={HtmlTags.title}>{pageMeta.title}</HtmlTag>
                <HtmlTag Tag={HtmlTags.meta} name="viewport" content="width=device-width,initial-scale=1"/>
            </HtmlTag>
            <HtmlTag Tag={HtmlTags.body}>
                <QueryClientProvider client={queryClient}>
                    <div data-should-hydrate data-page-url={url}>
                        <Page/>
                    </div>
                </QueryClientProvider>
                <HtmlTag Tag={HtmlTags.script} src={`${origin}/hydrate.js`}/>
            </HtmlTag>
        </HtmlTag>
    );

    return `${htmlVersion}
    ${html}
    ${fontAwesomeScript}`;
}