import React, {useState} from 'react'
import {meta} from './bulkUpdates.page.meta';
import {Button, Space, message} from 'antd';
import AppShell from '../../../../../../app-shell/app.shell';
import CodeSnippet, {CODE_LANGUAGES} from '../../../../../../partials/code-snippet/CodeSnippet';

const isRenderingInBrowser = typeof window !== 'undefined'
const Demo = () => {
    const [count, setCount] = useState(0)

    // check is needed because of SSR + hydration architecture
    if (isRenderingInBrowser) message.info('RENDERING', 0.4)

    const bumpCount = () => {
        setCount(count + 1)
        setCount(count + 1)
        setCount(count + 1)
    }

    return <Space direction={'vertical'}>
        <Space>
            <Button onClick={bumpCount}>Bump me thrice?</Button>
            <b>Count: {count}</b>
        </Space>
    </Space>
}
const DemoSolution = () => {
    const [count, setCount] = useState(0)

    // check is needed because of SSR + hydration architecture
    if (isRenderingInBrowser) message.info('RENDERING', 0.4)

    const bumpCount = () => {
        setCount(prev => prev + 1)
        setCount(prev => prev + 1)
        setCount(prev => prev + 1)
    }

    return <Space direction={'vertical'}>
        <Space>
            <Button onClick={bumpCount}>Bump me thrice!</Button>
            <b>Count: {count}</b>
        </Space>
    </Space>
}

const CombinedDemo1 = () => {
    const [count, setCount] = useState(0)

    // check is needed because of SSR + hydration architecture
    if (isRenderingInBrowser) message.info('RENDERING', 0.4)

    const bumpCount = () => {
        setCount(prev => prev + 1) // prev is state from prev render -> 0 so we get 0 + 1 -> 1
        setCount(_prev => count + 1) // count is the snapshotted state value from prev render -> 0, so we get 0 + 1 -> 1
        setCount(prev => prev + 1) // prev is the up-to-date state value; the value we calculated previous line -> 1, so we get: 1 + 1 -> 2
        setCount(_prev => count + 1) // count is the snapshotted state value from prev render -> 0, so we get 0 + 1 -> 1
        setCount(prev => prev + 1) // prev is the up-to-date state value; the value we calculated previous line -> 1, so we get: 1 + 1 -> 2
    }

    return <Space direction={'vertical'}>
        <Space>
            <Button onClick={bumpCount}>Bump me ... ? 🥴</Button>
            <b>Count: {count}</b>
        </Space>
    </Space>
}

const demoAsString = `
const Demo = () => {
    const [count, setCount] = useState(0)

    // check is needed because of SSR + hydration architecture
    if (isRenderingInBrowser) message.info('RENDERING', 0.4)

    const bumpCount = () => {
        setCount(count + 1)
        setCount(count + 1)
        setCount(count + 1)
    }

    return <Space direction={'vertical'}>
        <Space>
            <Button onClick={bumpCount}>Bump me thrice?</Button>
            <b>Count: {count}</b>
        </Space>
    </Space>
}
`
const demoSolutionAsString = `
const DemoSolution = () => {
    const [count, setCount] = useState(0)

    // check is needed because of SSR + hydration architecture
    if (isRenderingInBrowser) message.info('RENDERING', 0.4)

    const bumpCount = () => {
        setCount(prev => prev + 1)
        setCount(prev => prev + 1)
        setCount(prev => prev + 1)
    }

    return <Space direction={'vertical'}>
        <Space>
            <Button onClick={bumpCount}>Bump me thrice!</Button>
            <b>Count: {count}</b>
        </Space>
    </Space>
}
`
const combinedDemo1AsString = `
    const CombinedDemo1 = () => {
    const [count, setCount] = useState(0)

    // check is needed because of SSR + hydration architecture
    if (isRenderingInBrowser) message.info('RENDERING', 0.4)

    const bumpCount = () => {
        setCount(prev => prev + 1) // prev is state from prev render -> 0 so we get 0 + 1 -> 1
        setCount(_prev => count + 1) // count is the snapshotted state value from prev render -> 0, so we get 0 + 1 -> 1
        setCount(prev => prev + 1) // prev is the up-to-date state value; the value we calculated previous line -> 1, so we get: 1 + 1 -> 2
        setCount(_prev => count + 1) // count is the snapshotted state value from prev render -> 0, so we get 0 + 1 -> 1
        setCount(prev => prev + 1) // prev is the up-to-date state value; the value we calculated previous line -> 1, so we get: 1 + 1 -> 2
    }

    return <Space direction={'vertical'}>
        <Space>
            <Button onClick={bumpCount}>Bump me ... ? 🥴</Button>
            <b>Count: {count}</b>
        </Space>
    </Space>
}
`

const UseStateDemo2Page = () => {
    return <AppShell>
        <h1>{UseStateDemo2Page.meta.title}</h1>
        <Demo/>

        <CodeSnippet language={CODE_LANGUAGES.JS}>
            {demoAsString}
        </CodeSnippet>

        <h2>Explanation</h2>
        <p>
            We could expect 3 re-renders, happening immediately after each other, but that's not what's happening.
            State variables might look like regular JavaScript variables that you can read and write to. However, state
            behaves more like a snapshot. Setting it does not change the state variable you already have, but instead
            triggers a re-render, using a snapshot of the previous state.
        </p>

        <p>
            <strong>EG:</strong>
            <ul>
                <li>setCount(count + 1) 👉 firstClick: setCount(1), secondClick: setCount(2), ...</li>
                <li>setCount(count + 1) 👉 firstClick: setCount(1), secondClick: setCount(2), ...</li>
                <li>setCount(count + 1) 👉 firstClick: setCount(1), secondClick: setCount(2), ...</li>
            </ul>
        </p>

        <h2>"Solution"</h2>
        <DemoSolution/>
        <CodeSnippet language={CODE_LANGUAGES.JS}>{demoSolutionAsString}</CodeSnippet>
        <h2>Explanation</h2>
        <p>
            <strong> NOTE:</strong>
            <ul>
                <li>Page is still only rerendered ONCE per click</li>
                <li>the callback you pass in the setState gets called with the up-to-date state as opposed to the
                    previous snapshot state from previous render
                </li>
            </ul>
        </p>
        <h2>Mix it up</h2>
        <CombinedDemo1/>
        <CodeSnippet language={CODE_LANGUAGES.JS}>{combinedDemo1AsString}</CodeSnippet>
        <h2>Conclusion</h2>
        <ul>
            <li>Bulk state changes will trigger only ONE rerender</li>
            <li>Use the callback-approach if you need the prev state</li>
        </ul>
        <p><a target={'_blank'} href={'https://react.dev/learn/state-as-a-snapshot#rendering-takes-a-snapshot-in-time'}>Read more</a></p>
    </AppShell>
}

UseStateDemo2Page.meta = meta
export default UseStateDemo2Page