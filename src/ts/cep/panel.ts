import CEPBridge from './lib/CEPBridge';
import App from './App';

declare var $: any;
if($ === undefined) $={};
$._bridge = new CEPBridge<App>(App);