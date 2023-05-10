export const getImageSrc = (htmlString: string) => {

    const srcRegex = /<img.*?src="(.*?)"/;
    const match = htmlString.match(srcRegex);

    if (match && match.length > 1) {
        const src = match[1];

        return src;
    }

    return '';
};
