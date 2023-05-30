import React, { useEffect, useRef, useState } from 'react'
import { meta } from './demo1.page.meta';
import { Typography } from 'antd';
import AppShell from '../../../../../app-shell/app.shell';
import CodeSnippet, { CODE_LANGUAGES } from '../../../../../partials/code-snippet/CodeSnippet';

const sliderWidth = 50

const calculateSlideDistance = (currentCursorCoordinates: CursorCoordinates, prevCursorCoordinates: CursorCoordinates) => {
    return currentCursorCoordinates?.x - prevCursorCoordinates?.x
}

type CursorCoordinates = {
    x: number,
    y: number
}

const calculateCursorCoordinates = (e): CursorCoordinates => ({
    x: e?.x,
    y: e?.y
})

const Demo = () => {
    const [percentage, setPercentage] = useState(20)
    const [isDragging, setIsDragging] = useState(false)
    const [prevCursorCoordinate, setPrevCursorCoordinate] = useState(null)

    const sliderContainerRef = useRef(null)
    const sliderContainerWidth = sliderContainerRef?.current?.offsetWidth
    const slidePotential = sliderContainerWidth - sliderWidth

    const handleStartDragging = () => {
        setIsDragging(true)
    }
    const handleEndDragging = () => {
        setIsDragging(false)
    }

    const handleMouseMove = (e) => {
        if(!isDragging) return

        const currentCursorCoordinate = calculateCursorCoordinates(e)

        if (!prevCursorCoordinate) {
            setPrevCursorCoordinate(currentCursorCoordinate)
            return
        }

        if (currentCursorCoordinate?.x === 0 && currentCursorCoordinate.y === 0) return

        const dragDistancePx = calculateSlideDistance(currentCursorCoordinate, prevCursorCoordinate)
        const distanceAsPercentageIncrement = dragDistancePx * 100 / slidePotential

        setPercentage(prev => {
            const newTheoreticalValue = prev + distanceAsPercentageIncrement
            return newTheoreticalValue < 0 ? 0 : newTheoreticalValue > 100 ? 100 : newTheoreticalValue
        })
        setPrevCursorCoordinate(currentCursorCoordinate)
    }

    const style = {
        left: `calc(${percentage}% - ${percentage / 100 * sliderWidth}px)`,
        width: `${sliderWidth}px`,
        cursor: isDragging ? 'grabbing' : 'grab'
    }

    const handleMouseUp = () => {
        setIsDragging(false)
        setPrevCursorCoordinate(null)
    }

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    })
    useEffect(() => {
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
        };
    })

    return <div>
        <Typography.Paragraph>👉 {percentage.toFixed(2)}%</Typography.Paragraph>
        <div ref={sliderContainerRef} className={'slider-container'}>
            <div style={style} className={'slider'} onMouseDownCapture={handleStartDragging}
                 onMouseUpCapture={handleEndDragging}/>
        </div>
    </div>
}
const demoAsString = `
        `
const UseReducerDemoPage = () => {
    return <AppShell>
        <h1>{UseReducerDemoPage.meta.title}</h1>
        <Demo/>

        <CodeSnippet language={CODE_LANGUAGES.JS}>
            {demoAsString}
        </CodeSnippet>
    </AppShell>
}

UseReducerDemoPage.meta = meta
export default UseReducerDemoPage