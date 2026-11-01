// bots.js — decides what a bot does on its turn. Pure decision logic: it returns an action
// object and does NOT change the game. main.js applies the action and handles the 1-second delay.
//
// Returns one of:
//   { type: 'draw' }
//   { type: 'stand' }
//   { type: 'steal', victimIndex, cardIndex }
//
// SPEC.md "Bots", in order:
//   1. Steal if some face-up card would improve the bot's poker rank without busting it
//      (choose the steal that gives the best resulting hand).
//   2. Otherwise draw if total <= 15 and the bot holds fewer than 5 cards.
//   3. Otherwise stand.

const BOT_DRAW_THRESHOLD = 15; // draw while total is at or below this

function chooseBotAction(game, botSeat) {
  const bot = game.players[botSeat];

  // TODO (P2, SPEC criterion 16): step 1, stealing, is NOT implemented yet. Bots never
  // steal right now. Suggested approach:
  //   - for each option in game.getStealableCards(botSeat) (only if game.canSteal(botSeat)):
  //       const newHand = [...bot.hand, option.card];
  //       skip if isBust(newHand)
  //       keep it if compareHands(evaluateHand(newHand), evaluateHand(bot.hand)) > 0
  //   - pick the option whose evaluateHand(newHand) is best (use compareHands to sort)
  //   - return { type: 'steal', victimIndex: option.victimIndex, cardIndex: option.cardIndex }
  // Careful: "improve its poker rank" — adding any card adds a kicker, and compareHands
  // treats an extra kicker as better. Compare `.category` only if you want steals to require
  // a real category upgrade (e.g. high card -> pair). The spec says "poker rank", so
  // comparing categories is probably closer to what the author meant.

  if (game.canDraw(botSeat) && handTotal(bot.hand) <= BOT_DRAW_THRESHOLD) {
    return { type: 'draw' };
  }
  return { type: 'stand' };
}

if (typeof module !== 'undefined') {
  module.exports = { chooseBotAction, BOT_DRAW_THRESHOLD };
}
