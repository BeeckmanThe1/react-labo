import React, {useState} from 'react'
import {meta} from './demo1.page.meta';
import {Button, Space, message} from 'antd';
import AppShell from '../../../../../app-shell/app.shell';
import CodeSnippet, {CODE_LANGUAGES} from '../../../../../partials/code-snippet/CodeSnippet';

const isRenderingInBrowser = typeof window !== 'undefined'
const Demo = () => {
    const [count1, setCount1] = useState(0)
    const [count2, setCount2] = useState(0)

    // check is needed because of SSR + hydration architecture
    if (isRenderingInBrowser) message.info('RENDERING', 0.4)

    const bumpCount1 = () => setCount1(prev => prev + 1)
    const bumpCount2 = () => setCount2(prev => prev + 1)

    return <Space direction={'vertical'}>
        <Space>
            <Button onClick={bumpCount1}>Click me</Button>
            <b>Count 1: {count1}</b>
        </Space>
        <Space>
            <Button onClick={bumpCount2}>Click me</Button>
            <b>Count 2: {count2}</b>
        </Space>
    </Space>
}
const demoAsString = `
        `
const UseStateDemoPage = () => {
    return <AppShell>
        <h1>{UseStateDemoPage.meta.title}</h1>
        <Demo/>

        <CodeSnippet language={CODE_LANGUAGES.JS}>
            {demoAsString}
        </CodeSnippet>
    </AppShell>
}

UseStateDemoPage.meta = meta
export default UseStateDemoPage