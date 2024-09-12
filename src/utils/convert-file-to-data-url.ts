const convertFileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener('load', e => {
            resolve(e.target?.result as string);
        });
        reader.addEventListener('error', err => reject(err));
        reader.readAsDataURL(file);
    });
};

export default convertFileToDataUrl;
