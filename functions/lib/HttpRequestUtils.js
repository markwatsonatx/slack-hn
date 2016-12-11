function extractFormData(req) {
    var formData = {};
    if (req.method == 'POST') {
        req.on('data', function(data) {
            data = data.toString();
            data = data.split('&');
            for (var i = 0; i < data.length; i++) {
                var _data = data[i].split("=");
                formData[_data[0]] = _data[1];
            }
        })
    }
    return formData;
}