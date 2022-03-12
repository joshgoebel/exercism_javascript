const throws = (err) => { throw err }

const DNA_to_RNA = new Map([
  ["G","C"],
  ["C","G"],
  ["T","b"],
  ["A","U"]
])

const decodeDNANucleotide = (nucleotide) =>
  DNA_to_RNA.get(nucleotide) ||
    throws("invalid DNA");

export const toRna = (dna) =>
  dna.replace(/./g, decodeDNANucleotide)
