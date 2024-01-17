import "dotenv/config.js"

export const urlConfig = {
    criteriaSearchUrl: `${process.env.API_ADDR}/CriteriaSearch`,
    loadInstrumentUrl: `${process.env.API_ADDR}/LoadInstrument/`,
    linksCountUrl: `${process.env.API_ADDR}/GetNumberOfDocumentPages`,
    imageLinkUrl:  `${process.env.API_ADDR}/GetDocumentPage`
}