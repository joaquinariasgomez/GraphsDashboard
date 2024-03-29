
export function getRelativeTimestamp(timestamp) {
    const currentTimestamp = Date.now() / 1000;
    const timePastInSeconds = Number(currentTimestamp) - Number(timestamp / 1000);

    if (timePastInSeconds < 60) {
        if (Math.round(timePastInSeconds) > 1) {
            return Math.round(timePastInSeconds) + " segs"
        }
        else {
            return Math.round(timePastInSeconds) + " seg"
        }
    }
    else {
        const timePastInMinutes = timePastInSeconds / 60;
        if (timePastInMinutes < 60) {
            if (Math.round(timePastInMinutes) > 1) {
                return Math.round(timePastInMinutes) + " mins"
            }
            else {
                return Math.round(timePastInMinutes) + " min"
            }
        }
        else {
            const timePastInHours = timePastInMinutes / 60;
            if (timePastInHours < 24) {
                if (Math.round(timePastInHours) > 1) {
                    return Math.round(timePastInHours) + " horas"
                }
                else {
                    return Math.round(timePastInHours) + " hora"
                }
            }
            else {
                const timePastInDays = timePastInHours / 24;
                if (Math.round(timePastInDays) > 1) {
                    return Math.round(timePastInDays) + " días"
                }
                else {
                    return Math.round(timePastInDays) + " día"
                }
            }
        }
    }
}

export function getUserGraphByType(userGraphs, type) {
    for(const userGraph of userGraphs) {
        if(userGraph.type === type) {
            return userGraph
        }
    }
}