module.exports = function (args) {
	var ret = document.createElement(args.tag);
	delete args.tag;
	ret.textContent = args.text || "";
	delete args.text;
	if (args.data_attr) {
		for (var key in args.data_attr) {
			ret.setAttribute('data-'+key, args.data_attr[key]);
		}
	}
	delete args.data_attr;
	for (var key in args) {
		ret.setAttribute(key, args[key]);
	}
	return ret;
}