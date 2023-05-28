import React, { useState } from 'react'
import { meta } from './demo1.page.meta';
import { Button } from 'antd';
import AppShell from "../../../../../app-shell/app.shell";

const UseContextDemo1 = () => {
    const [count1, setCount1] = useState(0)
    const [count2, setCount2] = useState(0)

    if(typeof window !== 'undefined') window?.alert('RENDER')

    const bumpCount1 = () => setCount1(prev => prev + 1)
    const bumpCount2 = () => setCount2(prev => prev + 1)

    return <AppShell>
        <h1>{UseContextDemo1.meta.title}</h1>
        <div>
            <div>
                <Button onClick={bumpCount1}>Click me</Button>
                <b>Count 1: {count1}</b>
            </div>
            <div>
                <Button onClick={bumpCount2}>Click me</Button>
                <b>Count 2: {count2}</b>
            </div>
        </div>
    </AppShell>
}

UseContextDemo1.meta = meta
export default UseContextDemo1