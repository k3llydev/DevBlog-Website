import { useEffect, useRef, useState } from 'react';
import styles from './CanvasMatrix.module.scss';
import { DrawController } from './draw';

// TODO: Move interface to .d.ts file
interface CanvasMatrixProps {
    variant: 'fullscreen' | 'inline';
    onAnimationDone: Function;
}

const selectInlineStyles = (variant: string) => {
    switch(variant) {
        case 'fullscreen':
            return {width: '100%', height: '100%'};
    }
};

const selectClassName = (variant: string) => {
    switch (variant) {
        case 'fullscreen':
            return styles.fullScreen;
    }
};

const CanvasMatrix = ({ variant, onAnimationDone }: CanvasMatrixProps) => {

    const fontSize = 18;
    const characters = ["0", "1"];

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>();
    const [drops, setDrops] = useState<number[]>([]);
    const [spacing, setSpacing] = useState(0);
    const [color, setColor] = useState('rgba(187, 0, 255, 1)');
    const [animationSpeed, setAnimationSpeed] = useState(35);
    const [animationDone, setAnimationDone] = useState(false);

    // Update speed one animation is done
    useEffect(() => {
        if(animationDone) {
            setAnimationSpeed(60);
            setColor('rgba(187, 0, 255, 0.5)');
            onAnimationDone();
        };
    }, [animationDone]);

    // Start once context is set
    useEffect(() => {

        let frame = 0;
        let now = Date.now();
        let then = Date.now();
        let animationFrame = -1;
        const intervalMilliseconds = animationSpeed;

        const animate = () => {
            if (!ctx) return;
            animationFrame = requestAnimationFrame(animate);
            now = Date.now();
            if(now - then > intervalMilliseconds) {
                then = now - ((now - then) % intervalMilliseconds);
                frame++;
                DrawController({
                    ctx,
                    drops,
                    characters,
                    fontSize,
                    animationDone,
                    setAnimationDone,
                    spacing,
                    color
                });
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [ctx, animationSpeed]);

    // Configure canvas values for animation
    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const { width, height } = canvas.getBoundingClientRect();

        canvas.width = width;
        canvas.height = height;

        // TODO: Determine relation between baseSpacing and fontSize
        const baseSpacing = 3;
        const columns = Math.floor(canvas.width / fontSize);
        const remainingSpace = canvas.width % fontSize;
        const spacing = remainingSpace ? (remainingSpace / 2) : 0;

        setSpacing(spacing + baseSpacing);
        setDrops(Array.from({length: columns}, () => 1));
        setCtx(canvas.getContext('2d'));

    }, []);

    return (
        <canvas
            style={selectInlineStyles(variant)}
            className={selectClassName(variant)}
            ref={canvasRef}
        ></canvas>
    );
};

export default CanvasMatrix;
