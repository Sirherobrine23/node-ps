const { default: impDef } = await import(`./${process.platform}/index.js`);
export default impDef;
console.log((await impDef()));