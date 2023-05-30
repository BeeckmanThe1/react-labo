import { useEffect, useReducer, useRef, useState } from 'react';
import { initialPercentage, sliderWidth } from './Slider.constants';
import { PercentageAction, percentageTypes } from './Slider.model';
import { calculateCursorCoordinates, calculateSlideDistance } from './Slider.utils';

const percentageReducer = (prev: number, action: PercentageAction) => {

    const getContainedValue = value => value < 0 ? 0 : value > 100 ? 100 : value

    switch (action.type) {
        case percentageTypes.SAFELY_SET: {
            return getContainedValue(action?.payload?.value)
        }
        case percentageTypes.SAFELY_INCREMENT: {
            return getContainedValue(prev + action?.payload?.value)
        }
        case percentageTypes.SET_END: {
            return 100
        }
        case percentageTypes.SET_START: {
            return 0
        }
        case percentageTypes.RESET: {
            return initialPercentage
        }
        case percentageTypes.ROUND: {
            return Math.round(prev)
        }
    }

}

export const useSlider = () => {
    const [percentage, dispatchPercentage] = useReducer(percentageReducer, initialPercentage)
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

        dispatchPercentage({ type: percentageTypes.SAFELY_INCREMENT, payload: { value: distanceAsPercentageIncrement } })
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
        dispatchPercentage
    }
}
