import React from 'react';
import { PageMeta } from '../../page.model';
import { meta } from './hooks.basics.page.meta'
import AppShell from '../../../app-shell/app.shell';
import { List } from 'antd';
import hooks from './index';


const Hooks: React.FC & { meta: PageMeta } = () => {
    const hookMetas = hooks.map(d => d.default.meta)

    return <AppShell>
        <List
            itemLayout="horizontal"
            dataSource={hookMetas}
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
Hooks.meta = meta

export default Hooks