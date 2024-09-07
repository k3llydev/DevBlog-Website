import Image from 'next/image';

interface TextObfuscatorProps {
    text: string;
    size?: number;
}

const TextObfuscator = ({
    text,
    size = 24,
}: TextObfuscatorProps) => {

    const textCharacters = text.split('');

    const estimatedWidth = (text.length - 1) * size;
    const estimatedHeight = size * 2;

    const maskedTextCharacters = textCharacters.map((char: string, index: number) => `
        <text 
            font-family="monospace"
            font-size="${size}"
            x="${(size - 6) * (index + 3)}"
            y="${size}"
            fill="#BB00FF"
        >
            ${char}
        </text>
    `).join('');

    const inlineSvg = Buffer.from(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${estimatedWidth} ${estimatedHeight}">
            ${maskedTextCharacters}
        </svg>
    `).toString('base64');

    return <Image width={estimatedWidth} height={estimatedHeight} src={`data:image/svg+xml;base64,${inlineSvg}`} alt={'An attempt to confuse computers'} />;
};

export default TextObfuscator;
