export const generateDateRange = (monthCount = 12) => {
    const dateRanges = []
    const today = new Date();


    for (let i = 0; i < monthCount; i++) {
        
        // Create a date object for each previous month
        // e.g. 2025-11-01 -> 2025-10-01 -> 2025-09-01
        const date = new Date(today.getFullYear(), today.getMonth() - i, 1);


        // extract year, month

        const year = date.getFullYear();
        const month = date.getMonth() + 1
        const monthStr = String(month).padStart(2,"0");

        // days in this month
        const daysInMonth = new Date(year, month, 0).getDate();


        // format start_date and end_date
        // e.g. 2025-11-01 2025-11-30
        const start_date = `${year}-${monthStr}-01`
        const end_date = `${year}-${monthStr}-${String(daysInMonth).padStart(2,"0")}`

        //
        const label = date.toLocaleString("default", {month: "long", year:"numeric"})

        dateRanges.push({label, start_date, end_date})
    }
    return dateRanges;
}