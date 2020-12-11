export class MathHelper {

    public static getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public static clamp(num: number, min: number, max: number): number {
      return num <= min ? min : num >= max ? max : num;
    }
}
