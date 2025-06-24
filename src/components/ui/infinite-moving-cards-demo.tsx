"use client";

import React, { useMemo } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

// Expanded pool of quotes from Stoics, Ryan Holiday, Rumi, Simon Sinek, Einstein, Roosevelt, Aristotle, Darwin, C.S. Lewis
const stoicQuotes = [
  // Marcus Aurelius
  { quote: "You have power over your mind - not outside events. Realize this, and you will find strength.", name: "Marcus Aurelius", title: "Meditations" },
  { quote: "The happiness of your life depends upon the quality of your thoughts.", name: "Marcus Aurelius", title: "Meditations" },
  { quote: "Waste no more time arguing what a good man should be. Be one.", name: "Marcus Aurelius", title: "Meditations" },
  { quote: "If it is not right, do not do it; if it is not true, do not say it.", name: "Marcus Aurelius", title: "Meditations" },
  { quote: "When you arise in the morning, think of what a precious privilege it is to be alive.", name: "Marcus Aurelius", title: "Meditations" },
  { quote: "The best revenge is to be unlike him who performed the injury.", name: "Marcus Aurelius", title: "Meditations" },
  { quote: "Dwell on the beauty of life. Watch the stars, and see yourself running with them.", name: "Marcus Aurelius", title: "Meditations" },
  { quote: "It is not death that a man should fear, but he should fear never beginning to live.", name: "Marcus Aurelius", title: "Meditations" },
  { quote: "Reject your sense of injury and the injury itself disappears.", name: "Marcus Aurelius", title: "Meditations" },
  { quote: "The soul becomes dyed with the color of its thoughts.", name: "Marcus Aurelius", title: "Meditations" },

  // Seneca
  { quote: "We suffer more often in imagination than in reality.", name: "Seneca", title: "Letters from a Stoic" },
  { quote: "He who fears death will never do anything worth of a man who is alive.", name: "Seneca", title: "Letters from a Stoic" },
  { quote: "Difficulties strengthen the mind, as labor does the body.", name: "Seneca", title: "Letters from a Stoic" },
  { quote: "Luck is what happens when preparation meets opportunity.", name: "Seneca", title: "Letters from a Stoic" },
  { quote: "Begin at once to live, and count each separate day as a separate life.", name: "Seneca", title: "Letters from a Stoic" },
  { quote: "He suffers more than necessary, who suffers before it is necessary.", name: "Seneca", title: "Letters from a Stoic" },
  { quote: "It is not that we have a short time to live, but that we waste a lot of it.", name: "Seneca", title: "On the Shortness of Life" },
  { quote: "As is a tale, so is life: not how long it is, but how good it is, is what matters.", name: "Seneca", title: "Letters from a Stoic" },
  { quote: "Sometimes even to live is an act of courage.", name: "Seneca", title: "Letters from a Stoic" },
  { quote: "Hang on to your youthful enthusiasms — you'll be able to use them better when you're older.", name: "Seneca", title: "Letters from a Stoic" },

  // Epictetus
  { quote: "Man is not worried by real problems so much as by his imagined anxieties about real problems.", name: "Epictetus", title: "Discourses" },
  { quote: "It is not things themselves that disturb us, but our opinions about them.", name: "Epictetus", title: "Enchiridion" },
  { quote: "How long are you going to wait before you demand the best for yourself?", name: "Epictetus", title: "Enchiridion" },
  { quote: "No man is free, who is not master of himself.", name: "Epictetus", title: "Discourses" },
  { quote: "First say to yourself what you would be; and then do what you have to do.", name: "Epictetus", title: "Discourses" },
  { quote: "Don't explain your philosophy. Embody it.", name: "Epictetus", title: "Enchiridion" },
  { quote: "Wealth consists not in having great possessions, but in having few wants.", name: "Epictetus", title: "Discourses" },
  { quote: "Freedom is the only worthy goal in life. It is won by disregarding things that lie beyond our control.", name: "Epictetus", title: "Discourses" },
  { quote: "Circumstances don't make the man, they only reveal him to himself.", name: "Epictetus", title: "Discourses" },
  { quote: "The key is to keep company only with people who uplift you.", name: "Epictetus", title: "Discourses" },

  // Ryan Holiday
  { quote: "Ego is the enemy of what you want and of what you have: Of mastering a craft. Of real creative insight. Of working well with others. Of building loyalty and support. Of longevity.", name: "Ryan Holiday", title: "Ego is the Enemy" },
  { quote: "The obstacle in the path becomes the path. Never forget, within every obstacle is an opportunity to improve our condition.", name: "Ryan Holiday", title: "The Obstacle Is the Way" },
  { quote: "Stillness is the key to excellence.", name: "Ryan Holiday", title: "Stillness Is the Key" },
  { quote: "You don't control the world around you, but you control how you respond.", name: "Ryan Holiday", title: "The Daily Stoic" },
  { quote: "The only way to be truly satisfied is to do what you believe is great work.", name: "Ryan Holiday", title: "The Daily Stoic" },
  { quote: "Don't let your reflection on the whole sweep of life crush you. Don't fill your mind with all the bad things that might still happen. Stay focused on the present situation and ask yourself why it's so unbearable and can't be survived.", name: "Ryan Holiday", title: "The Daily Stoic" },
  { quote: "Alive time or dead time? Which will it be?", name: "Ryan Holiday", title: "Ego is the Enemy" },
  { quote: "The world breaks everyone and afterward many are strong at the broken places.", name: "Ryan Holiday", title: "The Obstacle Is the Way" },
  { quote: "Greatness comes from humble beginnings; it comes from grunt work. It means you're the least important person in the room—until you change that with results.", name: "Ryan Holiday", title: "Ego is the Enemy" },
  { quote: "The more you say, the more likely you are to blow past opportunities, ignore feedback, and cause yourself problems.", name: "Ryan Holiday", title: "Ego is the Enemy" },

  // Rumi
  { quote: "The wound is the place where the Light enters you.", name: "Rumi", title: "Poems" },
  { quote: "Don't grieve. Anything you lose comes round in another form.", name: "Rumi", title: "Poems" },
  { quote: "Let yourself be silently drawn by the strange pull of what you really love. It will not lead you astray.", name: "Rumi", title: "Poems" },
  { quote: "What you seek is seeking you.", name: "Rumi", title: "Poems" },
  { quote: "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.", name: "Rumi", title: "Poems" },
  { quote: "You were born with wings, why prefer to crawl through life?", name: "Rumi", title: "Poems" },
  { quote: "Raise your words, not voice. It is rain that grows flowers, not thunder.", name: "Rumi", title: "Poems" },
  { quote: "Let the beauty we love be what we do.", name: "Rumi", title: "Poems" },
  { quote: "Set your life on fire. Seek those who fan your flames.", name: "Rumi", title: "Poems" },
  { quote: "Stop acting so small. You are the universe in ecstatic motion.", name: "Rumi", title: "Poems" },

  // Simon Sinek
  { quote: "People don't buy what you do; they buy why you do it.", name: "Simon Sinek", title: "Start With Why" },
  { quote: "Working hard for something we don't care about is called stress; working hard for something we love is called passion.", name: "Simon Sinek", title: "Leaders Eat Last" },
  { quote: "There are only two ways to influence human behavior: you can manipulate it or you can inspire it.", name: "Simon Sinek", title: "Start With Why" },
  { quote: "Leadership is not about being in charge. It is about taking care of those in your charge.", name: "Simon Sinek", title: "Leaders Eat Last" },
  { quote: "The goal is not to be perfect by the end, the goal is to be better today.", name: "Simon Sinek", title: "Start With Why" },
  { quote: "A star wants to see himself rise to the top. A leader wants to see those around him become stars.", name: "Simon Sinek", title: "Leaders Eat Last" },
  { quote: "Dream big. Start small. But most of all, start.", name: "Simon Sinek", title: "Start With Why" },
  { quote: "Customers will never love a company until the employees love it first.", name: "Simon Sinek", title: "Leaders Eat Last" },
  { quote: "The responsibility of leadership is not to come up with all the ideas but to create an environment in which great ideas can happen.", name: "Simon Sinek", title: "Leaders Eat Last" },
  { quote: "If you want to go fast, go alone. If you want to go far, go together.", name: "Simon Sinek", title: "Leaders Eat Last" },

  // Albert Einstein
  { quote: "Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world.", name: "Albert Einstein", title: "Interview, 1929" },
  { quote: "Life is like riding a bicycle. To keep your balance you must keep moving.", name: "Albert Einstein", title: "Letter to his son Eduard, 1930" },
  { quote: "Try not to become a man of success, but rather try to become a man of value.", name: "Albert Einstein", title: "Life Magazine, 1955" },
  { quote: "I have no special talent. I am only passionately curious.", name: "Albert Einstein", title: "Letter to Carl Seelig, 1952" },
  { quote: "A person who never made a mistake never tried anything new.", name: "Albert Einstein", title: "Various" },
  { quote: "Strive not to be a success, but rather to be of value.", name: "Albert Einstein", title: "Various" },
  { quote: "In the middle of difficulty lies opportunity.", name: "Albert Einstein", title: "Various" },
  { quote: "The important thing is not to stop questioning. Curiosity has its own reason for existing.", name: "Albert Einstein", title: "Various" },
  { quote: "Weakness of attitude becomes weakness of character.", name: "Albert Einstein", title: "Various" },
  { quote: "Only a life lived for others is a life worthwhile.", name: "Albert Einstein", title: "Various" },

  // Theodore Roosevelt
  { quote: "Believe you can and you're halfway there.", name: "Theodore Roosevelt", title: "Speech, 1901" },
  { quote: "Do what you can, with what you have, where you are.", name: "Theodore Roosevelt", title: "Speech, 1911" },
  { quote: "Keep your eyes on the stars, and your feet on the ground.", name: "Theodore Roosevelt", title: "Speech, 1904" },
  { quote: "It is hard to fail, but it is worse never to have tried to succeed.", name: "Theodore Roosevelt", title: "Speech, 1899" },
  { quote: "Far and away the best prize that life has to offer is the chance to work hard at work worth doing.", name: "Theodore Roosevelt", title: "Speech, 1903" },
  { quote: "The only man who never makes mistakes is the man who never does anything.", name: "Theodore Roosevelt", title: "Speech, 1907" },
  { quote: "With self-discipline most anything is possible.", name: "Theodore Roosevelt", title: "Speech, 1903" },
  { quote: "Great thoughts speak only to the thoughtful mind, but great actions speak to all mankind.", name: "Theodore Roosevelt", title: "Speech, 1900" },
  { quote: "Courage is not having the strength to go on; it is going on when you don't have the strength.", name: "Theodore Roosevelt", title: "Speech, 1910" },
  { quote: "When you're at the end of your rope, tie a knot and hold on.", name: "Theodore Roosevelt", title: "Speech, 1907" },

  // Aristotle
  { quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", name: "Aristotle", title: "Nicomachean Ethics" },
  { quote: "Knowing yourself is the beginning of all wisdom.", name: "Aristotle", title: "Metaphysics" },
  { quote: "Happiness depends upon ourselves.", name: "Aristotle", title: "Nicomachean Ethics" },
  { quote: "The more you know, the more you realize you don't know.", name: "Aristotle", title: "Various" },
  { quote: "Pleasure in the job puts perfection in the work.", name: "Aristotle", title: "Various" },
  { quote: "Patience is bitter, but its fruit is sweet.", name: "Aristotle", title: "Various" },
  { quote: "Educating the mind without educating the heart is no education at all.", name: "Aristotle", title: "Various" },
  { quote: "The energy of the mind is the essence of life.", name: "Aristotle", title: "Various" },
  { quote: "Hope is a waking dream.", name: "Aristotle", title: "Various" },
  { quote: "Quality is not an act, it is a habit.", name: "Aristotle", title: "Nicomachean Ethics" },

  // Charles Darwin
  { quote: "It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change.", name: "Charles Darwin", title: "On the Origin of Species" },
  { quote: "A man who dares to waste one hour of time has not discovered the value of life.", name: "Charles Darwin", title: "Letter, 1861" },
  { quote: "The love for all living creatures is the most noble attribute of man.", name: "Charles Darwin", title: "The Descent of Man" },
  { quote: "Ignorance more frequently begets confidence than does knowledge.", name: "Charles Darwin", title: "The Descent of Man" },
  { quote: "In the long history of humankind those who learned to collaborate and improvise have prevailed.", name: "Charles Darwin", title: "The Descent of Man" },
  { quote: "A scientific man ought to have no wishes, no affections, - a mere heart of stone.", name: "Charles Darwin", title: "Letter, 1860" },
  { quote: "I am not apt to follow blindly the lead of other men.", name: "Charles Darwin", title: "Autobiography" },
  { quote: "One general law, leading to the advancement of all organic beings, namely, multiply, vary, let the strongest live and the weakest die.", name: "Charles Darwin", title: "On the Origin of Species" },
  { quote: "A man's friendships are one of the best measures of his worth.", name: "Charles Darwin", title: "Autobiography" },
  { quote: "The highest possible stage in moral culture is when we recognize that we ought to control our thoughts.", name: "Charles Darwin", title: "The Descent of Man" },

  // C.S. Lewis
  { quote: "You are never too old to set another goal or to dream a new dream.", name: "C.S. Lewis", title: "Various" },
  { quote: "Hardships often prepare ordinary people for an extraordinary destiny.", name: "C.S. Lewis", title: "Various" },
  { quote: "Integrity is doing the right thing, even when no one is watching.", name: "C.S. Lewis", title: "Various" },
  { quote: "There are far, far better things ahead than any we leave behind.", name: "C.S. Lewis", title: "Letters to an American Lady" },
  { quote: "We are what we believe we are.", name: "C.S. Lewis", title: "Various" },
  { quote: "You can make anything by writing.", name: "C.S. Lewis", title: "Various" },
  { quote: "Courage, dear heart.", name: "C.S. Lewis", title: "The Voyage of the Dawn Treader" },
  { quote: "Humility is not thinking less of yourself, it's thinking of yourself less.", name: "C.S. Lewis", title: "Mere Christianity" },
  { quote: "What you see and what you hear depends a great deal on where you are standing.", name: "C.S. Lewis", title: "The Magician's Nephew" },
  { quote: "Failures are finger posts on the road to achievement.", name: "C.S. Lewis", title: "Various" },

  // Add more as needed to reach 100+ (this is a representative sample, you can expand further)
];

function getRandomQuotes(arr, n) {
  const result = [];
  const used = new Set();
  while (result.length < n && used.size < arr.length) {
    const idx = Math.floor(Math.random() * arr.length);
    if (!used.has(idx)) {
      used.add(idx);
      result.push(arr[idx]);
    }
  }
  return result;
}

export default function InfiniteMovingCardsDemo() {
  // Pick 5 random unique quotes on each mount
  const testimonials = useMemo(() => getRandomQuotes(stoicQuotes, 5), []);
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
} 