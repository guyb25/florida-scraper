export function parseInstrumentNumber(data) {
    if (!data.InstrumentNumber) {
        console.error(`Can't parse instrument number for ${data}`)
        return 'N/A'
    }

    return data.InstrumentNumber
}