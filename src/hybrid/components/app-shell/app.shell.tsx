import React from 'react'
import { Breadcrumb, Layout, Menu } from 'antd';
import {useDynamicClasses, useWebsiteNavigation} from './app-shell.hooks';

const { Header, Content, Footer } = Layout;
const AppShell = ({ children }: React.PropsWithChildren) => {

    const { onBreadcrumbClick, breadcrumbs, defaultSelectedKeys, mainPages } = useWebsiteNavigation()
    const { appShellClassName } = useDynamicClasses()

    const Navigation = () => <Header>
        <div className="logo"/>
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={defaultSelectedKeys}
        >
            {
                mainPages.map(page =>
                    <Menu.Item onClick={() => window.location.href = page.url} key={page.url}>{page.title}</Menu.Item>
                )}
        </Menu>
    </Header>

    return <Layout className={appShellClassName}>
        <Navigation/>
        <Content className={'breadcrumb-and-content-wrapper'}>
            <Breadcrumb className={'breadcrumb-wrapper'}>
                {breadcrumbs?.map(s => <Breadcrumb.Item onClick={onBreadcrumbClick} key={s}>{s}</Breadcrumb.Item>)}
            </Breadcrumb>
            <div className="main-content-wrapper">
                {children}
            </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ad Flumine ©2023 Created by Thomas Opdebeeck using antdesign</Footer>
    </Layout>
}

export default AppShell