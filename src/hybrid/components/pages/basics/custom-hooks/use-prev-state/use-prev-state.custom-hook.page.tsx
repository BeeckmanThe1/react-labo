import React from 'react';
import { meta } from './use-prev-state.custom-hook.page.meta'
import { PageMeta } from '../../../page.model';
import AppShell from '../../../../app-shell/app.shell';
import { List } from 'antd';
import demos from './demos/index'

const UsePrevState: React.FC & { meta: PageMeta } = () => {
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
UsePrevState.meta = meta

export default UsePrevState