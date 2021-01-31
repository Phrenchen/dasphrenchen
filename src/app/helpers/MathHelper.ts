export class MathHelper {

    public static getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public static getRandomNumber(min: number, max: number): number {
      return Math.random() * (max - min + 1) + min;
  }

    public static clamp(num: number, min: number, max: number): number {
      return num <= min ? min : (num >= max ? max : num);
    }


    /**
     * returns '#rrggbb' colors
     */
    public static getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
}
