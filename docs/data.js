// ============================================================
// data.js — ALL schedule and care content lives here.
// This is the ONLY file you need to edit for times, instructions,
// commands, or care notes. Never touch index.html unless changing layout.
// ============================================================

// ── DEFAULT MODE ─────────────────────────────────────────────
// Change this to 'office' to make Office the default on load
const DEFAULT_MODE = 'wfh'; // 'wfh' or 'office'

// ── EMERGENCY INFO ───────────────────────────────────────────
const EMERGENCY = {
  vet: {
    name: 'Huntington Park Dog & Cat Clinic',
    phone: '[PLACEHOLDER: clinic phone number]',
    address: '[PLACEHOLDER: clinic address]',
  },
  emergencyVet: {
    name: '[PLACEHOLDER: nearest 24hr emergency vet name]',
    address: '[PLACEHOLDER: 24hr vet address]',
    phone: '[PLACEHOLDER: 24hr vet phone number]',
  },
  owners: [
    { name: '[PLACEHOLDER: your name]', phone: '[PLACEHOLDER: your cell number]' },
    { name: '[PLACEHOLDER: spouse/partner name]', phone: '[PLACEHOLDER: their cell number]' },
  ],
  insurance: {
    provider: '[PLACEHOLDER: pet insurance provider name]',
    sunnyPolicy: '[PLACEHOLDER: Sunny policy number]',
    lunaPolicy: '[PLACEHOLDER: Luna policy number]',
    note: 'Save all vet receipts for reimbursement.',
  },
  protocols: [
    {
      title: 'If Luna bites someone',
      steps: [
        'Stay calm. Do not yell at Luna.',
        'Immediately separate Luna — crate her or put her in another room.',
        'Attend to the person first. Wash the wound with soap and water.',
        'If skin is broken or the person is upset, call the owner right away.',
        'Do not scold Luna after the fact — she will not connect it to the bite.',
        'Owner contact: [PLACEHOLDER: your cell]',
      ],
    },
    {
      title: 'If Sunny is limping or yelping (IVDD warning)',
      steps: [
        'Do NOT pick him up or let him jump.',
        'Keep him as still and calm as possible.',
        'If he is crying, yelping, or unable to walk: this is an emergency.',
        'Call Huntington Park Dog & Cat Clinic immediately: [PLACEHOLDER: phone]',
        'If after hours, go directly to the 24hr emergency vet.',
        'Do not wait and see — spinal issues can escalate quickly.',
      ],
    },
  ],
};

// ── DOG PROFILES ─────────────────────────────────────────────
const DOGS = {
  sunny: {
    name: 'Sunny',
    color: '#E8A838', // warm amber — used for all Sunny UI accents
    breed: 'Chihuahua-Dachshund mix',
    born: 'February 16, 2021',
    sex: 'Male',
    weight: '~10 lbs',
    energy: 'Moderate — playful in bursts, self-regulates well',
    photos: ['sunny-1', 'sunny-2', 'sunny-3'], // add more: sunny-4, sunny-5...
    careGuide: [
      {
        title: 'Feeding',
        content: `Sunny eats ONCE a day, in the evening between 7–10pm.

No human food — ever. Seasoning has made him seriously ill. This is not a suggestion.
No known allergies otherwise.

If he skips dinner: offer the remainder after his next morning walk the following day.
If he hasn't pooped on a walk: he may just be empty. Feed a small amount and try again within the hour.`,
      },
      {
        title: 'Water',
        content: `Sunny drinks a lot of water — this is normal for him.
Water is freely available throughout the morning and day.
Cut off water around 7–8pm to help him make it through the night without a potty accident.`,
      },
      {
        title: 'Walks',
        content: `Two walks per day:
• Morning walk — flexible wake time, whenever you're ready
• Afternoon walk — between 5:00–6:30pm

ON LEASH AT ALL TIMES outside. No exceptions. He has poor car awareness and will not look before crossing.

Recall works ("Sunny, come" — loud and clear) but only use it in safe, fully enclosed areas.

Keep walks on FLAT GROUND ONLY — see IVDD Warning below.

If he hasn't pooped: he may just be empty. Offer a small meal and retry within the hour.`,
      },
      {
        title: 'Reactivity — Important',
        content: `Sunny is reactive on walks. He barks and lunges at other dogs.

The rule is simple: never let it get to that point.
• Scan ahead. If you see another dog, cross the street or create space BEFORE he notices.
• Never allow on-leash greetings — even with "friendly" dogs.
• Once he is reacting, it is too late. Prevention is the whole game.

This is not aggression — it is anxiety. Stay calm, move away, and move on.`,
      },
      {
        title: '⚠ IVDD Warning — Back Health',
        content: `Sunny is a Dachshund mix and at elevated risk for IVDD (intervertebral disc disease) — a serious spinal condition.

Rules that are NON-NEGOTIABLE:
• No jumping on or off furniture. Lift him up and down.
• No repetitive stair use. Carry him on stairs when possible.
• Flat ground only on walks — no hills, no uneven terrain.
• If he is limping, yelping, or reluctant to move: call the owner immediately and see Emergency page.`,
      },
      {
        title: 'Separation Anxiety',
        content: `Sunny has separation anxiety. [PLACEHOLDER: how it manifests — barking/whining, destructive behavior, shuts down, etc.]

[PLACEHOLDER: any specific instructions for managing it — TV on, puzzle toy, etc.]`,
      },
      {
        title: 'Commands',
        content: `• Collar — cue to put on or take off collar and leash clip
• Sit / Down — closed fist at waist is the visual cue (works alongside verbal)
• Leave It — use when he is sniffing too long or scavenging on walks
• Wait — he knows this less reliably; use Down or Leave It instead
• Break / Free — release cue, tells him he is done with whatever he was doing`,
      },
      {
        title: 'Vet & Insurance',
        content: `Vet: Huntington Park Dog & Cat Clinic
Phone: [PLACEHOLDER: clinic phone]

Sunny has pet insurance. Save ALL vet receipts — submit for reimbursement.
Insurance provider: [PLACEHOLDER]
Policy number: [PLACEHOLDER: Sunny policy number]`,
      },
    ],
  },

  luna: {
    name: 'Luna',
    color: '#7B68EE', // soft violet — used for all Luna UI accents
    breed: 'Unknown (street rescue, likely shepherd mix)',
    born: 'Approx. mid-2025',
    sex: 'Female',
    weight: '~35 lbs and still growing',
    energy: 'High — adolescent phase (6–18 months), most intense developmental stage',
    photos: ['luna-1', 'luna-2', 'luna-3'], // add more: luna-4, luna-5...
    careGuide: [
      {
        title: 'Feeding & Training',
        content: `Luna earns every meal through training. No free bowl, ever.

Her kibble is the currency that makes training work. Handing it over for free wastes the most powerful tool you have.

How to do it: hold a handful of kibble, ask for Sit or Down or Touch, reward each rep. Work through her full meal over 10–15 minutes.

Commands to work: Sit, Down, Stay, Touch/Come, Crate (voluntary entry), Collar, Drop It.
She is inconsistent — this is normal for her age. Keep sessions short, upbeat, and end on a win.`,
      },
      {
        title: '🚨 Biting Protocol — Follow Exactly',
        content: `Luna is in active biting inhibition training. Every caretaker must run the IDENTICAL protocol. One person allowing biting undoes all training.

When she bites:
1. Freeze all movement immediately. Do not pull away — that excites her.
2. Say "ouch" ONCE in a flat, calm tone. Not angry, not playful.
3. Turn your back or leave the room for 30 seconds.
4. Re-engage calmly.
5. If she bites again: end the session entirely. Put her in the crate.

What counts as biting: teeth on skin, teeth on clothing with pressure, mouthing that is not gentle.

Do NOT: yell, push her away, play-wrestle through it, or let it "slide just this once."`,
        highlight: true, // renders with distinct background
      },
      {
        title: 'Crate Schedule — Non-Negotiable',
        content: `Luna requires enforced rest after every active session. This is not optional.

Without crate rest, she becomes overtired and bitey, and learning does not consolidate.

Crate schedule (WFH day):
• 8:00am – 9:30am — Crate rest #1 (90 min)
• 11:30am – 1:00pm — Crate rest #2 (90 min)
• Bedtime: 8:30pm — last potty, then crate for the night

Crate rest is non-negotiable even if she seems fine. Especially then.

What to put in the crate with her:
Luna is actively teething and needs appropriate things to chew. Give her one or two of the following each time she goes in:
• A Kong stuffed with her kibble and a few treats
• A high-value treat like a pupperoni
• A rubber or bone chewing stick
• A frozen Kong stuffed with food, treats, and toppers (best choice when you'll be away for a while)

These are not extras — they channel her need to bite toward the right thing while her adult teeth are coming in. When she's chewing what she's supposed to, praise her calmly and then leave her alone. Don't hover. The goal is for her to settle and self-soothe.

Where she sleeps overnight: [PLACEHOLDER: crate in bedroom / elsewhere / not yet overnight trained]`,
      },
      {
        title: 'Yard & Play',
        content: `Luna is NOT cleared for off-property walks yet — vaccines not complete.
All exercise happens in the yard. Confirm yard is fully secured before releasing her.

[PLACEHOLDER: confirm backyard is fully fenced and secure — affects long-line instructions]

Yard sessions:
• Tug with Drop It built in — you call the end of the game, not her
• Long-line fetch with Come recall — she drags the long line so you can always get her back
• Recall sprints — call her name + come, reward heavily when she arrives

After every active session → crate rest. No exceptions.

No rough play after 7pm — she needs to wind down before bed.`,
      },
      {
        title: 'Mental Stimulation',
        content: `Luna needs mental work daily, not just physical exercise. A tired brain is more effective than a tired body.

Rotate daily (pick one per mental session):
• Snuffle mat or kibble scattered in cups — sniff work
• Hand targeting variations — touch your palm with her nose, in different positions
• Mat / place training — go to a specific mat and stay
• Name focus game — say her name, reward eye contact
• Puzzle feeder with her meal

Mental sessions: ~20 minutes around 11am on WFH days, or during midday coverage on office days.`,
      },
      {
        title: 'Reactivity on Leash',
        content: `Luna freezes when she encounters other dogs on leash.

Do not force interaction. Do not pull her toward the other dog. Do not wait for her to "get over it."
Simply create calm distance and move on. Keep your energy neutral.

She is not vaccinated for off-property walks yet — yard only until vet cleared.`,
      },
      {
        title: 'Leash Walking (Work in Progress)',
        content: `Luna does not know how to loose leash walk yet. This is normal at her age, especially for a dog with likely herding genetics — she is wired to control movement. She will cut in front of you, forge ahead, and get frustrated if challenged. This is not defiance. It is a skill she has not been taught yet.

What is happening: she is trying to "herd" you. Crossing in front, cutting you off, blocking your path — this is instinct, not bad behavior.

How to teach it:

BE A TREE
The moment the leash goes tight OR she crosses in front of you → stop completely. Zero movement, zero words. Wait for her to release the tension and orient back toward you. The second the leash goes slack → mark ("yes") and move again. You are teaching: taut leash = everything stops.

DIRECTION CHANGES
When she forges ahead or cuts in front, pivot and walk the other direction without warning or fanfare. No words, no corrections — just turn and go. She has to follow you. Do this repeatedly. She will start watching your feet instead of leading you.

MARK THE LOOSE LEASH MOMENT
The instant she is beside you with a loose leash → "yes" + treat. This is the behavior you are building. Reward it every time you catch it.

SNIFF BREAKS ARE EARNED — NOT FREE
She wants to sniff. Use that. Ask for a few steps of loose leash walking → say "go sniff" and let her have 20 seconds on a smell. Then move on. Sniffing becomes the reward she is working toward, not something she grabs impulsively.

DO NOT correct by pulling the leash upward. Leash pops create opposition reflex and frustration — they communicate nothing useful to an adolescent dog. Use movement and stopping instead.

KEEP SESSIONS SHORT
10–15 minutes maximum. When she starts jumping at you or trying to block your path entirely, she is overtired and over threshold. End the session there. You cannot train a dog past that point.

DO MORE MENTAL WORK BEFORE WALKS
A training session + snuffle mat before you leave = meaningfully calmer energy on the walk. Physical walks tire the body. Mental work tires the brain. Right now she needs both, in that order.

Realistic timeline: consistent daily work over 4–8 weeks before this starts to click. Every walk is a training session. Stay the course.`,
      },
      {
        title: 'Commands (Work in Progress)',
        content: `Luna has beginnings of these commands — she is inconsistent, especially with new distractions. That is normal.

• Sit — most reliable
• Down — building
• Stay — early stages
• Touch / Come — hand target + recall, use with long line
• Crate — voluntary entry on cue
• Collar — cue to put on or take off collar
• Drop It — use during tug

She cannot be trusted off leash. Recall is shaky. This will improve — stay the course.`,
      },
      {
        title: 'Vet & Vaccine Status',
        content: `Vet: Huntington Park Dog & Cat Clinic
[PLACEHOLDER: has Luna had her first vet visit yet? Register her here if not.]
[PLACEHOLDER: vaccine status — which shots has she had, what is still pending?]

Walk clearance: Luna cannot go on off-property walks until vaccines are complete and vet clears her.
Once cleared: enroll in group obedience class immediately.

Pet insurance: [PLACEHOLDER: is Luna insured? If yes, provider and policy number]`,
      },
    ],
  },
};

// ── SCHEDULE DATA ─────────────────────────────────────────────
// Each entry: { time, dog, activity, nonNeg, details, officeOnly, wfhOnly }
// nonNeg: true = shows NON-NEGOTIABLE badge
// dog: 'sunny' | 'luna' | 'both'

const SCHEDULE = {
  wfh: [
    {
      time: '07:00',
      dog: 'luna',
      activity: 'Wake + yard potty',
      nonNeg: false,
      details: `10 minutes. Leash on in yard — potty first, no play until she goes.
Keep it calm and boring until she does her business. No greetings, no games, no talking much.
Once she goes → then you can engage.`,
    },
    {
      time: '07:00',
      dog: 'sunny',
      activity: 'Morning walk',
      nonNeg: false,
      details: `Flexible — whenever you're ready after waking up.
On leash, flat ground only. Morning potty walk.
Watch for other dogs — cross the street before he reacts.
If he hasn't pooped: he may just be empty. Feed a small meal and retry within the hour.`,
    },
    {
      time: '07:15',
      dog: 'luna',
      activity: 'Breakfast training',
      nonNeg: true,
      details: `15 minutes. Every kibble earned — no free bowl.
Work: Sit / Down / Stay / Touch / Collar / Crate send.
Short reps, upbeat tone, end on a win.
This is her breakfast AND her training session. Do not skip it.`,
    },
    {
      time: '07:35',
      dog: 'luna',
      activity: 'Structured yard play',
      nonNeg: false,
      details: `20 minutes. You run this session — not her.
• Tug with Drop It built in (you end the game)
• Long-line fetch with Come recall
Move with purpose. Keep her engaged but you stay in charge.`,
    },
    {
      time: '08:00',
      dog: 'luna',
      activity: 'Crate rest #1',
      nonNeg: true,
      details: `90 minutes. Door closed.

Give her something appropriate to chew — pick one or two:
• Kong stuffed with her kibble and a few treats
• A pupperoni or other high-value treat
• A rubber or bone chewing stick
• Frozen Kong stuffed with food, treats, and toppers (great if you need to step away)

Luna is teething. Chewing is how she relieves that pressure — giving her the right thing now prevents her from finding the wrong thing later. When she's chewing what she's supposed to: praise her calmly, then leave her alone to settle.

She may whine briefly — this is normal. Do not let her out until time is up unless there is an emergency.
This rest is non-negotiable. Her brain needs to consolidate what she just learned.`,
    },
    {
      time: '09:30',
      dog: 'luna',
      activity: 'Crate rest ends',
      nonNeg: false,
      details: `You can let Luna out now. Take her straight to the yard for a quick potty.`,
    },
    {
      time: '11:00',
      dog: 'luna',
      activity: 'Mental work session',
      nonNeg: true,
      details: `20 minutes. Rotate daily (pick one):
• Snuffle mat or kibble hidden in cups — sniff work
• Hand targeting variations
• Mat / place training
• Name focus game (say her name, reward eye contact)
• Puzzle feeder with portion of her dinner kibble

Mental work is not optional. It is more tiring and more valuable than physical exercise alone.`,
    },
    {
      time: '11:30',
      dog: 'luna',
      activity: 'Crate rest #2',
      nonNeg: true,
      details: `90 minutes. Door closed.

Same comfort items as crate rest #1 — Kong with kibble/treats, pupperoni, chewing stick, or frozen Kong. A frozen Kong is especially useful here if you have other things to get done; it keeps her busy and calm without you needing to be nearby.

Praise her calmly when she's chewing what she should, then walk away and let her settle.
She should go down faster this time.`,
    },
    {
      time: '13:00',
      dog: 'luna',
      activity: 'Crate rest ends',
      nonNeg: false,
      details: `Let Luna out for a quick yard potty.`,
    },
    {
      time: '14:00',
      dog: 'luna',
      activity: 'Big physical session',
      nonNeg: true,
      details: `25 minutes. This is her most active session of the day.
• Long-line recall sprints — call her name + come, reward heavily
• Fetch with sit-before-throw (she must sit and wait before you throw)
• Down-stay distance work — increase distance gradually
• Deliberate distraction proofing — work near something interesting

After this session → crate rest or wind-down inside.`,
    },
    {
      time: '17:00',
      dog: 'sunny',
      activity: 'Afternoon walk',
      nonNeg: false,
      details: `Between 5:00–6:30pm. On leash, flat ground only.
Watch for other dogs — cross before he reacts. No on-leash greetings.
If he hasn't pooped: may be empty. Small meal, retry within the hour.`,
    },
    {
      time: '18:00',
      dog: 'luna',
      activity: 'Dinner training + wind down',
      nonNeg: true,
      details: `15 minutes. Earn kibble — review known commands only. No new stuff.
End on a guaranteed win (her easiest, most solid command).
No rough play after 7pm. Wind-down mode only.`,
    },
    {
      time: '19:00',
      dog: 'sunny',
      activity: 'Dinner',
      nonNeg: false,
      details: `Sunny eats once a day, anytime in the 7–10pm window.
No human food. No seasoning. Ever.
If he skips: offer remainder after next morning walk.
Cut off water around 7–8pm to help him through the night.`,
    },
    {
      time: '19:00',
      dog: 'sunny',
      activity: 'Water cutoff',
      nonNeg: false,
      details: `Pick up Sunny's water bowl around 7–8pm.
This helps him make it through the night without a potty accident.`,
    },
    {
      time: '20:30',
      dog: 'luna',
      activity: 'Last potty + crate for bed',
      nonNeg: true,
      details: `Quick yard potty. Keep it calm and boring — no play.
Then straight to crate for the night.

Give her something to chew as she settles — a chewing stick (rubber or bone) or a lightly stuffed Kong works well overnight. If she wakes up in the early hours, having something to chew helps her self-soothe and go back down without needing attention. Praise her calmly when she takes it, then leave her to it.

[PLACEHOLDER: where does Luna sleep — crate in bedroom, elsewhere?]`,
    },
  ],

  office: [
    {
      time: '07:00',
      dog: 'luna',
      activity: 'Wake + yard potty',
      nonNeg: false,
      details: `Same as WFH. Leash on in yard, potty first, calm until she goes.`,
    },
    {
      time: '07:00',
      dog: 'sunny',
      activity: 'Morning walk',
      nonNeg: false,
      details: `Same as WFH — on leash, flat ground, watch for other dogs.`,
    },
    {
      time: '07:15',
      dog: 'luna',
      activity: 'Breakfast training',
      nonNeg: true,
      details: `Same as WFH. Done before leaving for office. Every kibble earned.
Work: Sit / Down / Stay / Touch / Collar / Crate send.`,
    },
    {
      time: '07:35',
      dog: 'luna',
      activity: 'Structured yard play (compressed)',
      nonNeg: false,
      details: `15 minutes before leaving — slightly shorter than WFH.
Tug with Drop It, quick recall reps. Wrap up with time to spare before you have to go.`,
    },
    {
      time: '08:00',
      dog: 'luna',
      activity: 'Crate with Kong + puzzle feeder',
      nonNeg: true,
      details: `Luna goes in crate before you leave.

Give her a frozen Kong stuffed with food, treats, and toppers — this is the best option for a longer stretch alone. It takes time to work through, keeps her focused on the right thing, and helps her settle without needing you there. You can also add a chewing stick (rubber or bone) or a pupperoni alongside it.

Luna is teething. Having appropriate chew items in the crate is not optional comfort — it actively channels her biting urge. When you're putting her in, praise her calmly once she takes the Kong or chew, then leave without a fuss.

MIDDAY COVERAGE REQUIRED — do not leave without confirming someone is coming.`,
    },
    {
      time: '12:00',
      dog: 'luna',
      activity: 'Midday mental session',
      nonNeg: true,
      details: `COVERAGE REQUIRED — this is NOT optional.
Caretaker runs the mental session: sniff work, hand targeting, puzzle feeder, etc.
Same as WFH mental session — 20 minutes of brain work.
Flag immediately if coverage is unconfirmed.`,
    },
    {
      time: '14:00',
      dog: 'luna',
      activity: 'Big physical session',
      nonNeg: true,
      details: `COVERAGE REQUIRED.
Long-line recall, fetch with sit-before-throw, down-stay work.
Flag if coverage is unconfirmed before leaving in the morning.`,
    },
    {
      time: '17:00',
      dog: 'sunny',
      activity: 'Afternoon walk',
      nonNeg: false,
      details: `Between 5:00–6:30pm. On leash, flat ground, watch for other dogs.
Sunny is more independent — main flag is ensuring someone covers this window.`,
    },
    {
      time: '18:00',
      dog: 'luna',
      activity: 'Dinner training + wind down',
      nonNeg: true,
      details: `Returning owner handles this. Earn kibble, review known commands, end on a win.
No rough play after 7pm.`,
    },
    {
      time: '19:00',
      dog: 'sunny',
      activity: 'Dinner',
      nonNeg: false,
      details: `Sunny eats once a day, anytime 7–10pm. No human food.`,
    },
    {
      time: '19:00',
      dog: 'sunny',
      activity: 'Water cutoff',
      nonNeg: false,
      details: `Pick up water bowl around 7–8pm.`,
    },
    {
      time: '20:30',
      dog: 'luna',
      activity: 'Last potty + crate for bed',
      nonNeg: true,
      details: `Quick yard potty. Keep it calm — no play.
Then straight to crate for the night.

Give her a chewing stick (rubber or bone) or a lightly stuffed Kong to settle with. A frozen Kong works well here too. Praise her calmly once she takes it, then leave her to wind down. Having something to chew helps her self-soothe if she stirs in the night.`,
    },
  ],
};

// ── DOG DYNAMIC ───────────────────────────────────────────────
const DOG_DYNAMIC = {
  met: '[PLACEHOLDER: Have Sunny and Luna met? Not yet / Fine / Tense / Coexist but not bonded]',
  fedTogether: '[PLACEHOLDER: Are they ever fed in the same space?]',
  yardTogether: '[PLACEHOLDER: Can they be in the yard at the same time?]',
};

// ── CARETAKER CONTEXT ─────────────────────────────────────────
const CARETAKER = {
  officeBackup: '[PLACEHOLDER: Who covers when you are in the office, and what is their experience level with dogs?]',
  lunaTransparency: '[PLACEHOLDER: How honestly do you want Luna flagged for sitters? Fully transparent / Neutral / Somewhere between]',
  travelMode: false, // set to true to show travel/overnight mode placeholder
};
