export function parseInstrumentType(data) {
    if (!data.InstrumentType || !data.InstrumentType.Description) {
        console.error({
            msg: `Failed to parse instrument type for instrument`,
            data: data
        })
        return 'N/A'
    }

    return data.InstrumentType.Description
}