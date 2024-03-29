export function parseTimestamp(data) {
    let date

    if (data.CreateDate && typeof data.CreateDate === 'string') {
        date = data.CreateDate
    } else if (data.FileDate && typeof data.FileDate === 'string') {
        date = data.FileDate
    }

    if (date) {
        // example value: /Date(1674018000000)/
        const match = date.match(/\/Date\((\d+)\)\//)
        if (match) {
            return parseInt(match[1])
        }
    }

    console.error({
        msg: `Failed to parse timestamp for instrument`,
        data: data
    })
    
    return 'N/A'    
}