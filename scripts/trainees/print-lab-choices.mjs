// Prints the Lab choices for the Google Form (paste over LAB_CHOICES in
// scripts/google/create-trainee-form.gs, then run updateLabChoices there).
import { labs } from '../../app/data/labs.js';
console.log(`const LAB_CHOICES = [\n${labs.map((l) => `  ${JSON.stringify(l.formLabel)},`).join('\n')}\n];`);
