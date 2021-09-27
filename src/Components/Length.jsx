

export default function Length({titulo,changeTime,type,time, formatTime}) {
    return (
        <div className="contador">
            <h3>{titulo}</h3>
            <div className="time-sets">
                <button className="btn-small indigo darken-4 "
                        onClick={()=>changeTime(-60,type)}
                >
                    <i className="material-icons">arrow_downward</i>
                </button>
                <h3>{formatTime(time)}</h3>
                <button className="btn-small indigo darken-4 "
                        onClick={()=>changeTime(60,type)}
                >
                    <i className="material-icons">arrow_upward</i>
                </button>
            </div>
        </div>
    )
}
