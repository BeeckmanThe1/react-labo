export type CursorCoordinates = {
    x: number,
    y: number
}
export const percentageTypes = {
    SAFELY_SET: 'safely-set',
    SAFELY_INCREMENT: 'safely-increment',
    RESET: 'reset',
    SET_START: 'set-start',
    SET_END: 'set-end',
    ROUND: 'round'
} as const
type ValueOf<T> = T[keyof T]
export type PercentageAction = {
    type: ValueOf<typeof percentageTypes>,
    payload?: {
        value: number
    }
}

