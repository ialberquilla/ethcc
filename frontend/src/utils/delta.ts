export function getDelta(): number[] {
    const numbers: number[] = [];
    for (let i = 0; i < 4; i++) {
        numbers.push(Math.floor(Math.random() * 10) + 1);
    }
    return numbers;
}