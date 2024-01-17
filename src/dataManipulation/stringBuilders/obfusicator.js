/** the obfusicator from the website */
export function obfusicateValue(e) {
    var t = ""
    const s = "JABCDEFGHI"
    e = e + ""
    for (var i = 0; i < e.length; i++) {
        var r = e.charAt(i)
        t += s.charAt(r)
    }
    return t
}