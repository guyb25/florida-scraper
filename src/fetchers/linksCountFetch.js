import { obfusicateValue } from "../dataManipulation/stringBuilders/obfusicator.js"
import { axiosGet } from "../wrappers/axiosWrapper.js"

/** fetches the number of image links the instrument has. returns 0 in case the request fails. */
export async function getLinksCount(route, instrumentData) {
    if (!instrumentData.PrimaryKeyValue) {
        console.warn({
            msg: `cannot get links count for instrument because it's missing a PrimaryKeyValue field`,
            data: instrumentData
        })

        return 0
    }
    
    let obfusicatedInstrumentId = obfusicateValue(instrumentData.PrimaryKeyValue)

    try {
        const res = await axiosGet(`${route}?id=${obfusicatedInstrumentId}`)
        return res.data
    }
    
    catch (e) {
        console.error({
            msg: `failed to fetch link count from server`,
            data: instrumentData,
            err: e
        })
    }

    return 0
}