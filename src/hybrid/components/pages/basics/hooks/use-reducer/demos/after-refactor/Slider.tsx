import { Button, Space, Typography } from 'antd';
import React from 'react';
import { useSlider } from './Slider.hooks';
import { sliderWidth } from './Slider.constants';
import { percentageTypes } from './Slider.model'

export const Slider = () => {
    const { percentage, handleStartDragging, isDragging, sliderContainerRef, dispatchPercentage } = useSlider()

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
            <Button onClick={() => dispatchPercentage({ type: percentageTypes.SET_START })}>Go to start</Button>
            <Button onClick={() => dispatchPercentage({ type: percentageTypes.RESET })}>Reset</Button>
            <Button onClick={() => dispatchPercentage({
                type: percentageTypes.SAFELY_INCREMENT,
                payload: { value: -5 }
            })}>-5%</Button>
            <Button onClick={() => dispatchPercentage({
                type: percentageTypes.SAFELY_INCREMENT,
                payload: { value: 5 }
            })}>+5%</Button>
            <Button onClick={() => dispatchPercentage({ type: percentageTypes.ROUND })}>Round up</Button>
            <Button onClick={() => dispatchPercentage({ type: percentageTypes.SET_END })}>Go to end</Button>
        </Space>
    </div>
}
