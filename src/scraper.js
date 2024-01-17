import { getInstrumentData } from "./fetchers/instrumentDataFetch.js"
import { getLinksCount } from "./fetchers/linksCountFetch.js"
import { getInstrumentsList } from "./fetchers/instrumentsListFetch.js"
import { parseTimestamp } from "./dataManipulation/parsers/timestampParser.js"
import { parseInstrumentNumber } from "./dataManipulation/parsers/instrumentNumberParser.js"
import { parseInstrumentType } from "./dataManipulation/parsers/instrumentTypeParser.js"
import { parseFrom, parseTo } from "./dataManipulation/parsers/instrumentPartyInfoParser.js"
import { buildImgLinks } from "./dataManipulation/stringBuilders/imgLinkBuilder.js"
import { urlConfig } from "./config/urlConfig.js"

export async function scrape(props) {
    const records = await getInstrumentsList(urlConfig.criteriaSearchUrl, {
        full_name: `${props.lastname}, ${props.firstname}`,
        file_date_start: props.fromDate,
        file_date_end: props.thruDate,
    })

    if (!records) {
        return []
    }

    // it's possible to take advantage of parallel report building here, but the rate limiter is the real limit here rather than synchronous execution
    let reports = []
    for (const record of records) {
        let report = await buildReport(record)

        if (report) {
            reports.push(report)
        }
    }

    console.log(reports)
}

async function buildReport(record) {
    let data = await getInstrumentData(urlConfig.loadInstrumentUrl, record)

    if (!data) {
        return
    }

    let filesCount = await getLinksCount(urlConfig.linksCountUrl, data)
    let imgLinks = buildImgLinks(urlConfig.imageLinkUrl, data, filesCount)

    return {
        instrument_number: parseInstrumentNumber(data),
        from: parseFrom(data),
        to: parseTo(data),
        record_date: parseTimestamp(data),
        doc_type: parseInstrumentType(data),
        image_links: imgLinks
    }
}