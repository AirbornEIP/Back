function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// function getTimeRemaining(endtime: string) {
//     const total = Date.parse(endtime) - Date.parse(new Date());
//     // const seconds = Math.floor((total / 1000) % 60);
//     // const minutes = Math.floor((total / 1000 / 60) % 60);
//     // const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
//     // const days = Math.floor(total / (1000 * 60 * 60 * 24));
//
//     return {
//         total,
//     };
// }

module.exports = {
    sleep,
    // getTimeRemaining,
};
