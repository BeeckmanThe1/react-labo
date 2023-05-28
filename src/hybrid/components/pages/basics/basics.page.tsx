import React from 'react';
import { PageMeta } from '../page.model';
import { meta } from './basics.page.meta'
import AppShell from '../../app-shell/app.shell';
import basics from './index';
import { List } from 'antd';


const Basics: React.FC & { meta: PageMeta } = () => {
    const basicMetas = basics.map(d => d.default.meta)

    return <AppShell>
        <List
            itemLayout="horizontal"
            dataSource={basicMetas}
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
Basics.meta = meta

export default Basics