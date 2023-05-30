import { useEffect, useRef, useState } from 'react';
import { initialPercentage, sliderWidth } from './Slider.constants';
import { calculateCursorCoordinates, calculateSlideDistance } from './Slider.utils';

export const useSlider = () => {
    const [percentage, setPercentage] = useState(initialPercentage)
    const [isDragging, setIsDragging] = useState(false)
    const [prevCursorCoordinate, setPrevCursorCoordinate] = useState(null)

    const sliderContainerRef = useRef(null)
    const sliderContainerWidth = sliderContainerRef?.current?.offsetWidth
    const slidePotential = sliderContainerWidth - sliderWidth

    const handleStartDragging = () => {
        setIsDragging(true)
    }
    const handleDragging = (e) => {
        if (!isDragging) return

        const currentCursorCoordinate = calculateCursorCoordinates(e)

        if (!prevCursorCoordinate) {
            setPrevCursorCoordinate(currentCursorCoordinate)
            return
        }

        const dragDistancePx = calculateSlideDistance(currentCursorCoordinate, prevCursorCoordinate)
        const distanceAsPercentageIncrement = dragDistancePx * 100 / slidePotential

        setPercentage(prev => {
            const newTheoreticalValue = prev + distanceAsPercentageIncrement
            return newTheoreticalValue < 0 ? 0 : newTheoreticalValue > 100 ? 100 : newTheoreticalValue
        })
        setPrevCursorCoordinate(currentCursorCoordinate)
    }
    const handleStopDragging = () => {
        setIsDragging(false)
        setPrevCursorCoordinate(null)
    }

    useEffect(() => {
        window.addEventListener('mousemove', handleDragging);
        return () => {
            window.removeEventListener('mousemove', handleDragging);
        };
    })
    useEffect(() => {
        window.addEventListener('mouseup', handleStopDragging);
        return () => {
            window.removeEventListener('mouseup', handleStopDragging);
        };
    })

    return {
        handleStartDragging,
        percentage,
        isDragging,
        sliderContainerRef,
        setPercentage
    }
}
