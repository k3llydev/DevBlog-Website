import Image from 'next/image';

interface TextObfuscatorProps {
    text: string;
}

const TextObfuscator = ({ text }: TextObfuscatorProps) => {

    const characters = text.split('');
    const size = 24;

    const estimatedWidth = (text.length - 1) * size;
    const estimatedHeight = size * 2;

    const textedCharacters = characters.map((char: string, index: number) => `
        <text 
            font-family="monospace"
            font-size="${size}"
            x="${(size - 1) * (index)}"
            y="${size}"
            fill="#BB00FF"
        >
            ${char}
        </text>
    `).join('');

    const inlineSvg = Buffer.from(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${estimatedWidth} ${estimatedHeight}">
            ${textedCharacters}
        </svg>
    `).toString('base64');

    return <Image width={estimatedWidth} height={estimatedHeight} src={`data:image/svg+xml;base64,${inlineSvg}`} alt={'Obfuscated Text'} />;
};

export default TextObfuscator;
