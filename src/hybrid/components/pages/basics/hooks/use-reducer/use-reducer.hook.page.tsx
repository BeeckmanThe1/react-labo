import React from 'react';
import { meta } from './use-reducer.page.meta'
import { PageMeta } from '../../../page.model';
import AppShell from '../../../../app-shell/app.shell';
import { List } from 'antd';
import demos from './demos/index'

const UseReducer: React.FC & { meta: PageMeta } = () => {
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
UseReducer.meta = meta

export default UseReducer