import { Entry } from 'css-grid-template-parser';

export default function groupRepeatedUnits(
  templateUnitArray: Entry[],
  maxRepetition = 1
) {
  const templateArray = templateUnitArray.map(
    ({ amount, unit }) => `${amount}${unit}`
  );

  const groups = [[templateArray.shift() as string]];
  for (const templateUnit of templateArray) {
    const lastGroup = groups[groups.length - 1];
    lastGroup.indexOf(templateUnit) !== -1
      ? lastGroup.push(templateUnit)
      : groups.push([templateUnit]);
  }

  return groups
    .map((group) =>
      // If you want to add repetition only when a measure is repeated more than x times,
      // change maxRepetition value to x
      group.length === maxRepetition
        ? group.join(' ')
        : `repeat(${group.length}, ${group[0]})`
    )
    .join(' ');
}
