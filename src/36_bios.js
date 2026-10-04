/* ===================== BIOS, SPEAKERS, EXTRA CAST ===================== */
// one-line intake joke per resident (raunchy, cleaner)
const BIO = {
  meatball: V('Professional napper. Snores like a leaf blower. Farts like a war crime.', 'Professional napper. Snores like a leaf blower. Toots like a kazoo.'),
  chancla: V('4 lbs. Thinks she\'s a Rottweiler. Barks at the wind and at the concept of Tuesday. Zero chill, all balls.', '4 lbs. Thinks she\'s a Rottweiler. Barks at the wind and at the concept of Tuesday.'),
  barksalot: 'Sighs like he\'s in a telenovela. Takes forty minutes to lie down.',
  tamale: 'A burrito that barks. Lives in blankets. Files complaints when unwrapped.',
  kevin: V('One brain cell, shared with no one. Gets stuck in cabinets. Licks his own butt during interviews.', 'One brain cell, shared with no one. Gets stuck in cabinets.'),
  duchess: V('Royalty in exile. Demands bottled water. Has judged every person who ever lived and found them full of shit.', 'Royalty in exile. Demands bottled water. Has judged every person who ever lived.'),
  taco: 'The happiest dog alive. Terrified of exactly one thing: tumbleweeds.',
  boots: 'Escape artist. Ella calls him "AWOL." Once found in a burrito drive-through line.',
  churro: V('Eats everything: socks, hair ties, a whole remote. It all comes out eventually. Sometimes in the car.', 'Eats everything: socks, hair ties, a whole remote. Sweetest face in the 915.'),
  pelon: 'Hairless. Always cold. It\'s 104°F outside. Wears a sweater from the Abuelas.',
  lowrider: 'Thinks he\'s a car. Low, fast and proud. Bounces when he\'s happy.',
  sarge: 'Retired military working dog. Head of security. Has seen things. Ella\'s partner.',
  coyote: 'Steals shoes. Howls at the Star on the Mountain every night at 8:00 sharp.',
  gator: 'Says her great-great-grandma lived in San Jacinto Plaza. Wants to be a lap dog. Is 11 feet long.',
  gila: V('Grumpy, slow, deeply into naps. Bites only on Mondays. Will bite your ass on Mondays.', 'Grumpy, slow, deeply into naps. Bites only on Mondays.'),
  lion: 'Huge. Majestic. Crippling stage fright. Roars only in private, mostly in the porta-potty.',
  tiger: 'Ex-Las Vegas show tiger. Insists on a spotlight. Purrs when someone says "encore."',
  eagle: 'Screams at anything patriotic, including the color blue. Salutes Ella back.',
  rhino: V('Nearsighted. Charges anything that looks like her ex, a beige sedan. That bastard.', 'Nearsighted. Charges anything that looks like her ex, a beige sedan.'),
  python: 'Wants hugs. All the hugs. At once. Too many hugs. Twenty feet of hugs.',
  rattler: 'Rattles in perfect 16th notes. Drummer of the Ark\'s house funk band.',
  elephant: V('Six tons. Gentle. Terrified of Chancla. Poops a beanbag chair every hour.', 'Six tons. Gentle. Terrified of Chancla.'),
  trex: 'Arms too short to clap. Sad at birthday parties. Bites as a love language.',
  tri: 'A gentle lawnmower. Eats every plant on the property. Especially the cactus.',
  javelina: V('Smells like a gym bag full of hot farts. Proud of it.', 'Smells like a gym bag. Proud of it.'),
  roadrunner: 'Twenty mph. Never stops. Never shuts up. Offended you said "meep meep."',
  penguin: 'Arrived in a cooler from who-knows-where. It\'s 106°F. He\'s fine. He\'s NOT fine.',
  gorilla: 'Dad energy. Grills vegetables. Gives advice nobody asked for.',
  hippo: V('Queen of the Swamp Pool. Territorial about her float. Tail-flings poop like a fan. Stand back.', 'Queen of the Swamp Pool. Fiercely territorial about her pool float.'),
  flamingo: 'Dances flamenco on one leg. Turns pinker when she\'s happy.',
  sloth: 'Named ironically. Has been trying to reach the food bowl since last week.',
  kangaroo: 'Boxer. Shadowboxes everyone at the gate. Keeps three stolen phones in her pouch.',
  mammoth: V('Built for the Ice Age. Is in El Paso. Has swamp ass the size of a Buick.', 'Built for the Ice Age. Is in El Paso. Sweats. So much.'),
  octopus: 'Escapes her tank nightly to steal snacks. Opens jars better than Ella.',
  tarantula: 'Eight hairy legs, zero bad intentions. Wears tiny socks in winter.',
  skunk: V('Named Perfume. Lives up to it in the worst way. Clears a room with one butt-lift.', 'Named Perfume. Lives up to it in the worst way.'),
  chupi: 'The legendary Chupacabra. Mostly drinks horchata. Misunderstood.',
  jackalope: 'Real. Very real. Sings tenor. Hates being called a myth.',
  straydog: [V('Found eating a burrito out of a dumpster on Montana Ave. Living the dream.', 'Found eating a burrito behind a taco stand. Living the dream.'), 'Showed up at the gangplank and sat down like he had a reservation.', V('Rolled in something dead and is VERY proud of it.', 'Rolled in something awful and is very proud of it.'), 'Good boy. Confirmed by three independent sources.'],
  straycat: [V('Hisses at everyone. Purrs at Ella. Shits in the plant.', 'Hisses at everyone. Purrs at Ella. Lives in the plant.'), 'Arrived in a box. Refuses to leave the box.', 'Knocked a cup off a table to establish dominance.', 'Speaks only in disapproving blinks.'],
};
function bioOf(r) {
  if (r.sp === 'mash') return tx(r.mash.gag) || '';
  const b = BIO[r.sp]; if (Array.isArray(b)) return tx(b[(r.stray || r.id) % b.length]); return tx(b || '');
}
// extra speakers for the story player
CAST.auction = { name: 'County Auctioneer', skin: '#e0b090', hair: 'short', hairCol: '#9a9a9a', hat: 'cowboy', shirt: '#e8e0c8', vest: '#7a4a2a', acc: 'bowtie', tie: '#2a3a6a', mouth: 'grin', seed: 12 };
const SPEAKER = { narr: ['', '#ffe9a8'], ella: ['Ella', '#7ad0ff'], sarge: ['Sarge', '#e0b878'], lupe: ['Doc Lupe', '#9ee0c8'], dakota: ['Dakota', '#d6a0ff'], dusty: ['Uncle Dusty', '#ffb08a'], plinth: ['Inspector Plinth', '#c8d4e0'], splice: ['Dr. Splice', '#a8f0a0'], bottomline: ['Chase Bottomline', '#ff9a9a'], trent: ['Trent Dazzleton', '#ffd27a'], gerald: ['Gerald the Stork', '#f4f4f4'], auction: ['Auctioneer', '#f0d8a8'], glitterina: ['Glitterina', '#ff9ad8'], dex: ['Dex Orbitz', '#c8d0e0'] };
function speakerBust(id) { if (CAST[id]) return CAST[id]; const c = CELEBS.find(c => c.id === id); return c ? Object.assign({ seed: hashStr(id) % 99 }, c.bust) : null; }
// the signature care name for a resident
function sigName(r) { if (r.sp === 'mash') return 'Puddle pampering'; const s = SP[r.sp]; return s && s.sigName ? tx(s.sigName) : 'Belly rubs'; }
const hasSig = r => !r.stray;
