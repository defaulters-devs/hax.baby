import type { TaskCategory } from '../types';

interface TransmutedResult {
  category: TaskCategory;
  encouragement: string;
  microStep: string;
}

export function transmuteMaybeTask(rawText: string): TransmutedResult {
  const text = rawText.trim().toLowerCase();

  // Keyword categorization
  if (/(study|exam|homework|math|history|science|physics|chem|biology|lecture|flashcard|quiz|test|course|learn)/i.test(text)) {
    return {
      category: 'study',
      encouragement: "Studying can feel overwhelming when looking at the whole mountain. Morro is here to hold the space — we only need one pebble today!",
      microStep: "Open your notes or book to page 1, set a timer for 5 minutes, and read just one summary paragraph or heading."
    };
  }

  if (/(code|program|bug|fix|deploy|git|repo|react|javascript|typescript|python|css|html|backend|frontend|api|function|build)/i.test(text)) {
    return {
      category: 'code',
      encouragement: "Even the grandest software systems are composed of simple lines of code. No pressure to finish the whole architecture now!",
      microStep: "Open your code editor, find the file you need, and add a single clarifying comment or print statement to orient yourself."
    };
  }

  if (/(clean|tidy|room|desk|laundry|wash|dishes|fold|organize|trash|closet|kitchen|bed)/i.test(text)) {
    return {
      category: 'tidy',
      encouragement: "Clearing your physical space clears your starry mind! You don't have to clean the whole room — just a tiny cozy corner.",
      microStep: "Stand up, stretch your arms, and pick up exactly 3 items from your immediate area to put away or toss."
    };
  }

  if (/(write|essay|draft|paper|blog|email|message|letter|resume|cv|proposal|script|story|report)/i.test(text)) {
    return {
      category: 'write',
      encouragement: "The blinking cursor is just waiting for a friendly greeting. First drafts are meant to be messy and playful!",
      microStep: "Open the blank document and write down three bullet points or phrases describing your core intention."
    };
  }

  if (/(draw|art|paint|sketch|design|music|song|edit|video|photo|render|model|craft)/i.test(text)) {
    return {
      category: 'create',
      encouragement: "Creative spark flows best when you play without expecting perfection. Morro loves rough sketches the most!",
      microStep: "Pick up your stylus, brush, or tool, and make just 3 playful warm-up marks or layout blocks."
    };
  }

  if (/(walk|workout|run|gym|stretch|water|sleep|meditate|breathe|yoga|healthy|snack)/i.test(text)) {
    return {
      category: 'health',
      encouragement: "Your body is the vessel that carries your brilliant mind. Giving yourself care is the most magical task of all.",
      microStep: "Pour yourself a refreshing glass of water, take two slow deep breaths, and roll your shoulders back."
    };
  }

  // Fallback for general tasks
  return {
    category: 'general',
    encouragement: "You've already taken the hardest step: acknowledging what you want to do. Morro believes in gentle momentum!",
    microStep: `Take out a piece of paper or notes app and jot down the very first 2-minute action for "${rawText.trim()}".`
  };
}
