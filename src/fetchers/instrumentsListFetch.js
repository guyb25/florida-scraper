import { axiosGet } from "../wrappers/axiosWrapper.js"

export async function getInstrumentsList(url, criteria) {
    const criteriaArray = encodeURIComponent(JSON.stringify([criteria]))
    const finalUrl = `${url}?criteria_array=${criteriaArray}`

    try {
        const response = await axiosGet(finalUrl)
        return response.data
    }

    catch (e) {
        console.error({
            msg: `failed to fetch instrument list`,
            err: e
        })
    }
}