let generatedId = 0;
export function generate(target: any, key: string): void {
    target[key] = `generated_${generatedId++}_${target.name}.${key}`;
}
