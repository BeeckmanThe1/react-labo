import React, {useContext, useEffect} from 'react'
import {meta} from './demo1.page.meta';
import {Typography, Collapse, Space} from 'antd';
import AppShell from "../../../../../app-shell/app.shell";
import CodeSnippet, {CODE_LANGUAGES} from "../../../../../partials/code-snippet/CodeSnippet";
import {SharedContext} from "./demo.context";

const GrandChild1 = () => {
    const sharedContext = useContext(SharedContext)
    return <Collapse defaultActiveKey={'grand-child-1'}>
        <Collapse.Panel key={'grand-child-1'} header={'Grand child 1'}>
            <Typography.Paragraph>{sharedContext.message}</Typography.Paragraph>
        </Collapse.Panel>
    </Collapse>
}
const Child1 = ({children}) => {
    const sharedContext = useContext(SharedContext)

    return <Collapse defaultActiveKey={'child-1'}>
        <Collapse.Panel key={'child-1'} header={'Child 1'}>
            <Typography.Paragraph>{sharedContext.message}</Typography.Paragraph>
            {children}
        </Collapse.Panel>
    </Collapse>
}
const Child2 = () => {
    const sharedContext = useContext(SharedContext)

    return <Collapse defaultActiveKey={'child-2'}>
        <Collapse.Panel key={'child-2'} header={'Child 2'}>
            <Typography.Paragraph>{sharedContext.message}</Typography.Paragraph>
        </Collapse.Panel>
    </Collapse>
}
const Child3 = () => {
    const sharedContext = useContext(SharedContext)

    return <Collapse defaultActiveKey={'child-3'}>
        <Collapse.Panel key={'child-3'} header={'Child 3'}>
            <Typography.Paragraph>{sharedContext.message}</Typography.Paragraph>
        </Collapse.Panel>
    </Collapse>
}

const Demo = () => {
    const sharedState = {
        message: '👉 All children have access to this without propdrilling'
    }
    return <SharedContext.Provider value={sharedState}>
        <Collapse defaultActiveKey={'demo'}>
            <Collapse.Panel key={'demo'} header={'Demo'}>
                <Space direction={'vertical'}>
                    <Demo.children.Child1>
                        <Demo.children.Child1.children.GrandChild1/>
                    </Demo.children.Child1>
                    <Demo.children.Child2/>
                    <Demo.children.Child3/>
                </Space>
            </Collapse.Panel>
        </Collapse>
    </SharedContext.Provider>
}

Child1.children = {
    GrandChild1
}
Demo.children = {
    Child1,
    Child2,
    Child3,
}


const contextCodeString = `
import {createContext} from "react";

export const SharedContext = createContext<{message: string}>(null)

        `
const contextProviderString = `
<SharedContext.Provider value={sharedState}>
        <Collapse defaultActiveKey={'demo'}>
            <Collapse.Panel key={'demo'} header={'Demo'}>
                <Space direction={'vertical'}>
                    <Demo.children.Child1>
                        <Demo.children.Child1.children.GrandChild1/>
                    </Demo.children.Child1>
                    <Demo.children.Child2/>
                    <Demo.children.Child3/>
                </Space>
            </Collapse.Panel>
        </Collapse>
</SharedContext.Provider>

        `
const contextUsageString = `
const Child3 = () => {
    const sharedContext = useContext(SharedContext)

    return <Collapse defaultActiveKey={'child-3'}>
        <Collapse.Panel key={'child-3'} header={'Child 3'}>
            <Typography.Paragraph>{sharedContext.message}</Typography.Paragraph>
        </Collapse.Panel>
    </Collapse>
}
        `

const UseContextDemoPage = () => {
    return <AppShell>
        <Typography.Title level={2}>{UseContextDemoPage.meta.title}</Typography.Title>
        <Demo/>

        <Typography.Text>Firstly, create and export the context to be used for all the ancestors, using
            createContext:</Typography.Text>
        <CodeSnippet language={CODE_LANGUAGES.JS}>
            {contextCodeString}
        </CodeSnippet>
        <Typography.Text>Use this context at the root:</Typography.Text>
        <CodeSnippet language={CODE_LANGUAGES.JS}>
            {contextProviderString}
        </CodeSnippet>
        <Typography.Text>Now any ancestor can use the shared context by using the useContext hook:</Typography.Text>
        <CodeSnippet language={CODE_LANGUAGES.JS}>
            {contextUsageString}
        </CodeSnippet>
    </AppShell>
}

UseContextDemoPage.meta = meta
export default UseContextDemoPage