// ... (Imports and Utils remain the same as previous) ...
import { Node, Layout, Txt } from '@motion-canvas/2d';
import { sequence, all, waitFor, Vector2 } from '@motion-canvas/core';
import { ManimObject } from './mobjects'; 
import { MANIM_SMOOTH } from './constants';

// Utils (getBounds, makeAbsolute) ... (Same as previous)
function getBounds(node: Node) {
    try {
        // @ts-ignore
        const rect = node.cacheBBox();
        return { width: rect.width, height: rect.height, center: node.position() };
    } catch (e) {
        const s = (node as any).size ? (node as any).size() : {x:0, y:0};
        return { width: s.x, height: s.y, center: node.position() };
    }
}

function makeAbsolute(node: Node) {
    // @ts-ignore
    if (typeof node.layout === 'function' && node.layout() !== false) {
        const bounds = getBounds(node);
        const pos = node.position();
        // @ts-ignore
        node.layout(false);
        node.position(pos);
        if (node instanceof Layout || node instanceof Txt) {
            if (bounds.width > 0) node.width(bounds.width);
            if (bounds.height > 0) node.height(bounds.height);
        }
    }
}

// --- ANIMATIONS ---

/**
 * WRITE / CREATE
 * @param node The object to animate
 * @param duration Optional override duration. If null, uses object's prop.
 */
export function* Write(node: Node, duration?: number): Generator<any, void, unknown> {
    
    // 1. Manim Component Strategy
    if ('write' in node && typeof (node as any).write === 'function') {
        // We pass the optional duration. The component handles fallback.
        yield* (node as unknown as ManimObject).write(duration);
    } 
    // 2. Groups (VGroup)
    else if (node.children().length > 0) {
        if (node.opacity() === 0) node.opacity(1);
        const effectiveDuration = duration ?? 1.0;
        yield* sequence(
            0.1,
            ...node.children().map(child => Write(child, effectiveDuration))
        );
    }
    // 3. Fallback
    else {
        yield* FadeIn(node, duration ?? 1.0);
    }
}

export const Create = Write;

export function* FadeIn(node: Node, duration: number = 1.0) {
    if (node.opacity() === 1) node.opacity(0); 
    yield* node.opacity(1, duration, MANIM_SMOOTH);
}

// ... (Transform, NextTo, Flash remain the same) ...
export function* Transform(source: Node, target: Node, duration: number = 1.0) {
    makeAbsolute(source);
    makeAbsolute(target);

    if (typeof (target as any).end === 'function') {
        (target as any).end(1);
    }

    target.opacity(0);
    const sWidth = getBounds(source).width || 100;
    const tWidth = getBounds(target).width || 100;
    const scaleRatio = tWidth / (sWidth || 1);

    yield* all(
        source.position(target.position(), duration, MANIM_SMOOTH),
        source.scale(source.scale().mul(scaleRatio), duration, MANIM_SMOOTH),
        source.opacity(0, duration, MANIM_SMOOTH),
        target.opacity(1, duration, MANIM_SMOOTH)
    );
}

export function* NextTo(node: Node, target: Node, direction: any, buff: number = 30, duration: number = 1.0) {
    makeAbsolute(node);
    
    const tPos = target.position();
    const tBounds = getBounds(target);
    const sBounds = getBounds(node);

    const dir = new Vector2(direction.x, direction.y);
    
    const dest = tPos.add(new Vector2(tBounds.width, tBounds.height).mul(dir).mul(0.5))
                     .add(new Vector2(sBounds.width, sBounds.height).mul(dir).mul(0.5))
                     .add(dir.mul(buff));

    yield* node.position(dest, duration, MANIM_SMOOTH);
}

export function* Flash(node: Node, duration: number = 0.5) {
     const t = node as any;
     const oldStroke = t.stroke ? t.stroke() : null;
     if(oldStroke) {
         yield* sequence(duration/2, t.stroke("#FFF1B6", duration/2), t.stroke(oldStroke, duration/2));
     }
}