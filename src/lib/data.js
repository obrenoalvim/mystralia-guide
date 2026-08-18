import seedMemories from '../data/seed-memories.json';
import datminedMemories from '../data/datamined-memories.json';
import baseSpellsOfficial from '../data/base-spells-official.json';
import baseSpellVariants from '../data/base-spell-variants.json';
import effectsData from '../data/effects.json';

// Datamined memories: normalize shape to match seed memories (namePt/nameEn already present).
const normalizedDatamined = datminedMemories.map((m) => ({
  id: m.id,
  name: m.namePt,
  namePt: m.namePt,
  nameEn: m.nameEn,
  tier: m.tier,
  type: m.type,
  element: m.element,
  focus: m.focus,
  source: m.source,
  icon: m.icon,
  descPt: m.descPt,
  descEn: m.descEn,
  scores: m.scores,
}));

export const MEMORIES = [...seedMemories, ...normalizedDatamined];

const normalizedVariants = baseSpellVariants
  .filter((s) => !s.official)
  .map((s) => ({
    id: s.id,
    name: s.namePt,
    namePt: s.namePt,
    nameEn: s.nameEn,
    element: s.element,
    family: s.family,
    icon: s.icon,
    descPt: s.descPt,
    descEn: s.descEn,
    scores: s.scores,
    official: false,
  }));

const normalizedOfficial = baseSpellsOfficial.map((s) => ({
  id: s.id,
  name: s.name,
  namePt: s.name,
  nameEn: s.name,
  element: s.element,
  family: s.family,
  icon: s.icon,
  descPt: s.descPt,
  descEn: s.descEn,
  scores: s.scores,
  official: true,
}));

export const BASE_SPELLS = [...normalizedOfficial, ...normalizedVariants];

export const FAMILIES = ['punch', 'beam', 'boomerang', 'snipe', 'stone'];

export const CATEGORY_KEYS = ['dano', 'area', 'controle', 'mobilidade', 'sustentacao'];

export const EFFECTS = effectsData;
