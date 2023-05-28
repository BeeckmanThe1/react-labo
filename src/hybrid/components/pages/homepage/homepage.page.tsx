import React from 'react';
import { PageMeta } from '../page.model';
import { meta } from './homepage.page.meta'
import AppShell from '../../app-shell/app.shell';

const Homepage: React.FC & { meta: PageMeta } = () => {
    return (
        <AppShell>
            <div className={'hompage'}/>
        </AppShell>
    );
}
Homepage.meta = meta

export default Homepage