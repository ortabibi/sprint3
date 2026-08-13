import { LongTxt } from './LongTxt.jsx'
export function NoteTxt({info}){
    const {txt} = info
    return <div className="note-txt-container">
        {txt && <LongTxt txt={txt}/>}

    </div>
}