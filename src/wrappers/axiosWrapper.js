import axios from "axios"
export async function axiosGet(route, options) {
    let res = await axios.get(route, options)

    if (!res) {
        console.error(`request to ${route} failed`)
    }

    if (res.data && typeof res.data === 'string' && JSON.parse(res.data).Error) {
        throw new Error(res.data)
    }

    return res
}