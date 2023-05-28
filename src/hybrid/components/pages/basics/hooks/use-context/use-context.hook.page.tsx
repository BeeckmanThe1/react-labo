import React from 'react';
import { meta } from './use-context.page.meta'
import { PageMeta } from '../../../page.model';
import Demo1 from './demos/demo1.page';
import AppShell from '../../../../app-shell/app.shell';
import { List } from 'antd';
import demos from './demos/index'

const UseState: React.FC & { meta: PageMeta } = () => {
    const demoMetas = demos.map(d => d.default.meta)

    return <AppShell>
        <List
            itemLayout="horizontal"
            dataSource={demoMetas}
            renderItem={(item: PageMeta) => (
                <List.Item>
                    <List.Item.Meta
                        title={<a href={item.url}>{item.title}</a>}
                        description={item.metaDescription}
                    />
                </List.Item>
            )}
        />
    </AppShell>
}
UseState.meta = meta

export default UseState