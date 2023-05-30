import { CursorCoordinates } from './Slider.model';

export const calculateCursorCoordinates = (e): CursorCoordinates => ({
    x: e?.x,
    y: e?.y
})
export const calculateSlideDistance = (currentCursorCoordinates: CursorCoordinates, prevCursorCoordinates: CursorCoordinates) => {
    return currentCursorCoordinates?.x - prevCursorCoordinates?.x
}

export const getContainedValue = value => value < 0 ? 0 : value > 100 ? 100 : value