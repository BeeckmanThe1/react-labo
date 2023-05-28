function importAll(r) {
    const toReturn = r.keys().map(r);
    return toReturn
}


const hooks = importAll(require.context('./', true, /\.hook.page\.tsx$/));
export default hooks.sort((a, b) => a.default.meta.order - b.default.meta.order)