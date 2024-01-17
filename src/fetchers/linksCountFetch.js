import { obfusicateValue } from "../dataManipulation/stringBuilders/obfusicator.js"
import { axiosGet } from "../wrappers/axiosWrapper.js"

/** fetches the number of image links the instrument has. returns 0 in case the request fails. */
export async function getLinksCount(route, instrumentData) {
    let obfusicatedInstrumentId = obfusicateValue(instrumentData.PrimaryKeyValue)

    try {
        const res = await axiosGet(`${route}?id=${obfusicatedInstrumentId}`)
        return res.data
    }
    
    catch (e) {
        console.error(`failed to find the links count for instrument.`)
        console.error(instrumentData)
        console.error(e)
    }

    return 0
}