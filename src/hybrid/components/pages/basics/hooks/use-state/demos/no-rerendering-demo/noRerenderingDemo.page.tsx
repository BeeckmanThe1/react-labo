import React, {useState} from 'react'
import {meta} from './noRerenderingDemo.page.meta';
import {Button, Space, message} from 'antd';
import AppShell from '../../../../../../app-shell/app.shell';
import CodeSnippet, {CODE_LANGUAGES} from '../../../../../../partials/code-snippet/CodeSnippet';

const isRenderingInBrowser = typeof window !== 'undefined'
const INITIAL_VALUE = 48
const INITIAL_REFERENCE_TYPED_VALUE = {value: 'test'}
const Demo = () => {
    const [count, setCount] = useState(INITIAL_VALUE)

    // check is needed because of SSR + hydration architecture
    if (isRenderingInBrowser) message.info('RENDERING', 0.4)

    const setCountWithTheSameValue = () => setCount(INITIAL_VALUE)

    return <Space direction={'vertical'}>
        <Space>
            <Button onClick={setCountWithTheSameValue}>Click me</Button>
            <b>Count: {count}</b>
        </Space>
    </Space>
}
const demoAsString = `
    const Demo = () => {
    const [count, setCount] = useState(INITIAL_VALUE)

    // check is needed because of SSR + hydration architecture
    if (isRenderingInBrowser) message.info('RENDERING', 0.4)

    const setCountWithTheSameValue = () => setCount(INITIAL_VALUE)

    return <Space direction={'vertical'}>
        <Space>
            <Button onClick={setCountWithTheSameValue}>Click me</Button>
            <b>Count: {count}</b>
        </Space>
    </Space>
}
`

const DemoException = () => {
    const [state, setState] = useState(INITIAL_REFERENCE_TYPED_VALUE)

    // check is needed because of SSR + hydration architecture
    if (isRenderingInBrowser) message.info('RENDERING', 0.4)

    const setCountWithTheSameValue = () => setState({value: INITIAL_REFERENCE_TYPED_VALUE.value})

    return <Space direction={'vertical'}>
        <Space>
            <Button onClick={setCountWithTheSameValue}>Click me</Button>
            <b>Value: {state.value}</b>
        </Space>
    </Space>
}
const demoExceptionAsString = `
    const DemoException = () => {
    const [state, setState] = useState(INITIAL_REFERENCE_TYPED_VALUE)

    // check is needed because of SSR + hydration architecture
    if (isRenderingInBrowser) message.info('RENDERING', 0.4)

    const setCountWithTheSameValue = () => setState({value: INITIAL_REFERENCE_TYPED_VALUE.value})

    return <Space direction={'vertical'}>
        <Space>
            <Button onClick={setCountWithTheSameValue}>Click me</Button>
            <b>Value: {state.value}</b>
        </Space>
    </Space>
}
`

const NoRerenderDemoPage = () => {
    return <AppShell>
        <h1>{NoRerenderDemoPage.meta.title}</h1>
        <Demo/>
        <CodeSnippet language={CODE_LANGUAGES.JS}>
            {demoAsString}
        </CodeSnippet>
        <p>React is smart enough not to trigger a new render when the new state equals the old change...</p>
        <h2>Reference typed state</h2>
        <DemoException/>
        <CodeSnippet language={CODE_LANGUAGES.JS}>{demoExceptionAsString}</CodeSnippet>
        <p>...However: that does not go entirely for non-primitives types.</p>
    </AppShell>
}

NoRerenderDemoPage.meta = meta
export default NoRerenderDemoPage