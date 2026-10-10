import { describe, it, expect } from 'vitest';
import { toBritishEnglish } from './britishEnglish';

describe('toBritishEnglish utility', () => {
  describe('Rule 1: -ization and -izations to -isation and -isations', () => {
    it('converts lowercase -ization words', () => {
      expect(toBritishEnglish('organization')).toBe('organisation');
      expect(toBritishEnglish('prioritization')).toBe('prioritisation');
      expect(toBritishEnglish('privatization')).toBe('privatisation');
      expect(toBritishEnglish('standardization')).toBe('standardisation');
      expect(toBritishEnglish('commercialization')).toBe('commercialisation');
    });

    it('converts plural -izations words', () => {
      expect(toBritishEnglish('organizations')).toBe('organisations');
      expect(toBritishEnglish('prioritizations')).toBe('prioritisations');
    });

    it('preserves Title Case for -ization words', () => {
      expect(toBritishEnglish('Organization')).toBe('Organisation');
      expect(toBritishEnglish('Prioritization')).toBe('Prioritisation');
      expect(toBritishEnglish('Organizations')).toBe('Organisations');
    });

    it('preserves UPPERCASE for -ization words', () => {
      expect(toBritishEnglish('ORGANIZATION')).toBe('ORGANISATION');
      expect(toBritishEnglish('ORGANIZATIONS')).toBe('ORGANISATIONS');
      expect(toBritishEnglish('PRIORITIZATION')).toBe('PRIORITISATION');
    });
  });

  describe('Rule 2: -ize, -ized, -izing, -izes to -ise, -ised, -ising, -ises', () => {
    it('converts -ize verbs to -ise', () => {
      expect(toBritishEnglish('organize')).toBe('organise');
      expect(toBritishEnglish('realize')).toBe('realise');
      expect(toBritishEnglish('optimize')).toBe('optimise');
      expect(toBritishEnglish('customize')).toBe('customise');
      expect(toBritishEnglish('modernize')).toBe('modernise');
    });

    it('converts -ized past tense forms to -ised', () => {
      expect(toBritishEnglish('organized')).toBe('organised');
      expect(toBritishEnglish('realized')).toBe('realised');
      expect(toBritishEnglish('optimized')).toBe('optimised');
      expect(toBritishEnglish('customized')).toBe('customised');
    });

    it('converts -izing present participle forms to -ising', () => {
      expect(toBritishEnglish('organizing')).toBe('organising');
      expect(toBritishEnglish('realizing')).toBe('realising');
      expect(toBritishEnglish('optimizing')).toBe('optimising');
      expect(toBritishEnglish('customizing')).toBe('customising');
    });

    it('converts -izes 3rd person singular forms to -ises', () => {
      expect(toBritishEnglish('organizes')).toBe('organises');
      expect(toBritishEnglish('realizes')).toBe('realises');
      expect(toBritishEnglish('optimizes')).toBe('optimises');
    });

    it('preserves Title Case and UPPERCASE for -ize variants', () => {
      expect(toBritishEnglish('Organize')).toBe('Organise');
      expect(toBritishEnglish('Organized')).toBe('Organised');
      expect(toBritishEnglish('Organizing')).toBe('Organising');
      expect(toBritishEnglish('ORGANIZE')).toBe('ORGANISE');
      expect(toBritishEnglish('OPTIMIZED')).toBe('OPTIMISED');
    });
  });

  describe('Exclusion List Preservation (-ize exceptions)', () => {
    it('preserves size and its inflections', () => {
      expect(toBritishEnglish('size')).toBe('size');
      expect(toBritishEnglish('sizes')).toBe('sizes');
      expect(toBritishEnglish('sized')).toBe('sized');
      expect(toBritishEnglish('sizing')).toBe('sizing');
      expect(toBritishEnglish('Size')).toBe('Size');
      expect(toBritishEnglish('SIZE')).toBe('SIZE');
    });

    it('preserves prize and its inflections', () => {
      expect(toBritishEnglish('prize')).toBe('prize');
      expect(toBritishEnglish('prizes')).toBe('prizes');
      expect(toBritishEnglish('Prize')).toBe('Prize');
      expect(toBritishEnglish('PRIZE')).toBe('PRIZE');
    });

    it('preserves capsize and its inflections', () => {
      expect(toBritishEnglish('capsize')).toBe('capsize');
      expect(toBritishEnglish('capsizes')).toBe('capsizes');
      expect(toBritishEnglish('capsized')).toBe('capsized');
      expect(toBritishEnglish('capsizing')).toBe('capsizing');
      expect(toBritishEnglish('Capsizing')).toBe('Capsizing');
      expect(toBritishEnglish('CAPSIZING')).toBe('CAPSIZING');
      expect(toBritishEnglish('Capsize')).toBe('Capsize');
      expect(toBritishEnglish('CAPSIZE')).toBe('CAPSIZE');
    });

    it('preserves seize and its inflections', () => {
      expect(toBritishEnglish('seize')).toBe('seize');
      expect(toBritishEnglish('seizes')).toBe('seizes');
      expect(toBritishEnglish('seized')).toBe('seized');
      expect(toBritishEnglish('seizing')).toBe('seizing');
      expect(toBritishEnglish('Seize')).toBe('Seize');
      expect(toBritishEnglish('SEIZE')).toBe('SEIZE');
    });
  });

  describe('Rule 3: -yze to -yse variants', () => {
    it('converts analyze, catalyze, paralyze and their forms', () => {
      expect(toBritishEnglish('analyze')).toBe('analyse');
      expect(toBritishEnglish('analyzed')).toBe('analysed');
      expect(toBritishEnglish('analyzing')).toBe('analysing');
      expect(toBritishEnglish('analyzer')).toBe('analyser');
      expect(toBritishEnglish('analyzers')).toBe('analysers');
      expect(toBritishEnglish('paralyze')).toBe('paralyse');
      expect(toBritishEnglish('catalyze')).toBe('catalyse');
    });

    it('preserves casing for -yze conversions', () => {
      expect(toBritishEnglish('Analyze')).toBe('Analyse');
      expect(toBritishEnglish('ANALYZE')).toBe('ANALYSE');
      expect(toBritishEnglish('ANALYZED')).toBe('ANALYSED');
    });
  });

  describe('Rule 4: -or to -our variants', () => {
    it('converts color, behavior, favor, honor, labor, neighbor, flavor, harbor', () => {
      expect(toBritishEnglish('color')).toBe('colour');
      expect(toBritishEnglish('colors')).toBe('colours');
      expect(toBritishEnglish('colored')).toBe('coloured');
      expect(toBritishEnglish('coloring')).toBe('colouring');

      expect(toBritishEnglish('behavior')).toBe('behaviour');
      expect(toBritishEnglish('behaviors')).toBe('behaviours');
      expect(toBritishEnglish('behavioral')).toBe('behavioural');

      expect(toBritishEnglish('favor')).toBe('favour');
      expect(toBritishEnglish('favors')).toBe('favours');
      expect(toBritishEnglish('favorite')).toBe('favourite');
      expect(toBritishEnglish('favorites')).toBe('favourites');

      expect(toBritishEnglish('honor')).toBe('honour');
      expect(toBritishEnglish('honors')).toBe('honours');
      expect(toBritishEnglish('honored')).toBe('honoured');

      expect(toBritishEnglish('labor')).toBe('labour');
      expect(toBritishEnglish('neighbor')).toBe('neighbour');
      expect(toBritishEnglish('neighborhood')).toBe('neighbourhood');

      expect(toBritishEnglish('flavor')).toBe('flavour');
      expect(toBritishEnglish('harbor')).toBe('harbour');
    });

    it('preserves casing for -or to -our conversions', () => {
      expect(toBritishEnglish('Color')).toBe('Colour');
      expect(toBritishEnglish('COLOR')).toBe('COLOUR');
      expect(toBritishEnglish('Behavior')).toBe('Behaviour');
      expect(toBritishEnglish('BEHAVIOR')).toBe('BEHAVIOUR');
    });
  });

  describe('Rule 5: -er to -re variants', () => {
    it('converts center, theater, fiber', () => {
      expect(toBritishEnglish('center')).toBe('centre');
      expect(toBritishEnglish('centers')).toBe('centres');
      expect(toBritishEnglish('centered')).toBe('centred');
      expect(toBritishEnglish('centering')).toBe('centring');

      expect(toBritishEnglish('theater')).toBe('theatre');
      expect(toBritishEnglish('theaters')).toBe('theatres');

      expect(toBritishEnglish('fiber')).toBe('fibre');
      expect(toBritishEnglish('fibers')).toBe('fibres');
    });

    it('preserves casing for -er to -re conversions', () => {
      expect(toBritishEnglish('Center')).toBe('Centre');
      expect(toBritishEnglish('CENTER')).toBe('CENTRE');
      expect(toBritishEnglish('Theater')).toBe('Theatre');
    });
  });

  describe('Rule 6: -se to -ce nouns', () => {
    it('converts defense and offense', () => {
      expect(toBritishEnglish('defense')).toBe('defence');
      expect(toBritishEnglish('defenses')).toBe('defences');
      expect(toBritishEnglish('offense')).toBe('offence');
      expect(toBritishEnglish('offenses')).toBe('offences');
    });

    it('preserves casing for -se to -ce nouns', () => {
      expect(toBritishEnglish('Defense')).toBe('Defence');
      expect(toBritishEnglish('DEFENSE')).toBe('DEFENCE');
    });
  });

  describe('Rule 7: General Vocabulary and Computing Context Safeguards', () => {
    it('converts program to programme in general contexts', () => {
      expect(toBritishEnglish('community program')).toBe('community programme');
      expect(toBritishEnglish('training programs')).toBe('training programmes');
    });

    it('preserves program in computing contexts', () => {
      expect(toBritishEnglish('program code')).toBe('program code');
      expect(toBritishEnglish('program files')).toBe('program files');
      expect(toBritishEnglish('program data')).toBe('program data');
      expect(toBritishEnglish('program binary')).toBe('program binary');
      expect(toBritishEnglish('program memory')).toBe('program memory');
      expect(toBritishEnglish('program source')).toBe('program source');
    });

    it('converts judgment, acknowledgment, fulfill, enroll, installment, traveling, canceled', () => {
      expect(toBritishEnglish('judgment')).toBe('judgement');
      expect(toBritishEnglish('acknowledgment')).toBe('acknowledgement');
      expect(toBritishEnglish('fulfill')).toBe('fulfil');
      expect(toBritishEnglish('fulfillment')).toBe('fulfilment');
      expect(toBritishEnglish('enroll')).toBe('enrol');
      expect(toBritishEnglish('enrollment')).toBe('enrolment');
      expect(toBritishEnglish('installment')).toBe('instalment');
      expect(toBritishEnglish('aging')).toBe('ageing');
      expect(toBritishEnglish('traveled')).toBe('travelled');
      expect(toBritishEnglish('traveling')).toBe('travelling');
      expect(toBritishEnglish('traveler')).toBe('traveller');
      expect(toBritishEnglish('canceled')).toBe('cancelled');
      expect(toBritishEnglish('canceling')).toBe('cancelling');
    });
  });

  describe('Sentence Context and Boundary Handling', () => {
    it('converts complete sentences while maintaining formatting', () => {
      const input = 'The committee organized a program to analyze the color of the defense center.';
      const expected = 'The committee organised a programme to analyse the colour of the defence centre.';
      expect(toBritishEnglish(input)).toBe(expected);
    });

    it('leaves text already in British/Australian English unchanged', () => {
      const input = 'The strata committee organised a defence of the central neighbourhood scheme.';
      expect(toBritishEnglish(input)).toBe(input);
    });

    it('safely handles empty strings, null, undefined, and non-string inputs', () => {
      expect(toBritishEnglish('')).toBe('');
      expect(toBritishEnglish(null as any)).toBe('');
      expect(toBritishEnglish(undefined as any)).toBe('');
      expect(toBritishEnglish(42 as any)).toBe('');
    });
  });
});
