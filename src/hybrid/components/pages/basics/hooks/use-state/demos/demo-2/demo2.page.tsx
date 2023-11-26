import React, {useState} from 'react'
import {meta} from './demo2.page.meta';
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
        <p><a href={'https://react.dev/learn/state-as-a-snapshot#rendering-takes-a-snapshot-in-time'}>Read more</a></p>
    </AppShell>
}

UseStateDemo2Page.meta = meta
export default UseStateDemo2Page