import { 
    Layout, LayoutProps, Txt, TxtProps, 
    Latex, LatexProps, Rect, RectProps, 
    Circle, CircleProps, Line, Shape, Node
} from '@motion-canvas/2d';
import { 
    all, sequence, tween, map, Color, delay 
} from '@motion-canvas/core';
import { MANIM_SMOOTH, BLUE_C, WHITE, DEFAULT_STROKE_WIDTH } from './constants';

// --- INTERFACE ---
export interface ManimObject {
    /** 
     * The standard "Write" animation. 
     * @param duration Override the component's default duration.
     */
    write(duration?: number): Generator<any, void, unknown>;
}

export interface MobjectProps {
    color?: string;
    opacity?: number;
    /** Default animation duration in seconds */
    duration?: number; 
}

// --- BACKGROUND ---
export const ManimScene = ({ children }: { children: any }) => (
    <Rect width={'100%'} height={'100%'} fill="#111111" layout alignItems={'center'} justifyContent={'center'}>
        {children}
    </Rect>
);

// --- TYPEWRITER LOGIC ---
function* typewriterLogic(txtNode: Txt, duration: number) {
    const fullText = txtNode.text();
    
    try {
        // @ts-ignore
        const rect = txtNode.cacheBBox();
        if (rect.width > 0) txtNode.width(rect.width);
        if (rect.height > 0) txtNode.height(rect.height);
    } catch (e) { }

    txtNode.text("");
    txtNode.opacity(1);

    if (fullText.length > 0) {
        yield* tween(duration, value => {
            const progress = MANIM_SMOOTH(value);
            const charCount = Math.floor(map(0, fullText.length, progress));
            txtNode.text(fullText.substring(0, charCount));
        });
        txtNode.text(fullText);
    }
}

// --- 1. MText ---
export class MText extends Txt implements ManimObject {
    public readonly animDuration: number;

    public constructor(props?: TxtProps & MobjectProps) {
        super({
            fontFamily: "JetBrains Mono",
            fill: WHITE,
            textWrap: true,
            opacity: 0, 
            ...props
        });
        this.animDuration = props?.duration ?? 1.0;
    }

    public *write(duration?: number) {
        yield* typewriterLogic(this, duration ?? this.animDuration);
    }
}

// --- 2. MMathTex (Fix: Thicker Stroke & Proper Color Inheritance) ---
export class MMathTex extends Latex implements ManimObject {
    public readonly animDuration: number;

    public constructor(props?: LatexProps & MobjectProps) {
        super({
            fill: WHITE,
            opacity: 0, // Start Hidden
            ...props
        });
        this.animDuration = props?.duration ?? 1.0;
    }

    public *write(duration?: number) {
        const d = duration ?? this.animDuration;
        this.opacity(1); // Show container
        
        // Capture Parent Color (Critical for inheritance)
        const parentFill = this.fill();
        
        // 1. Collect all Shapes
        const shapes: Shape[] = [];
        const collect = (node: Node) => {
            if (node instanceof Shape) shapes.push(node);
            node.children().forEach(collect);
        };
        collect(this);

        // 2. Animate
        const animateShape = function* (child: Shape, time: number) {
            const target = child as any;
            
            // Capture Original State
            const originalFill = target.fill();
            const originalStroke = target.stroke();
            const originalLineWidth = target.lineWidth();
            
            // Resolve Color: Child > Parent > White
            let colorSource = originalFill || originalStroke || parentFill || "#FFF";
            let colorStr = "#FFF";
            try { 
                colorStr = new Color(colorSource).serialize(); 
            } catch(e) {}

            // SETUP: Transparent Fill, Thicker Stroke
            target.fill(new Color(colorStr).alpha(0)); 
            target.stroke(colorStr);
            target.lineWidth(2); // Thicker stroke (2px) ensures it's visible
            
            if (typeof target.end === 'function') target.end(0); 
            
            target.opacity(1);

            yield* all(
                // A. Draw Stroke
                (typeof target.end === 'function') 
                    ? target.end(1, time, MANIM_SMOOTH) 
                    : target.opacity(1, time),
                
                // B. Fill Fade In
                delay(time * 1, tween(time * 0.5, v => {
                    const c = new Color(colorStr);
                    target.fill(c.alpha(MANIM_SMOOTH(v)));
                })),

                delay(time * duration, tween(time * 0.2, v => {
                    const progress = MANIM_SMOOTH(v);
                    target.lineWidth(map(1, 0, progress));
                    const c = new Color(colorStr);
                    target.stroke(c.alpha(map(1, 0, progress)));
                }))
            );

            // FORCE RESTORE FINAL STATE
            // We revert to exactly what it was before animation.
            // If originalFill was null (inherited), we set it back to null.
            target.lineWidth(originalLineWidth);
            target.stroke(originalStroke);
            target.fill(originalFill); 
        };

        if (shapes.length > 0) {
            const stagger = 0.05;
            const shapeDur = Math.min(d, 1.2);
            yield* sequence(stagger, ...shapes.map(s => animateShape(s, shapeDur)));
        }
    }
}
// --- 3. MTitle ---
export class MTitle extends Layout implements ManimObject {
    private readonly titleTxt: Txt;
    private readonly underline: Line;
    public readonly animDuration: number;

    public constructor(props?: LayoutProps & MobjectProps & { text: string }) {
        super({
            direction: 'column', alignItems: 'center', gap: 15,
            opacity: 0,
            ...props
        });
        
        this.animDuration = props?.duration ?? 1.0;

        this.titleTxt = new Txt({
            text: props?.text || "", fill: props?.color || WHITE,
            fontSize: 64, fontFamily: "JetBrains Mono", fontWeight: 700,
        });
        this.underline = new Line({
            points: [[-200, 0], [200, 0]], stroke: props?.color || WHITE,
            lineWidth: 4, end: 0, 
        });
        this.add(this.titleTxt);
        this.add(this.underline);
    }

    public *write(duration?: number) {
        const d = duration ?? this.animDuration;
        this.opacity(1);
        yield* all(
            typewriterLogic(this.titleTxt, d),
            delay(d * 0.3, this.underline.end(1, d * 0.7, MANIM_SMOOTH))
        );
    }
}

// --- 4. SHAPES ---
export class MCircle extends Circle implements ManimObject {
    public readonly animDuration: number;
    public constructor(props?: CircleProps & MobjectProps) {
        super({
            lineWidth: DEFAULT_STROKE_WIDTH, stroke: BLUE_C,
            opacity: 0, end: 0,
            ...props
        });
        this.animDuration = props?.duration ?? 1.0;
    }
    public *write(duration?: number) {
        this.opacity(1);
        yield* this.end(1, duration ?? this.animDuration, MANIM_SMOOTH);
    }
}

export class MSquare extends Rect implements ManimObject {
    public readonly animDuration: number;
    public constructor(props?: RectProps & MobjectProps) {
        super({
            lineWidth: DEFAULT_STROKE_WIDTH, stroke: BLUE_C,
            opacity: 0, end: 0, 
            ...props
        });
        this.animDuration = props?.duration ?? 1.0;
    }
    public *write(duration?: number) {
        this.opacity(1);
        yield* this.end(1, duration ?? this.animDuration, MANIM_SMOOTH);
    }
}

export const VGroup = Layout;