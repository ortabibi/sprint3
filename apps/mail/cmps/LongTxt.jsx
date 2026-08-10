
export function LongTxt({ txt }) {
    const words = txt.split(' ')

    let shortTxt = words.slice(0, 15).join(' ')
    
    if (words.length > 15) {
        shortTxt += '...'
    }

    return <section className="long-txt">
        <p className="txt">
            {shortTxt}
        </p>
    </section>
}