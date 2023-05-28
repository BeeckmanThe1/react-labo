function importAll(r) {
    const toReturn = r.keys().map(r);
    return toReturn
}


const pages = importAll(require.context('./', true, /\.page\.tsx$/));
export default pages.sort((a, b) => a.default.meta.order - b.default.meta.order)