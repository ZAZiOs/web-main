import Links from './links.json'

function term(str, char) {
    var xStr = str.substring(0, str.length - 3);
    return xStr + char;
}

function getLinks() {
    let result = ``
    for (let link of Links) {
        result += `<a href="${link.href}" class="px-2">${link.text}</a> | `
    }
    return term(result,'')
}

export default getLinks