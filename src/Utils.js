
export function getRelativeTimestamp(timestamp) {
    const currentTimestamp = Date.now() / 1000;
    let timePastInSeconds = Number(currentTimestamp) - Number(timestamp / 1000);
    if(timePastInSeconds < 0) timePastInSeconds = -timePastInSeconds;

    if (timePastInSeconds < 60) {
        if (Math.round(timePastInSeconds) > 1) {
            return Math.round(timePastInSeconds) + " secs"
        }
        else {
            return Math.round(timePastInSeconds) + " sec"
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
                    return Math.round(timePastInHours) + " hours"
                }
                else {
                    return Math.round(timePastInHours) + " hour"
                }
            }
            else {
                const timePastInDays = timePastInHours / 24;
                if (Math.round(timePastInDays) > 1) {
                    return Math.round(timePastInDays) + " days"
                }
                else {
                    return Math.round(timePastInDays) + " day"
                }
            }
        }
    }
}

export function getRelativeTimeToUpdate(userDesiredGraphTag) {
    // Timezone for executions will be UTC
    switch (userDesiredGraphTag) {
        case "DAILY":   // Every day at 7:00h UTC
            let tomorrow = new Date();  // Date by default is UTC
            tomorrow.setDate(tomorrow.getDate() + 1); // Set date to tomorrow
            tomorrow.setHours(7);
            tomorrow.setMinutes(0);
            tomorrow.setSeconds(0);
            return getRelativeTimestamp(tomorrow);
        case "WEEKLY":  // Every Monday at 7:00h UTC
            let monday = new Date();
            monday.setDate(monday.getDate() + (((1 + 7 - monday.getDay()) % 7) || 7));
            monday.setHours(7);
            monday.setMinutes(0);
            monday.setSeconds(0);
            return getRelativeTimestamp(monday);
        case "MONTHLY": // Every first day of month at 7:00h UTC
            let now = new Date();
            let firstDayOfMonth = new Date(now.getFullYear(), now.getMonth()+1, 1);
            firstDayOfMonth.setHours(7);
            firstDayOfMonth.setMinutes(0);
            firstDayOfMonth.setSeconds(0);
            return getRelativeTimestamp(firstDayOfMonth);
    }
}

export function getUserGraphByType(userGraphs, type) {
    for(const userGraph of userGraphs) {
        if(userGraph.type === type) {
            return userGraph
        }
    }
}

export function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}