export function parseInstrumentType(data) {
    if (!data.InstrumentType || !data.InstrumentType.Description) {
        console.error(`Failed to parse instrument type for ${data}`)
        return 'N/A'
    }

    return data.InstrumentType.Description
}