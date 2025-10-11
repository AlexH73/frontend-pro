export type Suit = '♠' | '♥' | '♦' | '♣';
export type Rank =
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'J'
  | 'Q'
  | 'K'
  | 'A';

export interface ICard {
  rank: Rank;
  suit: Suit;
  isRed: boolean;
  index: number;
}

export type GameScore = [number, number, string];
export type TotalScore = [number, number];
export type Page = 'start' | 'game' | 'end';
