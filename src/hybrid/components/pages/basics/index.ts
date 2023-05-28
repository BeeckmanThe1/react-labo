function importAll(r) {
    const toReturn = r.keys().map(r);
    return toReturn
}


const basics = importAll(require.context('./', true, /\.basics.page\.tsx$/));
export default basics.sort((a, b) => a.default.meta.order - b.default.meta.order)