import { CursorCoordinates } from './Slider.model';

export const calculateCursorCoordinates = (e): CursorCoordinates => ({
    x: e?.x,
    y: e?.y
})
export const calculateSlideDistance = (currentCursorCoordinates: CursorCoordinates, prevCursorCoordinates: CursorCoordinates) => {
    return currentCursorCoordinates?.x - prevCursorCoordinates?.x
}
