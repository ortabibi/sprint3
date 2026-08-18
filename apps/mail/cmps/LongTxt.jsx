
export function LongTxt({ txt }) {
    const words = txt.split(' ')

    let shortTxt = words.slice(0, 13).join(' ')
    
    if (words.length > 13) {
        shortTxt += '...'
    }

    return <section className="long-txt">
        <p className="txt">
            {shortTxt}
        </p>
    </section>
}