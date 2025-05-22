export const readFile = (file: File) => {
    let contentFile = "";
    const reader = new FileReader();

    reader.onload = (evt: ProgressEvent<FileReader>) => {
        if (evt.target?.result) {
            contentFile = evt.target?.result.toString();
        }
    }

    reader.readAsText(file);

    return contentFile;
}