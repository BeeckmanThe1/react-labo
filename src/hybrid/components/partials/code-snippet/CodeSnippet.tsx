import React from 'react';
import { message } from 'antd';

export type ValueOf<T> = T[keyof T]
export const CODE_LANGUAGES = {
    JS: 'JS'
} as const

const CodeSnippet = ({ language, children }: { language: ValueOf<typeof CODE_LANGUAGES>, children: React.ReactNode }) => {

    const copyCodeSnippet = async () => {
        try {
            // if (typeof window === 'undefined') return
            await navigator.clipboard.writeText(children.toString())
            message.success('Copied code snippet')
        } catch (e) {
            message.error('Copied code snippet failed')
        }
    }

        return <pre className={'code-badge-pre'}>
        <div className="code-badge">
            <span onClick={copyCodeSnippet}>{language}</span>
            <span onClick={copyCodeSnippet}><i className="fa fa-copy code-badge-copy-icon"></i></span>
     </div>
        <code>
            {children}
        </code>
    </pre>
    }

    export default CodeSnippet