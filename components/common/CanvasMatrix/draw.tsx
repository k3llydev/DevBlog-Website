interface DrawProps {
    ctx: CanvasRenderingContext2D;
    drops: number[];
    fontSize: number;
    characters: string[];
    animationDone: boolean;
    setAnimationDone: Function;
    spacing: number;
    color: string;
}

export const DrawController = ({ ctx, drops, fontSize, characters, animationDone, setAnimationDone, spacing, color }: DrawProps) => {
    const canvas = ctx.canvas;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.09)'; // Foreground color
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = color; // Char colors
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const char = characters[Math.floor(Math.random() * characters.length)];

        ctx.fillText(char.toString(), i * fontSize + spacing, drops[i] * fontSize);

        if(drops[i] * fontSize > canvas.height && Math.random() > 0.95) drops[i] = 0;

        drops[i]++;

    }

    if(drops[0] * fontSize > canvas.height && !animationDone) setAnimationDone(true);

};