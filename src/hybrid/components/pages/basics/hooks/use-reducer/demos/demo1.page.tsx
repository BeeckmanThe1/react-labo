import React from 'react'
import { meta } from './demo1.page.meta';
import { Tabs, Card, Collapse } from 'antd';
import AppShell from '../../../../../app-shell/app.shell';
import { Slider } from './after-refactor/Slider';

const UseReducerDemoPage = () => {

    const tabItems = [
        {
            key: '1',
            label: 'Code - before refactor',
            children: <Collapse defaultActiveKey={['Component', 'useSlider']}>
                <Collapse.Panel key={'useSlider'} header={'useSlider'}>
                    USESLIDER
                </Collapse.Panel>
                <Collapse.Panel key={'Component'} header={'Component'}>
                    COMPONENT
                </Collapse.Panel>
            </Collapse>
        },
        {
            key: '2',
            label: 'Code - refactored using useReducer',
            children: <Collapse defaultActiveKey={['Component', 'useSlider']}>
                <Collapse.Panel key={'useSlider'} header={'useSlider'}>
                    USESLIDER
                </Collapse.Panel>
                <Collapse.Panel key={'Component'} header={'Component'}>
                    COMPONENT
                </Collapse.Panel>
            </Collapse>
        }
    ];
    return <AppShell>
        <h1>{UseReducerDemoPage.meta.title}</h1>
        <Card>
            <Slider/>
            <Tabs defaultActiveKey="1" items={tabItems} />
        </Card>
    </AppShell>
}

UseReducerDemoPage.meta = meta
export default UseReducerDemoPage