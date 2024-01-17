import { obfusicateValue } from "./obfusicator.js"

export function buildImgLinks(route, instrumentData, count) {
    let obfusicatedInstrumentId = obfusicateValue(instrumentData.PrimaryKeyValue)

    let imageUrls = []

    for (let i = 0; i < count; i++) {
        imageUrls.push(`${route}/undefined,${obfusicatedInstrumentId},${i}`)
    }

    return imageUrls
}