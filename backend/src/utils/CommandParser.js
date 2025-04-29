// backend/src/utils/CommandParser.js

const actions = require('./actions');

/**
 * Parses the player input into a verb and noun.
 * @param {string} input
 * @returns {{ verb: string, noun: string }}
 */
function parseInput(input) {
  const parts = input.trim().split(/\s+/);
  const verb = parts[0]?.toLowerCase() || '';
  const noun = parts.slice(1).join(' ');
  return {verb, noun};
}

/**
 * Finds an action by verb or its synonyms.
 * @param {string} verb
 * @returns {object|null}
 */
function findAction(verb) {
  return Object.values(actions).find(
    action => action.verb === verb || action.synonyms?.includes(verb),
  );
}

/**
 * Handles a full player command by dispatching to the correct action.
 * @param {string} input
 * @param {object} gameState
 * @returns {string}
 */
function handleCommand(input, gameState) {
  const {verb, noun} = parseInput(input);
  const action = findAction(verb);

  if (!action) {
    return `I don't understand what you mean by '${verb}'.`;
  }

  try {
    return action.execute(noun, gameState);
  } catch (error) {
    return `You can't do that because: ${error.message}`;
  }
}

module.exports = {
  parseInput,
  findAction,
  handleCommand,
};
