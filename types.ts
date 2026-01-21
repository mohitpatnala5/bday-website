
export enum AppState {
  INITIAL = 'INITIAL',
  OPENING_BOOK = 'OPENING_BOOK',
  WELCOME = 'WELCOME',
  COUNTDOWN = 'COUNTDOWN',
  BLOW_CANDLE = 'BLOW_CANDLE',
  REVEAL = 'REVEAL',
  SLIDESHOW = 'SLIDESHOW'
}

export interface EmojiDrop {
  id: number;
  emoji: string;
  left: number;
  duration: number;
  delay: number;
}
