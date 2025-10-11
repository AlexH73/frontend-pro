import type { ICard, Rank, Suit } from "./types";

export const createDeck = (): ICard[] => {
  const deck: ICard[] = [];
  const suits: Suit[] = ['♠', '♥', '♦', '♣'];
  const ranks: Rank[] = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
    'A',
  ];

  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({
        rank,
        suit,
        isRed: suit === '♥' || suit === '♦',
        index: ranks.indexOf(rank),
      });
    }
  }
  return deck;
};
