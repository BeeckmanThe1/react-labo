function importAll(r) {
    const toReturn = r.keys().map(r);
    return toReturn
}


const customHooks = importAll(require.context('./', true, /\.custom-hook.page\.tsx$/));
export default customHooks.sort((a, b) => a.default.meta.order - b.default.meta.order)