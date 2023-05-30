function importAll(r) {
    const toReturn = r.keys().map(r);
    return toReturn
}


const demos = importAll(require.context('./', false, /\.page\.tsx$/));
export default demos