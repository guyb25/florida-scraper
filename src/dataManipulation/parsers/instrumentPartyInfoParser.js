/** Parses the "from" party in the instrument. Direction 1 stands for the "from" side. */
export function parseFrom(data) {
    if (!data.PartyCollection || !Array.isArray(data.PartyCollection)) {
        console.error(`unable to retrieve party information `)
        return []
    }

    return data.PartyCollection.filter(party => party.Direction == 1).map(party => party.PartyName)
}

/** Parses the "to" party in the instrument. Direction 0 stands for the "to" side. */
export function parseTo(data) {
    if (!data.PartyCollection || !Array.isArray(data.PartyCollection)) {
        console.error(`unable to retrieve party information `)
        return []
    }
    
    return data.PartyCollection.filter(party => party.Direction == 0).map(party => party.PartyName)
}