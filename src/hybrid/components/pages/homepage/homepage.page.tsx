import React from 'react';
import { PageMeta } from '../page.model';
import { meta } from './homepage.page.meta'
import AppShell from '../../app-shell/app.shell';

const Homepage: React.FC & { meta: PageMeta } = () => {
    return (
        <AppShell>
            <div className={'homepage'}>
                This is my react labo where I will document basic concepts and play around with different ways to build, manage state, test etc.
            </div>
        </AppShell>
    );
}
Homepage.meta = meta

export default Homepage