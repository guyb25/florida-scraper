export function parseInstrumentNumber(data) {
    if (!data.InstrumentNumber) {
        console.error({
            msg: `instrument is missing InstrumentNumber field`,
            data: data
        })

        return 'N/A'
    }

    return data.InstrumentNumber
}