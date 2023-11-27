import React, {useEffect, useRef, useState} from 'react'
import { meta } from './demo-1.page.meta';
import { Button, Space, message } from 'antd';
import AppShell from '../../../../../../app-shell/app.shell';
import CodeSnippet, { CODE_LANGUAGES } from '../../../../../../partials/code-snippet/CodeSnippet';

const isRenderingInBrowser = typeof window !== 'undefined'
const usePrevious = (value) => {
    const ref = useRef();

    // This is called AFTER every render; since we're using a REF, it does NOT trigger a rerender
    useEffect(() => {
        console.log('usePrevious effect')
        ref.current = value;
    });

    // this is called JUST BEFORE we render the parent component
    console.log('Rendering usePrevious')
    console.log('value', value) // on initial load: initial value, EG: 0
    console.log('ref.current', ref.current) // on initial load: ref.current is undefined, since we do not give an initial value

    return ref.current;
};
const Demo = () => {
    const [count, setCount] = useState(0)
    const prevCount = usePrevious(count)

    // check is needed because of SSR + hydration architecture
    if (isRenderingInBrowser) message.info('RENDERING', 0.4)

    const bumpCount = () => setCount(prev => prev + 1)
    const goBack = () => setCount(prevCount)

    return <Space direction={'vertical'}>
        <Space>
            <b>Prev count: {prevCount}</b>
            <b>Current count: {count}</b>
            <Button onClick={bumpCount}>Bump count</Button>
            <Button onClick={goBack}>Set previous</Button>
        </Space>
    </Space>
}
const demoAsString = `
const usePrevious = (value) => {
    const ref = useRef();

    // This is called AFTER every render; since we're using a REF, it does NOT trigger a rerender
    useEffect(() => {
        ref.current = value;
    });

    if(isRenderingInBrowser) {
        console.log('Rendering usePRevious')
        console.log('value', value) // on initial load: initial value, EG: 0
        console.log('ref.current', ref.current) // on initial load: ref.current is undefined, since we do not give an initial value
    }
    return ref.current;
};
const Demo = () => {
    const [count, setCount] = useState(0)
    const prevCount = usePrevious(count)

    // check is needed because of SSR + hydration architecture
    if (isRenderingInBrowser) message.info('RENDERING', 0.4)

    const bumpCount = () => setCount(prev => prev + 1)
    const goBack = () => setCount(prevCount)

    return <Space direction={'vertical'}>
        <Space>
            <b>Prev count: {prevCount}</b>
            <b>Current count: {count}</b>
            <Button onClick={bumpCount}>Bump count</Button>
            <Button onClick={goBack}>Set previous</Button>
        </Space>
    </Space>
}
`
const UsePrevStatePage = () => {
    return <AppShell>
        <h1>{UsePrevStatePage.meta.title}</h1>
        <Demo/>

        <CodeSnippet language={CODE_LANGUAGES.JS}>
            {demoAsString}
        </CodeSnippet>
        <p>Note: the code is self-explanatory</p>
    </AppShell>
}

UsePrevStatePage.meta = meta
export default UsePrevStatePage