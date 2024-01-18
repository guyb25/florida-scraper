/** Parses the "from" party in the instrument. Direction 1 stands for the "from" side. */
export function parseFrom(data) {
    return parse(data, 1)
}

/** Parses the "to" party in the instrument. Direction 0 stands for the "to" side. */
export function parseTo(data) {
    return parse(data, 0)
}

function parse(data, direction) {
    if (!data.PartyCollection || !Array.isArray(data.PartyCollection)) {
        console.error({
            msg: `unable to retrieve party information for instrument`,
            data: data
        })
        return []
    }
    
    return data.PartyCollection.filter(party => party.Direction == direction).map(party => party.PartyName)
}