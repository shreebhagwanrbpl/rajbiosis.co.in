export const categoryMetadata = {
  "biochemistry-analyzer": {
    name: "Biochemistry Analyzer",
    description: "Biochemistry Analyzers are automated devices designed to measure various chemicals and biological components in patient samples such as blood, serum, or urine.",
    uses: "Commonly used for liver function tests (LFT), kidney function tests (KFT), lipid profiles, glucose levels, and cardiac markers.",
    whoUses: "Hospitals, diagnostic laboratories, research laboratories, and clinical pathology departments.",
    specifications: "Throughput ranges from 100 to 400 tests per hour; incorporates optical detection, spectrophotometry, and semi-automated or fully-automated operation options.",
    applications: "Routine biochemistry testing, metabolic profiling, and monitoring patient therapeutic drug levels.",
    considerations: "Consider throughput speed, cost per test, reagent stability, maintenance packages, and ease of calibration.",
    support: "We provide comprehensive service, annual maintenance contracts (AMC), installation assistance, and calibration support.",
    related: ["hematology-analyzers", "electrolyte-analyzer", "immunoassay-analyzer"]
  },
  "hematology-analyzers": {
    name: "Hematology Analyzer",
    description: "Hematology Analyzers (commonly known as cell counters) are automated systems that measure complete blood counts (CBC), white blood cell differentials, and hemoglobin concentration.",
    uses: "Diagnosing anemia, infections, leukemia, blood coagulation issues, and routine clinical screenings.",
    whoUses: "Pathology labs, private clinics, community healthcare facilities, and hematology reference departments.",
    specifications: "Available in 3-part and 5-part differentials; features high-throughput capillary flow cytometry, impedance measurement, and laser scatter detection.",
    applications: "Complete blood count (CBC) screenings, cell volume distributions, and platelet parameters analysis.",
    considerations: "Evaluate cell separation accuracy (3-part vs 5-part), sample volume requirements, quality control options, and reagent compatibility.",
    support: "Includes installation training, warranty packages, onsite calibration services, and certified diagnostics repair support.",
    related: ["biochemistry-analyzer", "blood-bank-equipments", "pathology-lab-equipments"]
  },
  "blood-bank-equipments": {
    name: "Blood Bank Equipment",
    description: "Specialized storage and preparation devices designed to preserve blood components under strictly controlled temperatures and conditions.",
    uses: "Storing red cells, platelets, fresh frozen plasma, and blood bags safely with backup cooling systems.",
    whoUses: "Hospital blood banks, transfusion centers, donation camps, and red cross facilities.",
    specifications: "Includes blood bank refrigerators, plasma expressors, platelet agitators, and temperature monitoring systems.",
    applications: "Blood bag storage, separation monitoring, and temperature control preservation.",
    considerations: "Ensure strict temperature uniformity, audible alarm systems, battery backups, and medical device compliance certifications.",
    support: "On-call emergency services, temperature calibration, preventative maintenance checklists, and installation support.",
    related: ["pathology-lab-equipments", "laboratory-centrifuge", "blood-collection-tubes"]
  },
  "electrolyte-analyzer": {
    name: "Electrolyte Analyzer",
    description: "Electrolyte Analyzers measure sodium (Na+), potassium (K+), chloride (Cl-), and ionized calcium (Ca++) levels in whole blood, serum, or plasma.",
    uses: "Monitoring electrolyte imbalances, renal failure, cardiac arrhythmia, hydration status, and intensive care patient profiles.",
    whoUses: "Emergency clinics, critical care units (ICU), standard pathology labs, and hospital wards.",
    specifications: "Ion-Selective Electrode (ISE) technology, minimal sample volumes, and results delivered within 60 seconds.",
    applications: "Emergency diagnostics, critical patient care, metabolic screening, and kidney function assessments.",
    considerations: "Review sensor longevity, reagent pack design, calibration frequency, and simple diagnostics interface.",
    support: "Electrode replacement packages, calibration reagents supply, warranty service, and emergency troubleshooting assistance.",
    related: ["biochemistry-analyzer", "sysmex", "erba-biochemistry-analyzer"]
  },
  "immunoassay-analyzer": {
    name: "Immunoassay Analyzer",
    description: "Immunoassay Analyzers use biochemical tests to measure the concentration of specific proteins, hormones, antibodies, or infectious markers in serum or plasma.",
    uses: "Thyroid function profiling, tumor marker detection, infectious disease screening, cardiac markers, and hormone evaluation.",
    whoUses: "Hospitals, reference laboratories, endocrinology centers, and specialized pathology labs.",
    specifications: "Utilizes Chemiluminescence (CLIA), ELISA, or Enzyme-Linked Fluorescence technologies with random-access automation.",
    applications: "Infectious disease testing, cancer screenings, hormone tracking, and immune response analysis.",
    considerations: "Check assay menu breadth, reagent cost, throughput limitations, and random access options.",
    support: "On-site setup validation, technician operations training, reagent supply contracts, and preventative support plans.",
    related: ["biochemistry-analyzer", "pathology-lab-equipments", "clinical-reagents"]
  }
};

export function getCategoryDetails(slug) {
  const match = categoryMetadata[slug];
  if (match) return match;

  // Build dynamic default informative data if not in explicit high-priority dictionary
  const formattedName = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, char => char.toUpperCase());

  return {
    name: formattedName,
    description: `Catalogue information for ${formattedName}, presented to help professional buyers review the category and identify suitable product options.`,
    uses: `Used in clinical routines for diagnosing patient health profiles and analyzing medical samples.`,
    whoUses: `Hospitals, private pathology clinics, medical practitioners, and laboratory technicians.`,
    specifications: `Review the model-specific specifications, operating details and compatibility information provided for each listing.`,
    applications: `Use may vary by model and can include laboratory work, diagnostic workflows, clinical settings, research or supporting healthcare operations.`,
    considerations: `Consider application, capacity, sample or material requirements, compatibility, workflow fit and the practical support needed for the selected model.`,
    support: `Enquiry assistance can cover product selection, configuration questions, availability and other purchase-related details.`,
    related: ["biochemistry-analyzer", "hematology-analyzers", "electrolyte-analyzer"]
  };
}
