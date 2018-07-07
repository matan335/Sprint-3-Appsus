function handleFileSelect(evt) {
    console.log(evt)
    var files = evt.target.files; // FileList object
    console.log(files)

    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function (theFile) {
        return function (e) {
            // Render thumbnail.
            debugger
            var span = document.createElement('span');
            span.innerHTML = ['<img class="thumb" src="', e.target.result,
                '" title="', escape(theFile.name), '"/>'].join('');
            document.getElementById('list').insertBefore(span, null);
        };
    })(files[0]);

    // Read in the image file as a data URL.
    reader.readAsDataURL(files[0]);
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);