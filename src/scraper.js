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
    const instrumentsList = await getInstrumentsList(urlConfig.criteriaSearchUrl, {
        full_name: `${props.lastname}, ${props.firstname}`,
        file_date_start: props.fromDate,
        file_date_end: props.thruDate,
    })

    if (!instrumentsList) {
        console.log([])
        return
    }

    // execute async calls to build reports in parallel
    const reportPromises = instrumentsList.map(instrument => buildReport(instrument));
    let reports = await Promise.all(reportPromises);
    reports = reports.filter(report => !!report)

    console.log(reports)
}

async function buildReport(instrument) {
    let data = await getInstrumentData(urlConfig.loadInstrumentUrl, instrument)

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