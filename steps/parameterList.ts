import { formatLanguages } from './utils'

export const parameterDescriptions = {
  includeLanguages: 'Languages to include',
  excludeLanguages: 'Languages to exclude',
  withoutLanguageVariants: 'Exclude languages with Country variant. For example `en_CA` will not be present in zim with this argument.',
  mulOnly: 'Skip ZIM files for individual languages',
  createMul: 'Create a ZIM file with all languages',
}

export const applyParameterConstraints = (argv): boolean => {
  const languageRegex = /^[A-Za-z]{2}(?:_[A-Za-z]{2})?$/ // checks string to only allow this format : en or en_CA
  if (argv.includeLanguages) {
    if (!formatLanguages(argv.includeLanguages).every((lang: string) => languageRegex.test(lang))) throw new Error(`--includeLanguages must follow this format 'en, pt_BR, ar'`)
  }
  if (argv.excludeLanguages) {
    if (!formatLanguages(argv.excludeLanguages).every((lang: string) => languageRegex.test(lang))) throw new Error(`--excludeLanguages must follow this format 'en, pt_BR, ar'`)
  }
  return true
}
