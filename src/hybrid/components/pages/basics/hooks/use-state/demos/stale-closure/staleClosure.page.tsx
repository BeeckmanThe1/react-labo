import React, {useEffect, useState} from 'react'
import {meta} from './staleClosure.page.meta';
import {Space, message} from 'antd';
import AppShell from '../../../../../../app-shell/app.shell';
import CodeSnippet, {CODE_LANGUAGES} from '../../../../../../partials/code-snippet/CodeSnippet';
import {clearInterval} from "timers";

const isRenderingInBrowser = typeof window !== 'undefined'
const Demo = () => {
    const [count, setCount] = useState(0)

    // check is needed because of SSR + hydration architecture
    if (isRenderingInBrowser) message.info('RENDERING', 0.4)

    useEffect(() => {
        setInterval(() => {
            console.log('Interval function running every second?')
            setCount(count + 1)
        }, 1000)
    }, []);

    return <Space direction={'vertical'}>
        <Space>
            <b>Count: {count}</b>
        </Space>
    </Space>
}
const demoAsString = `
        const Demo = () => {
    const [count, setCount] = useState(0)

    // check is needed because of SSR + hydration architecture
    if (isRenderingInBrowser) message.info('RENDERING', 0.4)

    useEffect(() => {
        // Closure:
        setInterval(() => {
            console.log('Interval function running every second?')
            setCount(count + 1)
        }, 1000)
    }, []);

    return <Space direction={'vertical'}>
        <Space>
            <b>Count: {count}</b>
        </Space>
    </Space>
}
`
const DemoWrongSolution = () => {
    const [count, setCount] = useState(0)

    // check is needed because of SSR + hydration architecture
    if (isRenderingInBrowser) message.info('RENDERING', 0.4)

    useEffect(() => {
        if(isRenderingInBrowser){
            const interval = window.setInterval(() => {
                console.log('Interval function running every second?')
                setCount(count + 1)
            }, 1000)
            return () => window.clearInterval(interval)
        }
    }, [count]);

    return <Space direction={'vertical'}>
        <Space>
            <b>Count: {count}</b>
        </Space>
    </Space>
}
const demoWrongSolutionAsString = `
    const DemoWrongSolution = () => {
    const [count, setCount] = useState(0)

    // check is needed because of SSR + hydration architecture
    if (isRenderingInBrowser) message.info('RENDERING', 0.4)

    useEffect(() => {
        if(isRenderingInBrowser){
            const interval = window.setInterval(() => {
                console.log('Interval function running every second?')
                setCount(count + 1)
            }, 1000)
            return () => window.clearInterval(interval)
        }
    }, [count]);

    return <Space direction={'vertical'}>
        <Space>
            <b>Count: {count}</b>
        </Space>
    </Space>
}
`

const DemoSolution = () => {
    const [count, setCount] = useState(0)

    // check is needed because of SSR + hydration architecture
    if (isRenderingInBrowser) message.info('RENDERING | solution demo', 0.4)

    useEffect(() => {
        if(isRenderingInBrowser){
            window.setInterval(() => {
                console.log('Interval function running every second?')
                setCount(prev => prev + 1)
            }, 1000)
        }
    }, []);

    return <Space direction={'vertical'}>
        <Space>
            <b>Count: {count}</b>
        </Space>
    </Space>
}
const demoSolutionAsString = `
    const DemoSolution = () => {
    const [count, setCount] = useState(0)

    // check is needed because of SSR + hydration architecture
    if (isRenderingInBrowser) message.info('RENDERING | solution demo', 0.4)

    useEffect(() => {
        if(isRenderingInBrowser){
            window.setInterval(() => {
                console.log('Interval function running every second?')
                setCount(prev => prev + 1)
            }, 1000)
        }
    }, []);

    return <Space direction={'vertical'}>
        <Space>
            <b>Count: {count}</b>
        </Space>
    </Space>
}
`
const StaleClosurePage = () => {
    return <AppShell>
        <h1>{StaleClosurePage.meta.title}</h1>
        <Demo/>
        <CodeSnippet language={CODE_LANGUAGES.JS}>
            {demoAsString}
        </CodeSnippet>
        <p> Closures in JS: when we pass a function using a variable defined OUTSIDE the function scope, wel call that a
            closure. Instead of recreating the function that is passed, it will just use the value on initialization,
            which can be unexpected.</p>
        <DemoWrongSolution/>
        <CodeSnippet language={CODE_LANGUAGES.JS}>{demoWrongSolutionAsString}</CodeSnippet>
        <p>Note: if we forget to cleanup after ourselves, eg: clear the interval,we'll notice very fishy behavior soon!</p>
        <DemoSolution/>
        <CodeSnippet language={CODE_LANGUAGES.JS}>{demoSolutionAsString}</CodeSnippet>
        <p>It's always better to get as few dependencies as possible in the dependency array of useEffects, useMemo and useCallbacks</p>
    </AppShell>
}

StaleClosurePage.meta = meta
export default StaleClosurePage