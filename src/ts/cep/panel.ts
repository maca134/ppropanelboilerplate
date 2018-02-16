export {}; // ts complains if a declare is present without import/export...

declare var $: any;

if ($ == undefined)
    $ = {};
