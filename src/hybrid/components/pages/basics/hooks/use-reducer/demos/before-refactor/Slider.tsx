import { Button, Space, Typography } from 'antd';
import React from 'react';
import { useSlider } from './Slider.hooks';
import { initialPercentage, sliderWidth } from './Slider.constants';
import { getContainedValue } from './Slider.utils';

export const Slider = () => {
    const { percentage, handleStartDragging, isDragging, sliderContainerRef, setPercentage } = useSlider()

    const style = {
        left: `calc(${percentage}% - ${percentage / 100 * sliderWidth}px)`,
        width: `${sliderWidth}px`,
        cursor: isDragging ? 'grabbing' : 'grab'
    }

    return <div className={'demo-use-reducer'}>
        <Typography.Paragraph>👉 {percentage.toFixed(2)}%</Typography.Paragraph>
        <div ref={sliderContainerRef} className={'slider-container'}>
            <div style={style} className={'slider'} onMouseDown={handleStartDragging}/>
        </div>
        <Space>
            <Button onClick={() => setPercentage(0)}>Go to start</Button>
            <Button onClick={() => setPercentage(initialPercentage)}>Reset</Button>
            <Button onClick={() => setPercentage(prev => getContainedValue(prev - 5))}>-5%</Button>
            <Button onClick={() => setPercentage(prev => getContainedValue(prev + 5))}>+5%</Button>
            <Button onClick={() => setPercentage(prev => Math.round(prev))}>Round up</Button>
            <Button onClick={() => setPercentage(100)}>Go to end</Button>
        </Space>
    </div>
}