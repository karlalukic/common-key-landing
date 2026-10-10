/**
 * Utility to enforce British English (en-GB / Australian English) spelling and conventions.
 * Converts common American English spellings (-ize, -yze, -or, -er, -se, etc.)
 * into British English variants while preserving casing and word structure.
 */
export function toBritishEnglish(text: string): string {
  if (!text || typeof text !== 'string') return '';
  let res = text;
  const rules: [RegExp, string | ((match: string, ...args: any[]) => string)][] = [
    // 1. -ization -> -isation
    [/\b([a-zA-Z]+)ization\b/gi, (match, prefix) => {
      if (match === match.toUpperCase()) return prefix.toUpperCase() + 'ISATION';
      if (match[0] === match[0].toUpperCase()) {
        return prefix.charAt(0).toUpperCase() + prefix.slice(1).toLowerCase() + 'isation';
      }
      return prefix.toLowerCase() + 'isation';
    }],
    [/\b([a-zA-Z]+)izations\b/gi, (match, prefix) => {
      if (match === match.toUpperCase()) return prefix.toUpperCase() + 'ISATIONS';
      if (match[0] === match[0].toUpperCase()) {
        return prefix.charAt(0).toUpperCase() + prefix.slice(1).toLowerCase() + 'isations';
      }
      return prefix.toLowerCase() + 'isations';
    }],
    // 2. -ize / -ized / -izing / -izes -> -ise / -ised / -ising / -ises
    // Guard exceptions: size, prize, capsize, seize
    [/\b(?!size|prize|capsize|seize|capsiz)([a-zA-Z]{3,})izing\b/gi, (match, prefix) => {
      if (match === match.toUpperCase()) return prefix.toUpperCase() + 'ISING';
      if (match[0] === match[0].toUpperCase()) {
        return prefix.charAt(0).toUpperCase() + prefix.slice(1).toLowerCase() + 'ising';
      }
      return prefix.toLowerCase() + 'ising';
    }],
    [/\b(?!size|prize|capsize|seize)([a-zA-Z]{3,})ized\b/gi, (match, prefix) => {
      if (match === match.toUpperCase()) return prefix.toUpperCase() + 'ISED';
      if (match[0] === match[0].toUpperCase()) {
        return prefix.charAt(0).toUpperCase() + prefix.slice(1).toLowerCase() + 'ised';
      }
      return prefix.toLowerCase() + 'ised';
    }],
    [/\b(?!size|prize|capsize|seize)([a-zA-Z]{3,})izes\b/gi, (match, prefix) => {
      if (match === match.toUpperCase()) return prefix.toUpperCase() + 'ISES';
      if (match[0] === match[0].toUpperCase()) {
        return prefix.charAt(0).toUpperCase() + prefix.slice(1).toLowerCase() + 'ises';
      }
      return prefix.toLowerCase() + 'ises';
    }],
    [/\b(?!size|prize|capsize|seize)([a-zA-Z]{3,})ize\b/gi, (match, prefix) => {
      if (match === match.toUpperCase()) return prefix.toUpperCase() + 'ISE';
      if (match[0] === match[0].toUpperCase()) {
        return prefix.charAt(0).toUpperCase() + prefix.slice(1).toLowerCase() + 'ise';
      }
      return prefix.toLowerCase() + 'ise';
    }],
    // 3. -yze -> -yse (analyze, paralyze, catalyze)
    [/\b([a-zA-Z]+)yzing\b/gi, (match, prefix) => {
      if (match === match.toUpperCase()) return prefix.toUpperCase() + 'YSING';
      if (match[0] === match[0].toUpperCase()) {
        return prefix.charAt(0).toUpperCase() + prefix.slice(1).toLowerCase() + 'ysing';
      }
      return prefix.toLowerCase() + 'ysing';
    }],
    [/\b([a-zA-Z]+)yzed\b/gi, (match, prefix) => {
      if (match === match.toUpperCase()) return prefix.toUpperCase() + 'YSED';
      if (match[0] === match[0].toUpperCase()) {
        return prefix.charAt(0).toUpperCase() + prefix.slice(1).toLowerCase() + 'ysed';
      }
      return prefix.toLowerCase() + 'ysed';
    }],
    [/\b([a-zA-Z]+)yzer\b/gi, (match, prefix) => {
      if (match === match.toUpperCase()) return prefix.toUpperCase() + 'YSER';
      if (match[0] === match[0].toUpperCase()) {
        return prefix.charAt(0).toUpperCase() + prefix.slice(1).toLowerCase() + 'yser';
      }
      return prefix.toLowerCase() + 'yser';
    }],
    [/\b([a-zA-Z]+)yzers\b/gi, (match, prefix) => {
      if (match === match.toUpperCase()) return prefix.toUpperCase() + 'YSERS';
      if (match[0] === match[0].toUpperCase()) {
        return prefix.charAt(0).toUpperCase() + prefix.slice(1).toLowerCase() + 'ysers';
      }
      return prefix.toLowerCase() + 'ysers';
    }],
    [/\b([a-zA-Z]+)yze\b/gi, (match, prefix) => {
      if (match === match.toUpperCase()) return prefix.toUpperCase() + 'YSE';
      if (match[0] === match[0].toUpperCase()) {
        return prefix.charAt(0).toUpperCase() + prefix.slice(1).toLowerCase() + 'yse';
      }
      return prefix.toLowerCase() + 'yse';
    }],
    // 4. -or -> -our
    [/\bcolor\b/gi, 'colour'],
    [/\bcolors\b/gi, 'colours'],
    [/\bcolored\b/gi, 'coloured'],
    [/\bcoloring\b/gi, 'colouring'],
    [/\bbehavior\b/gi, 'behaviour'],
    [/\bbehaviors\b/gi, 'behaviours'],
    [/\bbehavioral\b/gi, 'behavioural'],
    [/\bfavor\b/gi, 'favour'],
    [/\bfavors\b/gi, 'favours'],
    [/\bfavored\b/gi, 'favoured'],
    [/\bfavoring\b/gi, 'favouring'],
    [/\bfavorite\b/gi, 'favourite'],
    [/\bfavorites\b/gi, 'favourites'],
    [/\bhonor\b/gi, 'honour'],
    [/\bhonors\b/gi, 'honours'],
    [/\bhonored\b/gi, 'honoured'],
    [/\blabor\b/gi, 'labour'],
    [/\blabors\b/gi, 'labours'],
    [/\blabored\b/gi, 'laboured'],
    [/\bneighbor\b/gi, 'neighbour'],
    [/\bneighbors\b/gi, 'neighbours'],
    [/\bneighboring\b/gi, 'neighbouring'],
    [/\bneighborhood\b/gi, 'neighbourhood'],
    [/\bneighborhoods\b/gi, 'neighbourhoods'],
    [/\bflavor\b/gi, 'flavour'],
    [/\bflavors\b/gi, 'flavours'],
    [/\bharbor\b/gi, 'harbour'],
    [/\bharbors\b/gi, 'harbours'],
    // 5. -er -> -re
    [/\bcenter\b/gi, 'centre'],
    [/\bcenters\b/gi, 'centres'],
    [/\bcentered\b/gi, 'centred'],
    [/\bcentering\b/gi, 'centring'],
    [/\bfiber\b/gi, 'fibre'],
    [/\bfibers\b/gi, 'fibres'],
    [/\btheater\b/gi, 'theatre'],
    [/\btheaters\b/gi, 'theatres'],
    // 6. -se -> -ce (nouns)
    [/\bdefense\b/gi, 'defence'],
    [/\bdefenses\b/gi, 'defences'],
    [/\boffense\b/gi, 'offence'],
    [/\boffenses\b/gi, 'offences'],
    // 7. General British Vocabulary & Spelling
    [/\bprogram\b(?!\s+(code|files|data|binary|memory|source))/gi, 'programme'],
    [/\bprograms\b(?!\s+(code|files|data|binary|memory|source))/gi, 'programmes'],
    [/\bjudgment\b/gi, 'judgement'],
    [/\bjudgments\b/gi, 'judgements'],
    [/\backnowledgment\b/gi, 'acknowledgement'],
    [/\backnowledgments\b/gi, 'acknowledgements'],
    [/\bfulfill\b/gi, 'fulfil'],
    [/\bfulfills\b/gi, 'fulfils'],
    [/\bfulfillment\b/gi, 'fulfilment'],
    [/\benroll\b/gi, 'enrol'],
    [/\benrolls\b/gi, 'enrols'],
    [/\benrollment\b/gi, 'enrolment'],
    [/\benrollments\b/gi, 'enrolments'],
    [/\binstallment\b/gi, 'instalment'],
    [/\binstallments\b/gi, 'instalments'],
    [/\baging\b/gi, 'ageing'],
    [/\btraveled\b/gi, 'travelled'],
    [/\btraveling\b/gi, 'travelling'],
    [/\btraveler\b/gi, 'traveller'],
    [/\btravelers\b/gi, 'travellers'],
    [/\bcanceled\b/gi, 'cancelled'],
    [/\bcanceling\b/gi, 'cancelling'],
    [/\bcancellation\b/gi, 'cancellation']
  ];

  for (const [pattern, replacement] of rules) {
    if (typeof replacement === 'string') {
      res = res.replace(pattern, (matched) => {
        if (matched === matched.toUpperCase()) {
          return replacement.toUpperCase();
        }
        if (matched[0] === matched[0].toUpperCase()) {
          return replacement.charAt(0).toUpperCase() + replacement.slice(1);
        }
        return replacement;
      });
    } else {
      res = res.replace(pattern, replacement as any);
    }
  }

  return res;
}
