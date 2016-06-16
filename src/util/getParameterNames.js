const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const FAT_ARROW_DECLARATION = /^\s*(\w+|\([^)]*\))\s*=>/mg;
const FUNCTION_DECLARATION = /^\s*function\s*\(([^\)]*)\)/mg;

function getParameterNames(fn) {
	var code = fn.toString().replace(COMMENTS, '');


			
}
