import { obfusicateValue } from "../dataManipulation/stringBuilders/obfusicator.js"
import { axiosGet } from "../wrappers/axiosWrapper.js"

/** gets the data about a specific instrument. returns an empty object if it fails to fetch. */
export async function getInstrumentData(route, instrument) {
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

    catch(err) {
        console.error(`failed to fetch data for instrument: ${instrument}`)
    }

    return {}
}