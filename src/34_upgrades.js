/* ===================== UPGRADES + ECONOMY DATA ===================== */
// br: hab care out staff puddle glam ; stalls: [hab, count]; act: unlock act; req: prerequisite id
const UPG = [
  { id: 'h_kennel2', br: 'hab', name: 'Kennel Wing', cost: 300, act: 1, stalls: ['kennel', 2], desc: '+2 kennels. More floof per square foot.' },
  { id: 'h_kennel3', br: 'hab', name: 'Cat Condo Tower', cost: 900, act: 1, req: 'h_kennel2', stalls: ['kennel', 2], desc: V('+2 kennels. Cats will still sit in the box it came in. Assholes.', '+2 kennels. Cats will still sit in the box it came in.') },
  { id: 'h_desert', br: 'hab', name: 'Desert Run', cost: 2500, act: 2, stalls: ['desert', 2], desc: '+2 desert stalls. Coyotes, javelinas, roadrunners, cryptids.' },
  { id: 'h_swamp', br: 'hab', name: 'Swamp Pool', cost: 3500, act: 2, stalls: ['swamp', 2], desc: 'A swamp. In the desert. +2 stalls for gators and hippos.' },
  { id: 'h_reptile', br: 'hab', name: 'Reptile Sauna', cost: 3000, act: 2, stalls: ['reptile', 2], desc: '+2 hot stalls for snakes, Gila monsters and spiders.' },
  { id: 'h_bigcat', br: 'hab', name: 'Big Cat Deck', cost: 8000, act: 2, stalls: ['bigcat', 2], desc: '+2 stalls with a spotlight and a scratching telephone pole.' },
  { id: 'h_sky', br: 'hab', name: 'Aviary Mast', cost: 5000, act: 2, stalls: ['sky', 2], desc: '+2 high perches. Freedom screams approval.' },
  { id: 'h_jungle', br: 'hab', name: 'Jungle Deck', cost: 7000, act: 2, stalls: ['jungle', 2], desc: '+2 leafy stalls. Big Dave installs a grill.' },
  { id: 'h_ice', br: 'hab', name: 'Ice Room', cost: 7000, act: 2, stalls: ['ice', 2], desc: '+2 frozen stalls. It\'s 104°F outside. Good luck.' },
  { id: 'h_salt', br: 'hab', name: 'Saltwater Tank', cost: 8000, act: 2, stalls: ['salt', 2], desc: '+2 tank stalls. Octavia already found the exit.' },
  { id: 'h_mud', br: 'hab', name: 'Mud Wallow', cost: 10000, act: 2, stalls: ['mud', 2], desc: V('+2 mud stalls. Smells like a wet fart in a hot car.', '+2 mud stalls. Smells like a swamp in a hot car.') },
  { id: 'h_pachy', br: 'hab', name: 'Pachyderm Hold', cost: 15000, act: 2, stalls: ['pachy', 2], desc: '+2 HUGE stalls. Comes with a front-loader for the poop.' },
  { id: 'h_jurassic', br: 'hab', name: 'Jurassic Paddock', cost: 12000, act: 2, stalls: ['jurassic', 2], desc: '+2 stalls. Clever girl.' },
  { id: 'h_mashdeck', br: 'hab', name: 'Mashup Deck', cost: 60000, act: 3, stalls: ['kennel', 4], desc: '+4 big stalls for whatever the Puddle coughs up.' },
  { id: 'h_ark2', br: 'hab', name: 'The Second Ark', cost: 1500000, act: 4, req: 'h_mashdeck', stalls: ['kennel', 6], desc: 'Uncle Dusty built another one. +6 stalls. He\'s so happy.' },
  { id: 'c_feeder', br: 'care', name: 'Auto-Feeder', cost: 500, act: 1, desc: 'Hunger drains 25% slower.' },
  { id: 'c_wash', br: 'care', name: 'Animal Car Wash', cost: 1400, act: 1, desc: 'Washing takes one quick scrub.' },
  { id: 'c_vac', br: 'care', name: 'Poop Vacuum 3000', cost: 4000, act: 2, desc: V('30% less poop. The vacuum is haunted by the smell.', '30% less mess.') },
  { id: 'c_vet', br: 'care', name: 'Vet Bay', cost: 9000, act: 2, desc: 'Vet checks heal fully and Health drains slower.' },
  { id: 'c_ac', br: 'care', name: 'Poop-Powered A/C', cost: 45000, act: 3, desc: V('Turns shit into cool air. +$2K/day from the power company.', 'Turns waste into cool air. +$2K/day from the power company.') },
  { id: 'c_robo', br: 'care', name: 'Robo-Scooper', cost: 300000, act: 4, desc: 'Scoops a pile every few seconds by itself.' },
  { id: 'o_flyer', br: 'out', name: 'Farmers-Market Flyers', cost: 200, act: 1, desc: 'Unlocks the Flyer ad channel (+1 local adopter).' },
  { id: 'o_billboard', br: 'out', name: 'I-10 Billboard', cost: 4000, act: 2, desc: 'Unlocks the Billboard ad channel (big buzz, +1 adopter).' },
  { id: 'o_radio', br: 'out', name: 'KFNK Radio Jingle', cost: 15000, act: 2, desc: 'Unlocks the Radio channel. The jingle is a banger.' },
  { id: 'o_monday', br: 'out', name: 'Mashup Monday Studio', cost: 80000, act: 3, desc: 'Unlocks the Mashup Monday channel (huge buzz).' },
  { id: 'o_heli', br: 'out', name: 'Helipad', cost: 400000, act: 3, desc: 'Celebrities can land. Act 4 begins.' },
  { id: 'o_carpet', br: 'out', name: 'Velvet Red Carpet', cost: 1500000, act: 4, req: 'o_heli', desc: '+1 celebrity every Open House, +10% donations.' },
  { id: 's_lupe', br: 'staff', name: 'Doc Lupe on Call', cost: 800, act: 1, desc: 'Health drains 30% slower. She brings her own coffee.' },
  { id: 's_dusty', br: 'staff', name: 'Uncle Dusty, Handyman', cost: 3000, act: 2, desc: 'Scoops one poop pile every 12 seconds.' },
  { id: 's_abuelas', br: 'staff', name: 'Abuela Knitting Brigade', cost: 20000, act: 2, desc: 'Happy drains 30% slower. Everyone gets a sweater.' },
  { id: 's_crew', br: 'staff', name: "Ella's Crew", cost: 60000, act: 3, desc: 'Volunteers play with a random resident every 8 seconds.' },
  { id: 's_splice', br: 'staff', name: 'Dr. Splice (Reformed)', cost: 1000000, act: 4, desc: 'More Rare mashups. He\'s finally got friends.' },
  { id: 'p_bench', br: 'puddle', name: 'Love Bench', cost: 30000, act: 3, desc: 'You pick which two residents go to Romance Hour.' },
  { id: 'p_scope', br: 'puddle', name: 'Mash-o-Scope', cost: 90000, act: 3, req: 'p_bench', desc: 'Preview a pair and see which combos are LEGENDARY.' },
  { id: 'p_disco', br: 'puddle', name: 'Disco Ball', cost: 250000, act: 3, req: 'p_bench', desc: V('Two couples per Romance Hour. It\'s getting freaky down there.', 'Two couples per Romance Hour.') },
  { id: 'p_filter', br: 'puddle', name: 'Puddle Filter', cost: 1200000, act: 4, desc: 'Mashups arrive happier and with higher Funny Scores.' },
  { id: 'g_paint', br: 'glam', name: 'Fresh Paint', cost: 150, act: 1, desc: '+3 reputation. It no longer looks haunted.' },
  { id: 'g_lights', br: 'glam', name: 'String Lights', cost: 700, act: 1, desc: '+5 adoptability for every resident.' },
  { id: 'g_speakers', br: 'glam', name: 'Funk Speakers', cost: 6000, act: 2, desc: 'Happy drains slower. Everyone dances.' },
  { id: 'g_neon', br: 'glam', name: 'Neon Sign', cost: 35000, act: 3, desc: '+1 adopter every Open House.' },
  { id: 'g_gala', br: 'glam', name: 'Gala Ballroom', cost: 4000000, act: 4, desc: 'For the Billion-Dollar Bark Gala. Chandeliers made of chew toys.' },
  { id: 'g_gold', br: 'glam', name: 'Gold Gangplank', cost: 10000000, act: 4, req: 'g_gala', desc: '+15% donations. Gaudy. Perfect.' },
];
const UPG_BY = {}; UPG.forEach(u => UPG_BY[u.id] = u);
const BRANCHES = [['hab', 'Habitats', '#5aa060'], ['care', 'Care Tech', '#3a8ad0'], ['out', 'Outreach', '#e08a3a'], ['staff', 'Staff', '#a060c0'], ['puddle', 'Puddle Lab', '#2fb8b0'], ['glam', 'Ark Glam', '#e0507a']];
const CHANNELS = [
  { id: 'gram', name: 'Adopt-a-Gram', cost: 0, buzz: 1, adopters: 0, per: 3, req: null },
  { id: 'flyer', name: 'Flyer', cost: 15, buzz: 1, adopters: 1, per: 2, req: 'o_flyer' },
  { id: 'billboard', name: 'I-10 Billboard', cost: 400, buzz: 2, adopters: 1, per: 2, req: 'o_billboard' },
  { id: 'radio', name: 'Radio Jingle', cost: 1500, buzz: 2, adopters: 2, per: 1, req: 'o_radio' },
  { id: 'monday', name: 'Mashup Monday', cost: 8000, buzz: 3, adopters: 2, per: 1, req: 'o_monday' },
];
const has = id => !!GS.upgrades[id];
const BASE_STALLS = 4;
function stallList() { const L = []; for (let i = 0; i < BASE_STALLS; i++) L.push('kennel'); for (const u of UPG) if (u.stalls && has(u.id)) for (let i = 0; i < u.stalls[1]; i++) L.push(u.stalls[0]); return L; }
