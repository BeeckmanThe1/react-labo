import React, { useState } from 'react'
import { meta } from './demo-1.page.meta';
import { Button, Space, message } from 'antd';
import AppShell from '../../../../../../app-shell/app.shell';
import CodeSnippet, { CODE_LANGUAGES } from '../../../../../../partials/code-snippet/CodeSnippet';

const isRenderingInBrowser = typeof window !== 'undefined'
const Demo = () => {
    const [count, setCount] = useState(0)

    // check is needed because of SSR + hydration architecture
    if (isRenderingInBrowser) message.info('RENDERING', 0.4)

    const bumpCount = () => setCount(prev => prev + 1)

    return <Space direction={'vertical'}>
        <Space>
            <Button onClick={bumpCount}>Click me</Button>
            <b>Count: {count}</b>
        </Space>
    </Space>
}
const UsePrevStatePage = () => {
    return <AppShell>
        <h1>{UsePrevStatePage.meta.title}</h1>
        <Demo/>

        <CodeSnippet language={CODE_LANGUAGES.JS}>
            {/*{demoAsString}*/}
        </CodeSnippet>
    </AppShell>
}

UsePrevStatePage.meta = meta
export default UsePrevStatePage