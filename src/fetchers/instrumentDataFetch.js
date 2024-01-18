import { obfusicateValue } from "../dataManipulation/stringBuilders/obfusicator.js"
import { axiosGet } from "../wrappers/axiosWrapper.js"

/** gets the data about a specific instrument. returns undefined if it fails to fetch. */
export async function getInstrumentData(route, instrument) {
    if (!instrument.gin || typeof instrument.gin !== "string") {
        console.error({
            msg: `cannot get details about instrument because it's missing a gin`,
            data: instrument
        })
        return
    }

    const today = new Date(Date.now())
    const gin = obfusicateValue(instrument.gin)
    const access_key = gin + "!0" + "-" + today.getMinutes() + "-" + today.getSeconds()

    try {
        let res = await axiosGet(route, {
            params: {
                access_key
            }
        })

        return res.data
    }

    catch(e) {
        console.error({
            msg: `failed to fetch instrument data`,
            data: instrument,
            err: e
        })
    }
}