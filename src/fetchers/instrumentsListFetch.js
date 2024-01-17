import { axiosGet } from "../wrappers/axiosWrapper.js"

export async function getInstrumentsList(url, criteria) {
    const criteriaArray = encodeURIComponent(JSON.stringify([criteria]))
    const finalUrl = `${url}?criteria_array=${criteriaArray}`

    try {
        const response = await axiosGet(finalUrl)
        return response.data
    }

    catch (e) {
        console.error(`failed to fetch any data from the server. error: ${e}`)
    }
}