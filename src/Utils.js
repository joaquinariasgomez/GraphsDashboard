
export function getRelativeTimestamp(timestamp) {
    const currentTimestamp = Date.now() / 1000;
    let timePastInSeconds = Number(currentTimestamp) - Number(timestamp / 1000);
    if(timePastInSeconds < 0) timePastInSeconds = -timePastInSeconds;

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

export function getRelativeTimeToUpdate(userDesiredGraphTag) {
    switch (userDesiredGraphTag) {
        case "DAILY":
            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1); // Set date to tomorrow
            tomorrow.setHours(0);
            tomorrow.setMinutes(0);
            tomorrow.setSeconds(0);
            return getRelativeTimestamp(tomorrow);
        case "WEEKLY":
            let monday = new Date();
            monday.setDate(monday.getDate() + (((1 + 7 - monday.getDay()) % 7) || 7));
            monday.setHours(0);
            monday.setMinutes(0);
            monday.setSeconds(0);
            console.log(monday);
            return getRelativeTimestamp(monday);
        case "MONTHLY":
            let now = new Date();
            let firstDayOfMonth = new Date(now.getFullYear(), now.getMonth()+1, 1);
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

export const fakeGraphData = {
    type: "Gastos en los últimos 7 días por categoría",
    data: [
        {
            value: 39.95,
            category: "Bills & Subscriptions",
            tag: "2024-03-27"
        },
        {
            value: 13.0,
            category: "Supermarket",
            tag: "2024-03-28"
        },
        {
            value: 32.879999999999995,
            category: "Supermarket",
            tag: "2024-03-29"
        },
        {
            value: 1.2,
            category: "Food Out",
            tag: "2024-03-29"
        },
        {
            value: 28.25,
            category: "Supermarket",
            tag: "2024-03-30"
        },
        {
            value: 12.18,
            category: "Gasoline",
            tag: "2024-03-31"
        },
        {
            value: 0.75,
            category: "Food Out",
            tag: "2024-03-31"
        },
        {
            value: 780.0,
            category: "Bills & Subscriptions",
            tag: "2024-04-01"
        },
        {
            value: 6.18,
            category: "Supermarket",
            tag: "2024-04-01"
        },
        {
            value: 2.99,
            category: "Bills & Subscriptions",
            tag: "2024-04-02"
        }
    ]
}