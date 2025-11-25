// ==========================================
//  IIFE FOR SECURITY SCOPE
// ==========================================
(function() {
    "use strict";

    // 1. OBFUSCATION UTILS
    // Simple Base64 + Salt obfuscation to prevent casual reading of answers in source
    const SALT = "JEESECURE_2025_SALT_"; 
    const obfuscate = (str) => btoa(SALT + encodeURIComponent(str));
    const deobfuscate = (str) => decodeURIComponent(atob(str).replace(SALT, ''));
    
    // Hash answers so they aren't stored plainly
    // For MCQ: "CorrectIndex" -> "ObfuscatedString"
    // For Num: "Value" -> "ObfuscatedString"
    
    // 2. CENTRAL QUESTION DATABASE
    // -------------------------------------------------------------------------
    // INSTRUCTIONS: Populate this object with real questions for Papers 1-70.
    // If a paper ID is missing here, the system will auto-generate random questions for it.
    // -------------------------------------------------------------------------
    const PAPER_DATABASE = {
        // PAPER 1 (Pre-filled)
        1: [
            { section: "Physics", content: "\\(P + a/V^2 (V - b) = RT\\) represents the equation of state of some gases. Where P is the pressure, V is the volume, T is the temperature and a, b, R are the constants. The physical quantity, which has dimensional formula as that of \\(b^2/a\\), will be:", options: ["Bulk modulus", "Modulus of rigidity", "Compressibility", "Energy density"], answer: "Compressibility" },
                { section: "Physics", content: "An object moves with speed \\(v_1, v_2,\\) and \\(v_3\\) along a line segment AB, BC and CD respectively. Where AB = BC and AD = 3AB, then average speed of the object will be:", options: ["\\((v_1 + v_2 + v_3)/3\\)", "\\(v_1v_2v_3 / (3v_1v_2 + v_2v_3 + v_3v_1)\\)", "\\(3v_1v_2v_3 / (v_1v_2 + v_2v_3 + v_3v_1)\\)", "\\((v_1 + v_2 + v_3) / (3v_1v_2v_3)\\)"], answer: "\\(3v_1v_2v_3 / (v_1v_2 + v_2v_3 + v_3v_1)\\)" },
                { section: "Physics", content: "A child stands on the edge of the cliff 10 m above the ground and throws a stone horizontally with an initial speed of \\(5 m s^{-1}\\). Neglecting the air resistance, the speed with which the stone hits the ground will be _____ \\(m s^{-1}\\) (given, \\(g = 10 m s^{-2}\\)).", options: ["20", "15", "30", "25"], answer: "15" },
                { section: "Physics", content: "A block of mass 5 kg is placed at rest on a table of rough surface. Now, if a force of 30 N is applied in the direction parallel to surface of the table, the block slides through a distance of 50 m in an interval of time 10 s. Coefficient of kinetic friction is (given, \\(g = 10 m s^{-2}\\)):", options: ["0.60", "0.75", "0.50", "0.25"], answer: "0.50" },
                { section: "Physics", content: "If earth has a mass nine times and radius twice to that of a planet P. Then \\(v_e / (3\\sqrt{x}) ms^{-1}\\) will be the minimum velocity required by a rocket to pull out of gravitational force of P, where \\(v_e\\) is escape velocity on earth. The value of x is:", options: ["2", "3", "18", "1"], answer: "2" },
                { section: "Physics", content: "Given below are two statements:<br><b>Statement-I:</b> Acceleration due to gravity is different at different places on the surface of earth.<br><b>Statement-II:</b> Acceleration due to gravity increases as we go down below the earth's surface.<br>In the light of the above statements, choose the correct answer.", options: ["Both Statement I and Statement II are true", "Both Statement I and Statement II are false", "Statement I is true but Statement II is false", "Statement I is false but Statement II is true"], answer: "Statement I is true but Statement II is false" },
                { section: "Physics", content: "A mercury drop of radius \\(10^{-3}\\) m is broken into 125 equal size droplets. Surface tension of mercury is \\(0.45 N m^{-1}\\). The gain in surface energy is:", options: ["\\(2.26 \\times 10^{-5} J\\)", "\\(28 \\times 10^{-5} J\\)", "\\(17.5 \\times 10^{-5} J\\)", "\\(5 \\times 10^{-5} J\\)"], answer: "\\(2.26 \\times 10^{-5} J\\)" },
                { section: "Physics", content: "A sample of gas at temperature T is adiabatically expanded to double its volume. The work done by the gas in the process is (given \\(\\gamma = 3/2\\)):", options: ["\\(W = TR(\\sqrt{2} - 2)\\)", "\\(W = (T/R)(\\sqrt{2} - 2)\\)", "\\(W = (R/T)(2 - \\sqrt{2})\\)", "\\(W = RT(2 - \\sqrt{2})\\)"], answer: "\\(W = RT(2 - \\sqrt{2})\\)" },
                { section: "Physics", content: "The average kinetic energy of a molecule of the gas is:", options: ["proportional to absolute temperature", "proportional to volume", "proportional to pressure", "dependent on the nature of the gas"], answer: "proportional to absolute temperature" },
                { section: "Physics", content: "A steel wire with mass per unit length \\(7.0 \\times 10^{-3} kg m^{-1}\\) is under tension of 70 N. The speed of transverse waves in the wire will be:", options: ["\\(200\\pi m s^{-1}\\)", "\\(100 m s^{-1}\\)", "\\(10 m s^{-1}\\)", "\\(50 m s^{-1}\\)"], answer: "\\(100 m s^{-1}\\)" },
                { section: "Physics", content: "Let \\(\\sigma\\) be the uniform surface charge density of two infinite thin plane sheets. Then the electric fields in three different regions \\(E_I, E_{II}\\) and \\(E_{III}\\) are:", options: ["\\(E_I = 2\\sigma/\\epsilon_0 \\hat{n}, E_{II} = 0, E_{III} = 2\\sigma/\\epsilon_0 \\hat{n}\\)", "\\(E_I = 0, E_{II} = \\sigma/\\epsilon_0 \\hat{n}, E_{III} = 0\\)", "\\(E_I = \\sigma/(2\\epsilon_0) \\hat{n}, E_{II} = 0, E_{III} = \\sigma/(2\\epsilon_0) \\hat{n}\\)", "\\(E_I = -\\sigma/\\epsilon_0 \\hat{n}, E_{II} = 0, E_{III} = \\sigma/\\epsilon_0 \\hat{n}\\)"], answer: "\\(E_I = -\\sigma/\\epsilon_0 \\hat{n}, E_{II} = 0, E_{III} = \\sigma/\\epsilon_0 \\hat{n}\\)" },
                { section: "Physics", content: "The equivalent resistance between A and B of the network shown in the figure is:<br><div class='flex justify-center my-4'><img src='images/1.png' alt='Circuit Diagram'></div>", options: ["112R/3", "14R", "21R", "8R/3"], answer: "8R/3" },
                { section: "Physics", content: "Find the magnetic field at the point P. The curved portion is a semicircle connected to two long straight wires.<br><div class='flex justify-center my-4'><img src='images/2.png' alt='Semicircle Wire'></div>", options: ["\\(\\mu_0i / (2r) \\cdot (1 + 2/\\pi)\\)", "\\(\\mu_0i / (2r) \\cdot (1 + 1/\\pi)\\)", "\\(\\mu_0i / (2r) \\cdot (1/2 + 1/(2\\pi))\\)", "\\(\\mu_0i / (2r) \\cdot (1/2 + 1/\\pi)\\)"], answer: "\\(\\mu_0i / (2r) \\cdot (1/2 + 1/(2\\pi))\\)" },
                { section: "Physics", content: "Match List-I with List-II:<br><b>List I:</b> (A) AC generator, (B) Transformer, (C) Resonance phenomenon, (D) Sharpness of resonance<br><b>List II:</b> (I) Presence of both L and C, (II) Electromagnetic Induction, (III) Quality factor, (IV) Mutual Inductance", options: ["A-IV, B-II, C-I, D-III", "A-II, B-I, C-III, D-IV", "A-II, B-IV, C-I, D-III", "A-IV, B-III, C-I, D-II"], answer: "A-II, B-IV, C-I, D-III" },
                { section: "Physics", content: "Match List-I with List-II:<br><b>List I:</b> (A) Microwaves, (B) Gamma rays, (C) Radio waves, (D) X-rays<br><b>List II:</b> (I) Radioactive decay of the nucleus, (II) Rapid acceleration and deceleration of electron in aerials, (III) Inner shell electrons, (IV) Klystron valve", options: ["A-I, B-II, C-III, D-IV", "A-IV, B-I, C-II, D-III", "A-I, B-III, C-IV, D-II", "A-IV, B-III, C-II, D-I"], answer: "A-IV, B-I, C-II, D-III" },
                { section: "Physics", content: "‘n’ polarizing sheets are arranged such that each makes an angle 45° with the preceeding sheet. An unpolarized light of intensity I is incident into this arrangement. The output intensity is found to be I/64. The value of n will be:", options: ["3", "6", "5", "4"], answer: "6" },
                { section: "Physics", content: "A proton moving with one tenth of velocity of light has a certain de Broglie wavelength of \\(\\lambda\\). An alpha particle having certain kinetic energy has the same de-Broglie wavelength \\(\\lambda\\). The ratio of kinetic energy of proton and that of alpha particle is:", options: ["2 : 1", "4 : 1", "1 : 2", "1 : 4"], answer: "4 : 1" },
                { section: "Physics", content: "The mass of proton, neutron and helium nucleus are respectively 1.0073 u, 1.0087 u and 4.0015u. The binding energy of helium nucleus is:", options: ["14.2 MeV", "28.4 MeV", "56.8 MeV", "7.1 MeV"], answer: "28.4 MeV" },
                { section: "Physics", content: "Match List I with List II:<br><b>List I:</b> (A) Intrinsic Semiconductor, (B) n-type semiconductor, (C) p-type semiconductor, (D) Metals<br><b>List II:</b> (I) Fermi-level near valence band, (II) Fermi-level at middle of valence and conduction band, (III) Fermi-level near conduction band, (IV) Fermi-level inside conduction band", options: ["(A)→I, (B)→II, (C)→III, (D)→IV", "(A)→II, (B)→I, (C)→III, (D)→IV", "(A)→II, (B)→III, (C)→I, (D)→IV", "(A)→III, (B)→I, (C)→II, (D)→IV"], answer: "(A)→II, (B)→III, (C)→I, (D)→IV" },
                { section: "Physics", content: "Which of the following frequencies does not belong to FM broadcast.", options: ["106 MHz", "64 MHz", "99 MHz", "89 MHz"], answer: "64 MHz" },
                { section: "Physics", content: "A small particle moves to position \\(5\\hat{i} - 2\\hat{j} + \\hat{k}\\) from its initial position \\(2\\hat{i} + 3\\hat{j} - 4\\hat{k}\\) under the action of force \\(5\\hat{i} + 2\\hat{j} + 7\\hat{k}\\) N. The value of work done will be ______ J.", options: [], answer: "40" },
                { section: "Physics", content: "A solid cylinder is released from rest from the top of an inclined plane of inclination 30° and length 60 cm. If the cylinder rolls without slipping, its speed upon reaching the bottom of the inclined plane is ______ \\(m s^{-1}\\). (Given \\(g = 10 m s^{-2}\\))", options: [], answer: "2" },
                { section: "Physics", content: "A certain pressure 'P' is applied to 1 litre of water and 2 litre of a liquid separately. Water gets compressed to 0.01% whereas the liquid gets compressed to 0.03%. The ratio of Bulk modulus of water to that of the liquid is 3/x. The value of x is ______.", options: [], answer: "1" },
                { section: "Physics", content: "The amplitude of a particle executing SHM is 3 cm. The displacement at which its kinetic energy will be 25% more than the potential energy is: ______ cm.", options: [], answer: "2" },
                { section: "Physics", content: "Two equal positive point charges are separated by a distance 2a. The distance of a point from the centre of the line joining two charges on the equatorial line (perpendicular bisector) at which force experienced by a test charge \\(q_0\\) becomes maximum is \\(a/\\sqrt{x}\\). The value of x is ______.", options: [], answer: "2" },
                { section: "Physics", content: "In an experiment to find emf of a cell using potentiometer, the length of null point for a cell of emf 1.5 V is found to be 60 cm. If this cell is replaced by another cell of emf E, the length-of null point increases by 40 cm. The value of E is x/10 V. The value of x is ______.", options: [], answer: "25" },
                { section: "Physics", content: "A charge particle of \\(2 \\mu C\\) accelerated by a potential difference of 100 V enters a region of uniform magnetic field of magnitude 4 mT at right angle to the direction of field. The charge particle completes semicircle of radius 3 cm inside magnetic field. The mass of the charge particle is ______ \\(\\times 10^{-18}\\) kg.", options: [], answer: "144" },
                { section: "Physics", content: "A series LCR circuit is connected to an ac source of 220 V, 50 Hz. The circuit contain a resistance R = 100 \\(\\Omega\\) and an inductor of inductive reactance \\(X_L = 79.6 \\Omega\\). The capacitance of the capacitor needed to maximize the average rate at which energy is supplied will be ______ \\(\\mu F\\).", options: [], answer: "40" },
                { section: "Physics", content: "A thin cylindrical rod of length 10 cm is placed horizontally on the principle axis of a concave mirror of focal length 20 cm. The rod is placed in a such a way that mid point of the rod is at 40 cm from the pole of mirror. The length of the image formed by the mirror will be x/3 cm. The value of x is ______.", options: [], answer: "32" },
                { section: "Physics", content: "A light of energy 12.75 eV is incident on a hydrogen atom in its ground state. The atom absorbs the radiation and reaches to one of its excited states. The angular momentum of the atom in the excited state is \\(x/\\pi \\times 10^{-17}\\) eVs. The value of x is ______ (use \\(h = 4.14 \\times 10^{-15}\\) eVs, \\(c = 3 \\times 10^8 m s^{-1}\\))", options: [], answer: "828" },
                // Chemistry
                { section: "Chemistry", content: "<b>Assertion A:</b> Hydrogen is an environment friendly fuel.<br><b>Reason R:</b> Atomic number of hydrogen is 1 and it is a very light element.", options: ["A is true but R is false", "Both A and R are true but R is NOT the correct explanation of A", "A is false but R is true", "Both A and R are true and R is the correct explanation of A"], answer: "Both A and R are true but R is NOT the correct explanation of A" },
                { section: "Chemistry", content: "Match List I with List II<br>(A) Slaked lime (I) NaOH<br>(B) Dead burnt plaster (II) \\(Ca(OH)_2\\)<br>(C) Caustic soda (III) \\(Na_2CO_3 \\cdot 10H_2O\\)<br>(D) Washing soda (IV) \\(CaSO_4\\)", options: ["(A)-I, (B)-IV, (C)-II, (D)-III", "(A)-III, (B)-IV, (C)-II, (D)-I", "(A)-II, (B)-IV, (C)-I, (D)-III", "(A)-III, (B)-II, (C)-IV, (D)-I"], answer: "(A)-II, (B)-IV, (C)-I, (D)-III" },
                { section: "Chemistry", content: "Choose the correct statement(s):<br>A. Beryllium oxide is purely acidic in nature.<br>B. Beryllium carbonate is kept in the atmosphere of \\(CO_2\\).<br>C. Beryllium sulphate is readily soluble in water.<br>D. Beryllium shows anomalous behavior.", options: ["A, B and C only", "B, C and D only", "A and B only", "A only"], answer: "B, C and D only" },
                { section: "Chemistry", content: "Regarding resonance in carbonate ion \\(CO_3^{2-}\\), which of the following is true?<br><div class='flex justify-center my-4'><img src='images/3.png' alt='Resonance Structures'></div>", options: ["It is possible to identify each structure individually by some physical or chemical method.", "All these structures are in dynamic equilibrium with each other.", "Each structure exists for equal amount of time.", "\\(CO_3^{2-}\\) has a single structure i.e., resonance hybrid of the above three structures."], answer: "\\(CO_3^{2-}\\) has a single structure i.e., resonance hybrid of the above three structures." },
                { section: "Chemistry", content: "But-2-yne is reacted separately with one mole of Hydrogen. Reaction with \\(H_2/Pd/C\\) gives product A. Reaction with \\(Na/liq NH_3\\) gives product B. Identify the incorrect statements from the options given below:<br><div class='flex justify-center my-4'><img src='images/4.jpeg' alt='But-2-yne Reaction'></div>A. A is more soluble than B.<br>B. The boiling point & melting point of A are higher and lower than B respectively.<br>C. A is more polar than B because dipole moment of A is zero.<br>D. \\(Br_2\\) adds easily to B than A.", options: ["B and C only", "B, C and D only", "A, C and D only", "A and B only"], answer: "B, C and D only" },
                { section: "Chemistry", content: "How can photochemical smog be controlled?", options: ["By using tall chimneys", "By complete combustion of fuel", "By using catalytic converters in the automobiles/industry", "By using catalyst"], answer: "By using catalytic converters in the automobiles/industry" },
                { section: "Chemistry", content: "Which of the following represents the lattice structure of \\(A_{0.95}O\\) containing \\(A^{2+}, A^{3+}\\) and \\(O^{2-}\\) ions?", options: ["A: 0.90 \\(A^{2+}\\), 0.05 \\(A^{3+}\\), 1 \\(O^{2-}\\)", "B: 0.85 \\(A^{2+}\\), 0.10 \\(A^{3+}\\), 1 \\(O^{2-}\\)", "C: 0.95 \\(A^{2+}\\), 0.00 \\(A^{3+}\\), 1 \\(O^{2-}\\)", "A and B only"], answer: "A: 0.90 \\(A^{2+}\\), 0.05 \\(A^{3+}\\), 1 \\(O^{2-}\\)" },
                { section: "Chemistry", content: "<b>Assertion A:</b> Amongst He, Ne, Ar and Kr; 1 g of activated charcoal adsorbs more of Kr.<br><b>Reason R:</b> The critical volume \\(V_c\\) and critical pressure \\(P_c\\) is highest for Krypton but the compressibility factor at critical point \\(Z_c\\) is lowest for Krypton.", options: ["A is true but R is false", "A is false but R is true", "Both A and R are true but R is NOT the correct explanation of A", "Both A and R are true and R is the correct explanation A"], answer: "A is true but R is false" },
                { section: "Chemistry", content: "<b>Assertion A:</b> In an Ellingham diagram, the oxidation of carbon to carbon monoxide shows a negative slope with respect to temperature.<br><b>Reason R:</b> CO tends to get decomposed at higher temperature.", options: ["Both A and R are correct and R is the correct explanation of A", "A is not correct but R is correct", "Both A and R are correct but R is NOT the correct explanation of A", "A is correct but R is not correct"], answer: "A is correct but R is not correct" },
                { section: "Chemistry", content: "<b>Statement I:</b> Chlorine can easily combine with oxygen to form oxides: and the product has a tendency to explode.<br><b>Statement II:</b> Chemical reactivity of an element can be determined by its reaction with oxygen and halogens.", options: ["Both the statements I and II are true", "Statement I is true but Statement II is false", "Statement I is false but Statement II is true", "Both the Statements I and II are false"], answer: "Both the statements I and II are true" },
                { section: "Chemistry", content: "A solution of \\(FeCl_3\\) when treated with \\(K_4[Fe(CN)_6]\\) gives a prussian blue precipitate due to the formation of:", options: ["\\(KFe_2[CN]_6\\)", "\\(Fe[Fe(CN)_6]\\)", "\\(Fe_3[Fe(CN)_6]_2\\)", "\\(Fe_4[Fe(CN)_6]_3\\)"], answer: "\\(Fe_4[Fe(CN)_6]_3\\)" },
                { section: "Chemistry", content: "Highest oxidation state of Mn is exhibited in \\(Mn_2O_7\\). The correct statements about \\(Mn_2O_7\\) are:<br><div class='flex justify-center my-4'><img src='images/5.jpeg' alt='Mn2O7 Structure'></div>(A) Mn is tetrahedrally surrounded by oxygen atoms<br>(B) Mn is octahedrally surrounded by oxygen atoms<br>(C) Contains Mn-O-Mn bridge<br>(D) Contains Mn-Mn bond.", options: ["A and C only", "A and D only", "B and D only", "B and C only"], answer: "A and C only" },
                { section: "Chemistry", content: "Which of the following complex will show largest splitting of d-orbitals?", options: ["\\([Fe(C_2O_4)_3]^{3-}\\)", "\\([FeF_6]^{3-}\\)", "\\([Fe(CN)_6]^{3-}\\)", "\\([Fe(NH_3)_6]^{3+}\\)"], answer: "\\([Fe(CN)_6]^{3-}\\)" },
                { section: "Chemistry", content: "Which of the following are the example of double salt?<br>(A) \\(FeSO_4 \\cdot (NH_4)_2SO_4 \\cdot 6H_2O\\)<br>(B) \\(CuSO_4 \\cdot 4NH_3 \\cdot H_2O\\)<br>(C) \\(K_2SO_4 \\cdot Al_2(SO_4)_3 \\cdot 24H_2O\\)<br>(D) \\(Fe(CN)_2 \\cdot 4KCN\\)", options: ["A and C only", "A and B only", "A, B and D only", "B and D only"], answer: "A and C only" },
                { section: "Chemistry", content: "Identify the incorrect reaction option from the following:", options: ["Phenol + Zn dust → Benzene", "Aniline + \\(NaNO_2/HCl\\) (0-5°C) → Benzene diazonium chloride", "Benzaldehyde + Zn-Hg/HCl → Toluene", "Benzene + \\(CH_3Cl\\)/Anhydrous \\(AlCl_3\\) → Toluene"], answer: "Aniline + \\(NaNO_2/HCl\\) (0-5°C) → Benzene diazonium chloride" },
                { section: "Chemistry", content: "Decreasing order of dehydration of the following alcohols is: a) tert-butyl alcohol b) n-butyl alcohol c) sec-butyl alcohol d) iso-butyl alcohol", options: ["a > d > b > c", "b > d > c > a", "b > a > d > c", "d > b > c > a"], answer: "b > d > c > a" },
                { section: "Chemistry", content: "In the reaction: Anisole + HI → Product 'A', 'A' is:", options: ["Benzene + \\(CH_3I\\)", "Phenol + \\(CH_3I\\)", "Iodobenzene + \\(CH_3OH\\)", "Benzene + \\(CH_3OH\\)"], answer: "Phenol + \\(CH_3I\\)" },
                { section: "Chemistry", content: "Match List I with List II:<br><b>List I:</b> (A) Tranquilizers, (B) Aspirin, (C) Antibiotic, (D) Antiseptic<br><b>List II:</b> (I) Anti blood clotting, (II) Salvarsan, (III) Antidepressant drugs, (IV) Soframicine", options: ["(A)–IV, (B)–II, (C)–I, (D)–III", "(A)–II, (B)–I, (C)–III, (D)–IV", "(A)–III, (B)–I, (C)–II, (D)–IV", "(A)–II, (B)–IV, (C)–I, (D)–III"], answer: "(A)–III, (B)–I, (C)–II, (D)–IV" },
                { section: "Chemistry", content: "The correct representation in six membered pyranose form for the sugar D-glucose is:<br><div class='flex justify-center my-4'><img src='images/6.jpeg' alt='D-Glucose Pyranose Form'></div>", options: ["alpha-D-glucopyranose", "beta-D-glucopyranose", "alpha-L-glucopyranose", "beta-L-glucopyranose"], answer: "beta-D-glucopyranose" },
                { section: "Chemistry", content: "Match List I and List II:<br><b>List I (Test):</b> (A) Molisch's Test, (B) Biuret Test, (C) Carbylamine Test, (D) Schiff's Test<br><b>List II (Functional group):</b> (I) Peptide, (II) Carbohydrate, (III) Primary amine, (IV) Aldehyde", options: ["(A)-I, (B)-II, (C)-III, (D)-IV", "(A)-III, (B)-IV, (C)-I, (D)-II", "(A)-II, (B)-I, (C)-III, (D)-IV", "(A)-III, (B)-IV, (C)-II, (D)-I"], answer: "(A)-II, (B)-I, (C)-III, (D)-IV" },
                { section: "Chemistry", content: "The density of 3M solution of NaCl is \\(1.0 g mL^{-1}\\). Molality of the solution is ______ \\(\\times 10^{-2}\\) m (Nearest integer). Given: Molar mass of Na and Cl is 23 and 35.5 \\(g mol^{-1}\\) respectively.", options: [], answer: "364" },
                { section: "Chemistry", content: "Electrons in a cathode ray tube have been emitted with a velocity of \\(1000 ms^{-1}\\). The number of following statements which is/are true about the emitted radiation is ______.<br>(A) The deBroglie wavelength of the electron emitted is 666.67 nm<br>(B) The characteristic of electrons emitted depend upon the material of the electrodes of the cathode ray tube.<br>(C) The cathode rays start from cathode and move towards anode.<br>(D) The nature of the emitted electrons depends on the nature of the gas present in cathode ray tube.", options: [], answer: "2" },
                { section: "Chemistry", content: "At 25°C, enthalpies are given: \\(H_2(g)+O_2(g) \\rightarrow 2OH(g) \\Delta H=78kJ\\); \\(H_2(g)+1/2O_2(g) \\rightarrow H_2O(g) \\Delta H=-242kJ\\); \\(H_2(g) \\rightarrow 2H(g) \\Delta H=436kJ\\); \\(1/2O_2(g) \\rightarrow O(g) \\Delta H=249kJ\\). What is \\(\\Delta H\\) for \\(H_2O(g) \\rightarrow H(g)+OH(g)\\)? (Nearest integer)", options: [], answer: "499" },
                { section: "Chemistry", content: "(i) \\(X(g) \\rightleftharpoons Y(g) + Z(g) K_{p1}=3\\)<br>(ii) \\(A(g) \\rightleftharpoons 2B(g) K_{p2}=1\\)<br>If the degree of dissociation and initial concentration of both reactants X(g) and A(g) are equal, then the ratio of the total pressure at equilibrium \\(p_1/p_2\\) is equal to x:1. The value of x is ______.", options: [], answer: "12" },
                { section: "Chemistry", content: "The total number of chiral compound/s from a given list of structures is ______. (List includes: 2-chlorobutane, 1-chlorobutane, 2,3-dichloropentane, etc.)", options: [], answer: "2" },
                { section: "Chemistry", content: "25 mL of an aqueous solution of KCl was found to require 20 mL of 1M AgNO₃ solution when titrated using \\(K_2CrO_4\\) as an indicator. What is the depression in freezing point of KCl solution of the given concentration? (Nearest integer). (Given : \\(K_f = 2.0 K kg mol^{-1}\\))", options: [], answer: "3" },
                { section: "Chemistry", content: "At what pH, given half cell \\(MnO_4^-(0.1M) | Mn^{2+}(0.001 M)\\) will have electrode potential of 1.282 V? (Nearest Integer) Given \\(E^\\circ(MnO_4^-/Mn^{2+}) = 1.54 V\\), \\((2.303RT/F) = 0.059 V\\)", options: [], answer: "3" },
                { section: "Chemistry", content: "A and B are two substances undergoing radioactive decay. The half life of A is 15 min and B is 5 min. If the initial concentration of B is 4 times that of A and they both start decaying at the same time, how much time will it take for their concentrations to be same? ________min.", options: [], answer: "15" },
                { section: "Chemistry", content: "Sum of oxidation states of bromine in bromic acid and perbromic acid is ______.", options: [], answer: "12" },
                { section: "Chemistry", content: "Number of isomeric compounds with molecular formula \\(C_9H_{10}O\\) which (i) do not dissolve in NaOH (ii) do not dissolve in HCl (iii) do not give orange precipitate with 2,4-DNP (iv) on hydrogenation give identical compound with molecular formula \\(C_9H_{12}O\\) is ______.", options: [], answer: "2" },
                 // Maths
                { section: "Maths", content: "Let \\(S = \\{x: x \\in \\mathbb{R} \\text{ and } (\\sqrt{3} + \\sqrt{2})^{x^2-4} + (\\sqrt{3} - \\sqrt{2})^{x^2-4} = 10\\}\\). Then \\(n(S)\\) is equal to:", options: ["2", "4", "6", "0"], answer: "4" },
                { section: "Maths", content: "If the center and radius of the circle \\(|(z-2)/(z-3)| = 2\\) are respectively \\((\\alpha, \\beta)\\) and \\(\\gamma\\), then \\(3\\alpha + \\beta + \\gamma^2\\) is equal to:", options: ["11", "9", "10", "12"], answer: "12" },
                { section: "Maths", content: "The sum to 10 terms of the series \\(\\frac{1}{1+1^2+1^4} + \\frac{2}{1+2^2+2^4} + \\frac{3}{1+3^2+3^4} + \\dots\\) is:", options: ["59/111", "55/111", "56/111", "58/111"], answer: "55/111" },
                { section: "Maths", content: "The value of \\(\\frac{1}{1!50!} + \\frac{1}{3!48!} + \\frac{1}{5!46!} + \\dots + \\frac{1}{51!1!}\\) is:", options: ["\\(2^{50}/50!\\)", "\\(2^{50}/51!\\)", "\\(2^{51}/51!\\)", "\\(2^{51}/50!\\)"], answer: "\\(2^{50}/51!\\)" },
                { section: "Maths", content: "The equation of the angle bisectors of the lines represented by the equation \\(2x^2 + xy - 3y^2 = 0\\) is:", options: ["\\(3x^2 + 5xy + 2y^2 = 0\\)", "\\(x^2 - y^2 + 10xy = 0\\)", "\\(3x^2 + xy - 2y^2 = 0\\)", "\\(x^2 - y^2 - 10xy = 0\\)"], answer: "\\(x^2 - y^2 - 10xy = 0\\)" },
                { section: "Maths", content: "If the orthocentre of the triangle, whose vertices are (1,2), (2,3) and (3,1) is \\((\\alpha, \\beta)\\), then the quadratic equation whose roots are \\(\\alpha+4\\beta\\) and \\(4\\alpha+\\beta\\), is:", options: ["\\(x^2 - 19x + 90 = 0\\)", "\\(x^2 - 18x + 80 = 0\\)", "\\(x^2 - 22x + 120 = 0\\)", "\\(x^2 - 20x + 99 = 0\\)"], answer: "\\(x^2 - 20x + 99 = 0\\)" },
                { section: "Maths", content: "The negation of the expression \\(q \\lor ((\\sim q) \\land p)\\) is equivalent to:", options: ["\\((\\sim p) \\land (\\sim q)\\)", "\\(p \\land (\\sim q)\\)", "\\((\\sim p) \\lor (\\sim q)\\)", "\\((\\sim p) \\lor q\\)"], answer: "\\((\\sim p) \\land (\\sim q)\\)" },
                { section: "Maths", content: "The mean and variance of 5 observations are 5 and 8 respectively. If 3 observations are 1, 3, 5, then the sum of cubes of the remaining two observations is:", options: ["1072", "1792", "1216", "1456"], answer: "1072" },
                { section: "Maths", content: "For a triangle ABC, the value of \\(\\cos(2A) + \\cos(2B) + \\cos(2C)\\) is least. If its inradius is 3 and incentre is M, then which of the following is NOT correct?", options: ["Perimeter of \\(\\Delta ABC\\) is \\(18\\sqrt{3}\\)", "\\(\\sin(2A)+\\sin(2B)+\\sin(2C) = \\sin(A)+\\sin(B)+\\sin(C)\\)", "\\(\\vec{MA} \\cdot \\vec{MB} = -18\\)", "area of \\(\\Delta ABC\\) is \\(27\\sqrt{3}/2\\)"], answer: "area of \\(\\Delta ABC\\) is \\(27\\sqrt{3}/2\\)" },
                { section: "Maths", content: "Let R be a relation on \\(\\mathbb{R}\\), given by \\(R = \\{(a, b): 3a - 3b + \\sqrt{7} \\text{ is an irrational number}\\}\\). Then R is:", options: ["Reflexive but neither symmetric nor transitive", "Reflexive and transitive but not symmetric", "Reflexive and symmetric but not transitive", "An equivalence relation"], answer: "Reflexive but neither symmetric nor transitive" },
                { section: "Maths", content: "Let S denote the set of all real values of \\(\\lambda\\) such that the system of equations \\(\\lambda x+y+z=1, x+\\lambda y+z=1, x+y+\\lambda z=1\\) is inconsistent, then \\(\\sum_{\\lambda \\in S} (\\lambda^2 + \\lambda)\\) is equal to:", options: ["2", "12", "4", "6"], answer: "6" },
                { section: "Maths", content: "Let S be the set of all solutions of the equation \\(\\cos^{-1}(2x) - 2\\cos^{-1}(\\sqrt{1-x^2}) = \\pi, x \\in [-1/2, 1/2]\\). Then \\(\\sum_{x \\in S} 2\\sin^{-1}(x^2-1)\\) is equal to:", options: ["0", "\\(-2\\pi/3\\)", "\\(\\pi - \\sin^{-1}(\\sqrt{3}/4)\\)", "\\(\\pi - 2\\sin^{-1}(\\sqrt{3}/4)\\)"], answer: "0" },
                { section: "Maths", content: "Let \\(f(x) = 2x + \\tan^{-1}(x)\\) and \\(g(x) = \\log_e(\\sqrt{1+x^2} + x), x \\in [0, 3]\\). Then:", options: ["There exists \\(x \\in (0,3)\\) such that \\(f'(x) < g'(x)\\)", "\\(\\max f(x) > \\max g(x)\\)", "There exist \\(0 < x_1 < x_2 < 3\\) such that \\(f(x) < g(x), \\forall x \\in (x_1, x_2)\\)", "\\(\\min f'(x) = 1 + \\max g'(x)\\)"], answer: "\\(\\max f(x) > \\max g(x)\\)" },
                { section: "Maths", content: "Let f(x) be the determinant of a 3x3 matrix with rows \\((1+\\sin^2x, \\cos^2x, \\sin2x)\\), \\((\\sin^2x, 1+\\cos^2x, \\sin2x)\\), \\((\\sin^2x, \\cos^2x, 1+\\sin2x)\\), for \\(x \\in [\\pi/6, \\pi/3]\\). If \\(\\alpha\\) and \\(\\beta\\) are the max and min values of f, then:", options: ["\\(\\beta^2 - 2\\sqrt{\\alpha} = 19/4\\)", "\\(\\beta^2 + 2\\sqrt{\\alpha} = 19/4\\)", "\\(\\alpha^2 - \\beta^2 = 4\\sqrt{3}\\)", "\\(\\alpha^2 + \\beta^2 = 9/2\\)"], answer: "\\(\\beta^2 - 2\\sqrt{\\alpha} = 19/4\\)" },
                { section: "Maths", content: "\\(\\lim_{n\\to\\infty} [\\frac{1}{1+n} + \\frac{1}{2+n} + \\frac{1}{3+n} + \\dots + \\frac{1}{2n}]\\) is equal to:", options: ["0", "\\(\\log_e2\\)", "\\(\\log_e(3/2)\\)", "\\(\\log_e(2/3)\\)"], answer: "\\(\\log_e2\\)" },
                { section: "Maths", content: "The area enclosed by the closed curve C given by \\(dy/dx + (x+a)/(y-2) = 0, y(1)=0\\) is \\(4\\pi\\). Let P,Q be intersection points of C and y-axis. If normals at P,Q on C intersect x-axis at R,S, then length of RS is:<br><div class='flex justify-center my-4'><img src='images/7.jpeg' alt='Curve Graph'></div>", options: ["\\(2\\sqrt{3}\\)", "\\(2\\sqrt{3}/3\\)", "2", "\\(4\\sqrt{3}/3\\)"], answer: "\\(4\\sqrt{3}/3\\)" },
                { section: "Maths", content: "If \\(y=y(x)\\) is the solution curve of \\(dy/dx + y\\tan(x) = x\\sec(x), 0 \\le x \\le \\pi/3, y(0)=1\\), then \\(y(\\pi/6)\\) is equal to:", options: ["\\(\\pi/12 - (\\sqrt{3}/2)\\log_e(2/(e\\sqrt{3}))\\)", "\\(\\pi/12 + (\\sqrt{3}/2)\\log_e(2\\sqrt{3}/e)\\)", "\\(\\pi/12 - (\\sqrt{3}/2)\\log_e(2\\sqrt{3}/e)\\)", "\\(\\pi/12 + (\\sqrt{3}/2)\\log_e(2/(e\\sqrt{3}))\\)"], answer: "\\(\\pi/12 - (\\sqrt{3}/2)\\log_e(2/(e\\sqrt{3}))\\)" },
                { section: "Maths", content: "Let the image of the point P(2, -1, 3) in the plane \\(x + 2y - z = 0\\) be Q. Then the distance of the plane \\(3x + 2y + z + 29 = 0\\) from the point Q is:", options: ["\\(22\\sqrt{2}/7\\)", "\\(24\\sqrt{2}/7\\)", "\\(2\\sqrt{14}\\)", "\\(3\\sqrt{14}\\)"], answer: "\\(3\\sqrt{14}\\)" },
                { section: "Maths", content: "The shortest distance between the lines \\((x-5)/1 = (y-2)/2 = (z-4)/(-3)\\) and \\((x+3)/1 = (y+5)/4 = (z-1)/(-5)\\) is:", options: ["\\(7\\sqrt{3}\\)", "\\(5\\sqrt{3}\\)", "\\(6\\sqrt{3}\\)", "\\(4\\sqrt{3}\\)"], answer: "\\(6\\sqrt{3}\\)" },
                { section: "Maths", content: "In a binomial distribution B(n,p), the sum and product of the mean & variance are 5 and 6 respectively, then \\(6(n+p-q)\\) is equal to:", options: ["51", "52", "53", "50"], answer: "52" },
                { section: "Maths", content: "The number of words, with or without meaning, that can be formed using all the letters of the word ASSASSINATION so that the vowels occur together, is _____.", options: [], answer: "50400" },
                { section: "Maths", content: "Let \\(a_1=8, a_2, a_3, \\dots\\) be an A.P. If the sum of its first four terms is 50 and the sum of its last four terms is 170, then the product of its middle two terms is _____.", options: [], answer: "754" },
                { section: "Maths", content: "The number of 3-digit numbers, that are divisible by either 2 or 3 but not divisible by 7 is _____.", options: [], answer: "514" },
                { section: "Maths", content: "The remainder when \\(19^{200} + 23^{200}\\) is divided by 49, is _____.", options: [], answer: "29" },
                { section: "Maths", content: "If \\(f(x) = x^2 + g'(1)x + g''(2)\\) and \\(g(x) = f(1)x^2 + xf'(x) + f''(x)\\), then the value of \\(f(4) - g(4)\\) is equal to _____.", options: [], answer: "14" },
                { section: "Maths", content: "If \\(\\int_0^1 x^{21}(1+x^7)(2x^{14}+3x^7+6)^{1/7} dx = (1/l)(11)^{m/n}\\) where \\(l,m,n \\in \\mathbb{N}\\), m and n are co-prime then \\(l+m+n\\) is equal to _____.", options: [], answer: "63" },
                { section: "Maths", content: "Let A be the area bounded by the curve \\(y = x|x-3|\\), the x-axis and the ordinates x = -1 and x = 2. Then 12A is equal to _____.", options: [], answer: "62" },
                { section: "Maths", content: "Let \\(f: \\mathbb{R} \\rightarrow \\mathbb{R}\\) be a differentiable function such that \\(f'(x) + f(x) = \\int_0^2 f(t)dt\\). If \\(f(0) = e^{-2}\\), then \\(2f(0) - f(2)\\) is equal to _____.", options: [], answer: "1" },
                { section: "Maths", content: "Let \\(v = \\alpha\\hat{i}+2\\hat{j}-3\\hat{k}, w = 2\\alpha\\hat{i}+\\hat{j}-\\hat{k}\\). If the minimum value of the scalar triple product [u v w] is \\(-\\alpha\\sqrt{3401}\\), \\(|u|=\\sqrt{\\alpha} (\\alpha>0)\\), and \\(|u\\cdot\\hat{i}|^2 = m/n\\) where m,n are coprime, then m+n is equal to _____.", options: [], answer: "3501" },
                { section: "Maths", content: "A(2,6,2), B(-4,0,\\(\\lambda\\)), C(2,3,-1) and D(4,5,0), \\(\\lambda \\le 5\\) are vertices of a quadrilateral ABCD. If its area is 18 square units, then \\(5-6\\lambda\\) is equal to _____:<br><div class='flex justify-center my-4'><img src='images/8.jpeg' alt='Quadrilateral Diagram'></div>", options: [], answer: "11" }
 ],
        
        // PAPER 2 (Example Placeholder - Replace with real data)
    
        2: [
  {
    "section": "Physics",
    "content": "If the velocity of light c, universal gravitational constant G and planck's constant h are chosen as fundamental quantities. The dimensions of mass in the new system is:",
    "options": [
      "[h^(1/2)c^(1/2)G^1]",
      "h^1 c^1 G^-1",
      "[h^-(1/2)c^(1/2)G^(1/2)]",
      "[h^(1/2)c^(1/2)G^-(1/2)]"
    ],
    "answer": "[h^(1/2)c^(1/2)G^-(1/2)]"
  },
  {
    "section": "Physics",
    "content": "For a train engine moving with speed of 20 ms⁻¹, the driver must apply brakes at a distance of 500 m before the station for the train to come to rest at the station. If the brakes were applied at half of this distance, the train engine would cross the station with speed ___ ms⁻¹. The value of ___ is (Assuming same retardation is produced by brakes)",
    "options": [],
    "answer": "14.14"
  },
  {
    "section": "Physics",
    "content": "As shown in the figure a block of mass 10 kg lying on a horizontal surface is pulled by a force F acting at an angle 30° with horizontal. For μs = 0.25 the block will just start to move for the value of F: [Given g = 10 m·s⁻²]<br><div class='flex justify-center my-4'><img src='images/q3.png' alt='Physics Question 3'></div>",
    "options": [
      "33.3 N",
      "25.2 N",
      "20 N",
      "35.7 N"
    ],
    "answer": "25.2 N"
  },
  {
    "section": "Physics",
    "content": "A block is fastened to a horizontal spring. The block is pulled to a distance x = 10 cm from its equilibrium position (at x = 0) on a frictionless surface from rest. The energy of the block at x = 5 cm is 0.25 J. The spring constant of the spring is ___ N m⁻¹.",
    "options": [],
    "answer": "66.67"
  },
  {
    "section": "Physics",
    "content": "A force F = (5 + 3y²) acts on a particle in the y-direction, where F is in newton and y is in meter. The work done by the force during a displacement from y = 2 m to y = 5 m is ___ J.",
    "options": [],
    "answer": "132"
  },
  {
    "section": "Physics",
    "content": "Figures (a), (b), (c) and (d) show variation of force with time. The impulse is highest in figure.<br><div class='flex justify-center my-4'><img src='images/q6.png' alt='Physics Question 6'><img src='images/a601.png' alt='Physics Question 6'></div>",
    "options": [
      "Fig (c)",
      "Fig (b)",
      "Fig (a)",
      "Fig (d)"
    ],
    "answer": "Fig (b)"
  },
  {
    "section": "Physics",
    "content": "Moment of inertia of a disc of mass M and radius 'R' about any of its diameter is MR²/4. The moment of inertia of this disc about an axis normal to the disc and passing through a point on its edge will be, (x/2)MR². The value of x is ___.",
    "options": [],
    "answer": "3"
  },
  {
    "section": "Physics",
    "content": "The escape velocities of two planets A and B are in the ratio 1:2. If the ratio of their radii respectively is 1:3, then the ratio of acceleration due to gravity of planet A to the acceleration of gravity of planet B will be:",
    "options": [
      "4/3",
      "3/2",
      "2/3",
      "3/4"
    ],
    "answer": "3/4"
  },
  {
    "section": "Physics",
    "content": "For a body projected at an angle with the horizontal from the ground, choose the correct statement.",
    "options": [
      "Gravitational potential energy is maximum at the highest point.",
      "The horizontal component of velocity is zero at highest point.",
      "The vertical component of momentum is maximum at the highest point.",
      "The kinetic energy (K.E.) is zero at the highest point of projectile motion."
    ],
    "answer": "Gravitational potential energy is maximum at the highest point."
  },
  {
    "section": "Physics",
    "content": "The Young's modulus of a steel wire of length 6 m and cross-sectional area 3 mm², is 2 x 10¹¹ N/m². The wire is suspended from its support on a given planet. A block of mass 4 kg is attached to the free end of the wire. The acceleration due to gravity on the planet is 1/4 of its value on the earth. The elongation of wire is (Take g on the earth = 10 m/s²):",
    "options": [
      "1 mm",
      "0.1 mm",
      "1 cm",
      "0.1 cm"
    ],
    "answer": "0.1 mm"
  },
  {
    "section": "Physics",
    "content": "The surface of water in a water tank of cross section area 750 cm² on the top of a house is h m above the tap level. The speed of water coming out through the tap of cross section area 500 mm² is 30 cm s⁻¹. At that instant, dh/dt is x × 10⁻³ ms⁻¹. The value of x will be ___.",
    "options": [],
    "answer": "2"
  },
  {
    "section": "Physics",
    "content": "For three low density gases A, B, C pressure versus temperature graphs are plotted while keeping them at constant volume, as shown in the figure. The temperature corresponding to the point K is:<br><div class='flex justify-center my-4'><img src='images/q12.png' alt='Physics Question 12'></div>",
    "options": [
      "-273°C",
      "-100°C",
      "-373°C",
      "-40°C"
    ],
    "answer": "-273°C"
  },
  {
    "section": "Physics",
    "content": "A Carnot engine operating between two reservoirs has efficiency 1/3. When the temperature of cold reservoir raised by x, its efficiency decreases to 1/6. The value of x, if the temperature of hot reservoir is 99°C, will be ___.",
    "options": [
      "16.5 K",
      "33 K",
      "66 K",
      "62 K"
    ],
    "answer": "62 K"
  },
  {
    "section": "Physics",
    "content": "Choose the correct length (L) versus square of time period (T²) graph for a simple pendulum executing simple harmonic motion.<br><div class='flex justify-center my-4'><img src='images/q14.png' alt='Physics Question 14'></div>",
    "options": [
      "images/q14_opt1.png",
      "images/q14_opt2.png",
      "images/q14_opt3.png",
      "images/q14_opt4.png"
    ],
    "answer": "images/q14_opt3.png"
  },
  {
    "section": "Physics",
    "content": "A cubical volume is bounded by the surfaces x=0, x=a, y=0, y=a, z=0, z=a. The electric field in the region is given by E = E₀xî. Where E₀ = 4×10⁴ NC⁻¹m⁻¹. If a = 2 cm, the charge contained in the cubical volume is Q × 10⁻¹⁴ C. The value of Q is ___. (Take ε₀ = 9×10⁻¹² C²N⁻¹m⁻²)",
    "options": [],
    "answer": "288"
  },
  {
    "section": "Physics",
    "content": "Given below are two statements: One is labelled as Assertion A and the other is labelled as Reason R.\nAssertion A: Two metallic spheres are charged to the same potential. One of them is hollow and another is solid, and both have the same radii. Solid sphere will have lower charge than the hollow one.\nReason R: Capacitance of metallic spheres depend on the radii of spheres.\nIn the light of the above statements, choose the correct answer from the options given below.",
    "options": [
      "A is false but R is true",
      "Both A and R are true and R is the correct explanation of A",
      "A is true but R is false",
      "Both A and R are true but R is not the correct explanation of A"
    ],
    "answer": "A is false but R is true"
  },
  {
    "section": "Physics",
    "content": "Given below are two statements: One is labelled as Assertion A and the other is labelled as Reason R.\nAssertion A: For measuring the potential difference across a resistance of 600 Ω, the voltmeter with resistance 1000 Ω will be preferred over voltmeter with resistance 4000 Ω.\nReason R: Voltmeter with higher resistance will draw smaller current than voltmeter with lower resistance.\nIn the light of the above statements, choose the most appropriate answer from the options given below.",
    "options": [
      "A is not correct but R is correct",
      "Both A and R are correct and R is the correct explanation of A",
      "Both A and R are correct but R is not the correct explanation of A",
      "A is correct but R is not correct"
    ],
    "answer": "A is not correct but R is correct"
  },
  {
    "section": "Physics",
    "content": "Equivalent resistance between the adjacent corners of a regular n-sided polygon of uniform wire of resistance R would be :",
    "options": [
      "(n-1)R / n²",
      "(n-1)R / (2n-1)",
      "n²R / (n-1)",
      "(n-1)R / n"
    ],
    "answer": "(n-1)R / n²"
  },
  {
    "section": "Physics",
    "content": "In the given circuit the value of |(I₁ + I₃) / I₂| is:<br><div class='flex justify-center my-4'><img src='images/q19.png' alt='Physics Question 19'></div>",
    "options": [],
    "answer": "9"
  },
  {
    "section": "Physics",
    "content": "A coil is placed in magnetic field such that plane of coil is perpendicular to the direction of magnetic field. The magnetic flux through a coil can be changed:\nA. By changing the magnitude of the magnetic field within the coil.\nB. By changing the area of coil within the magnetic field.\nC. By changing the angle between the direction of magnetic field and the plane of the coil.\nD. By reversing the magnetic field direction abruptly without changing its magnitude.\nChoose the most appropriate answer from the options given below:",
    "options": [
      "A and B only",
      "A, B and C only",
      "A, B and D only",
      "A and C only"
    ],
    "answer": "A, B, C and D"
  },
  {
    "section": "Physics",
    "content": "As shown in the figure, a long straight conductor with semicircular arc of radius (π/10) m is carrying current I = 3A. The magnitude of the magnetic field at the center O of the arc is: (The permeability of the vacuum = 4π × 10⁻⁷ NA⁻²)<br><div class='flex justify-center my-4'><img src='images/q21.png' alt='Physics Question 21'></div>",
    "options": [
      "6 μT",
      "1 μT",
      "4 μT",
      "3 μT"
    ],
    "answer": "3 μT"
  },
  {
    "section": "Physics",
    "content": "A square shaped coil of area 70 cm² having 600 turns rotates in a magnetic field of 0.4 Wb m⁻², about an axis which is parallel to one of the side of the coil and perpendicular to the direction of field. If the coil completes 500 revolution in a minute, the instantaneous emf when the plane of the coil is inclined at 60° with the field, will be ___ V. (Take π = 22/7)",
    "options": [],
    "answer": "44"
  },
  {
    "section": "Physics",
    "content": "The ratio of average electric energy density and total average energy density of electromagnetic wave is:",
    "options": [
      "2",
      "1",
      "3",
      "1/2"
    ],
    "answer": "1/2"
  },
  {
    "section": "Physics",
    "content": "Two objects A and B are placed at 15 cm and 25 cm from the pole in front of a concave mirror having radius of curvature 40 cm. The distance between images formed by the mirror is:",
    "options": [
      "40 cm",
      "60 cm",
      "160 cm",
      "100 cm"
    ],
    "answer": "160 cm"
  },
  {
    "section": "Physics",
    "content": "As shown in the figure, in Young's double slit experiment, a thin plate of thickness t = 10 μm and refractive index μ = 1.2 is inserted infront of slit S₁. The experiment is conducted in air (μ = 1) and uses a monochromatic light of wavelength λ = 500 nm. Due to the insertion of the plate, central maxima is shifted by a distance of xβ₀. β₀ is the fringe-width before the insertion of the plate. The value of the x is ___.<br><div class='flex justify-center my-4'><img src='images/q25.png' alt='Physics Question 25'></div>",
    "options": [],
    "answer": "4"
  },
  {
    "section": "Physics",
    "content": "The threshold frequency of metal is f₀. When the light of frequency 2f₀ is incident on the metal plate, the maximum velocity of photoelectron is v₁. When the frequency of incident radiation is increased to 5f₀, the maximum velocity of photoelectrons emitted is v₂. The ratio of v₁ to v₂ is:",
    "options": [
      "v₁/v₂ = 1/2",
      "v₁/v₂ = 1/8",
      "v₁/v₂ = 1/16",
      "v₁/v₂ = 1/4"
    ],
    "answer": "v₁/v₂ = 1/2"
  },
  {
    "section": "Physics",
    "content": "An electron of a hydrogen like atom, having Z = 4, jumps from 4th energy state to 2nd energy state. The energy released in this process, will be: (Given Rch = 13.6 eV)",
    "options": [
      "13.6 eV",
      "10.5 eV",
      "3.4 eV",
      "40.8 eV"
    ],
    "answer": "40.8 eV"
  },
  {
    "section": "Physics",
    "content": "Nucleus A having Z = 17 and equal number of protons and neutrons has 1.2 MeV binding energy per nucleon. Another nucleus B of Z = 12 has total 26 nucleons and 1.8 MeV binding energy per nucleons. The difference of binding energy of B and A will be ___ MeV.",
    "options": [],
    "answer": "6"
  },
  {
    "section": "Physics",
    "content": "Choose the correct statement about Zener diode:",
    "options": [
      "It works as a voltage regulator in reverse bias and behaves like simple p-n junction diode in forward bias.",
      "It works as a voltage regulator in both forward and reverse bias.",
      "It works as a voltage regulator only in forward bias.",
      "It works as a voltage regulator in forward bias and behaves like simple p-n junction diode in reverse bias."
    ],
    "answer": "It works as a voltage regulator in reverse bias and behaves like simple p-n junction diode in forward bias."
  },
  {
    "section": "Physics",
    "content": "In an amplitude modulation, a modulating signal having amplitude of X V is superimposed with a carrier signal of amplitude Y V in first case. Then, in second case, the same modulating signal is superimposed with different carrier signal of amplitude 2Y V. The ratio of modulation index in the two cases respectively will be:",
    "options": [
      "1:2",
      "1:1",
      "2:1",
      "4:1"
    ],
    "answer": "2:1"
  },
  {
    "section": "Chemistry",
    "content": "The molality of a 10% (v/V) solution of di-bromine solution in CCl₄ (carbon tetrachloride) is x × 10⁻² M. (Nearest integer) [Given: molar mass of Br₂ = 160g mol⁻¹, atomic mass of C = 12g mol⁻¹, atomic mass of Cl = 35.5 g mol⁻¹, density of dibromine = 3.2 g cm⁻³, density of CCl₄ = 1.6g cm⁻³]",
    "options": [],
    "answer": "139"
  },
  {
    "section": "Chemistry",
    "content": "Which one of the following sets of ions represents a collection of isoelectronic species? (Given: Atomic Number: F:9, Cl:17, Na=11, Mg=12, Al=13, K=19, Ca=20, Sc=21)",
    "options": [
      "(Li⁺, Na⁺, Mg²⁺, Ca²⁺)",
      "(Ba²⁺, Sr²⁺, K⁺, Ca²⁺)",
      "(N³⁻, O²⁻, F⁻, S²⁻)",
      "(K⁺, Cl⁻, Ca²⁺, Sc³⁺)"
    ],
    "answer": "(K⁺, Cl⁻, Ca²⁺, Sc³⁺)"
  },
  {
    "section": "Chemistry",
    "content": "For electron gain enthalpies of the elements denoted as ΔegH, the incorrect option is:",
    "options": [
      "ΔegH(Cl) < ΔegH(F)",
      "ΔegH(Se) < ΔegH(S)",
      "ΔegH(I) < ΔegH(At)",
      "ΔegH(Te) < ΔegH(Po)"
    ],
    "answer": "ΔegH(I) < ΔegH(At)"
  },
  {
    "section": "Chemistry",
    "content": "0.3 g of ethane undergoes combustion at 27°C in a bomb calorimeter. The temperature of calorimeter system (including the water) is found to rise by 0.5°C. The heat evolved during combustion of ethane at constant pressure is ___ kJ mol⁻¹. (Nearest integer) [Given: The heat capacity of the calorimeter system is 20 kJ K⁻¹, R = 8.3 JK⁻¹mol⁻¹. Assume ideal gas behaviour. Atomic mass of C and H are 12 and 1 g mol⁻¹ respectively]",
    "options": [],
    "answer": "-1006"
  },
  {
    "section": "Chemistry",
    "content": "The effect of addition of helium gas to the following reaction in equilibrium state at constant volume, is: PCl₅(g) ⇌ PCl₃(g) + Cl₂(g)",
    "options": [
      "the equilibrium will shift in the forward direction and more of Cl₂ and PCl₃ gases will be produced.",
      "the equilibrium will go backward due to suppression of dissociation of PCl₅.",
      "helium will deactivate PCl₅ and reaction will stop.",
      "addition of helium will not affect the equilibrium."
    ],
    "answer": "addition of helium will not affect the equilibrium."
  },
  {
    "section": "Chemistry",
    "content": "Given below are two statements: one is labelled as Assertion (A) and the other is labelled as Reason (R).\nAssertion (A): An aqueous solution of KOH when for volumetric analysis, its concentration should be checked before the use.\nReason (R): On aging, KOH solution absorbs atmospheric CO₂.\nIn the light of the above statements, choose the correct answer from the options given below.",
    "options": [
      "(A) is not correct but (R) is correct",
      "Both (A) and (R) are correct but (R) is not the correct explanation of (A)",
      "Both (A) and (R) are correct and (R) is the correct explanation of (A)",
      "(A) is correct but (R) is not correct"
    ],
    "answer": "Both (A) and (R) are correct and (R) is the correct explanation of (A)"
  },
  {
    "section": "Chemistry",
    "content": "O-O bond length in H₂O₂ is X than the O-O bond length in F₂O₂. The O-H bond length in H₂O₂ is Y than that of the O-F bond in F₂O₂. Choose the correct option for X and Y from the given below.",
    "options": [
      "X - shorter, Y - shorter",
      "X - shorter, Y - longer",
      "X - longer, Y - longer",
      "X - longer, Y - shorter"
    ],
    "answer": "X - longer, Y - shorter"
  },
  {
    "section": "Chemistry",
    "content": "The starting material for convenient preparation of deuterated hydrogen peroxide (D₂O₂) in laboratory is:",
    "options": [
      "K₂S₂O₈",
      "2-ethylanthraquinol",
      "BaO₂",
      "BaO"
    ],
    "answer": "K₂S₂O₈"
  },
  {
    "section": "Chemistry",
    "content": "Given below are two statements: one is labelled as Assertion (A) and the other is labelled as Reason (R).\nAssertion (A): Gypsum is used for making fireproof wall boards.\nReason (R): Gypsum is unstable at high temperatures.\nIn the light of the above statements, choose the correct answer from the options given below:",
    "options": [
      "Both (A) and (R) are correct but (R) is not the correct explanation of (A).",
      "(A) is correct but (R) is not correct.",
      "(A) is not correct but (R) is correct.",
      "Both (A) and (R) are correct and (R) is the correct explanation of (A)."
    ],
    "answer": "Both (A) and (R) are correct and (R) is the correct explanation of (A)."
  },
  {
    "section": "Chemistry",
    "content": "The correct order of bond enthalpy (kJ mol⁻¹) is:",
    "options": [
      "Si-Si > C-C > Sn-Sn > Ge-Ge",
      "Si-Si > C-C > Ge-Ge > Sn-Sn",
      "C-C > Si-Si > Sn-Sn > Ge-Ge",
      "C-C > Si-Si > Ge-Ge > Sn-Sn"
    ],
    "answer": "C-C > Si-Si > Ge-Ge > Sn-Sn"
  },
  {
    "section": "Chemistry",
    "content": "Given below are two statements:\nStatement I: Sulphanilic acid gives esterification test for carboxyl group.\nStatement II: Sulphanilic acid gives red colour in Lassigne's test for extra element detection.\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    "options": [
      "Statement I is correct but Statement II is incorrect.",
      "Both Statement I and Statement II are incorrect",
      "Both Statement I and Statement II are correct",
      "Statement I is incorrect but Statement II is correct."
    ],
    "answer": "Both Statement I and Statement II are incorrect"
  },
  {
    "section": "Chemistry",
    "content": "Testosterone, which is a steroidal hormone, has the following structure. The total number of asymmetric carbon atom/s in testosterone is ___.<br><div class='flex justify-center my-4'><img src='images/q42.png' alt='Chemistry Question 42'></div>",
    "options": [],
    "answer": "6"
  },
  {
    "section": "Chemistry",
    "content": "For the reaction shown, 'X' is:<br><div class='flex justify-center my-4'><img src='images/q43.png' alt='Chemistry Question 43'><br><img src='images/a44.png' alt='Physics Question 6'></div>",
    "options": [
      "images/q43_opt1.png",
      "images/q43_opt2.png",
      "images/q43_opt3.png",
      "images/q43_opt4.png"
    ],
    "answer": "images/q43_opt3.png"
  },
  {
    "section": "Chemistry",
    "content": "The industrial activity held least responsible for global warming is:",
    "options": [
      "manufacturing of cement",
      "steel manufacturing",
      "Electricity generation in thermal power plants.",
      "Industrial production of urea"
    ],
    "answer": "Industrial production of urea"
  },
  {
    "section": "Chemistry",
    "content": "A metal M crystallizes into two lattices:- face centred cubic (fcc) and body centred cubic (bcc) with unit cell edge length of 2.0 and 2.5 Å respectively. The ratio of densities of lattices fcc to bcc for the metal M is ___ (Nearest integer).",
    "options": [],
    "answer": "2"
  },
  {
    "section": "Chemistry",
    "content": "20% of acetic acid is dissociated when its 5 g is added to 500 mL of water. The depression in freezing point of such water is ___ × 10⁻³ °C. Atomic mass of C, H and O are 12, 1 and 16 a.m.u. respectively. [Given: Molal depression constant and density of water are 1.86 K kg mol⁻¹ and 1 g cm⁻³ respectively.]",
    "options": [],
    "answer": "372"
  },
  {
    "section": "Chemistry",
    "content": "1×10⁻⁵ M AgNO₃ is added to 1 L of saturated solution of AgBr. The conductivity of this solution at 298 K is ___ × 10⁻⁸ S m⁻¹. [Given: Ksp(AgBr) = 4.9×10⁻¹³ at 298 K, λ°(Ag⁺) = 6×10⁻³ Sm²mol⁻¹, λ°(Br⁻) = 8×10⁻³ Sm²mol⁻¹, λ°(NO₃⁻) = 7×10⁻³ Sm²mol⁻¹]",
    "options": [],
    "answer": "13"
  },
  {
    "section": "Chemistry",
    "content": "The graph which represents the following reaction is: (C₆H₅)₃C-Cl --(OH⁻/Pyridine)--> (C₆H₅)₃C-OH",
    "options": [
      "images/q48_opt1.png",
      "images/q48_opt2.png",
      "images/q48_opt3.png",
      "images/q48_opt4.png"
    ],
    "answer": "images/q48_opt1.png"
  },
  {
    "section": "Chemistry",
    "content": "A → B. The above reaction is of zero order. Half life of this reaction is 50 min. The time taken for the concentration of A to reduce to one-fourth of its initial value is ___ min. (Nearest integer)",
    "options": [],
    "answer": "75"
  },
  {
    "section": "Chemistry",
    "content": "In figure, a straight line is given for Freundrich Adsorption (y = 3x + 2.505). The value of 1/n and log K are respectively:<br><div class='flex justify-center my-4'><img src='images/q50.png' alt='Chemistry Question 50'></div>",
    "options": [
      "0.3 and log 2.505",
      "0.3 and 0.7033",
      "3 and 2.505",
      "3 and 0.7033"
    ],
    "answer": "3 and 2.505"
  },
  {
    "section": "Chemistry",
    "content": "Among following compounds, the number of those present in copper matte is ___. A. CuCO₃, B. Cu₂S, C. Cu₂O, D. FeO",
    "options": [],
    "answer": "1"
  },
  {
    "section": "Chemistry",
    "content": "Given below are two statements: one is labelled as Assertion (A) and the other is labelled as Reason (R).\nAssertion (A): Cu²⁺ in water is more stable than Cu⁺.\nReason (R): Enthalpy of hydration for Cu²⁺ is much less than that of Cu⁺.\nIn the light of the above statements, choose the correct answer from the options given below :",
    "options": [
      "Both (A) and (R) are correct and (R) is the correct explanation of (A).",
      "(A) is correct but (R) is not correct.",
      "(A) is not correct but (R) is correct.",
      "Both (A) and (R) are correct but (R) is not the correct explanation of (A)."
    ],
    "answer": "(A) is correct but (R) is not correct."
  },
  {
    "section": "Chemistry",
    "content": "Which element is not present in Nessler's reagent?",
    "options": [
      "Mercury",
      "Potassium",
      "Iodine",
      "Oxygen"
    ],
    "answer": "Oxygen"
  },
  {
    "section": "Chemistry",
    "content": "The complex cation which has two isomers is:",
    "options": [
      "[Co(H₂O)₆]³⁺",
      "[Co(NH₃)₅Cl]²⁺",
      "[Co(NH₃)₅NO₂]²⁺",
      "[Co(NH₃)₅Cl]⁺"
    ],
    "answer": "[Co(NH₃)₅NO₂]²⁺"
  },
  {
    "section": "Chemistry",
    "content": "The spin only magnetic moment of [Mn(H₂O)₆]²⁺ complexes is ___ B.M. (Nearest integer) (Given atomic number of Mn = 25)",
    "options": [],
    "answer": "6"
  },
  {
    "section": "Chemistry",
    "content": "The structures of major products A, B and C in the following reaction are sequence:<br><div class='flex justify-center my-4'><img src='images/q56.png' alt='Chemistry Question 56'><br><img src='images/a56.png' alt='Chemistry Question 56'></div>",
    "options": [
      "images/q56_opt1.png",
      "images/q56_opt2.png",
      "images/q56_opt3.png",
      "images/q56_opt4.png"
    ],
    "answer": "images/q56_opt2.png"
  },
  {
    "section": "Chemistry",
    "content": "In a reaction, reagents 'X' and 'Y' respectively are:<br><div class='flex justify-center my-4'><img src='images/q57.png' alt='Chemistry Question 57'></div>",
    "options": [
      "(CH₃CO)₂O/H⁺ and CH₃OH/H⁺, Δ",
      "(CH₃CO)₂O/H⁺ and (CH₃CO)₂O/H⁺",
      "CH₃OH/H⁺, Δ and CH₃OH/H⁺, Δ",
      "CH₃OH/H⁺, Δ and (CH₃CO)₂O/H⁺"
    ],
    "answer": "(CH₃CO)₂O/H⁺ and CH₃OH/H⁺, Δ"
  },
  {
    "section": "Chemistry",
    "content": "Among the following, the number of tranquilizer/s is/are ___. A. Chloriazepoxide, B. Veronal, C. Valium, D. Salvarsan",
    "options": [],
    "answer": "3"
  },
  {
    "section": "Chemistry",
    "content": "All structures given below are of vitamin C. Most stable of them is::<br><div class='flex justify-center my-4'><img src='images/q59.png' alt='Chemistry Question 57'></div>",
    "options": [
      "images/q59_opt1.png",
      "images/q59_opt2.png",
      "images/q59_opt3.png",
      "images/q59_opt4.png"
    ],
    "answer": "images/q59_opt1.png"
  },
  {
    "section": "Chemistry",
    "content": "Given below are two statements: one is labelled as Assertion (A) and the other is labelled as Reason (R).\nAssertion (A): α-halocarboxylic acid on reaction with dil. NH₃ gives good yield of α-amino carboxylic acid whereas the yield of amines is very low when prepared from alkyl halides.\nReason (R): Amino acids exist in zwitter ion form in aqueous medium.\nIn the light of the above statements, choose the correct answer from the options given below :",
    "options": [
      "Both (A) and (R) are correct and (R) is the correct explanation of (A).",
      "Both (A) and (R) are correct but (R) is not the correct explanation of (A).",
      "(A) is correct but (R) is not correct.",
      "(A) is not correct but (R) is correct."
    ],
    "answer": "Both (A) and (R) are correct but (R) is not the correct explanation of (A)."
  },
  {
    "section": "Mathematics",
    "content": "The number of integral values of k, for which one root of the equation 2x² - 8x + k = 0 lies in the interval (1, 2) and its other root lies in the interval (2, 3), is:",
    "options": [
      "2",
      "0",
      "1",
      "3"
    ],
    "answer": "1"
  },
  {
    "section": "Mathematics",
    "content": "Let a, b be two real numbers such that ab < 0. If the complex number (1+ai)/(b+i) is of unit modulus and a+ib lies on the circle |z-1| = |2z|, then a possible value of (1+[a])/(4b), where [t] is greatest integer function, is:",
    "options": [
      "0",
      "-1",
      "1",
      "1/2"
    ],
    "answer": "-1"
  },
  {
    "section": "Mathematics",
    "content": "Number of integral solutions to the equation x + y + z = 21, where x ≥ 1, y ≥ 3, z ≥ 4, is equal to ___.",
    "options": [],
    "answer": "105"
  },
  {
    "section": "Mathematics",
    "content": "The total number of six digit numbers, formed using the digits 4, 5, 9 only and divisible by 6, is ___.",
    "options": [],
    "answer": "81"
  },
  {
    "section": "Mathematics",
    "content": "The sum Σ (from n=1 to ∞) of (2n² + 3n + 4) / (2n)! is equal to:",
    "options": [
      "11e/2 + 7/(2e)",
      "13e/4 + 5/(4e) - 4",
      "11e/2 + 7/(2e) - 4",
      "13e/4 + 5/(4e)"
    ],
    "answer": "13e/4 + 5/(4e)"
  },
  {
    "section": "Mathematics",
    "content": "The sum of the common terms of the following three arithmetic progressions. 3, 7, 11, 15, ..., 399, 2, 5, 8, 11, ..., 359 and 2, 7, 12, 17, ..., 197, is equal to ___.",
    "options": [],
    "answer": "321"
  },
  {
    "section": "Mathematics",
    "content": "If the term without x in the expansion of (x²/³ + α/x³)¹² is 7315, then |α| is equal to ___.",
    "options": [],
    "answer": "1"
  },
  {
    "section": "Mathematics",
    "content": "Let the sixth term in the binomial expansion of (√(2^(log₂(10-3^x))) + ⁵√(2^((x-2)log₂3)))^m, in the increasing powers of 2^((x-2)log₂3), be 21. If the binomial coefficients of the second, third and fourth terms in the expansion are respectively the first, third and fifth terms of an A.P., then the sum of the squares of all possible values of x is ___.",
    "options": [],
    "answer": "4"
  },
  {
    "section": "Mathematics",
    "content": "If the y-intercept of a focal chord of the parabola y² = 8x + 4y + 4 is 3, then the length of this chord is equal to ___.",
    "options": [],
    "answer": "22"
  },
  {
    "section": "Mathematics",
    "content": "The line x = 8 is the directrix of the ellipse E: x²/a² + y²/b² = 1 with the corresponding focus (2,0). If the tangent to E at the point P in the first quadrant passes through the point (0, 4√3) and intersects the x-axis at Q, then (3PQ)² is equal to ___.",
    "options": [],
    "answer": "39"
  },
  {
    "section": "Mathematics",
    "content": "Let P(x₀, y₀) be the point on the hyperbola 3x² - 4y² = 36, which is nearest to the line 3x + 2y = 1. Then √2(y₀ - x₀) is equal to:",
    "options": [
      "-3",
      "9",
      "-9",
      "3"
    ],
    "answer": "-9"
  },
  {
    "section": "Mathematics",
    "content": "Which of the following statements is a tautology?",
    "options": [
      "p → (p ∧ (p → q))",
      "(p ∧ q) → (¬p → q)",
      "(p ∧ (p → q)) → ¬q",
      "p ∨ (p ∧ q)"
    ],
    "answer": "(p ∧ q) → (¬p → q)"
  },
  {
    "section": "Mathematics",
    "content": "Let 9 = x₁ < x₂ < ... < x₇ be in an A.P. with common difference d. If the standard deviation of x₁, x₂, ..., x₇ is 4 and the mean is x̄, then x̄ + x₆ is equal to:",
    "options": [
      "18(1 + 1/√3)",
      "34",
      "2(9 + 8/√7)",
      "25"
    ],
    "answer": "34"
  },
  {
    "section": "Mathematics",
    "content": "Let P(S) denote the power set of S = {1, 2, 3, ..., 10}. Define the relations R₁ and R₂ on P(S) as AR₁B if (A ∩ Bᶜ) ∪ (B ∩ Aᶜ) = ∅ and AR₂B if A ∪ Bᶜ = B ∪ Aᶜ, ∀ A, B ∈ P(S). Then:",
    "options": [
      "both R₁ and R₂ are equivalence relations",
      "only R₁ is an equivalence relation",
      "only R₂ is an equivalence relation",
      "both R₁ and R₂ are not equivalence relations"
    ],
    "answer": "both R₁ and R₂ are equivalence relations"
  },
  {
    "section": "Mathematics",
    "content": "If A = (1/2) * [[1, √3], [-√3, 1]], then:",
    "options": [
      "A³⁰ - A²⁵ = 2I",
      "A³⁰ + A²⁵ + A = I",
      "A³⁰ + A²⁵ - A = I",
      "A³⁰ = A²⁵"
    ],
    "answer": "A³⁰ + A²⁵ - A = I"
  },
  {
    "section": "Mathematics",
    "content": "For the system of linear equations αx + y + z = 1, x + αy + z = 1, x + y + αz = β, which one of the following statements is NOT correct?",
    "options": [
      "It has infinitely many solutions if α = 2 and β = -1",
      "It has no solution if α = -2 and β = 1",
      "x + y + z = 3/4 if α = 2 and β = 1",
      "It has infinitely many solutions if α = 1 and β = 1"
    ],
    "answer": "It has infinitely many solutions if α = 2 and β = -1"
  },
  {
    "section": "Mathematics",
    "content": "Let S = {x ∈ R : 0 < x < 1 and 2 tan⁻¹((1-x)/(1+x)) = cos⁻¹((1-x²)/(1+x²))}. If n(S) denotes the number of elements in S then:",
    "options": [
      "n(S) = 2 and only one element in S is less then 1/2",
      "n(S) = 1 and the element in S is more than 1/2",
      "n(S) = 1 and the element in S is less then 1/2",
      "n(S) = 0"
    ],
    "answer": "n(S) = 1 and the element in S is less then 1/2"
  },
  {
    "section": "Mathematics",
    "content": "Let f: R - {0, 1} → R be a function such that f(x) + f(1/(1-x)) = 1+x. Then f(2) is equal to:",
    "options": [
      "9/2",
      "9/4",
      "7/4",
      "7/3"
    ],
    "answer": "9/4"
  },
  {
    "section": "Mathematics",
    "content": "If y(x) = x^x, x > 0, then y''(2) - 2y'(2) is equal to:",
    "options": [
      "8 logₑ2 - 2",
      "4 logₑ2 + 2",
      "4(logₑ2)² - 2",
      "4(logₑ2)² + 2"
    ],
    "answer": "4(logₑ2)² + 2"
  },
  {
    "section": "Mathematics",
    "content": "The sum of the absolute maximum and minimum values of the function f(x) = |x² - 5x + 6| - 3x + 2 in the interval [-1, 3] is equal to:",
    "options": [
      "10",
      "12",
      "13",
      "24"
    ],
    "answer": "13"
  },
  {
    "section": "Mathematics",
    "content": "The value of the integral ∫ (from -π/4 to π/4) of (x + π/4) / (2 - cos(2x)) dx is:",
    "options": [
      "π² / 6",
      "π² / (12√3)",
      "π² / (3√3)",
      "π² / (6√3)"
    ],
    "answer": "π² / (6√3)"
  },
  {
    "section": "Mathematics",
    "content": "If ∫ (from 0 to π) of (5^cos(x) * (1 + cos(x)cos(3x) + cos²(x) + cos³(x)cos(3x))) / (1 + 5^cos(x)) dx = kπ / 16, then k is equal to ___.",
    "options": [],
    "answer": "13"
  },
  {
    "section": "Mathematics",
    "content": "The area of the region given by {(x, y) : xy ≤ 8, 1 ≤ y ≤ x²} is:",
    "options": [
      "8 logₑ2 - 13/3",
      "16 logₑ2 - 14/3",
      "8 logₑ2 + 7/6",
      "16 logₑ2 + 7/3"
    ],
    "answer": "16 logₑ2 - 14/3"
  },
  {
    "section": "Mathematics",
    "content": "Let αx = exp(x^β y^γ) be the solution of the differential equation 2x²y dy - (1 - xy²) dx = 0, x > 0, y(2) = √(logₑ2). Then α + β - γ equals:",
    "options": [
      "1",
      "-1",
      "0",
      "3"
    ],
    "answer": "3"
  },
  {
    "section": "Mathematics",
    "content": "Let a = 5i - j - 3k and b = i + 3j + 5k be two vectors. Then which one of the following statements is TRUE?",
    "options": [
      "Projection of a on b is -13/√35 and the direction of the projection vector is opposite to the direction of b.",
      "Projection of a on b is -17/√35 and the direction of the projection vector is opposite to the direction of b.",
      "Projection of a on b is 17/√35 and the direction of the projection vector is opposite to the direction of b.",
      "Projection of a on b is 13/√35 and the direction of the projection vector is opposite to the direction of a."
    ],
    "answer": "Projection of a on b is -13/√35 and the direction of the projection vector is opposite to the direction of b."
  },
  {
    "section": "Mathematics",
    "content": "Let a = 2i - 7j + 5k, b = i + k and c = i + 2j - 3k be three given vectors. If r is a vector such that r × a = c × a and r · b = 0, then |r| is equal to:",
    "options": [
      "(11/7)√2",
      "11/7",
      "(11/5)√2",
      "√914 / 7"
    ],
    "answer": "(11/7)√2"
  },
  {
    "section": "Mathematics",
    "content": "Let the plane P pass through the intersection of the planes 2x + 3y - z = 2 and x + 2y + 3z = 6, and be perpendicular to the plane 2x + y - z + 1 = 0. If d is the distance of P from the point (-7, 1, 1), then d² is equal to:",
    "options": [
      "250/83",
      "15/53",
      "25/83",
      "250/82"
    ],
    "answer": "250/83"
  },
  {
    "section": "Mathematics",
    "content": "Let αx + βy + γz = 1 be the equation of a plane passing through the point (3, -2, 5) and perpendicular to the line joining the points (1, 2, 3) and (-2, 3, 5). Then the value of |αβγ| is equal to ___.",
    "options": [],
    "answer": "6"
  },
  {
    "section": "Mathematics",
    "content": "The point of intersection C of the plane 8x + y + 2z = 0 and the line joining the points A(-3, -6, 1) and B(2, 4, -3) divides the line segment AB internally in the ratio k:1. If a, b, c (a, b, c are coprime) are the direction ratios of the perpendicular from the point C on the line (1-x)/1 = (y+4)/2 = (z+2)/3, then |a + b + c| is equal to ___.",
    "options": [],
    "answer": "10"
  },
  {
    "section": "Mathematics",
    "content": "Two dice are thrown independently. Let A be the event that the number appeared on the 1st die is less than the number appeared on the 2nd die, B be the event that the number appeared on the 1st die is even and that on the second die is odd, and C be the event that the number appeared on the 1st die is odd and that on the 2nd is even. Then:",
    "options": [
      "The number of favourable cases of the event (A ∪ B) ∩ C is 6",
      "A and B are mutually exclusive",
      "The number of favourable cases of the events A, B and C are 15, 6 and 6 respectively",
      "B and C are independent"
    ],
    "answer": "The number of favourable cases of the event (A ∪ B) ∩ C is 6"
  }
        ],
        
  3:[
{
    "section": "Physics",
    "question_number": 1,
    "content": "Two resistance are given as \\(R_{1}=(10\\pm0.5)\\) and \\(R_{2}=(15\\pm0.5)\\) Ω. The percentage error in the measurement of equivalent resistance when they are connected in parallel is",
    "options": [
      "6.33",
      "2.33",
      "5.33",
      "4.33"
    ],
    "answer": "4.33"
  },
  {
    "section": "Physics",
    "question_number": 2,
    "content": "A particle is moving with constant speed in a circular path. When the particle turns by an angle 90°, the ratio of instantaneous velocity to its average velocity is π: \\(x\\sqrt{2}\\). The value of x will be",
    "options": [
      "2",
      "5",
      "1",
      "7"
    ],
    "answer": "2"
  },
  {
    "section": "Physics",
    "question_number": 3,
    "content": "Given below are two statements: one is labelled as Assertion A and the other is labelled as Reason R.<br>Assertion A: When a body is projected at an angle 45°, its range is maximum.<br>Reason R: For maximum range, the value of sin 2θ should be equal to one.<br>In the light of the above statements, choose the correct answer from the options given below:",
    "options": [
      "A is false but R is true",
      "A is true but R is false",
      "Both A and R are correct and R is the correct explanation of A",
      "Both A and R are correct but R is NOT the correct explanation of A"
    ],
    "answer": "Both A and R are correct and R is the correct explanation of A"
  },
  {
    "section": "Physics",
    "question_number": 4,
    "content": "A mass m is attached to two springs as shown in figure. The spring constants of two springs are \\(K_{1}\\) and \\(K_{2}\\). For the frictionless surface, the time period of oscillation of mass m is<br><div class='flex justify-center my-4'><img src='images/3/q4.png' alt='Physics Question 4'></div>",
    "options": [
      "2π \\( \\frac{K_{1}+K_{2}}{m} \\)",
      "\\(\\frac{1}{2\\pi}\\sqrt{\\frac{K_{1}\\cdot K_{2}}{m}}\\)",
      "\\(2\\pi\\sqrt{\\frac{m}{k_{1}\\cdot k_{2}}}\\)",
      "\\(\\frac{1}{2\\pi}\\sqrt{\\frac{k_{1}+k_{2}}{m}}\\)"
    ],
    "answer": "2π \\( \\frac{K_{1}+K_{2}}{m} \\)"
  },
  {
    "section": "Physics",
    "question_number": 5,
    "content": "A small block of mass 100 g is tied to a spring of spring constant 7.5 N \\(m^{-1}\\) and length 20 cm. The other end of spring is fixed at a particular point A. If the block moves in a circular path on a smooth horizontal surface with constant angular velocity 5 rad \\(s^{-1}\\) point A, then tension in the spring is<br><div class='flex justify-center my-4'><img src='images/3/q5.png' alt='Physics Question 5'></div>",
    "options": [
      "0.75 N",
      "0.25 N",
      "0.50 N",
      "1.5 N"
    ],
    "answer": "0.75 N"
  },
  {
    "section": "Physics",
    "question_number": 6,
    "content": "A planet has double the mass of the earth. Its average density is equal to that of the earth. An object weighing W on earth will weigh on that planet:",
    "options": [
      "\\(2^{\\frac{1}{4}}W\\)",
      "\\(2^{\\frac{1}{3}}W\\)",
      "2W",
      "\\(2^{\\frac{2}{3}}W\\)"
    ],
    "answer": "\\(2^{\\frac{1}{3}}W\\)"
  },
  {
    "section": "Physics",
    "question_number": 7,
    "content": "Given below are two statements: one is labelled as Assertion A and the other is labelled as Reason R.<br>Assertion A: Earth has atmosphere whereas moon doesn't have any atmosphere.<br>Reason R: The escape velocity on moon is very small as compared to that on earth.<br>In the light of the above statements, choose the correct answer from the options given below:",
    "options": [
      "Both A and R are correct but R is NOT the correct explanation of A",
      "A is false but R is true",
      "Both A and R are correct and R is the correct explanation of A",
      "A is true but R is false"
    ],
    "answer": "Both A and R are correct and R is the correct explanation of A"
  },
  {
    "section": "Physics",
    "question_number": 8,
    "content": "A small ball of mass M and density ρ is dropped in a viscous liquid of density \\(\\rho_{0}\\). After some time, the ball falls with a constant velocity. What is the viscous force on the ball?",
    "options": [
      "\\(F=Mg(1+\\frac{\\rho_{0}}{\\rho})\\)",
      "\\(F=Mg(1+\\frac{\\rho}{\\rho_{0}})\\)",
      "\\(F=Mg(1-\\frac{\\rho_{0}}{\\rho})\\)",
      "\\(F=Mg(1\\pm\\rho\\rho_{0})\\)"
    ],
    "answer": "\\(F=Mg(1-\\frac{\\rho_{0}}{\\rho})\\)"
  },
  {
    "section": "Physics",
    "question_number": 9,
    "content": "A source supplies heat to a system at the rate of 1000 W. If the system performs work at a rate of 200 W. The rate at which internal energy of the system increases is",
    "options": [
      "600 W",
      "800 W",
      "500 W",
      "1200 W"
    ],
    "answer": "800 W"
  },
  {
    "section": "Physics",
    "question_number": 10,
    "content": "The number of air molecules per \\(cm^{3}\\) is increased from \\(3\\times10^{19}\\) to \\(12\\times10^{19}\\). The ratio of collision frequency of air molecules before and after the increase in number respectively is:",
    "options": [
      "0.75",
      "1.25",
      "0.50",
      "0.25"
    ],
    "answer": "0.25"
  },
  {
    "section": "Physics",
    "question_number": 11,
    "content": "For a uniformly charged thin spherical shell, the electric potential V radially away from the centre O of shell can be graphically represented as<br><div class='flex justify-center my-4'><img src='images/3/q11.png' alt='Physics Question 11'></div>",
    "options": [
      "Graph 1",
      "Graph 2",
      "Graph 3",
      "Graph 4"
    ],
    "answer": "Graph 2"
  },
  {
    "section": "Physics",
    "question_number": 12,
    "content": "A long straight wire of circular cross-section (radius a) is carrying steady current I. The current I is uniformly distributed across this cross-section. The magnetic field is",
    "options": [
      "inversely proportional to r in the region \\(r<a\\) and uniform throughout in the region \\(r>a\\)",
      "directly proportional to r in the region \\(r<a\\) and inversely proportional to r in the region \\(r>a\\)",
      "Zero in the region \\(r<a\\) and inversely proportional to r in the region \\(r>a\\)",
      "uniform in the region \\(r<a\\) and inversely proportional to distance r from the axis, in the region \\(r>a\\)"
    ],
    "answer": "directly proportional to r in the region \\(r<a\\) and inversely proportional to r in the region \\(r>a\\)"
  },
  {
    "section": "Physics",
    "question_number": 13,
    "content": "The induced emf can be produced in a coil by<br>A. moving the coil with uniform speed inside uniform magnetic field<br>B. moving the coil with non uniform speed inside uniform magnetic field<br>C. rotating the coil inside the uniform magnetic field<br>D. changing the area of the coil inside the uniform magnetic field<br>Choose the correct answer from the options given below:",
    "options": [
      "B and C only",
      "A and C only",
      "C and D only",
      "B and D only"
    ],
    "answer": "C and D only"
  },
  {
    "section": "Physics",
    "question_number": 14,
    "content": "For the plane electromagnetic wave given by \\(E=E_{0}sin(\\omega t-kx)\\) and \\(B=B_{0}sin(\\omega t-kx)\\), the ratio of average electric energy density to average magnetic energy density is",
    "options": [
      "1/2",
      "2",
      "4",
      "1"
    ],
    "answer": "1"
  },
  {
    "section": "Physics",
    "question_number": 15,
    "content": "A monochromatic light wave with wavelength \\(\\lambda_{1}\\) and frequency \\(v_{1}\\) in air enters another medium. If the angle of incidence and angle of refraction at the interface are \\(45^{\\circ}\\) and \\(30^{\\circ}\\) respectively, then the wavelength \\(\\lambda_{2}\\) and frequency \\(v_{2}\\) of the refracted wave are:",
    "options": [
      "\\(\\lambda_{2}=\\sqrt{2}\\lambda_{1}, v_{2}=v_{1}\\)",
      "\\(\\lambda_{2}=\\lambda_{1}, v_{2}=\\frac{1}{\\sqrt{2}}v_{1}\\)",
      "\\(\\lambda_{2}=\\lambda_{1}, v_{2}=\\sqrt{2}v_{1}\\)",
      "\\(\\lambda_{2}=\\frac{1}{\\sqrt{2}}\\lambda_{1}, v_{2}=v_{1}\\)"
    ],
    "answer": "\\(\\lambda_{2}=\\frac{1}{\\sqrt{2}}\\lambda_{1}, v_{2}=v_{1}\\)"
  },
  {
    "section": "Physics",
    "question_number": 16,
    "content": "The kinetic energy of an electron, a particle and a proton are given as 4K, 2K and K respectively. The de-Broglie wavelength associated with electron (\\(\\lambda_{e}\\)), α-particle (\\(\\lambda_{\\alpha}\\)) and the proton (\\(\\lambda_{p}\\)) are as follows:",
    "options": [
      "\\(\\lambda_{\\alpha}=\\lambda_{p}>\\lambda_{e}\\)",
      "\\(\\lambda_{\\alpha}<\\lambda_{p}<\\lambda_{e}\\)",
      "\\(\\lambda_{\\alpha}=\\lambda_{p}<\\lambda_{e}\\)",
      "\\(\\lambda_{\\alpha}>\\lambda_{p}>\\lambda_{e}\\)"
    ],
    "answer": "\\(\\lambda_{\\alpha}<\\lambda_{p}<\\lambda_{e}\\)"
  },
  {
    "section": "Physics",
    "question_number": 17,
    "content": "The energy levels of an hydrogen atom are shown below. The transition corresponding to emission of shortest wavelength is<br><div class='flex justify-center my-4'><img src='images/3/q17.png' alt='Physics Question 17'></div>",
    "options": [
      "D",
      "A",
      "B",
      "C"
    ],
    "answer": "D"
  },
  {
    "section": "Physics",
    "question_number": 18,
    "content": "Name the logic gate equivalent to the diagram attached<br><div class='flex justify-center my-4'><img src='images/3/q18.png' alt='Physics Question 18'></div>",
    "options": [
      "NAND",
      "AND",
      "NOR",
      "OR"
    ],
    "answer": "NOR"
  },
  {
    "section": "Physics",
    "question_number": 19,
    "content": "The resistivity (ρ) of semiconductor varies with temperature. Which of the following curve represents the correct behaviour?",
    "options": [
      "Graph 1",
      "Graph 2",
      "Graph 3",
      "Graph 4"
    ],
    "answer": "Graph 3"
  },
  {
    "section": "Physics",
    "question_number": 20,
    "content": "By what percentage will the transmission range of a TV tower be affected when the height of the tower is increased by 21%?",
    "options": [
      "15%",
      "12%",
      "10%",
      "14%"
    ],
    "answer": "10%"
  },
  {
    "section": "Physics",
    "question_number": 21,
    "content": "The length of a metallic wire is increased by 20% and its area of cross-section is reduced by 4%. The percentage change in resistance of the metallic wire is",
    "options": [],
    "answer": "25"
  },
  {
    "section": "Physics",
    "question_number": 22,
    "content": "A particle of mass 10 g moves in a straight line with retardation 2x, where x is the displacement in SI units. Its loss of kinetic energy for above displacement is \\(\\frac{10}{x}^{-n}\\). The value of n will be",
    "options": [],
    "answer": "2"
  },
  {
    "section": "Physics",
    "question_number": 23,
    "content": "Two identical solid spheres each of mass 2 kg and radii 10 cm are fixed at the ends of a light rod. The separation between the centres of the spheres is 40 cm. The moment of inertia of the system about an axis perpendicular to the rod passing through its middle point is ___ \\(\\times10^{-3}\\) kg m².",
    "options": [],
    "answer": "176"
  },
  {
    "section": "Physics",
    "question_number": 24,
    "content": "A steel rod has a radius of 20 mm and a length of 2.0 m. A force of 62.8 kN stretches it along its length. Young's modulus of steel is \\(2.0\\times10^{11}N\\) m². The longitudinal strain produced in the wire is ___ \\(\\times10^{-5}\\).",
    "options": [],
    "answer": "25"
  },
  {
    "section": "Physics",
    "question_number": 25,
    "content": "A person driving car at a constant speed of 15 m \\(s^{-1}\\) is approaching a vertical wall. The person notices a change of 40 Hz in the frequency of his car's horn upon reflection from the wall. The frequency of horn is ___ Hz. (Given: Speed of sound: 30 m \\(s^{-1}\\))",
    "options": [],
    "answer": "420"
  },
  {
    "section": "Physics",
    "question_number": 26,
    "content": "A parallel plate capacitor with plate area A and plate separation d is filled with a dielectric material of dielectric constant \\(K=4\\). The thickness of the dielectric material is x, where \\(x<d\\). Let \\(C_{1}\\) and \\(C_{2}\\) be the capacitance of the system for \\(x=\\frac{1}{3}d\\) and \\(x=\\frac{2d}{3}\\) respectively. If \\(C_{1}=2\\) µF, the value of \\(C_{2}\\) is<br><div class='flex justify-center my-4'><img src='images/3/q26.png' alt='Physics Question 26'></div>",
    "options": [
      "\\(2\\mu F\\)",
      "\\(4\\mu F\\)",
      "\\(3\\mu F\\)",
      "\\(5\\mu F\\)"
    ],
    "answer": "\\(3\\mu F\\)"
  },
  {
    "section": "Physics",
    "question_number": 27,
    "content": "Two identical circular wires of radius 20 cm and carrying current \\(\\sqrt{2}A\\) are placed in perpendicular planes as shown in figure. The net magnetic field at the centre of the circular wires is ___ \\(\\times10^{-8}T.\\) (Take \\(\\pi=3.14\\))<br><div class='flex justify-center my-4'><img src='images/3/q27.png' alt='Physics Question 27'></div>",
    "options": [],
    "answer": "628"
  },
  {
    "section": "Physics",
    "question_number": 28,
    "content": "An ideal transformer with purely resistive load operates at 12 kV on the primary side. It supplies electrical energy to a number of nearby houses at 120 V. The average rate of energy consumption in the houses served by the transformer is 60 kW. The value of resistive load (\\(R_{s}\\)) required in the secondary circuit will be ___ mΩ.",
    "options": [],
    "answer": "240"
  },
  {
    "section": "Physics",
    "question_number": 29,
    "content": "A pole is vertically submerged in swimming pool, such that it gives a length of shadow 2.15 m within water when sunlight is incident at an angle of \\(30^{\\circ}\\) with the surface of water. If swimming pool is filled to a height of 1.5 m, then the height of the pole above the water surface in centimeters is ___ (\\(n_{w}=\\frac{4}{3}\\))",
    "options": [],
    "answer": "50"
  },
  {
    "section": "Physics",
    "question_number": 30,
    "content": "The radius of fifth orbit of \\(Li^{++}\\) is ___ \\(\\times10^{-12}\\) m. Take: radius of hydrogen atom = 0.51 A",
    "options": [],
    "answer": "425"
  },
  {
    "section": "Chemistry",
    "question_number": 31,
    "content": "For a concentrated solution of a weak electrolyte (\\(K_{eq}\\)= equilibrium constant) \\(A_{2}B_{3}\\) of concentration 'C', the degree of dissociation 'a' is",
    "options": [
      "\\( (\\frac{K_{eq}}{C^{4}})^{\\frac{1}{5}} \\)",
      "\\( (\\frac{K_{eq}}{108C^{4}})^{\\frac{1}{5}} \\)",
      "\\( (\\frac{K_{eq}}{25C^{2}})^{\\frac{1}{5}} \\)",
      "\\( (\\frac{K_{eq}}{6C^{5}})^{\\frac{1}{5}} \\)"
    ],
    "answer": "\\( (\\frac{K_{eq}}{108C^{4}})^{\\frac{1}{5}} \\)"
  },
  {
    "section": "Chemistry",
    "question_number": 32,
    "content": "Which of the following options are correct for the reaction? \\(2Au{(CN)_{2}}^{-}(aq)+Zn(s)\\rightarrow2Au(s)+Zn(CN)_{4}^{2-}(aq)\\)<br>A. Redox reaction<br>B. Displacement reaction<br>C. Decomposition reaction<br>D. Combination reaction",
    "options": [
      "A only",
      "A and D only",
      "A and B only",
      "C and D only"
    ],
    "answer": "A and B only"
  },
  {
    "section": "Chemistry",
    "question_number": 33,
    "content": "Strong reducing and oxidizing agents among the following, respectively, are",
    "options": [
      "\\(Ce^{3+}\\) and \\(Ce^{4+}\\)",
      "\\(Ce^{4+}\\) and \\(Tb^{4+}\\)",
      "\\(Ce^{4+}\\) and \\(Eu^{2+}\\)",
      "\\(Eu^{2+}\\) and \\(Ce^{4+}\\)"
    ],
    "answer": "\\(Eu^{2+}\\) and \\(Ce^{4+}\\)"
  },
  {
    "section": "Chemistry",
    "question_number": 34,
    "content": "Given below are two statements, one is labelled as Assertion A and the other is labelled as Reason R.<br>Assertion A: Loss of electron from hydrogen atom results in nucleus of \\(\\sim1.5\\times10^{-3}\\) pm size.<br>Reason R: Proton \\(H^{+}\\) always exists in combined form.<br>In the light of the above statements, choose the most appropriate answer from the options given below:",
    "options": [
      "Both A and R are correct and R is the correct explanation of A",
      "A is correct but R is not correct",
      "A is not correct but R is correct",
      "Both A and R are correct but R is NOT the correct explanation of A"
    ],
    "answer": "Both A and R are correct but R is NOT the correct explanation of A"
  },
  {
    "section": "Chemistry",
    "question_number": 35,
    "content": "The setting time of Cement is increased by adding",
    "options": [
      "Clay",
      "Silica",
      "Gypsum",
      "Limestone"
    ],
    "answer": "Gypsum"
  },
  {
    "section": "Chemistry",
    "question_number": 36,
    "content": "Match List-I with List-II.<br>List-I (Element detected)<br>A Nitrogen<br>B Sulphur<br>C Phosphorus<br>D Halogen<br>List-II (Reagent used/Product formed)<br>I \\(Na_{2}[Fe(CN)_{5}NO]\\)<br>II \\(AgNO_{3}\\)<br>III \\(Fe_{4}[Fe(CN)_{6}]_{3}\\)<br>IV \\((NH_{4})_{2}MoO_{4}\\)",
    "options": [
      "A-III; B-I; C-IV; D-II",
      "A-II; B-IV; C-I; D-III",
      "A-IV; B-II; C-I; D-III",
      "A-II; B-I; C-IV; D-III"
    ],
    "answer": "A-III; B-I; C-IV; D-II"
  },
  {
    "section": "Chemistry",
    "question_number": 37,
    "content": "The possibility of photochemical smog formation is more at",
    "options": [
      "Marshy lands",
      "Industrial areas",
      "Himalayan villages in winter",
      "The places with healthy vegetation"
    ],
    "answer": "Industrial areas"
  },
  {
    "section": "Chemistry",
    "question_number": 38,
    "content": "A compound is formed by two elements X and Y. The element Y forms cubic close packed arrangement and those of element X occupy one third of the tetrahedral voids. What is the formula of the compound?",
    "options": [
      "\\(X_{2}Y_{3}\\)",
      "\\(X_{3}Y_{2}\\)",
      "\\(X_{3}Y\\)",
      "\\(XY_{3}\\)"
    ],
    "answer": "\\(X_{2}Y_{3}\\)"
  },
  {
    "section": "Chemistry",
    "question_number": 39,
    "content": "The standard electrode potential of \\(M^{+}/M\\) in aqueous solution does not depend on",
    "options": [
      "Hydration of a gaseous metal ion",
      "Sublimation of a solid metal",
      "Ionisation of a solid metal atom",
      "Ionisation of a gaseous metal atom"
    ],
    "answer": "Ionisation of a solid metal atom"
  },
  {
    "section": "Chemistry",
    "question_number": 40,
    "content": "Match List I with List II<br>LIST I (Enzymatic reaction)<br>A Sucrose -> Glucose and Fructose<br>B Glucose -> ethyl alcohol and \\(CO_{2}\\)<br>C Starch -> Maltose<br>D Proteins -> Amino acids<br>LIST II (Enzyme)<br>I Zymase<br>II Pepsin<br>III Invertase<br>IV Diastase",
    "options": [
      "A-I, B-II, C-IV, D-III",
      "A-III, B-I, C-IV, D-II",
      "A-III, B-I, C-II, D-IV",
      "A-I, B-IV, C-III, D-II"
    ],
    "answer": "A-III, B-I, C-IV, D-II"
  },
  {
    "section": "Chemistry",
    "question_number": 41,
    "content": "The difference between electron gain enthalpies will be maximum between :",
    "options": [
      "Ne and F",
      "Ar and F",
      "Ne and Cl",
      "Ar and Cl"
    ],
    "answer": "Ne and Cl"
  },
  {
    "section": "Chemistry",
    "question_number": 42,
    "content": "Match List I with List II<br>List I (Oxide)<br>A \\(N_{2}O_{4}\\)<br>B \\(NO_{2}\\)<br>C \\(N_{2}O_{5}\\)<br>D \\(N_{2}O\\)<br>List II (Type of bond)<br>I 1 N=O bond<br>II 1 N-O-N bond<br>III 1 N-N bond<br>IV 1 N=N/N bond",
    "options": [
      "A-III, B-I, C-II, D-IV",
      "A-II, B-IV, C-III, D-I",
      "A-III, B-I, C-IV, D-II",
      "A-II, B-I, C-III, D-IV"
    ],
    "answer": "A-III, B-I, C-II, D-IV"
  },
  {
    "section": "Chemistry",
    "question_number": 43,
    "content": "Match List-I with List-II.<br>List-I (Name of reaction)<br>A Hell-Volhard Zelinsky reaction<br>B Iodoform reaction<br>C Etard reaction<br>D Gatterman-Koch reaction<br>List-II (Reagent used)<br>I NaOH + \\(I_{2}\\)<br>II (i) \\(CrO_{2}Cl_{2}\\), \\(CS_{2}\\) (ii) \\(H_{2}O\\)<br>III (i) \\(Br_{2}/red\\) phosphorus (ii) \\(H_{2}O\\)<br>IV CO, HCl, anhyd. \\(AlCl_{3}\\)",
    "options": [
      "A-III; B-I; C-II; D-IV",
      "A-I; B-II; C-III; D-IV",
      "A-III; B-II; C-I; D-IV",
      "A-III; B-I; C-IV; D-II"
    ],
    "answer": "A-III; B-I; C-II; D-IV"
  },
  {
    "section": "Chemistry",
    "question_number": 44,
    "content": "Given below are two statements, one is labelled as Assertion A and the other is labelled as Reason R.<br>Assertion A: The spin only magnetic moment value for \\(Fe(CN)_{6}^{3-}\\) is 1.74 BM, whereas for \\([Fe(H_2O)_6]^{3+}\\) is 5.92 BM.<br>Reason R: In both complexes, Fe is present in +3 oxidation state.<br>In the light of the above statements, choose the correct answer from the options given below:",
    "options": [
      "A is false but R is true",
      "A is true but R is false",
      "Both A and R are true but R is NOT the correct explanation of A",
      "Both A and R are true and R is the correct explanation of A"
    ],
    "answer": "Both A and R are true but R is NOT the correct explanation of A"
  },
  {
    "section": "Chemistry",
    "question_number": 45,
    "content": "For the reaction Acetone \\(RCH_{2}Br+I^{-}\\rightarrow RCH_{2}I+Br^{-}\\), The correct statement is",
    "options": [
      "\\(Br^{-}\\) can act as competing nucleophile.",
      "The reaction can occur in acetic acid also.",
      "The transition state formed in the above reaction is less polar than the localised anion.",
      "The solvent used in the reaction solvates the ions formed in rate determining step"
    ],
    "answer": "The transition state formed in the above reaction is less polar than the localised anion."
  },
  {
    "section": "Chemistry",
    "question_number": 46,
    "content": "The major products A and B from the following reactions are:<br><div class='flex justify-center my-4'><img src='images/3/q46.png' alt='Chemistry Question 46'></div>",
    "options": [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4"
    ],
    "answer": "Option 3"
  },
  {
    "section": "Chemistry",
    "question_number": 47,
    "content": "The major product formed in the following reaction is<br><div class='flex justify-center my-4'><img src='images/3/q47.png' alt='Chemistry Question 47'></div>",
    "options": [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4"
    ],
    "answer": "Option 2"
  },
  {
    "section": "Chemistry",
    "question_number": 48,
    "content": "Compound P (M.F. \\(C_{14}H_{13}ON\\)) -> Hydrolysis -> Q + R. Q gives effervescence with \\(NaHCO_{3}\\) while R reacts with Hinsberg's reagent to give solid soluble in NaOH. Compound P is<br><div class='flex justify-center my-4'><img src='images/3/q48.png' alt='Chemistry Question 48'></div>",
    "options": [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4"
    ],
    "answer": "Option 4"
  },
  {
    "section": "Chemistry",
    "question_number": 49,
    "content": "Polymer used in orlon is:",
    "options": [
      "Polyethene",
      "Polycarbonate",
      "Polyamide",
      "Polyacrylonitrile"
    ],
    "answer": "Polyacrylonitrile"
  },
  {
    "section": "Chemistry",
    "question_number": 50,
    "content": "Match List I and List II<br>List I (Vitamin)<br>A Vitamin A<br>B Thiamine<br>C Ascorbic acid<br>D Riboflavin<br>List II (Deficiency disease)<br>I Beri-Beri<br>II Cheilosis<br>III Xerophthalmia<br>IV Scurvy",
    "options": [
      "A-III, B-I, C-IV, D-II",
      "A-IV, B-I, C-III, D-II",
      "A-IV, B-II, C-III, D-I",
      "A-III, B-II, C-IV, D-I"
    ],
    "answer": "A-III, B-I, C-IV, D-II"
  },
  {
    "section": "Chemistry",
    "question_number": 51,
    "content": "If 5 moles of \\(BaCl_{2}\\) is mixed with 2 moles of \\(Na_{3}PO_{4},\\) the maximum number of moles of \\(Ba_{3}(PO_{4})_{2}\\) formed is (Nearest integer)",
    "options": [],
    "answer": "1"
  },
  {
    "section": "Chemistry",
    "question_number": 52,
    "content": "The wavelength of an electron of kinetic energy \\(4.50\\times10^{-29}\\) J is ___ \\(\\times10^{-5}\\) m. (Nearest integer) Given: mass of electron is \\(9\\times10^{-31}\\) kg, \\(h=6.6\\times10^{-34}\\) Js",
    "options": [],
    "answer": "7"
  },
  {
    "section": "Chemistry",
    "question_number": 53,
    "content": "The number of species from the following which have square pyramidal structure is: \\(PF_{5}, BrF_{4}^{-}, IF_{5}, BrF_{5}, XeOF_{4}, ICl_{4}^{-}\\)",
    "options": [],
    "answer": "3"
  },
  {
    "section": "Chemistry",
    "question_number": 54,
    "content": "The value of log K for the reaction \\(A\\rightleftharpoons B\\) at 298 K is ___ (Nearest integer). Given: \\(\\Delta H^{\\circ}=-54.07~kJ~mol^{-1}\\), \\(\\Delta S^{\\circ}=10~JK^{-1}mol^{-1}\\). (Taken \\(2.303\\times8.314\\times298=5705\\))",
    "options": [],
    "answer": "10"
  },
  {
    "section": "Chemistry",
    "question_number": 55,
    "content": "Consider the graph of Gibbs free energy G vs extent of reaction. The number of statement/s from the following which are true with respect to points (a), (b) and (c) is<br><div class='flex justify-center my-4'><img src='images/3/q55.png' alt='Chemistry Question 55'></div>",
    "options": [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4"
    ],
    "answer": "2"
  },
  {
    "section": "Chemistry",
    "question_number": 56,
    "content": "Number of bromo derivatives obtained on treating ethane with excess of \\(Br_{2}\\) in diffused sunlight is",
    "options": [],
    "answer": "9"
  },
  {
    "section": "Chemistry",
    "question_number": 57,
    "content": "Mass of Urea \\(NH_{2}CONH_{2}\\) required to be dissolved in 1000 g of water in order to reduce the vapour pressure of water by 25% is ___ g. (Nearest integer)",
    "options": [],
    "answer": "1111"
  },
  {
    "section": "Chemistry",
    "question_number": 58,
    "content": "For the adsorption of hydrogen on platinum, the activation energy is 30 kJ mol⁻¹ and for the adsorption of hydrogen on nickel, the activation energy is 41.4 kJ mol⁻¹. The logarithm of the ratio of the rates of chemisorption on equal areas of the metals at 300 K is ___ (Nearest integer) Given: \\(ln~10=2.3\\), \\(R=8.3\\) J K⁻¹ mol⁻¹",
    "options": [],
    "answer": "2"
  },
  {
    "section": "Chemistry",
    "question_number": 59,
    "content": "In ammonium - phosphomolybdate, the oxidation state of Mo is +___",
    "options": [],
    "answer": "6"
  },
  {
    "section": "Chemistry",
    "question_number": 60,
    "content": "Number of ambidentate ligands in a representative metal complex \\([M(en)(SCN)_{4}]\\) is ___",
    "options": [],
    "answer": "4"
  },
  {
    "section": "Mathematics",
    "question_number": 61,
    "content": "The sum of all the roots of the equation \\(|x^{2}-8x+15|-2x+7=0\\) is",
    "options": [
      "\\(9-\\sqrt{3}\\)",
      "\\(9+\\sqrt{3}\\)",
      "\\(11-\\sqrt{3}\\)",
      "\\(11+\\sqrt{3}\\)"
    ],
    "answer": "\\(9+\\sqrt{3}\\)"
  },
  {
    "section": "Mathematics",
    "question_number": 62,
    "content": "The sum of the first 20 terms of the series \\(5+11+19+29+41+...\\) is",
    "options": [
      "3520",
      "3450",
      "3250",
      "3420"
    ],
    "answer": "3520"
  },
  {
    "section": "Mathematics",
    "question_number": 63,
    "content": "Let \\(a_{1},a_{2},a_{3},....,a_{n}\\) be n positive consecutive terms of an arithmetic progression. If \\(d>0\\) is its common difference, then \\(\\lim_{n\\rightarrow\\infty}\\sqrt{\\frac{d}{n}}(\\frac{1}{\\sqrt{a_{1}}+\\sqrt{a_{2}}}+\\frac{1}{\\sqrt{a_{2}}+\\sqrt{a_{3}}}+...+\\frac{1}{\\sqrt{a_{n-1}}+\\sqrt{a_{n}}})\\) is",
    "options": [
      "\\(\\frac{1}{\\sqrt{a}}\\)",
      "\\(\\sqrt{d}\\)",
      "1",
      "2"
    ],
    "answer": "1"
  },
  {
    "section": "Mathematics",
    "question_number": 64,
    "content": "If the ratio of the fifth term from the beginning to the fifth term from the end in the expansion of \\((\\sqrt[4]{2}+\\frac{1}{\\sqrt[4]{3}})^{n}\\) is \\(\\sqrt{6}:1\\), then the third term from the beginning is:",
    "options": [
      "\\(30\\sqrt{2}\\)",
      "\\(30\\sqrt{3}\\)",
      "\\(60\\sqrt{2}\\)",
      "\\(60\\sqrt{3}\\)"
    ],
    "answer": "\\(60\\sqrt{3}\\)"
  },
  {
    "section": "Mathematics",
    "question_number": 65,
    "content": "If \\({}^{2n}C_{3} : {}^{n}C_{3}=10:1,\\) then the ratio \\(n^{2}+3n:n^{2}-3n+4\\) is",
    "options": [
      "35:16",
      "27:11",
      "65:37",
      "2:1"
    ],
    "answer": "2:1"
  },
  {
    "section": "Mathematics",
    "question_number": 66,
    "content": "The straight lines \\(l_{1}\\) and \\(l_{2}\\) pass through the origin and trisect the line segment of the line L: \\(9x+5y=45\\) between the axes. If \\(m_{1}\\) and \\(m_{2}\\) are the slopes of the lines \\(l_{1}\\) and \\(l_{2},\\) then the point of intersection of the line \\(y=(m_{1}+m_{2})x\\) with L lies on",
    "options": [
      "\\(y-2x=5\\)",
      "\\(6x+y=10\\)",
      "\\(y-x=5\\)",
      "\\(6x-y=15\\)"
    ],
    "answer": "\\(y-x=5\\)"
  },
  {
    "section": "Mathematics",
    "question_number": 67,
    "content": "Statement \\((P\\Rightarrow Q)\\wedge(R\\Rightarrow Q)\\) is logically equivalent to",
    "options": [
      "\\(P\\Rightarrow (R\\vee Q)\\Rightarrow R\\)",
      "\\((P\\wedge R)\\Rightarrow Q\\)",
      "\\((P\\Rightarrow R)\\wedge (Q\\Rightarrow R)\\)",
      "\\((P\\vee R)\\Rightarrow Q\\)"
    ],
    "answer": "\\((P\\vee R)\\Rightarrow Q\\)"
  },
  {
    "section": "Mathematics",
    "question_number": 68,
    "content": "The mean and variance of a set of 15 numbers are 12 and 14 respectively. The mean and variance of another set of 15 numbers are 14 and \\(\\sigma^{2}\\) respectively. If the variance of all the 30 numbers in the two sets is 13, then \\(\\sigma^{2}\\) is equal to",
    "options": [
      "10",
      "11",
      "9",
      "12"
    ],
    "answer": "10"
  },
  {
    "section": "Mathematics",
    "question_number": 69,
    "content": "From the top A of a vertical wall AB of height 30 m, the angles of depression of the top P and bottom Q of a vertical tower PQ are \\(15^{\\circ}\\) and \\(60^{\\circ}\\) respectively, B and Q are on the same horizontal level. If C is a point on AB such that \\(CB=PQ\\) then the area (in \\(m^{2}\\)) of the quadrilateral BCPQ is equal to",
    "options": [
      "\\(300(\\sqrt{3}-1)\\)",
      "\\(300(\\sqrt{3}+1)\\)",
      "\\(600(\\sqrt{3}-1)\\)",
      "\\(200(\\sqrt{3}-1)\\)"
    ],
    "answer": "\\(600(\\sqrt{3}-1)\\)"
  },
  {
    "section": "Mathematics",
    "question_number": 70,
    "content": "Let \\(A=[a_{ij}]_{2\\times2}\\) where \\(a_{ij}\\ne0\\) for all i, j and \\(A^{2}=I\\). Let a be the sum of all diagonal elements of A and \\(b=det(A)\\). Then \\(3a^{2}+4b^{2}\\) is equal to",
    "options": [
      "4",
      "14",
      "7",
      "3"
    ],
    "answer": "4"
  },
  {
    "section": "Mathematics",
    "question_number": 71,
    "content": "If the system of equations \\(x+y+az=b\\), \\(2x+5y+2z=6\\), \\(x+2y+3z=3\\) has infinitely many solutions, then \\(2a+3b\\) is equal to",
    "options": [
      "25",
      "20",
      "23",
      "28"
    ],
    "answer": "23"
  },
  {
    "section": "Mathematics",
    "question_number": 72,
    "content": "Let \\(5f(x)+4f(\\frac{1}{x})=\\frac{1}{x}+3,\\) \\(x>0\\). Then \\(18 \\int_{1}^{2}f(x)dx\\) is equal to",
    "options": [
      "\\(5~log_{e}2+3\\)",
      "\\(10~log_{e}2+6\\)",
      "\\(10~log_{e}2-6\\)",
      "\\(5~log_{e}2-3\\)"
    ],
    "answer": "\\(10~log_{e}2-6\\)"
  },
  {
    "section": "Mathematics",
    "question_number": 73,
    "content": "Let \\(A=\\{x\\in\\mathbb{R}:|x+3|+|x+4|\\le3\\}\\), \\(B=\\{x\\in\\mathbb{R}:3^{x}\\sum_{r=1}^{\\infty}(\\frac{3}{10})^{r}<3^{-3x}\\}\\). Then,",
    "options": [
      "\\(B\\subset C\\), \\(A\\ne B\\)",
      "\\(A\\cap B=\\phi\\)",
      "\\(A\\subset B\\)",
      "\\(A=B\\)"
    ],
    "answer": "\\(A=B\\)"
  },
  {
    "section": "Mathematics",
    "question_number": 74,
    "content": "If \\(x^{y}+3y^{x}=20\\), then \\(\\frac{dy}{dx}\\) at (2, 2) is equal to:",
    "options": [
      "\\(-\\frac{2+log_{e}8}{3+log_{e}4}\\)",
      "\\(-\\frac{3+log_{e}16}{4+log_{e}8}\\)",
      "\\(-\\frac{3+log_{e}8}{2+log_{e}4}\\)",
      "\\(-\\frac{3+log_{e}4}{2+log_{e}8}\\)"
    ],
    "answer": "\\(-\\frac{2+log_{e}8}{3+log_{e}4}\\)"
  },
  {
    "section": "Mathematics",
    "question_number": 75,
    "content": "Let \\(I(x)=\\int\\frac{x^{2}(x~sec^{2}x+tanx)}{(x~tanx+1)^{2}}dx\\). If \\(I(0)=0\\) then \\(I(\\frac{\\pi}{4})\\) is equal to",
    "options": [
      "\\(log_{e}\\frac{(\\pi+4)^{2}}{16}+\\frac{\\pi^{2}}{4(\\pi+4)}\\)",
      "\\(log_{e}\\frac{(\\pi+4)^{2}}{16}-\\frac{\\pi^{2}}{4(\\pi+4)}\\)",
      "\\(log_{e}\\frac{(\\pi+4)^{2}}{32}-\\frac{\\pi^{2}}{4(\\pi+4)}\\)",
      "\\(log_{e}\\frac{(\\pi+4)^{2}}{32}+\\frac{\\pi^{2}}{4(\\pi+4)}\\)"
    ],
    "answer": "\\(log_{e}\\frac{(\\pi+4)^{2}}{32}-\\frac{\\pi^{2}}{4(\\pi+4)}\\)"
  },
  {
    "section": "Mathematics",
    "question_number": 76,
    "content": "Let the position vectors of the points A, B, C and D be \\(5\\hat{i}+5\\hat{j}+2\\lambda\\hat{k}\\), \\(\\hat{i} + 2\\hat{j} + 3\\hat{k}\\), \\(- 2\\hat{i} + \\lambda\\hat{j} + 4\\hat{k}\\) and \\(-\\hat{i}+5\\hat{j}+6\\hat{k}\\). Let the set \\(S=\\{\\lambda\\in\\mathbb{R}:\\) the points A, B, C and D are coplanar}. The \\(\\sum_{\\lambda\\in S}(\\lambda+2)^{2}\\) is equal to",
    "options": [
      "25",
      "37/2",
      "14",
      "41"
    ],
    "answer": "41"
  },
  {
    "section": "Mathematics",
    "question_number": 77,
    "content": "Let \\(\\vec{a}=2\\hat{i}+3\\hat{j}+4\\hat{k}\\), \\(\\vec{b}=\\hat{i}-2\\hat{j}-2\\hat{k}\\) and \\(\\vec{c}=-\\hat{i}+4\\hat{j}+3\\hat{k}\\). If \\(\\vec{d}\\) is a vector perpendicular to both \\(\\vec{b}\\) and \\(\\vec{c}\\), and \\(\\vec{a}\\cdot\\vec{d}=18\\), then \\(|\\vec{a}\\times\\vec{d}|^{2}\\) is equal to",
    "options": [
      "640",
      "680",
      "720",
      "760"
    ],
    "answer": "720"
  },
  {
    "section": "Mathematics",
    "question_number": 78,
    "content": "One vertex of a rectangular parallelopiped is at the origin O and the lengths of its edges along x, y and z axes are 3, 4 and 5 units respectively. Let P be the vertex (3, 4, 5). Then the shortest distance between the diagonal OP and an edge parallel to z axis, not passing through O or P is",
    "options": [
      "\\(\\frac{12}{\\sqrt{5}}\\)",
      "\\(12\\sqrt{5}\\)",
      "\\(\\frac{12}{5\\sqrt{5}}\\)",
      "\\(\\frac{12}{5}\\)"
    ],
    "answer": "\\(\\frac{12}{5}\\)"
  },
  {
    "section": "Mathematics",
    "question_number": 79,
    "content": "If the equation of the plane passing through the line of intersection of the planes \\(2x-y+z=3\\), \\(4x-3y+5z+9=0\\) and parallel to the line \\(\\frac{x+1}{-2}=\\frac{y+3}{4}=\\frac{z-2}{5}\\) is \\(ax+by+cz+6=0\\), then \\(a+b+c\\) is equal to",
    "options": [
      "12",
      "14",
      "16",
      "13"
    ],
    "answer": "14"
  },
  {
    "section": "Mathematics",
    "question_number": 80,
    "content": "A pair of dice is thrown 5 times. For each throw, a total of 5 is considered a success. If the probability of at least 4 successes is \\(\\frac{k}{3^{11}}\\), then k is equal to",
    "options": [
      "82",
      "75",
      "164",
      "123"
    ],
    "answer": "123"
  },
  {
    "section": "Mathematics",
    "question_number": 81,
    "content": "The number of ways of giving 20 distinct oranges to 3 children such that each child gets at least one orange is",
    "options": [],
    "answer": "171"
  },
  {
    "section": "Mathematics",
    "question_number": 82,
    "content": "The coefficient of \\(x^{18}\\) in the expansion of \\((x^{4}-\\frac{1}{x^{3}})^{15}\\) is",
    "options": [],
    "answer": "5005"
  },
  {
    "section": "Mathematics",
    "question_number": 83,
    "content": "A circle passing through the point P(a, b) in the first quadrant touches the two coordinate axes at the points A and B. The point P is above the line AB. The point Q on the line segment AB is the foot of perpendicular from P on AB. If PQ is equal to 11 units, then the value of ab is",
    "options": [],
    "answer": "121"
  },
  {
    "section": "Mathematics",
    "question_number": 84,
    "content": "Let the point (p, p+1) lie inside the region \\(E = \\{(x,y): 3-x\\le y\\le\\sqrt{9-x^{2}}, 0\\le x\\le3\\}\\). If the set of all values of p is the interval [a, b], then \\(b^{2}+b-a^{2}\\) is equal to",
    "options": [],
    "answer": "3"
  },
  {
    "section": "Mathematics",
    "question_number": 85,
    "content": "Let \\(A=\\{1,2,3,4,..........10\\}\\) and \\(B=\\{0,1,2,3,4\\}\\). The number of elements in the relation \\(R=\\{(a,b)\\in A\\times A:2(a-b)^{2}+3(a-b)\\in B\\}\\) is",
    "options": [],
    "answer": "18"
  },
  {
    "section": "Mathematics",
    "question_number": 86,
    "content": "Let \\(a\\in\\mathbb{Z}\\) and [t] be the greatest integer \\(\\le t\\) then the number of points, where the function \\(f(x)=[a+13\\sin x]\\), \\(x\\in(0, \\pi)\\) is not differentiable, is",
    "options": [],
    "answer": "25"
  },
  {
    "section": "Mathematics",
    "question_number": 87,
    "content": "Let the tangent to the curve \\(x^{2}+2x-4y+9=0\\) at the point P(1, 3) on it meet the y-axis at A. Let the line passing through P and parallel to the line \\(x-3y=6\\) meet the parabola \\(y^{2}=4x\\) at B. If B lies on the line \\(2x-3y=8,\\) then \\(AB^{2}\\) is equal to",
    "options": [],
    "answer": "292"
  },
  {
    "section": "Mathematics",
    "question_number": 88,
    "content": "If the area of the region \\(S=\\{(x,y): |y-x|\\le x^{2}\\le2y, x\\ge y\\}\\) is equal to \\(\\frac{n+2}{n+1}-\\frac{\\pi}{n-1}\\), then the natural number n is equal to",
    "options": [],
    "answer": "5"
  },
  {
    "section": "Mathematics",
    "question_number": 89,
    "content": "Let \\(y=y(x)\\) be a solution of the differential equation \\((x\\cos x)dy+(xy\\sin x+y\\cos x-1)dx=0,0<x<\\frac{\\pi}{2}\\). If \\(\\frac{\\pi}{3}y(\\frac{\\pi}{3})=\\sqrt{3},\\) then \\(\\frac{\\pi}{6}y(\\frac{\\pi}{6})+2y(\\frac{\\pi}{6})\\) is equal to",
    "options": [],
    "answer": "2"
  },
  {
    "section": "Mathematics",
    "question_number": 90,
    "content": "Let the image of the point \\(P(1,2,3)\\) in the plane \\(2x-y+z=9\\) be Q. If the coordinates of the point R are (6, 10, 7), then the square of the area of the triangle PQR is",
    "options": [],
    "answer": "594"
  }
  ],  
  4: [{
    "section": "Physics",
    "question_number": 1,
    "content": "A particle starts with an initial velocity of \\(10.0~ms^{-1}\\) along x-direction and accelerates uniformly at the rate of 2.0 m \\(s^{-2}\\). The time taken by the particle to reach the velocity of \\(60.0~m~s^{-1}\\) is",
    "options": [
      "25 s",
      "3 s",
      "6 s",
      "30 s"
    ],
    "answer": "25 s"
  },
  {
    "section": "Physics",
    "question_number": 2,
    "content": "As shown in the figure, a particle is moving with constant speed \\(\\pi~m~s^{-1}\\). Considering its motion from A to B, the magnitude of the average velocity is:<br><div class='flex justify-center my-4'><img src='images/4/q2.png' alt='Physics Question 2'></div>",
    "options": [
      "\\(\\sqrt{3}ms^{-1}\\)",
      "\\(\\pi~ms^{-1}\\)",
      "\\(1.5\\sqrt{3}ms^{-1}\\)",
      "\\(2\\sqrt{3}ms^{-1}\\)"
    ],
    "answer": "\\(1.5\\sqrt{3}ms^{-1}\\)"
  },
  {
    "section": "Physics",
    "question_number": 3,
    "content": "A child of mass 5 kg is going round a merry-go-round that makes 1 rotation in 3.14 s. The radius of the merry-go-round is 2 m. The centrifugal force on the child will be",
    "options": [
      "80 N",
      "40 N",
      "100 N",
      "50 N"
    ],
    "answer": "40 N"
  },
  {
    "section": "Physics",
    "question_number": 4,
    "content": "A small particle of mass m moves in such a way that its potential energy \\(U=\\frac{1}{2}m\\omega^{2}r^{2}\\) where \\(\\omega\\) is constant and r is the distance of the particle from origin. Assuming Bohr's quantization of momentum and circular orbit, the radius of \\(n^{th}\\) orbit will be proportional to",
    "options": [
      "\\(\\sqrt{n}\\)",
      "\\(\\frac{1}{n}\\)",
      "\\(n^{2}\\)",
      "n"
    ],
    "answer": "\\(\\sqrt{n}\\)"
  },
  {
    "section": "Physics",
    "question_number": 5,
    "content": "A body is dropped on ground from a height \\(h_{1}\\) and after hitting the ground, it rebounds to a height \\(h_{2}\\). If the ratio of velocities of the body just before and after hitting ground is 4, then percentage loss in kinetic energy of the body is \\(\\frac{x}{4}\\). The value of x is",
    "options": [
      "300",
      "325",
      "375",
      "400"
    ],
    "answer": "375"
  },
  {
    "section": "Physics",
    "question_number": 6,
    "content": "A ring and a solid sphere rotating about an axis passing through their centres have same radii of gyration. The axis of rotation is perpendicular to plane of ring. The ratio of radius of ring to that of sphere is \\(\\sqrt{\\frac{2}{x}}.\\) The value of x is",
    "options": [
      "3",
      "5",
      "2",
      "4"
    ],
    "answer": "5"
  },
  {
    "section": "Physics",
    "question_number": 7,
    "content": "The weight of a body on the surface of the earth is 100 N. The gravitational force on it when taken at a height, from the surface of earth, equal to one-fourth the radius of the earth is:",
    "options": [
      "64 N",
      "25 N",
      "50 N",
      "100 N"
    ],
    "answer": "64 N"
  },
  {
    "section": "Physics",
    "question_number": 8,
    "content": "Choose the incorrect statement from the following:",
    "options": [
      "The speed of satellite in a given circular orbit remains constant",
      "For a planet revolving around the sun in elliptical orbit, the total energy of the planet remains constant",
      "The linear speed of a planet revolving around the sun remains constant",
      "When a body falls towards earth, the displacement of earth towards the body is negligible"
    ],
    "answer": "The linear speed of a planet revolving around the sun remains constant"
  },
  {
    "section": "Physics",
    "question_number": 9,
    "content": "A metal block of mass m is suspended from a rigid support through a metal wire of diameter 14 mm. The tensile stress developed in the wire under equilibrium state is \\(7\\times10^{5}N~m^{-2}\\). The value of mass m is ___ kg. (Take \\(g=9.8~m~s^{-2}\\) and \\(\\pi=\\frac{22}{7})\\)",
    "options": [],
    "answer": "11"
  },
  {
    "section": "Physics",
    "question_number": 10,
    "content": "Given below are two statements: one is labelled as Assertion A and the other is labelled as Reason R<br>Assertion A: When you squeeze one end of a tube to get toothpaste out from the other end, Pascal's principle is observed.<br>Reason R: A change in the pressure applied to an enclosed incompressible fluid is transmitted undiminished to every portion of the fluid and to the walls of its container.<br>In the light of the above statements, choose the most appropriate answer from the options given below.",
    "options": [
      "Both A and R are correct but R is NOT the correct explanation of A",
      "A is not correct but R is correct",
      "A is correct but R is not correct",
      "Both A and R is correct and R is the correct explanation of A"
    ],
    "answer": "Both A and R is correct and R is the correct explanation of A"
  },
  {
    "section": "Physics",
    "question_number": 11,
    "content": "A body cools in 7 minutes from \\(60^{\\circ}C\\) to \\(40^{\\circ}C\\). The temperature of the surrounding is \\(10^{\\circ}C\\). The temperature of the body after the next 7 minutes will be",
    "options": [
      "\\(28^{\\circ}C\\)",
      "\\(32^{\\circ}C\\)",
      "\\(34^{\\circ}C\\)",
      "\\(30^{\\circ}C\\)"
    ],
    "answer": "\\(28^{\\circ}C\\)"
  },
  {
    "section": "Physics",
    "question_number": 12,
    "content": "The temperature of an ideal gas is increased from 200 K to 800 K. If r.m.s. speed of gas at 200 K is \\(v_{0}\\). Then, r.m.s. speed of the gas at 800 K will be:",
    "options": [
      "\\(\\frac{v_{0}}{4}\\)",
      "\\(v_{0}\\)",
      "\\(4v_{0}\\)",
      "\\(2v_{0}\\)"
    ],
    "answer": "\\(2v_{0}\\)"
  },
  {
    "section": "Physics",
    "question_number": 13,
    "content": "A simple pendulum with length 100 cm and bob of mass 250 g is executing S.H.M of amplitude 10 cm. The maximum tension in the string is found to be \\(\\frac{x}{40}N.\\) The value of x is",
    "options": [],
    "answer": "101"
  },
  {
    "section": "Physics",
    "question_number": 14,
    "content": "The ratio of speed of sound in hydrogen gas to the speed of sound in oxygen gas at the same temperature is:",
    "options": [
      "4:1",
      "1:1",
      "1:4",
      "1:2"
    ],
    "answer": "4:1"
  },
  {
    "section": "Physics",
    "question_number": 15,
    "content": "A dipole comprises of two charged particles of identical magnitude q and opposite in nature. The mass m of the positive charged particle is half of the mass of the negative charged particle. The two charges are separated by a distance l. If the dipole is placed in a uniform electric field \\(\\vec{E}\\) in such a way that dipole axis makes a very small angle with the electric field, \\(\\vec{E}\\). The angular frequency of the oscillations of the dipole when released is given by:",
    "options": [
      "\\(\\sqrt{\\frac{3qE}{2ml}}\\)",
      "\\(\\sqrt{\\frac{8qE}{ml}}\\)",
      "\\(\\sqrt{\\frac{4qE}{mL}}\\)",
      "\\(\\sqrt{\\frac{8qE}{3ml}}\\)"
    ],
    "answer": "\\(\\sqrt{\\frac{3qE}{2ml}}\\)"
  },
  {
    "section": "Physics",
    "question_number": 16,
    "content": "Experimentally it is found that 12.8 eV energy is required to separate a hydrogen atom into a proton and an electron. So the orbital radius of the electron in a hydrogen atom is \\(\\frac{9}{x}\\times10^{-10}\\) m. The value of the x is: (\\(1~eV=1.6\\times10^{-19}J\\), and electronic charge \\(=1.6\\times10^{-19}C\\)) \\(\\frac{1}{4\\pi\\epsilon_{0}}=9\\times10^{9}\\frac{Nm^{2}}{C^{2}}\\)",
    "options": [],
    "answer": "16"
  },
  {
    "section": "Physics",
    "question_number": 17,
    "content": "As shown in the figure, two parallel plate capacitors having equal plate area of 200 cm² are joined in such a way that \\(a\\ne b\\). The equivalent capacitance of the combination is \\(x\\epsilon_{0}F\\). The value of x is<br><div class='flex justify-center my-4'><img src='images/4/q17.png' alt='Physics Question 17'></div>",
    "options": [],
    "answer": "5"
  },
  {
    "section": "Physics",
    "question_number": 18,
    "content": "A student is provided with a variable voltage source V, a test resistor \\(R_{T}=10\\Omega\\) two identical galvanometers \\(G_{1}\\) and \\(G_{2}\\) and two additional resistors, \\(R_{1}=10M\\Omega\\) and \\(R_{2}=0.001\\Omega\\). For conducting an experiment to verify ohm's law, the most suitable circuit is:<br><div class='flex justify-center my-4'><img src='images/4/q18.png' alt='Physics Question 18'></div>",
    "options": [
      "Circuit 1",
      "Circuit 2",
      "Circuit 3",
      "Circuit 4"
    ],
    "answer": "Circuit 3"
  },
  {
    "section": "Physics",
    "question_number": 19,
    "content": "Figure shows a part of an electric circuit. The potentials at points a, b and c are 30 V, 12 V and 2 V respectively. The current through the 20 Ω resistor will be,<br><div class='flex justify-center my-4'><img src='images/4/q19.png' alt='Physics Question 19'></div>",
    "options": [
      "1.0 A",
      "0.4 A",
      "0.6 A",
      "0.2 A"
    ],
    "answer": "0.4 A"
  },
  {
    "section": "Physics",
    "question_number": 20,
    "content": "As shown in the figure the voltmeter reads 2 V across 5 Ω resistor. The resistance of the voltmeter is ___ Ω<br><div class='flex justify-center my-4'><img src='images/4/q20.png' alt='Physics Question 20'></div>",
    "options": [],
    "answer": "20"
  },
  {
    "section": "Physics",
    "question_number": 21,
    "content": "A proton with a kinetic energy of 2.0 eV moves into a region of uniform magnetic field of magnitude \\(\\frac{\\pi}{2}\\times10^{-3}T\\). The angle between the direction of magnetic field and velocity of proton is \\(60^{\\circ}.\\) The pitch of the helical path taken by the proton is ___ cm. (Take, mass of proton \\(=1.6\\times10^{-27}\\) kg and charge on proton \\(=1.6\\times10^{-19}C\\)).",
    "options": [],
    "answer": "40"
  },
  {
    "section": "Physics",
    "question_number": 22,
    "content": "Two concentric circular coils with radii 1 cm and 1000 cm and number of turns 10 and 200 respectively are placed coaxially with centers coinciding. The mutual inductance of this arrangement will be ___ \\(\\times10^{-8}\\) H. (Take, \\(\\pi^{2}=10\\))",
    "options": [],
    "answer": "4"
  },
  {
    "section": "Physics",
    "question_number": 23,
    "content": "A capacitor of capacitance 150.0 µF is connected to an alternating source of emf given by \\(E=36~sin(120\\pi t)\\) V. The maximum value of current in the circuit is approximately equal to:",
    "options": [
      "2 A",
      "\\(\\sqrt{2}A\\)",
      "\\(2\\sqrt{2}A\\)",
      "\\(\\frac{1}{\\sqrt{2}}A\\)"
    ],
    "answer": "2 A"
  },
  {
    "section": "Physics",
    "question_number": 24,
    "content": "The energy density associated with electric field \\(\\vec{E}\\) and magnetic field \\(\\vec{B}\\) of an electromagnetic wave in free space is given by (\\(\\epsilon_{0} -\\) permittivity of free space, \\(\\mu_{0}-\\) permeability of free space)",
    "options": [
      "\\(U_{E}=\\frac{E^{2}}{2\\epsilon_{0}}, U_{B}=\\frac{B^{2}}{2\\mu_{0}}\\)",
      "\\(U_{E}=\\frac{\\epsilon_{0}E^{2}}{2}, U_{B}=\\frac{B^{2}}{2\\mu_{0}}\\)",
      "\\(U_{E}=\\frac{\\epsilon_{0}E^{2}}{2}, U_{B}=\\frac{\\mu_{0}B^{2}}{2}\\)",
      "\\(U_{E}=\\frac{E^{2}}{2\\epsilon_{0}}, U_{B}=\\frac{\\mu_{0}B^{2}}{2}\\)"
    ],
    "answer": "\\(U_{E}=\\frac{\\epsilon_{0}E^{2}}{2}, U_{B}=\\frac{B^{2}}{2\\mu_{0}}\\)"
  },
  {
    "section": "Physics",
    "question_number": 25,
    "content": "A 2 meter long scale with least count of 0.2 cm is used to measure the locations of objects on an optical bench. While measuring the focal length of a convex lens, the object pin and the convex lens are placed at 80 cm mark and 1 m mark, respectively. The image of the object pin on the other side of lens coincides with image pin that is kept at 180 cm mark. The % error in the estimation of focal length is:",
    "options": [
      "0.85",
      "1.70",
      "1.02",
      "0.51"
    ],
    "answer": "0.85"
  },
  {
    "section": "Physics",
    "question_number": 26,
    "content": "Given below are two statements: one is labelled as Assertion A and the other is labelled as Reason R<br>Assertion A: The phase difference of two light waves change if they travel through different media having same thickness, but different indices of refraction.<br>Reason R: The wavelengths of waves are different in different media.<br>In the light of the above statements, choose the most appropriate answer from the options given below",
    "options": [
      "Both A and R are correct but R is NOT the correct explanation of A",
      "A is not correct but R is correct",
      "A is correct but R is not correct",
      "Both A and R are correct and R is the correct explanation of A"
    ],
    "answer": "Both A and R are correct and R is the correct explanation of A"
  },
  {
    "section": "Physics",
    "question_number": 27,
    "content": "A beam of light consisting of two wavelengths 7000 \\(\\mathring{A}\\) and 5500 \\(\\mathring{A}\\) is used to obtain interference pattern in Young's double slit experiment. The distance between the slits is 2.5 mm and the distance between the plane of slits and the screen is 150 cm. The least distance from the central fringe, where the bright fringes due to both the wavelengths coincide, is \\(n\\times10^{-5}\\) m. The value of n is",
    "options": [],
    "answer": "462"
  },
  {
    "section": "Physics",
    "question_number": 28,
    "content": "The work functions of Aluminium and Gold are 4.1 eV and 5.1 eV respectively. The ratio of the slope of the stopping potential versus frequency plot for Gold to that of Aluminium is",
    "options": [
      "1.24",
      "2",
      "1",
      "1.5"
    ],
    "answer": "1"
  },
  {
    "section": "Physics",
    "question_number": 29,
    "content": "Given below are two statements: one is labelled as Assertion A and the other is labelled as Reason R<br>Assertion A: Diffusion current in a \\(p-n\\) junction is greater than the drift current in magnitude if the junction is forward biased.<br>Reason R: Diffusion current in a \\(p-n\\) junction is form the n-side to the p-side if the junction is forward biased.<br>In the light of the above statements, choose the most appropriate answer from the options given below.",
    "options": [
      "Both A and R are correct but R is NOT the correct explanation of A",
      "A is correct but R is not correct",
      "A is not correct but R is correct",
      "Both A and R is correct and R is the correct explanation of A"
    ],
    "answer": "A is correct but R is not correct"
  },
  {
    "section": "Physics",
    "question_number": 30,
    "content": "For an amplitude modulated wave the minimum amplitude is 3 V, while the modulation index is 60%. The maximum amplitude of the modulated wave is:",
    "options": [
      "5 V",
      "15 V",
      "12 V",
      "10 V"
    ],
    "answer": "12 V"
  },
  {
    "section": "Chemistry",
    "question_number": 31,
    "content": "If the radius of the first orbit of hydrogen atom is \\(a_{0}\\), then de Broglie's wavelength of electron in 3rd orbit is",
    "options": [
      "\\(\\frac{\\pi a_{0}}{6}\\)",
      "\\(\\frac{\\pi a_{0}}{3}\\)",
      "\\(6\\pi a_{0}\\)",
      "\\(3\\pi a_{0}\\)"
    ],
    "answer": "\\(6\\pi a_{0}\\)"
  },
  {
    "section": "Chemistry",
    "question_number": 32,
    "content": "Which one of the following elements will remain as liquid inside pure boiling water?",
    "options": [
      "Ga",
      "Br",
      "Li",
      "Cs"
    ],
    "answer": "Ga"
  },
  {
    "section": "Chemistry",
    "question_number": 33,
    "content": "Group-13 elements react with \\(O_{2}\\) in amorphous form to form oxides of type \\(M_{2}O_{3}\\) (M = element). Which among the following is the most basic oxide?",
    "options": [
      "\\(Al_{2}O_{3}\\)",
      "\\(B_{2}O_{3}\\)",
      "\\(Tl_{2}O_{3}\\)",
      "\\(Ga_{2}O_{3}\\)"
    ],
    "answer": "\\(Tl_{2}O_{3}\\)"
  },
  {
    "section": "Chemistry",
    "question_number": 34,
    "content": "The number of species having a square planar shape from the following is: \\(XeF_{4}, SF_{4}, SiF_{4}, BF_{4}^{-}, BrF_{4}^{-}, [Cu(NH_{3})_{4}]^{2+}, [FeCl_{4}]^{2-}, [PtCl_{4}]^{2-}\\)",
    "options": [],
    "answer": "4"
  },
  {
    "section": "Chemistry",
    "question_number": 35,
    "content": "In an ice crystal, each water molecule is hydrogen bonded to ___ neighbouring molecules.",
    "options": [],
    "answer": "4"
  },
  {
    "section": "Chemistry",
    "question_number": 36,
    "content": "Consider the following data<br>Heat of combustion of \\(H_{2}(g)=-241.8~kJ~mol^{-1}\\)<br>Heat of combustion of \\(C(s)=-393.5~kJ~mol^{-1}\\)<br>Heat of combustion of \\(C_{2}H_{5}OH(l)=-1234.7~kJ~mol^{-1}\\)<br>The heat of formation of \\(C_{2}H_{5}OH(l)\\) is (-) ___ kJ mol⁻¹ (Nearest integer).",
    "options": [],
    "answer": "278"
  },
  {
    "section": "Chemistry",
    "question_number": 37,
    "content": "The equilibrium composition for the reaction \\(PCl_{3}+Cl_{2}\\rightleftharpoons PCl_{5}\\) at 298 K is given below: \\([PCl_{3}]_{eq}=0.2\\) mol \\(L^{-1}\\), \\([Cl_{2}]_{eq}=0.1\\) mol \\(L^{-1}\\), \\([PCl_{5}]_{eq}=0.40\\) mol \\(L^{-1}\\). If 0.2 mol of \\(Cl_{2}\\) is added at the same temperature, the equilibrium concentrations of \\(PCl_{5}\\) is ___ \\(\\times10^{-2}\\) mol \\(L^{-1}\\). Given: \\(K_{c}\\) for the reaction at 298 K is 20",
    "options": [],
    "answer": "49"
  },
  {
    "section": "Chemistry",
    "question_number": 38,
    "content": "During the reaction of permanganate with thiosulphate, the change in oxidation of manganese occurs by value of 3. Identify which of the below medium will favour the reaction.",
    "options": [
      "Both aqueous acidic and neutral",
      "Aqueous neutral",
      "Both aqueous acidic and faintly alkaline",
      "Aqueous acidic"
    ],
    "answer": "Aqueous neutral"
  },
  {
    "section": "Chemistry",
    "question_number": 39,
    "content": "The volume of 0.02 M aqueous HBr required to neutralize 10.0 mL of 0.01 M aqueous \\(Ba(OH)_{2}\\) is (Assume complete neutralization)",
    "options": [
      "2.5 mL",
      "5.0 mL",
      "10.0 mL",
      "7.5 mL"
    ],
    "answer": "10.0 mL"
  },
  {
    "section": "Chemistry",
    "question_number": 40,
    "content": "Ion having highest hydration enthalpy among the given alkaline earth metal ions is:",
    "options": [
      "\\(Be^{2+}\\)",
      "\\(Sr^{2+}\\)",
      "\\(Ba^{2+}\\)",
      "\\(Ca^{2+}\\)"
    ],
    "answer": "\\(Be^{2+}\\)"
  },
  {
    "section": "Chemistry",
    "question_number": 41,
    "content": "Structures of \\(BeCl_{2}\\) in solid state, vapour phase and at very high temperature respectively are:",
    "options": [
      "Monomeric, Dimeric, Polymeric",
      "Dimeric, Polymeric, Monomeric",
      "Polymeric, Monomeric, Dimeric",
      "Polymeric, Dimeric, Monomeric"
    ],
    "answer": "Polymeric, Dimeric, Monomeric"
  },
  {
    "section": "Chemistry",
    "question_number": 42,
    "content": "From the figure of column chromatography given below, identify incorrect statements.<br><div class='flex justify-center my-4'><img src='images/4/q42.png' alt='Chemistry Question 42'></div><br>A. Compound 'c' is more polar than 'a' and 'b'<br>B. Compound 'a' is least polar<br>C. Compound 'b' comes out of the column before 'c' and after 'a'<br>D. Compound 'a' spends more time in the column<br>Choose the correct answer from the options given below",
    "options": [
      "A, B and D only",
      "A, B and C only",
      "B and D only",
      "B, C and D only"
    ],
    "answer": "B and D only"
  },
  {
    "section": "Chemistry",
    "question_number": 43,
    "content": "The strongest acid from the following is",
    "options": [
      "Option 1: m-nitrophenol",
      "Option 2: m-cresol",
      "Option 3: m-chlorophenol",
      "Option 4: Phenol"
    ],
    "answer": "Option 1: m-nitrophenol"
  },
  {
    "section": "Chemistry",
    "question_number": 44,
    "content": "The group of chemicals used as pesticide is",
    "options": [
      "Aldrin, Sodium Chlorate, Sodium arsinite",
      "DDT, Aldrin",
      "Sodium chlorate, DDT, PAN",
      "Dieldrin, Sodium arsinite, Tetrachloroethene"
    ],
    "answer": "DDT, Aldrin"
  },
  {
    "section": "Chemistry",
    "question_number": 45,
    "content": "Number of crystal systems from the following where body centred unit cell can be found, is: Cubic, tetragonal, orthorhombic, hexagonal, rhombohedral, monoclinic, triclinic",
    "options": [],
    "answer": "3"
  },
  {
    "section": "Chemistry",
    "question_number": 46,
    "content": "Consider the following pairs of solution which will be isotonic at the same temperature. The number of pairs of solutions is/are<br>A. 1 M aq. NaCl and 2 M aq. urea<br>B. 1 M aq. \\(CaCl_{2}\\) and 1.5 M aq. KCl<br>C. 1.5 M aq. \\(AlCl_{3}\\) and 2 M aq. \\(Na_{2}SO_{4}\\)<br>D. 2.5 M aq. KCl and 1 M aq. \\(Al_{2}(SO_{4})_{3}\\)",
    "options": [],
    "answer": "4"
  },
  {
    "section": "Chemistry",
    "question_number": 47,
    "content": "The product, which is not obtained during the electrolysis of brine solution is",
    "options": [
      "\\(H_{2}\\)",
      "HCl",
      "NaOH",
      "\\(Cl_{2}\\)"
    ],
    "answer": "HCl"
  },
  {
    "section": "Chemistry",
    "question_number": 48,
    "content": "The standard reduction potentials at 295 K for the following half cells are given below:<br>\\(NO_{3}^{-}+4H^{+}+3e^{-}\\rightarrow NO(g)+2H_{2}O\\) E = 0.97 V<br>\\(V^{2+}(aq)+2e^{-}\\rightarrow V(s)\\) E = -1.19 V<br>\\(Fe^{3+}(aq)+3e^{-}\\rightarrow Fe(s)\\) E = -0.04 V<br>\\(Ag^{+}(aq)+e^{-}\\rightarrow Ag(s)\\) E = 0.80 V<br>\\(Au^{3+}(aq)+3e^{-}\\rightarrow Au(s)\\) E = 1.40 V<br>The number of metal(s) which will be oxidised by \\(NO_{3}^{-}\\) in aqueous solution is",
    "options": [],
    "answer": "3"
  },
  {
    "section": "Chemistry",
    "question_number": 49,
    "content": "Consider the following reaction that goes from A to B in three steps as shown below:<br><div class='flex justify-center my-4'><img src='images/4/q49.png' alt='Chemistry Question 49'></div><br>Choose the correct option",
    "options": [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4"
    ],
    "answer": "Option 2"
  },
  {
    "section": "Chemistry",
    "question_number": 50,
    "content": "The number of colloidal systems from the following, which will have 'liquid' as the dispersion medium, is: Gem stones, paints, smoke, cheese, milk, hair cream, insecticide sprays, froth, soap lather",
    "options": [],
    "answer": "5"
  },
  {
    "section": "Chemistry",
    "question_number": 51,
    "content": "The IUPAC name of \\(K_{3}[Co(C_{2}O_{4})_{3}]\\) is:",
    "options": [
      "Potassium tris(oxalato) cobaltate (III)",
      "Potassium tris(oxalato) cobalt (III)",
      "Potassium trioxalatocobalt (III)",
      "Potassium trioxalatocobaltate (III)"
    ],
    "answer": "Potassium trioxalatocobaltate (III)"
  },
  {
    "section": "Chemistry",
    "question_number": 52,
    "content": "Given below are two statements: one is labelled as Assertion A and the other is labelled as Reason R<br>Assertion A: In the complex \\(Ni(CO)_{4}\\) and \\(Fe(CO)_{5}\\), the metals have zero oxidation state.<br>Reason R: Low oxidation states are found when a complex has ligands capable of \\(\\pi\\)-donor character in addition to the \\(\\sigma\\)-bonding.<br>In the light of the above statements, choose the most appropriate answer from the options given below",
    "options": [
      "A is correct but R is not correct",
      "A is not correct but R is correct",
      "Both A and R are correct but R is NOT the correct explanation of A",
      "Both A and R are correct and R is the correct explanation of A"
    ],
    "answer": "A is correct but R is not correct"
  },
  {
    "section": "Chemistry",
    "question_number": 53,
    "content": "Element not present in Nessler's reagent is",
    "options": [
      "N",
      "Hg",
      "I",
      "K"
    ],
    "answer": "N"
  },
  {
    "section": "Chemistry",
    "question_number": 54,
    "content": "In the following reaction, 'B' is<br><div class='flex justify-center my-4'><img src='images/4/q54.png' alt='Chemistry Question 54'></div>",
    "options": [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4"
    ],
    "answer": "Option 4"
  },
  {
    "section": "Chemistry",
    "question_number": 55,
    "content": "Find out the major product from the following reaction.<br><div class='flex justify-center my-4'><img src='images/4/q55.png' alt='Chemistry Question 55'></div>",
    "options": [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4"
    ],
    "answer": "Option 3"
  },
  {
    "section": "Chemistry",
    "question_number": 56,
    "content": "Among the following the number of compounds which will give positive iodoform reaction is: (a) 1-Phenylbutan-2-one, (b) 2-Methylbutan-2-ol, (c) 3-Methylbutan-2-ol, (d) 1-Phenylethanol, (e) 3, 3-dimethylbutan-2-one, (f) 1-Phenylpropan-2-ol",
    "options": [],
    "answer": "4"
  },
  {
    "section": "Chemistry",
    "question_number": 57,
    "content": "Number of isomeric aromatic amines with molecular formula \\(C_{8}H_{11}N,\\) which can be synthesized by Gabriel Phthalimide synthesis is",
    "options": [],
    "answer": "6"
  },
  {
    "section": "Chemistry",
    "question_number": 58,
    "content": "Given below are two statements:<br>Statement I: Morphine is a narcotic analgesic. It helps in relieving pain without producing sleep.<br>Statement II: Morphine and its derivatives are obtained from opium poppy.<br>In the light of the above statements, choose the correct answer from the options given below",
    "options": [
      "Both Statement I and Statement II are true",
      "Statement I is true but Statement II is false",
      "Both Statement I and Statement II are false",
      "Statement I is false but Statement II is true"
    ],
    "answer": "Statement I is false but Statement II is true"
  },
  {
    "section": "Chemistry",
    "question_number": 59,
    "content": "Formation of which complex, among the following, is not a confirmatory test of \\(Pb^{2+}\\) ions",
    "options": [
      "Lead sulphate",
      "Lead nitrate",
      "Lead chromate",
      "Lead iodide"
    ],
    "answer": "Lead nitrate"
  },
  {
    "section": "Chemistry",
    "question_number": 60,
    "content": "Match List-I with List-II.<br>List-I (Natural Amino acid): (A) Arginine, (B) Aspartic acid, (C) Asparagine, (D) Alanine<br>List-II (One Letter Code): (I) D, (II) N, (III) A, (IV) R",
    "options": [
      "(A)-IV, B-I, (C)-II, (D)-III",
      "(A)-I, B-III, (C)-IV, (D)-II",
      "(A)-III, B-I, (C)-II, (D)-IV",
      "(A)-IV, B-I, (C)-III, (D)-II"
    ],
    "answer": "(A)-IV, B-I, (C)-II, (D)-III"
  },
  {
    "section": "Mathematics",
    "question_number": 61,
    "content": "Let \\(a\\ne b\\) be two non-zero real numbers. Then the number of elements in the set \\(X=\\{z\\in C:Re(az^{2}+bz)=a\\) and \\(Re(bz^{2}+az)=b\\}\\) is equal to",
    "options": [
      "0",
      "1",
      "3",
      "2"
    ],
    "answer": "0"
  },
  {
    "section": "Mathematics",
    "question_number": 62,
    "content": "For \\(\\alpha, \\beta, z\\in\\mathbb{C}\\) and \\(\\lambda>1,\\) if \\(\\sqrt{\\lambda-1}\\) is the radius of the circle \\(|z-\\alpha|^{2}+|z-\\beta|^{2}=2\\lambda\\) then \\(|\\alpha-\\beta|\\) equal to",
    "options": [],
    "answer": "2"
  },
  {
    "section": "Mathematics",
    "question_number": 63,
    "content": "All the letters of the word PUBLIC are written in all possible orders and these words are written as in a dictionary with serial numbers. Then the serial number of the word PUBLIC is",
    "options": [
      "576",
      "578",
      "580",
      "582"
    ],
    "answer": "582"
  },
  {
    "section": "Mathematics",
    "question_number": 64,
    "content": "The number of 4-letter words, with or without meaning, each consisting of 2 vowels and 2 consonants, which can be formed from the letters of the word UNIVERSE without repetition is",
    "options": [],
    "answer": "432"
  },
  {
    "section": "Mathematics",
    "question_number": 65,
    "content": "If \\(gcd(m,n)=1\\) and \\(1^{2}-2^{2}+3^{2}-4^{2}+...+(2021)^{2}-(2022)^{2}+(2023)^{2}=1012m^{2}n\\) then \\(m^{2}-n^{2}\\) is equal to",
    "options": [
      "240",
      "200",
      "220",
      "180"
    ],
    "answer": "240"
  },
  {
    "section": "Mathematics",
    "question_number": 66,
    "content": "If \\((20)^{19}+2(21)(20)^{18}+3(21)^{2}(20)^{17}+...+20(21)^{19}=k(20)^{19},\\) then k is equal to",
    "options": [],
    "answer": "400"
  },
  {
    "section": "Mathematics",
    "question_number": 67,
    "content": "If the coefficients of \\(x^{7}\\) in \\((ax^{2}+\\frac{1}{2bx})^{11}\\) and \\(x^{-7}\\) in \\((ax-\\frac{1}{3bx^{2}})^{11}\\) are equal, then",
    "options": [
      "\\(729ab=32\\)",
      "\\(32ab=729\\)",
      "\\(64ab=243\\)",
      "\\(243ab=64\\)"
    ],
    "answer": "\\(32ab=729\\)"
  },
  {
    "section": "Mathematics",
    "question_number": 68,
    "content": "Among the statements:<br>(S1): \\(2023^{2022}-1999^{2022}\\) is divisible by 8.<br>(S2): \\(13(13)^{n}-11n-13\\) is divisible by 144 for infinitely many \\(n\\in\\mathbb{N}\\)<br>",
    "options": [
      "Only (S2) is correct",
      "Only (S1) is correct",
      "Both (S1) and (S2) are correct",
      "Both (S1) and (S2) are incorrect"
    ],
    "answer": "Only (S2) is correct"
  },
  {
    "section": "Mathematics",
    "question_number": 69,
    "content": "The value of \\(tan~9^{\\circ}-tan~27^{\\circ}-tan~63^{\\circ}+tan~81^{\\circ}\\) is",
    "options": [],
    "answer": "4"
  },
  {
    "section": "Mathematics",
    "question_number": 70,
    "content": "If the tangents at the points P and Q on the circle \\(x^{2}+y^{2}-2x+y=5\\) meet at the point \\(R(\\frac{9}{4},2)\\), then the area of the triangle PQR is",
    "options": [
      "\\(\\frac{5}{8}\\)",
      "\\(\\frac{13}{8}\\)",
      "\\(\\frac{5}{4}\\)",
      "\\(\\frac{13}{4}\\)"
    ],
    "answer": "\\(\\frac{5}{8}\\)"
  },
  {
    "section": "Mathematics",
    "question_number": 71,
    "content": "Let the eccentricity of an ellipse \\(\\frac{x^{2}}{a^{2}}+\\frac{y^{2}}{b^{2}}=1\\) is reciprocal to that of the hyperbola \\(2x^{2}-2y^{2}=1\\) If the ellipse intersects the hyperbola at right angles, then square of length of the latus-rectum of the ellipse is",
    "options": [],
    "answer": "2"
  },
  {
    "section": "Mathematics",
    "question_number": 72,
    "content": "\\(lim_{n\\rightarrow\\infty}\\{(2^{\\frac{1}{2}}-2^{\\frac{1}{3}})(2^{\\frac{1}{2^{2}}}-2^{\\frac{1}{5}})...(2^{\\frac{1}{2^{n-1}}}-2^{\\frac{1}{2n+1}})\\}\\) is equal to",
    "options": [
      "1",
      "0",
      "\\(\\sqrt{2}\\)",
      "\\(\\frac{1}{\\sqrt{2}}\\)"
    ],
    "answer": "1"
  },
  {
    "section": "Mathematics",
    "question_number": 73,
    "content": "Among the statements<br>(S1): \\((p\\Rightarrow q)\\vee((-p)\\wedge q)\\) is a tautology<br>(S2): \\((q\\Rightarrow p)\\Rightarrow((-p)\\wedge q)\\) is a contradiction",
    "options": [
      "Neither (S1) and (S2) is True",
      "Both (S1) and (S2) are True",
      "Only (S2) is True",
      "Only (S1) is True"
    ],
    "answer": "Only (S2) is True"
  },
  {
    "section": "Mathematics",
    "question_number": 74,
    "content": "If the mean and variance of the frequency distribution [x: 4, 6, 8, 10, 12, 14, 16; f: 4, 4, alpha, 15, 8, beta, 4] are 9 and 15.08 respectively, then the value of \\(\\alpha^{2}+\\beta^{2}-\\alpha\\beta\\) is",
    "options": [],
    "answer": "25"
  },
  {
    "section": "Mathematics",
    "question_number": 75,
    "content": "In a group of 100 persons 75 speak English and 40 speak Hindi. Each person speaks at least one of the two languages. If the number of persons who speak only English is \\(\\alpha\\) and the number of persons who speaks only Hindi is \\(\\beta\\), then the eccentricity of the ellipse \\(25(\\beta^{2}x^{2}+\\alpha^{2}y^{2})=\\alpha^{2}\\beta^{2}\\) is",
    "options": [
      "\\(\\frac{\\sqrt{119}}{12}\\)",
      "\\(\\frac{\\sqrt{117}}{12}\\)",
      "\\(\\frac{3\\sqrt{15}}{12}\\)",
      "\\(\\frac{\\sqrt{129}}{12}\\)"
    ],
    "answer": "\\(\\frac{\\sqrt{119}}{12}\\)"
  },
  {
    "section": "Mathematics",
    "question_number": 76,
    "content": "Let P be a square matrix such that \\(P^{2}=I-P\\). For \\(\\alpha, \\beta, \\gamma, \\delta\\in\\mathbb{N}\\), if \\(P^{\\alpha}+P^{\\beta}=\\gamma I-29P\\) and \\(P^{\\alpha}-P^{\\beta}=\\delta I-13P,\\) then \\(\\alpha+\\beta+\\gamma-\\delta\\) is equal to",
    "options": [
      "18",
      "40",
      "22",
      "24"
    ],
    "answer": "24"
  },
  {
    "section": "Mathematics",
    "question_number": 77,
    "content": "For the system of equations \\(x+y+z=6, x+2y+\\alpha z=10, x+3y+5z=\\beta,\\) which one of the following is NOT true?",
    "options": [
      "System has no solution for \\(\\alpha=3, \\beta=24\\)",
      "System has a unique solution for \\(\\alpha=-3, \\beta=14\\)",
      "System has infinitely many solutions for \\(\\alpha=3, \\beta=14\\)",
      "System has a unique solution for \\(\\alpha=3, \\beta\\ne14\\)"
    ],
    "answer": "System has a unique solution for \\(\\alpha=3, \\beta\\ne14\\)"
  },
  {
    "section": "Mathematics",
    "question_number": 78,
    "content": "Let the sets A and B denote the domain and range respectively of the function \\(f(x)=\\frac{1}{\\sqrt{[x]-x}}\\) where [x] denotes the smallest integer greater than or equal to x. Then among the statements<br>(S1): \\(A\\cap B=(1,\\infty)-\\mathbb{N}\\)<br>(S2): \\(A\\cup B=(1,\\infty)\\)",
    "options": [
      "Only (S2) is true",
      "Only (S1) is true",
      "Neither (S1) nor (S2) is true",
      "Both (S1) and (S2) are true"
    ],
    "answer": "Only (S1) is true"
  },
  {
    "section": "Mathematics",
    "question_number": 79,
    "content": "Let a curve \\(y=f(x), x\\in(0,\\infty)\\) pass through the points \\(P(1,\\frac{3}{2})\\) and \\(Q(a,\\frac{1}{2})\\). If the tangent at any point \\(R(b,f(b))\\) to the given curve cuts the y-axis at the point \\(S(0,c)\\) such that \\(bc=3\\), then \\((PQ)^{2}\\) is equal to",
    "options": [
      "5",
      "\\(\\frac{25}{4}\\)",
      "\\(\\frac{125}{2}\\)",
      "\\(\\frac{125}{8}\\)"
    ],
    "answer": "5"
  },
  {
    "section": "Mathematics",
    "question_number": 80,
    "content": "The number of points, where the curve \\(y=x^{5}-20x^{3}+50x+2\\) crosses the x-axis, is",
    "options": [],
    "answer": "5"
  },
  {
    "section": "Mathematics",
    "question_number": 81,
    "content": "Let \\(f(x)\\) be a function satisfying \\(f(x)+f(\\pi-x)=\\pi^{2},\\forall x\\in\\mathbb{R}.\\) Then \\(\\int_{0}^{\\pi}f(x)sin~x~dx\\) is equal to",
    "options": [
      "\\(\\frac{\\pi^{2}}{4}\\)",
      "\\(2\\pi^{2}\\)",
      "\\(\\pi^{2}\\)",
      "\\(\\frac{\\pi^{2}}{2}\\)"
    ],
    "answer": "\\(2\\pi^{2}\\)"
  },
  {
    "section": "Mathematics",
    "question_number": 82,
    "content": "Let \\(x\\in\\mathbb{R}-\\{-1\\}\\) \\(n\\in\\mathbb{N}, n>2\\). If \\(f^{n}(x)=(fofof....\\) up to n times) (x), then \\(lim_{n\\rightarrow\\infty}\\int_{0}^{1}x^{n-2}(f^{n}(x))dx\\) is equal to \\(\\frac{1}{\\pi}\\)",
    "options": [],
    "answer": "0"
  },
  {
    "section": "Mathematics",
    "question_number": 83,
    "content": "The area bounded by the curves \\(y=|x-1|+|x-2|\\) and \\(y=3\\) is equal to",
    "options": [
      "4",
      "6",
      "3",
      "5"
    ],
    "answer": "4"
  },
  {
    "section": "Mathematics",
    "question_number": 84,
    "content": "If the solution curve \\(f(x,y)=0\\) of the differential equation \\((1+log_{e}x)\\frac{dx}{dy}-x~log_{e}x=e^{y}, x>0\\), passes through the points (1, 0) and (a, 2), then \\(a^{a}\\) is equal to",
    "options": [
      "\\(e^{2e^{2}}\\)",
      "\\(e^{e^{2}}\\)",
      "\\(e^{\\sqrt{2e}^{2}}\\)",
      "\\(e^{2e\\sqrt{2}}\\)"
    ],
    "answer": "\\(e^{2e^{2}}\\)"
  },
  {
    "section": "Mathematics",
    "question_number": 85,
    "content": "Let the vectors \\(\\vec{a}, \\vec{b}, \\vec{c}\\) represent three coterminous edges of a parallelopiped of volume V. Then the volume of the parallelopiped, whose coterminous edges are represented by \\(\\vec{a}, \\vec{b} + \\vec{c}\\) and \\(\\vec{a}+2\\vec{b}+3\\vec{c}\\) is equal to",
    "options": [
      "2V",
      "6V",
      "V",
      "3V"
    ],
    "answer": "V"
  },
  {
    "section": "Mathematics",
    "question_number": 86,
    "content": "The sum of all values of \\(\\alpha\\), for which the points whose position vectors are \\(\\hat{i}-2\\hat{j}+3\\hat{k}, 2\\hat{i}-3\\hat{j}+4\\hat{k}, (\\alpha+1)\\hat{i}+2\\hat{k}\\) and \\(9\\hat{i}+(\\alpha-8)\\hat{j}+6\\hat{k}\\) are coplanar, is equal to",
    "options": [
      "-2",
      "2",
      "6",
      "4"
    ],
    "answer": "2"
  },
  {
    "section": "Mathematics",
    "question_number": 87,
    "content": "Let the line L pass through the point (0, 1, 2), intersect the line \\(\\frac{x-1}{2}=\\frac{y-2}{3}=\\frac{z-3}{4}\\) and be parallel to the plane \\(2x+y-3z=4.\\) Then the distance of the point \\(P(1,-9,2)\\) from the line L is",
    "options": [
      "\\(\\sqrt{74}\\)",
      "\\(\\sqrt{69}\\)",
      "\\(\\sqrt{54}\\)",
      "9"
    ],
    "answer": "9"
  },
  {
    "section": "Mathematics",
    "question_number": 88,
    "content": "A plane P contains the line of intersection of the plane \\(\\vec{r}\\cdot(\\hat{i}+\\hat{j}+\\hat{k})=6\\) and \\(\\vec{r}\\cdot(2\\hat{i}+3\\hat{j}+4\\hat{k})=-5.\\) If P passes through the point (0,2,2), then the square of distance of the point (12, 12, 18) from the plane P is",
    "options": [
      "620",
      "155",
      "310",
      "1240"
    ],
    "answer": "620"
  },
  {
    "section": "Mathematics",
    "question_number": 89,
    "content": "If the lines \\(\\frac{x-1}{2}=\\frac{2-y}{-3}=\\frac{z-3}{\\alpha}\\) and \\(\\frac{x-4}{5}=\\frac{y-1}{2}=\\frac{z}{\\beta}\\) intersect, then the magnitude of the minimum value of \\(8\\alpha\\beta\\) is",
    "options": [],
    "answer": "18"
  },
  {
    "section": "Mathematics",
    "question_number": 90,
    "content": "Three dice are rolled. If the probability of getting different numbers on the three dice is \\(\\frac{p}{q}\\), where p and q are co-prime, then \\(q-p\\) is equal to",
    "options": [
      "2",
      "1",
      "3",
      "4"
    ],
    "answer": "4"
  }],
        // Continue for papers 3 to 70...
       5:[ {
    "section": "Physics",
    "question_number": 1,
    "content": "A cylindrical wire of mass \\((0.4\\pm0.01)\\) g has length \\((8\\pm0.04)\\) cm and radius \\((6\\pm0.03)\\) mm. The maximum error in its density will be",
    "options": [
      "3.5%",
      "5%",
      "1%",
      "4%"
    ],
    "answer": "4%"
  },
  {
    "section": "Physics",
    "question_number": 2,
    "content": "Two forces having magnitude A and \\(\\frac{A}{2}\\) are perpendicular to each other. The magnitude of their resultant is:",
    "options": [
      "\\(\\frac{\\sqrt{5}A}{4}\\)",
      "\\(\\frac{\\sqrt{5}A}{2}\\)",
      "\\(\\frac{5A}{2}\\)",
      "\\(\\frac{\\sqrt{5}A^{2}}{2}\\)"
    ],
    "answer": "\\(\\frac{\\sqrt{5}A}{2}\\)"
  },
  {
    "section": "Physics",
    "question_number": 3,
    "content": "Dimension of \\(\\frac{1}{\\mu_{0}\\epsilon_{0}}\\), should be equal to",
    "options": [
      "\\(L~T^{-1}\\)",
      "\\(T^{2}L^{-2}\\)",
      "\\(L^{2}T^{-2}\\)",
      "\\(TL^{-1}\\)"
    ],
    "answer": "\\(L^{2}T^{-2}\\)"
  },
  {
    "section": "Physics",
    "question_number": 4,
    "content": "Two projectiles A and B are thrown with initial velocities of \\(40~m~s^{-1}\\) and \\(60~m~s^{-1}\\) at angles \\(30^{\\circ}\\) and \\(60^{\\circ}\\) with the horizontal respectively. The ratio of their ranges respectively is \\((g=10~m~s^{-2})\\)",
    "options": [
      "4:9",
      "2: \\(\\sqrt{3}\\)",
      "\\(\\sqrt{3}:2\\)",
      "1:1"
    ],
    "answer": "4:9"
  },
  {
    "section": "Physics",
    "question_number": 5,
    "content": "At any instant the velocity of a particle of mass 500 g is \\((2t\\hat{i}+3t^{2}\\hat{j})m~s^{-1}\\). If the force acting on the particle at t = 1 s is \\((\\hat{i}+x\\hat{j})\\) N. Then the value of x will be:",
    "options": [
      "3",
      "4",
      "2",
      "6"
    ],
    "answer": "3"
  },
  {
    "section": "Physics",
    "question_number": 6,
    "content": "The momentum of a body is increased by 50%. The percentage increase in the kinetic energy of the body is ___ %.",
    "options": [
      "100",
      "125",
      "50",
      "150"
    ],
    "answer": "125"
  },
  {
    "section": "Physics",
    "question_number": 7,
    "content": "The moment of inertia of a semicircular ring about an axis, passing through the center and perpendicular to the plane of ring, is \\(\\frac{1}{x}MR^{2}\\) where R is the radius and M is the mass of the semicircular ring. The value of x will be",
    "options": [
      "1",
      "2",
      "4",
      "3"
    ],
    "answer": "1"
  },
  {
    "section": "Physics",
    "question_number": 8,
    "content": "Given below are two statements:<br>Statement I: If E be the total energy of a satellite moving around the earth, then its potential energy will be \\(\\frac{E}{2}\\).<br>Statement II: The kinetic energy of a satellite revolving in an orbit is equal to the half the magnitude of total energy E.<br>In the light of the above statements, choose the most appropriate answer from the options given below.",
    "options": [
      "Statement I is correct but Statement II is incorrect",
      "Statement I is incorrect but Statement II is correct",
      "Both Statement I and Statement II are correct",
      "Both Statement I and Statement II are incorrect"
    ],
    "answer": "Both Statement I and Statement II are correct"
  },
  {
    "section": "Physics",
    "question_number": 9,
    "content": "The weight of a body on the earth is 400 N. Then weight of the body when taken to a depth half of the radius of the earth will be:",
    "options": [
      "200 N",
      "Zero",
      "100 N",
      "300 N"
    ],
    "answer": "200 N"
  },
  {
    "section": "Physics",
    "question_number": 10,
    "content": "An aluminium rod with Young's modulus \\(Y=7.0\\times10^{10}N~m^{-2}\\) undergoes elastic strain of 0.04%. The energy per unit volume stored in the rod in SI unit is",
    "options": [
      "2800",
      "11200",
      "5600",
      "8400"
    ],
    "answer": "5600"
  },
  {
    "section": "Physics",
    "question_number": 11,
    "content": "An air bubble of volume 1 \\(cm^{3}\\) rises from the bottom of a lake 40 m deep to the surface at a temperature of \\(12^{\\circ}C\\). The atmospheric pressure is \\(1\\times10^{5}\\) Pa, the density of water is \\(1000~kg~m^{-3}\\) and \\(g=10~m~s^{-2}\\). There is no difference of the temperature of water at the depth of 40 m and on the surface. The volume of air bubble when it reaches the surface will be",
    "options": [
      "2 \\(cm^{3}\\)",
      "3 \\(cm^{3}\\)",
      "4 \\(cm^{3}\\)",
      "5 \\(cm^{3}\\)"
    ],
    "answer": "5 \\(cm^{3}\\)"
  },
  {
    "section": "Physics",
    "question_number": 12,
    "content": "An air bubble of diameter 6 mm rises steadily through a solution of density \\(1750~kg~m^{-3}\\) at the rate of \\(0.35~cm~s^{-1}\\). The co-efficient of viscosity of the solution (neglect density of air) is ___ Pas (given, \\(g=10~m~s^{-2})\\).",
    "options": [
      "10",
      "11",
      "12",
      "15"
    ],
    "answer": "10"
  },
  {
    "section": "Physics",
    "question_number": 13,
    "content": "Given below are two statements:<br>Statement I: If heat is added to a system, its temperature must increase.<br>Statement II: If positive work is done by a system in a thermodynamic process, its volume must increase.<br>In the light of the above statements, choose the correct answer from the options given below",
    "options": [
      "Statement I is true but Statement II is false",
      "Both Statement I and Statement II are false",
      "Both Statement I and Statement II are true",
      "Statement I is false but Statement II is true"
    ],
    "answer": "Statement I is false but Statement II is true"
  },
  {
    "section": "Physics",
    "question_number": 14,
    "content": "The engine of a train moving with speed \\(10~m~s^{-1}\\) towards a platform sounds a whistle at frequency 400 Hz. The frequency heard by a passenger inside the train is: (Neglect air speed. Speed of sound in air \\(=330~m~s^{-1}\\))",
    "options": [
      "400 Hz",
      "200 Hz",
      "412 Hz",
      "388 Hz"
    ],
    "answer": "400 Hz"
  },
  {
    "section": "Physics",
    "question_number": 15,
    "content": "An organ pipe 40 cm long is open at both ends. The speed of sound in air is 360 m \\(s^{-1}\\). The frequency of the second harmonic is ___ Hz.",
    "options": [
      "800",
      "900",
      "450",
      "360"
    ],
    "answer": "900"
  },
  {
    "section": "Physics",
    "question_number": 16,
    "content": "Graphical variation of electric field due to a uniformly charged insulating solid sphere of radius R, with distance r from the centre O is represented by:<br><div class='flex justify-center my-4'><img src='images/5/q16.png' alt='Physics Question 16'></div>",
    "options": [
      "Graph 1",
      "Graph 2",
      "Graph 3",
      "Graph 4"
    ],
    "answer": "Graph 2"
  },
  {
    "section": "Physics",
    "question_number": 17,
    "content": "An electric dipole of dipole moment is \\(6.0\\times10^{-6}\\) Cm placed in a uniform electric field of \\(1.5\\times10^{3}\\) \\(NC^{-1}\\) in such a way that dipole moment is along electric field. The work done in rotating dipole by 180° in this field will be ___ mJ.",
    "options": [
      "18",
      "9",
      "6",
      "12"
    ],
    "answer": "18"
  },
  {
    "section": "Physics",
    "question_number": 18,
    "content": "In this figure the resistance of the coil of galvanometer G is 2Ω. The emf of the cell is 4 V. The ratio of potential difference across \\(C_{1}\\) and \\(C_{2}\\) is<br><div class='flex justify-center my-4'><img src='images/5/q18.png' alt='Physics Question 18'></div>",
    "options": [
      "1",
      "\\(\\frac{4}{5}\\)",
      "\\(\\frac{5}{4}\\)",
      "\\(\\frac{3}{4}\\)"
    ],
    "answer": "\\(\\frac{4}{5}\\)"
  },
  {
    "section": "Physics",
    "question_number": 19,
    "content": "A current of 2 A flows through a wire of cross-sectional area \\(25.0~mm^{2}\\). The number of free electrons in a cubic meter are \\(2.0\\times10^{28}\\). The drift velocity of the electrons is ___ \\(\\times10^{-6}ms^{-1}\\) (given, charge on electron \\(=1.6\\times10^{-19}C)\\)",
    "options": [
      "25",
      "10",
      "50",
      "5"
    ],
    "answer": "25"
  },
  {
    "section": "Physics",
    "question_number": 20,
    "content": "Certain galvanometers have a fixed core made of non magnetic metallic material. The function of this metallic material is",
    "options": [
      "to oscillate the coil in magnetic field for longer period of time",
      "to bring the coil to rest quickly",
      "to produce large deflecting torque on the coil",
      "to make the magnetic field radial"
    ],
    "answer": "to bring the coil to rest quickly"
  },
  {
    "section": "Physics",
    "question_number": 21,
    "content": "A charge particle moving in magnetic field B, has the components of velocity along B as well as perpendicular to B. The path of the charge particle will be",
    "options": [
      "helical path with the axis perpendicular to the direction of magnetic field B",
      "helical path with the axis along magnetic field B",
      "circular path",
      "straight along the direction of magnetic field B"
    ],
    "answer": "helical path with the axis along magnetic field B"
  },
  {
    "section": "Physics",
    "question_number": 22,
    "content": "The magnetic intensity at the centre of a long current carrying solenoid is found to be \\(1.6\\times10^{3}A~m^{-1}\\). If the number of turns is 8 per cm, then the current flowing through the solenoid is ___ A.",
    "options": [],
    "answer": "2"
  },
  {
    "section": "Physics",
    "question_number": 23,
    "content": "An oscillating LC circuit consists of a 75 mH inductor and a 1.2 µF capacitor. If the maximum charge to the capacitor is 2.7 µC. The maximum current in the circuit will be ___ mA.",
    "options": [],
    "answer": "10"
  },
  {
    "section": "Physics",
    "question_number": 24,
    "content": "In a reflecting telescope, a secondary mirror is used to:",
    "options": [
      "reduce the problem of mechanical support",
      "make chromatic aberration zero",
      "move the eyepiece outside the telescopic tube",
      "remove spherical aberration"
    ],
    "answer": "move the eyepiece outside the telescopic tube"
  },
  {
    "section": "Physics",
    "question_number": 25,
    "content": "Two vertical parallel mirrors A and B are separated by 10 cm. A point object O is placed at a distance of 2 cm from mirror A. The distance of the second nearest image behind mirror A from the mirror A is ___ cm.<br><div class='flex justify-center my-4'><img src='images/5/q25.png' alt='Physics Question 25'></div>",
    "options": [],
    "answer": "18"
  },
  {
    "section": "Physics",
    "question_number": 26,
    "content": "Proton (P) and electron (e) will have same de-Broglie wavelength when the ratio of their momentum is (assume, \\(m_{p}=1849~m_{e})\\)",
    "options": [
      "1:1",
      "1:1849",
      "1:43",
      "43:1"
    ],
    "answer": "1:1"
  },
  {
    "section": "Physics",
    "question_number": 27,
    "content": "For a nucleus \\({}_{Z}X^{A}\\) having mass number A and atomic number Z<br>A. The surface energy per nucleon \\((b_{s})=-a_{1}A^{\\frac{2}{3}}\\).<br>B. The Coulomb contribution to the binding energy \\(b_{c}=-a_{2}\\frac{Z(Z-1)}{A^{\\frac{1}{3}}}\\).<br>C. The volume energy \\(b_{v}=a_{3}A\\)<br>D. Decrease in the binding energy is proportional to surface area.<br>E. While estimating the surface energy, it is assumed that each nucleon interacts with 12 nucleons. (\\(a_{1}, a_{2}\\) and \\(a_{3}\\) are constants)<br>Choose the most appropriate answer from the options given below:",
    "options": [
      "B, C, E only",
      "C, D only",
      "A, B, C, D only",
      "B, C only"
    ],
    "answer": "C, D only"
  },
  {
    "section": "Physics",
    "question_number": 28,
    "content": "A nucleus with mass number 242 and binding energy per nucleon as 7.6 MeV breaks into two fragment each with mass number 121. If each fragment nucleus has binding energy per nucleon as 8.1 MeV, the total gain in binding energy is ___ MeV.",
    "options": [],
    "answer": "121"
  },
  {
    "section": "Physics",
    "question_number": 29,
    "content": "For the logic circuit shown, the output waveform at Y is<br><div class='flex justify-center my-4'><img src='images/5/q29.png' alt='Physics Question 29'></div>",
    "options": [
      "Waveform 1",
      "Waveform 2",
      "Waveform 3",
      "Waveform 4"
    ],
    "answer": "Waveform 3"
  },
  {
    "section": "Physics",
    "question_number": 30,
    "content": "A TV transmitting antenna is 98 m high and the receiving antenna is at the ground level. If the radius of the earth is 6400 km, the surface area covered by the transmitting antenna is approximately:",
    "options": [
      "\\(1240~km^{2}\\)",
      "\\(3942~km^{2}\\)",
      "\\(4868~km^{2}\\)",
      "\\(1549~km^{2}\\)"
    ],
    "answer": "\\(3942~km^{2}\\)"
  },
  {
    "section": "Chemistry",
    "question_number": 31,
    "content": "0.5 g of an organic compound (X) with 60% carbon will produce ___ \\(\\times10^{-1}\\) g of \\(CO_{2}\\) on complete combustion.",
    "options": [],
    "answer": "11"
  },
  {
    "section": "Chemistry",
    "question_number": 32,
    "content": "The number of following statement/s which is/are incorrect is<br>A) Line emission spectra are used to study the electronic structure<br>B) The emission spectra of atoms in the gas phase show a continuous spread of wavelength from red to violet.<br>C) An absorption spectrum is like the photographic negative of an emission spectrum<br>D) The element helium was discovered in the sun by spectroscopic method",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "answer": "1"
  },
  {
    "section": "Chemistry",
    "question_number": 33,
    "content": "The correct order of electronegativity for given elements is",
    "options": [
      "\\(P>Br>C>At\\)",
      "\\(Br>P>At>C\\)",
      "\\(Br>C>At>P\\)",
      "\\(C>P>At>Br\\)"
    ],
    "answer": "\\(Br>C>At>P\\)"
  },
  {
    "section": "Chemistry",
    "question_number": 34,
    "content": "Given below are two statements: One is labelled as Assertion A and the other is labelled as Reason R.<br>Assertion A: Butan-1-ol has higher boiling point than ethoxyethane.<br>Reason R: Extensive hydrogen bonding leads to stronger association of molecules.<br>In the light of the above statements, choose the correct answer from the options given below :",
    "options": [
      "A is true but R is false",
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is false but R is true"
    ],
    "answer": "Both A and R are true and R is the correct explanation of A"
  },
  {
    "section": "Chemistry",
    "question_number": 35,
    "content": "The number of following factors which affect the percent covalent character of the ionic bond is<br>A) Polarising power of cation<br>B) Extent of distortion of anion<br>C) Polarisability of the anion<br>D) Polarising power of anion",
    "options": [
      "4",
      "3",
      "2",
      "1"
    ],
    "answer": "3"
  },
  {
    "section": "Chemistry",
    "question_number": 36,
    "content": "Three bulbs are filled with \\(CH_{4}\\), \\(CO_{2}\\) and Ne as shown in the picture. The bulbs are connected through pipes of zero volume. When the stopcocks are opened and the temperature is kept constant throughout, the pressure of the system is found to be ___ atm. (Nearest integer).<br><div class='flex justify-center my-4'><img src='images/5/q36.png' alt='Chemistry Question 36'></div>",
    "options": [],
    "answer": "3"
  },
  {
    "section": "Chemistry",
    "question_number": 37,
    "content": "When a 60 W electric heater is immersed in a gas for 100 s in a constant volume container with adiabatic walls, the temperature of the gas rises by \\(5^{\\circ}C\\). The heat capacity of the given gas is ___ \\(JK^{-1}\\) (Nearest integer)",
    "options": [],
    "answer": "1200"
  },
  {
    "section": "Chemistry",
    "question_number": 38,
    "content": "The titration curve of weak acid vs. strong base with phenolphthalein as indicator is shown below. The \\(K_{phenolphthalein}=4\\times10^{-10}\\). Given: \\(log~2=0.3\\).<br><div class='flex justify-center my-4'><img src='images/5/q38.png' alt='Chemistry Question 38'></div><br>The number of following statement/s which is/are correct about phenolphthalein is<br>A. It can be used as an indicator for the titration of weak acid with weak base.<br>B. It begins to change colour at \\(pH=8.4\\)<br>C. It is a weak organic base<br>D. It is colourless in acidic medium",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "answer": "2"
  },
  {
    "section": "Chemistry",
    "question_number": 39,
    "content": "\\(2~IO_{3}^{-}+xI^{-}+12H^{+}\\rightarrow6I_{2}+6H_{2}O\\). What is the value of x?",
    "options": [
      "2",
      "12",
      "10",
      "6"
    ],
    "answer": "10"
  },
  {
    "section": "Chemistry",
    "question_number": 40,
    "content": "Given below are two statements:<br>Statement I: Lithium and Magnesium do not form superoxide<br>Statement II: The ionic radius of \\(Li^{+}\\) is larger than ionic radius of \\(Mg^{2+}\\). In the light of the above statements, choose the most appropriate answer from the questions given below :",
    "options": [
      "Statement I is incorrect but Statement II is correct",
      "Statement I is correct but Statement II is incorrect",
      "Both statement I and Statement II are incorrect",
      "Both Statement I and Statement II are correct"
    ],
    "answer": "Both Statement I and Statement II are correct"
  },
  {
    "section": "Chemistry",
    "question_number": 41,
    "content": "What is the purpose of adding gypsum to cement?",
    "options": [
      "To facilitate the hydration of cement",
      "To slow down the process of setting",
      "To give a hard mass",
      "To speed up the process of setting"
    ],
    "answer": "To slow down the process of setting"
  },
  {
    "section": "Chemistry",
    "question_number": 42,
    "content": "Molar mass of the hydrocarbon (X) which on ozonolysis consumes one mole of \\(O_{3}\\) per mole of (X) and gives one mole each of ethanal and propanone is ___ \\(g~mol^{-1}\\) (Molar mass of \\(C:12~g~mol^{-1}\\), \\(H:1g~mol^{-1}\\))",
    "options": [],
    "answer": "70"
  },
  {
    "section": "Chemistry",
    "question_number": 43,
    "content": "Match List I with List II<br>List-I (Species)<br>A \\(F^{-}\\)<br>B \\(SO_{4}^{2-}\\)<br>C \\(NO_{3}^{-}\\)<br>D Zn<br>List-II (Maximum allowed concentration in ppm in drinking water)<br>I < 50 ppm<br>II < 5 ppm<br>III < 500 ppm<br>IV < 2 ppm",
    "options": [
      "A-I, B-II, C-III, D-IV",
      "A-II, B-I, C-III, D-IV",
      "A-IV, B-III, C-II, D-I",
      "A-III, B-II, C-I, D-IV"
    ],
    "answer": "A-II, B-I, C-III, D-IV"
  },
  {
    "section": "Chemistry",
    "question_number": 44,
    "content": "The vapour pressure vs. temperature curve for a solution solvent system is shown below. The boiling point of the solvent is ___ \\(^{\\circ}C\\).<br><div class='flex justify-center my-4'><img src='images/5/q44.png' alt='Chemistry Question 44'></div>",
    "options": [],
    "answer": "82"
  },
  {
    "section": "Chemistry",
    "question_number": 45,
    "content": "The reaction \\(\\frac{1}{2}H_{2}(g)+AgCl(s)\\rightleftharpoons H^{+}(aq)+Cl^{-}(aq)+Ag(s)\\) occurs in which of the given galvanic cell?",
    "options": [
      "Pt | H2(g) | HCl(sol) | AgCl(s) | Ag",
      "Ag | AgCl(s) | KCl(sol) | AgNO3 | Ag",
      "Pt | H2(g) | HCl(sol) | AgNO3(sol) | Ag",
      "Pt | H2(g) | KCl(sol) | AgCl(s) | Ag"
    ],
    "answer": "Pt | H2(g) | HCl(sol) | AgCl(s) | Ag"
  },
  {
    "section": "Chemistry",
    "question_number": 46,
    "content": "The number of given statement/s which is/are correct is<br>(A) The stronger the temperature dependence of the rate constant, the higher is the activation energy.<br>(B) If a reaction has zero activation energy, its rate is independent of temperature.<br>(C) The stronger the temperature dependence of the rate constant, the smaller is the activation energy.<br>(D) If there is no correlation between the temperature and the rate constant then it means that the reaction has negative activation energy.",
    "options": [
      "4",
      "2",
      "3",
      "1"
    ],
    "answer": "2"
  },
  {
    "section": "Chemistry",
    "question_number": 47,
    "content": "The water gas on reacting with cobalt as a catalyst forms",
    "options": [
      "Methanal",
      "Methanoic acid",
      "Ethanol",
      "Methanol"
    ],
    "answer": "Methanol"
  },
  {
    "section": "Chemistry",
    "question_number": 48,
    "content": "Which of the following represents the Freundlich adsorption isotherms?<br><div class='flex justify-center my-4'><img src='images/5/q48.png' alt='Chemistry Question 48'></div>",
    "options": [
      "A, C, D only",
      "A, B only",
      "B, C, D only",
      "A, B, D only"
    ],
    "answer": "A, B, D only"
  },
  {
    "section": "Chemistry",
    "question_number": 49,
    "content": "Which of the following metals can be extracted through alkali leaching technique?",
    "options": [
      "Sn",
      "Pb",
      "Au",
      "Cu"
    ],
    "answer": "Sn"
  },
  {
    "section": "Chemistry",
    "question_number": 50,
    "content": "\\(XeF_{4}\\) reacts with \\(SbF_{5}\\) to form \\([XeF_{m}]^{n+}[SbF_{y}]^{z-}\\). \\(m+n+y+z=?\\).",
    "options": [],
    "answer": "11"
  },
  {
    "section": "Chemistry",
    "question_number": 51,
    "content": "In chromyl chloride, the number of d-electrons present on chromium is same as in (Given at no. of Ti: 22, V: 23, Cr: 24, Mn: 25, Fe: 26)",
    "options": [
      "V (IV)",
      "Mn (VII)",
      "Fe (III)",
      "Ti (III)"
    ],
    "answer": "Mn (VII)"
  },
  {
    "section": "Chemistry",
    "question_number": 52,
    "content": "Which halogen is known to cause the reaction given below? \\(2Cu^{2+}+4X^{-}\\rightarrow Cu_{2}X_{2}(s)+X_{2}\\)",
    "options": [
      "All halogens",
      "Only Bromine",
      "Only Iodine",
      "Only Chlorine"
    ],
    "answer": "Only Iodine"
  },
  {
    "section": "Chemistry",
    "question_number": 53,
    "content": "Which of the following complex is octahedral, diamagnetic and the most stable?",
    "options": [
      "\\(Na_{3}[CoCl_{6}]\\)",
      "\\([Ni(NH_{3})_{6}]Cl_{2}\\)",
      "\\(K_{3}[Co(CN)_{6}]\\)",
      "\\([Co(H_{2}O)_{6}]Cl_{2}\\)"
    ],
    "answer": "\\(K_{3}[Co(CN)_{6}]\\)"
  },
  {
    "section": "Chemistry",
    "question_number": 54,
    "content": "The correct order of spin only magnetic moments for the following complex ions is",
    "options": [
      "\\([Fe(CN)_{6}]^{3-}<[CoF_{6}]^{3-}<[MnBr_{4}]^{2-}\\)",
      "\\([MnBr_{4}]^{2-}<[Fe(CN)_{6}]^{3-}<[CoF_{6}]^{3-}\\)",
      "\\([Fe(CN)_{6}]^{3-}<[CoF_{6}]^{3-}<[MnBr_{4}]^{2-}\\) (Repeated Option)",
      "\\([CoF_{6}]^{3-}<[MnBr_{4}]^{2-}<[Fe(CN)_{6}]^{3-}\\)"
    ],
    "answer": "\\([Fe(CN)_{6}]^{3-}<[CoF_{6}]^{3-}<[MnBr_{4}]^{2-}\\)"
  },
  {
    "section": "Chemistry",
    "question_number": 55,
    "content": "Choose the halogen which is most reactive towards SN1 reaction in the given compounds (A, B, C & D)<br><div class='flex justify-center my-4'><img src='images/5/q55.png' alt='Chemistry Question 55'></div>",
    "options": [
      "\\(A-Br_{(b)}; B-I_{(a)}; C-Br_{(a)}; D-Br_{(a)}\\)",
      "\\(A-Br_{(b)}; B-I_{(a)}; C-Br_{(b)}; D-Br_{(b)}\\)",
      "\\(A-Br_{(a)}; B-I_{(a)}; C-Br_{(b)}; D-Br_{(a)}\\)",
      "\\(A-Br_{(a)}; B-I_{(a)}; C-Br_{(a)}; D-Br_{(a)}\\)"
    ],
    "answer": "\\(A-Br_{(b)}; B-I_{(a)}; C-Br_{(a)}; D-Br_{(a)}\\)"
  },
  {
    "section": "Chemistry",
    "question_number": 56,
    "content": "The major product formed in the following reaction is<br><div class='flex justify-center my-4'><img src='images/5/q56.png' alt='Chemistry Question 56'></div>",
    "options": [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4"
    ],
    "answer": "Option 2"
  },
  {
    "section": "Chemistry",
    "question_number": 57,
    "content": "Match List I with List II:<br>List I (Reagents used)<br>A. Alkaline solution of copper sulphate and sodium citrate<br>B. Neutral \\(FeCl_{3}\\) solution<br>C. Alkaline chloroform solution<br>D. Potassium iodide and sodium hypochlorite<br>List II (Compound with Functional group detected)<br>I. Phenol<br>II. Primary amine<br>III. Methyl ketone<br>IV. Aldehyde",
    "options": [
      "A-III, B-IV, C-I, D-II",
      "A-III, B-IV, C-II, D-I",
      "A-IV, B-I, C-II, D-III",
      "A-II, B-IV, C-III, D-I"
    ],
    "answer": "A-IV, B-I, C-II, D-III"
  },
  {
    "section": "Chemistry",
    "question_number": 58,
    "content": "Benzene diazonium chloride is reacted with reagents in List I to form products in List II. Match List I with List II:<br><div class='flex justify-center my-4'><img src='images/5/q58.png' alt='Chemistry Question 58'></div>",
    "options": [
      "A-IV, B-III, C-II, D-I",
      "A-III, B-I, C-II, D-IV",
      "A-I, B-III, C-IV, D-II",
      "A-III, B-I, C-IV, D-II"
    ],
    "answer": "A-III, B-I, C-II, D-IV"
  },
  {
    "section": "Chemistry",
    "question_number": 59,
    "content": "Match List I with List II:<br>List I (Sweetener)<br>A. Saccharin<br>B. Aspartame<br>C. Alitame<br>D. Sucralose<br>List II (Property)<br>I. High potency sweetener<br>II. First artificial sweetening agent<br>III. Stable at cooking temperature<br>IV. Unstable at cooking temperature",
    "options": [
      "A-IV, B-III, C-I, D-II",
      "A-II, B-IV, C-I, D-III",
      "A-II, B-III, C-IV, D-I",
      "A-II, B-IV, C-I, D-III"
    ],
    "answer": "A-II, B-IV, C-I, D-III"
  },
  {
    "section": "Chemistry",
    "question_number": 60,
    "content": "Sulphur (S) containing amino acids from the following are: (a) isoleucine, (b) cysteine, (c) lysine, (d) methionine, (e) glutamic acid",
    "options": [
      "b, c, e",
      "a, b, c",
      "b, d",
      "a, d"
    ],
    "answer": "b, d"
  },
  {
    "section": "Mathematics",
    "question_number": 61,
    "content": "Let \\(\\alpha, \\beta, \\gamma\\) be the three roots of the equation \\(x^{3}+bx+c=0\\). If \\(\\beta\\gamma=1=-\\alpha\\) then \\(b^{3}+2c^{3}-3\\alpha^{3}-6\\beta^{3}-8\\gamma^{3}\\) is equal to",
    "options": [
      "155/8",
      "21",
      "169/8",
      "19"
    ],
    "answer": "19"
  },
  {
    "section": "Mathematics",
    "question_number": 62,
    "content": "If for \\(z = \\alpha + i\\beta\\), \\(|z+2|=z+4(1+i)\\) then \\(\\alpha+\\beta\\) and \\(\\alpha\\beta\\) are the roots of the equation",
    "options": [
      "\\(x^{2}+3x-4=0\\)",
      "\\(x^{2}+7x+12=0\\)",
      "\\(x^{2}+x-12=0\\)",
      "\\(x^{2}+2x-3=0\\)"
    ],
    "answer": "\\(x^{2}+7x+12=0\\)"
  },
  {
    "section": "Mathematics",
    "question_number": 63,
    "content": "The number of arrangements of the letters of the word \"INDEPENDENCE\" in which all the vowels always occur together is",
    "options": [
      "16800",
      "33600",
      "18000",
      "14800"
    ],
    "answer": "16800"
  },
  {
    "section": "Mathematics",
    "question_number": 64,
    "content": "The number of ways, in which 5 girls and 7 boys can be seated at a round table so that no two girls sit together is",
    "options": [
      "720",
      "\\(126(5!)^{2}\\)",
      "\\(7(360)^{2}\\)",
      "\\(7(720)^{2}\\)"
    ],
    "answer": "\\(126(5!)^{2}\\)"
  },
  {
    "section": "Mathematics",
    "question_number": 65,
    "content": "The largest natural number n such that \\(3^{n}\\) divides 66! is",
    "options": [],
    "answer": "31"
  },
  {
    "section": "Mathematics",
    "question_number": 66,
    "content": "Let \\(S_{K}=\\frac{1+2+...+K}{K}\\) and \\(\\sum_{j=1}^{n}S_{j}^{2}=\\frac{n}{A}(Bn^{2}+Cn+D)\\) where A, B, C, \\(D\\in N\\) and A has least value. Then",
    "options": [
      "\\(A+C+D\\) is not divisible by D",
      "\\(A+B=5(D-C)\\)",
      "\\(A+B+C+D\\) is divisible by 5",
      "\\(A+B\\) is divisible by D"
    ],
    "answer": "\\(A+B\\) is divisible by D"
  },
  {
    "section": "Mathematics",
    "question_number": 67,
    "content": "if the coefficients of three consecutive terms in the expansion of \\((1+x)^{n}\\) are the ratio 1:5:20 then the coefficient of the fourth term is",
    "options": [
      "2436",
      "5481",
      "1827",
      "3654"
    ],
    "answer": "3654"
  },
  {
    "section": "Mathematics",
    "question_number": 68,
    "content": "Let [t] denote the greatest integer \\(\\le t.\\) if the constant term in the expansion of \\((3x^{2}-\\frac{1}{2x^{5}})^{7}\\) is \\(\\alpha\\) then [\\(\\alpha\\)] is equal to",
    "options": [],
    "answer": "0"
  },
  {
    "section": "Mathematics",
    "question_number": 69,
    "content": "Let \\(C(\\alpha,\\beta)\\) be the circumcentre of the triangle formed by the lines \\(4x+3y=69,\\) \\(4y-3x=17,\\) and \\(x+7y=61.\\) Then \\((\\alpha-\\beta)^{2}+\\alpha+\\beta\\) is equal to",
    "options": [
      "18",
      "17",
      "15",
      "16"
    ],
    "answer": "17"
  },
  {
    "section": "Mathematics",
    "question_number": 70,
    "content": "Consider a circle \\(C_{1}:x^{2}+y^{2}-4x-2y=\\alpha-5\\). Let its mirror image in the line \\(y=2x+1\\) be another circle \\(C_{2}:5x^{2}+5y^{2}-10fx-10gy+36=0.\\) Let r be the radius of \\(C_{2}\\). Then \\(\\alpha+r\\) is equal to",
    "options": [],
    "answer": "2"
  },
  {
    "section": "Mathematics",
    "question_number": 71,
    "content": "Let R be the focus of the parabola \\(y^{2}=20x\\) and the line \\(y=mx+c\\) intersect the parabola at two points P and Q. Let the points \\(G(10,10)\\) be the centroid of the triangle PQR. If \\(c-m=6,\\) then \\(PQ^{2}\\) is",
    "options": [
      "296",
      "325",
      "317",
      "346"
    ],
    "answer": "317"
  },
  {
    "section": "Mathematics",
    "question_number": 72,
    "content": "\\(\\lim_{x\\rightarrow0}((\\frac{1-cos^{2}(3x)}{cos^{3}(4x)})(\\frac{sin^{3}(4x)}{(log_{e}(2x+1))^{5}}))\\) is equal to",
    "options": [
      "15",
      "9",
      "18",
      "24"
    ],
    "answer": "9"
  },
  {
    "section": "Mathematics",
    "question_number": 73,
    "content": "Negation of \\((p\\rightarrow q)\\rightarrow(q\\rightarrow p)\\) is",
    "options": [
      "\\((-p)\\vee p\\)",
      "\\(q\\wedge(\\neg p)\\)",
      "\\((-q)\\wedge p\\)",
      "\\(p\\vee(-q)\\)"
    ],
    "answer": "\\(q\\wedge(\\neg p)\\)"
  },
  {
    "section": "Mathematics",
    "question_number": 74,
    "content": "Let the mean and variance of 8 numbers x, y, 10, 12, 6, 12, 4, 8 be 9 and 9.25 respectively. If \\(x>y,\\) then \\(3x-2y\\) is equal to",
    "options": [],
    "answer": "25"
  },
  {
    "section": "Mathematics",
    "question_number": 75,
    "content": "Let the number of elements in sets A and B be five and two respectively. Then the number of subsets of \\(A\\times B\\) each having at least 3 and at most 6 elements is",
    "options": [
      "752",
      "782",
      "792",
      "772"
    ],
    "answer": "792"
  },
  {
    "section": "Mathematics",
    "question_number": 76,
    "content": "Let \\(A=\\{0,3,4,6,7,8,9,10\\}\\) and R be the relation defined on A such that \\(R=\\{(x,y)\\in A\\times A:x-y\\) is odd positive integer or \\(x-y=2\\}\\). The minimum number of elements that must be added to the relation R, so that it is a symmetric relation, is equal to",
    "options": [],
    "answer": "19"
  },
  {
    "section": "Mathematics",
    "question_number": 77,
    "content": "Let \\(A=[\\begin{matrix}2&1&0\\\\1&2&-1\\\\0&-1&2\\end{matrix}]\\). If \\(|adj(adj(adj~2A))|=(16)^{n}\\), then n is equal to",
    "options": [
      "8",
      "10",
      "9",
      "12"
    ],
    "answer": "8"
  },
  {
    "section": "Mathematics",
    "question_number": 78,
    "content": "Let \\(P=[\\begin{matrix}\\frac{\\sqrt{3}}{2}&\\frac{1}{2}\\\\ -\\frac{1}{2}&\\frac{\\sqrt{3}}{2}\\end{matrix}]\\), \\(A=[\\begin{matrix}1&1\\\\0&1\\end{matrix}]\\) and \\(Q=PAP^{T}\\). If \\(P^{T}Q^{2007}P=[\\begin{matrix}a&b\\\\c&d\\end{matrix}]\\) then \\(2a+b-3c-4d\\) is equal to",
    "options": [
      "2004",
      "2005",
      "2007",
      "2006"
    ],
    "answer": "2004"
  },
  {
    "section": "Mathematics",
    "question_number": 79,
    "content": "Let \\(f(x)=\\frac{sin~x+cos~x-\\sqrt{2}}{sin~x-cos~x}\\), \\(x\\in[0,\\pi]-\\{\\frac{\\pi}{4}\\}\\), then \\(f(\\frac{7\\pi}{12})f''(\\frac{7\\pi}{12})\\) is equal to",
    "options": [
      "\\(\\frac{2}{9}\\)",
      "\\(\\frac{-2}{3}\\)",
      "\\(\\frac{-1}{3\\sqrt{3}}\\)",
      "\\(\\frac{2}{3\\sqrt{3}}\\)"
    ],
    "answer": "\\(\\frac{-2}{3}\\)"
  },
  {
    "section": "Mathematics",
    "question_number": 80,
    "content": "If \\(a_{\\alpha}\\) is the greatest term in the sequence \\(a_{n}=\\frac{n^{3}}{n^{4}+147}\\) \\(n=1,2,3....\\) then \\(\\alpha\\) is equal to",
    "options": [],
    "answer": "7"
  },
  {
    "section": "Mathematics",
    "question_number": 81,
    "content": "Let \\(I(x)=\\int\\frac{x+1}{x(1+xe^{x})^{2}}dx\\), \\(x>0\\). If \\(\\lim_{x\\rightarrow\\infty}I(x)=0\\) then \\(I(1)\\) is equal to",
    "options": [
      "\\(\\frac{e+2}{e+1}-log_{e}(e+1)\\)",
      "\\(\\frac{e+1}{e+2}+log_{e}(e+1)\\)",
      "\\(\\frac{e+1}{e+2}-log_{e}(e+1)\\)",
      "\\(\\frac{e+2}{e+1}+log_{e}(e+1)\\)"
    ],
    "answer": "\\(\\frac{e+1}{e+2}-log_{e}(e+1)\\)"
  },
  {
    "section": "Mathematics",
    "question_number": 82,
    "content": "Let [t] denote the greatest integer \\(\\le t.\\) Then \\(\\frac{2}{\\pi}\\int_{\\frac{\\pi}{6}}^{\\frac{5\\pi}{6}}(8[cosec~x]-5[cot~x])dx\\) is equal to",
    "options": [],
    "answer": "5"
  },
  {
    "section": "Mathematics",
    "question_number": 83,
    "content": "The area of the region \\(\\{(x,y):x^{2}\\le y\\le8-x^{2},y\\le7\\}\\) is",
    "options": [
      "27",
      "18",
      "20",
      "21"
    ],
    "answer": "20"
  },
  {
    "section": "Mathematics",
    "question_number": 84,
    "content": "If the solution curve of the differential equation \\((y-2~log_{e}x)dx+(x~log_{e}x^{2})dy=0,\\) \\(x>1\\) passes through the points \\((e,\\frac{4}{3})\\) and \\((e^{4},\\alpha).\\) then \\(\\alpha\\) is equal to",
    "options": [],
    "answer": "3"
  },
  {
    "section": "Mathematics",
    "question_number": 85,
    "content": "If the points with position vectors \\(\\alpha\\hat{i}+10\\hat{j}+13\\hat{k}\\), \\(6\\hat{i}+11\\hat{j}+11\\hat{k}\\), \\(\\frac{9}{2}\\hat{i}+\\beta\\hat{j}-8\\hat{k}\\) are collinear, then \\((19\\alpha-6\\beta)^{2}\\) is equal to",
    "options": [
      "36",
      "25",
      "49",
      "16"
    ],
    "answer": "36"
  },
  {
    "section": "Mathematics",
    "question_number": 86,
    "content": "Let \\(\\vec{a}=6\\hat{i}+9\\hat{j}+12\\hat{k},\\) \\(\\vec{b}=\\alpha\\hat{i}+11\\hat{j}-2\\hat{k}\\) and \\(\\vec{c}\\) be vectors such that \\(\\vec{a}\\times\\vec{c}=\\vec{a}\\times\\vec{b}\\). If \\(\\vec{a}\\cdot\\vec{c}=-12\\) and \\(\\vec{c}\\cdot(\\hat{i}-2\\hat{j}+\\hat{k})=5\\) then \\(\\vec{c}\\cdot(\\hat{i}+\\hat{j}+\\hat{k})\\) is equal to",
    "options": [],
    "answer": "11"
  },
  {
    "section": "Mathematics",
    "question_number": 87,
    "content": "The shortest distance between the lines \\(\\frac{x-4}{4}=\\frac{y+2}{5}=\\frac{z+3}{3}\\) and \\(\\frac{x-1}{3}=\\frac{y-3}{4}=\\frac{z-4}{2}\\) is",
    "options": [
      "\\(6\\sqrt{3}\\)",
      "\\(2\\sqrt{6}\\)",
      "\\(6\\sqrt{2}\\)",
      "\\(3\\sqrt{6}\\)"
    ],
    "answer": "\\(3\\sqrt{6}\\)"
  },
  {
    "section": "Mathematics",
    "question_number": 88,
    "content": "If the equation of the plane containing the line \\(x+2y+3z-4=0=2x+y-z+5\\) and perpendicular to the plane \\(\\vec{r}=(\\hat{i}-\\hat{j})+\\lambda(\\hat{i}+\\hat{j}+\\hat{k})+\\mu(\\hat{i}-2\\hat{j}+3\\hat{k})\\) is \\(ax+by+cz=4\\) then \\((a-b+c)\\) is equal to",
    "options": [
      "18",
      "22",
      "20",
      "24"
    ],
    "answer": "20"
  },
  {
    "section": "Mathematics",
    "question_number": 89,
    "content": "Let \\(\\lambda_{1}\\), \\(\\lambda_{2}\\) be the values of \\(\\lambda\\) for which the points \\((\\frac{5}{2},1,\\lambda)\\) and \\((-2,0,1)\\) are at equal distance from the plane \\(2x+3y-6z+7\\). If \\(\\lambda_{1}>\\lambda_{2}\\) then the distance of the point \\((\\lambda_{1}-\\lambda_{2},\\lambda_{2},\\lambda_{1})\\) from the line \\(\\frac{x-5}{1}=\\frac{y-1}{2}=\\frac{z+7}{2}\\) is",
    "options": [],
    "answer": "6"
  },
  {
    "section": "Mathematics",
    "question_number": 90,
    "content": "In a bolt factory, machines A, B and C manufacture respectively 20%, 30% and 50% of the total bolts. Of their output 3, 4 and 2 percent are respectively defective bolts. A bolt is drawn at random from the product. If the bolt drawn is found the defective then the probability that it is manufactured by the machine C is",
    "options": [
      "\\(\\frac{5}{14}\\)",
      "\\(\\frac{9}{28}\\)",
      "\\(\\frac{3}{7}\\)",
      "\\(\\frac{2}{7}\\)"
    ],
    "answer": "\\(\\frac{5}{14}\\)"
  }], 
    };

    // 3. GENERATOR ENGINE
    const TOPIC_BANKS = {
        Physics: ["Kinematics", "Newton's Laws", "Energy", "Rotation", "Gravitation", "Thermodynamics", "SHM", "Waves", "Electrostatics", "Current", "Magnetism", "Optics", "Modern Physics"],
        Chemistry: ["Atomic Structure", "Bonding", "Thermodynamics", "Equilibrium", "Solutions", "Kinetics", "Electrochemistry", "Inorganic", "Organic GOC", "Hydrocarbons", "Aldehydes"],
        Mathematics: ["Functions", "Limits", "Calculus", "Vectors", "3D Geometry", "Probability", "Complex Numbers", "Matrices", "Conics"]
    };

    function processHardcodedPaper(flatQuestions, paperId) {
        const subjects = { 'Physics': [], 'Chemistry': [], 'Mathematics': [] };
        flatQuestions.forEach((q, idx) => {
            const isMCQ = q.options && q.options.length > 0;
            const formattedQ = {
                id: `${q.section.substring(0,3)}_p${paperId}_q${idx}`,
                type: isMCQ ? 'MCQ' : 'NUMERICAL',
                section: isMCQ ? 'Section A' : 'Section B',
                // FIX: Removed hardcoded question number prefix so shuffling doesn't cause mismatch
                content: q.content, 
                options: q.options || [],
                answerHash: q.answerHash // Securely stored
            };
            if (subjects[q.section]) subjects[q.section].push(formattedQ);
        });
        return {
            id: paperId,
            title: `JEE Advanced Mock Test ${paperId} (Premium)`,
            durationMinutes: 180,
            sections: Object.keys(subjects).map(s => ({ name: s, questions: subjects[s] }))
        };
    }

    function generatePaperByID(paperId) {
        // PRIORITY 1: Check if Manual Data exists in PAPER_DATABASE
        if (PAPER_DATABASE[paperId]) {
            return processHardcodedPaper(PAPER_DATABASE[paperId], paperId);
        }
        
        // PRIORITY 2: Procedural Generation (Fallback for empty slots 2-70)
        const subjects = ['Physics', 'Chemistry', 'Mathematics'];
        const sections = subjects.map(subject => {
            const questions = [];
            const topicList = TOPIC_BANKS[subject];
            // 20 MCQs
            for(let i=1; i<=20; i++) {
                const topic = topicList[(paperId + i) % topicList.length];
                const ansIndex = (paperId + i) % 4;
                questions.push({
                    id: `${subject.substring(0,3)}_p${paperId}_A_${i}`,
                    type: 'MCQ',
                    section: 'Section A',
                    // FIX: Removed "Q${i}:" prefix
                    content: `Concept question on <strong>${topic}</strong>.`,
                    options: [`Option A`, `Option B`, `Option C`, `Option D`],
                    answerHash: obfuscate(String(ansIndex))
                });
            }
            // 5 Numericals
            for(let i=1; i<=5; i++) {
                const topic = topicList[(paperId + i + 5) % topicList.length];
                const ansVal = (paperId * i) % 10;
                questions.push({
                    id: `${subject.substring(0,3)}_p${paperId}_B_${i}`,
                    type: 'NUMERICAL',
                    section: 'Section B',
                    // FIX: Removed "Q${i}:" prefix
                    content: `Numerical integer problem on <strong>${topic}</strong>.`,
                    answerHash: obfuscate(String(ansVal))
                });
            }
            return { name: subject, questions: questions };
        });

        return { id: paperId, title: `JEE Advanced Mock Test ${paperId}`, durationMinutes: 180, sections: sections };
    }

    // 4. APPLICATION STATE (Protected by Closure)
    const STATE = {
        paper: null,
        tempPaper: null, // Added this property
        sectionIndex: 0,
        questionGlobalIndex: 0,
        answers: {},
        timeRemaining: 0,
        timerInterval: null,
        flatQuestions: [],
        warnings: 0,
        fontSize: 1
    };
    // FREEZE STATE STRUCTURE TO PREVENT REDEFINITION
    Object.seal(STATE);

    const CONFIG = { marksCorrect: 4, marksWrong: -1, marksUnattempted: 0, maxWarnings: 3 };
    // FREEZE CONFIG TO PREVENT TAMPERING
    Object.freeze(CONFIG);
    
    const SESSION_KEY = 'jee_sec_session'; 
    const HISTORY_KEY = 'jee_sec_history';
    const PAPER_ORDER_KEY = 'jee_paper_order';

    // 5. SECURITY UTILITIES
    const Security = {
        init: function() {
            // 1. HONEYPOT TRAP (Global Variables that tempt cheaters)
            window.JEE_SCORE = 0;
            window.DEBUG_MODE = false;
            
            setInterval(() => {
                if(window.JEE_SCORE !== 0 || window.DEBUG_MODE !== false) {
                    Security.logViolation("Honeypot Triggered: Variable Tampering");
                }
            }, 1000);

            // Disable Context Menu
            document.addEventListener('contextmenu', e => e.preventDefault());
            
            // Disable Copy/Cut/Paste
            document.addEventListener('copy', e => e.preventDefault());
            document.addEventListener('cut', e => e.preventDefault());
            document.addEventListener('paste', e => e.preventDefault());

            // Disable Keys
            document.addEventListener('keydown', e => {
                if (
                    e.key === 'F12' || 
                    (e.ctrlKey && e.shiftKey && e.key === 'I') || 
                    (e.ctrlKey && e.shiftKey && e.key === 'J') || 
                    (e.ctrlKey && e.key === 'u')
                ) {
                    e.preventDefault();
                    return false;
                }
            });
            
            // KEY TRAP FOR PRINTSCREEN
            document.addEventListener('keyup', e => {
                if (e.key === 'PrintScreen') {
                    Security.logViolation("Screenshot Attempt Detected (PrintScreen)");
                }
            });

            // Console Clearer
            setInterval(() => { console.clear(); }, 2000);

            // 2. ADVANCED: High-Frequency Debugger Detection (requestAnimationFrame)
            let lastTime = Date.now();
            const detectLag = () => {
                const currentTime = Date.now();
                if (currentTime - lastTime > 200) {
                     if(!document.getElementById('screen-exam').classList.contains('hidden')) {
                        console.warn("Execution Lag Detected"); 
                        // Optional: trigger warning if lag is persistent
                     }
                }
                lastTime = currentTime;
                requestAnimationFrame(detectLag);
            };
            requestAnimationFrame(detectLag);

            // 3. ADVANCED: Native Function Integrity Check
            setInterval(() => {
                Security.verifyNative();
            }, 5000);

            // 4. ADVANCED: DOM Tamper Detection
            Security.detectDOMTamper();
        },
        verifyNative: function() {
             const nativePattern = /\{\s*\[native code\]\s*\}/;
             const criticals = [JSON.parse, localStorage.getItem, Date.now, setInterval, requestAnimationFrame];
             for(let fn of criticals) {
                 if (!nativePattern.test(fn.toString())) {
                     Security.logViolation("Runtime Integrity Failure: Native Code Overwritten");
                     return;
                 }
             }
        },
        detectDOMTamper: function() {
            const target = document.getElementById('app-root');
            if(!target) return;

            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    const watermark = document.getElementById('exam-watermark');
                    const examScreenOpen = !document.getElementById('screen-exam').classList.contains('hidden');
                    
                    if (examScreenOpen && (!watermark || watermark.innerHTML.trim() === '')) {
                         generateWatermark(); 
                         Security.logViolation("DOM Tampering Detected: Watermark Removal");
                    }
                });
            });
            observer.observe(target, { childList: true, subtree: true, attributes: true });
        },
        logViolation: function(reason) {
            console.error(reason);
            triggerWarning();
        },
        hash: function(str) {
            let hash = 0;
            if (str.length === 0) return hash;
            for (let i = 0; i < str.length; i++) {
                const char = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash; 
            }
            return hash;
        },
        encryptStorage: function(data) {
            const jsonStr = JSON.stringify(data);
            const encoded = obfuscate(jsonStr);
            const signature = this.hash(encoded + SALT); 
            return JSON.stringify({ d: encoded, s: signature });
        },
        decryptStorage: function(rawStr) {
            try {
                if(!rawStr) return null;
                let packet;
                try { packet = JSON.parse(rawStr); } catch(e) { return null; }
                if (!packet.d || !packet.s) return null;
                
                const check = this.hash(packet.d + SALT);
                if (check !== packet.s) {
                    console.error("Storage Integrity Check Failed: Data Modified");
                    return null; 
                }
                return JSON.parse(deobfuscate(packet.d));
            } catch(e) { return null; }
        }
    };

    // 6. INITIALIZATION
    document.addEventListener('DOMContentLoaded', () => {
        // Freeze Security Object
        Object.freeze(Security);
        Security.init();
        setupEventListeners();
        renderPaperGrid();
        checkPreviousSession();
        window.addEventListener('resize', () => checkOrientation());
        window.addEventListener('beforeunload', (e) => {
            if(!document.getElementById('screen-exam').classList.contains('hidden')) { 
                e.preventDefault(); e.returnValue = ''; 
            }
        });
        
        // Populate Calculator Keys
        const keys = [
            'sin','cos','tan','C',
            '(',')','^','/',
            '7','8','9','*',
            '4','5','6','-',
            '1','2','3','+',
            '0','.','='
        ];
        const calcGrid = document.getElementById('calc-keys');
        keys.forEach(k => {
            const btn = document.createElement('button');
            btn.className = `calc-key p-2 rounded text-white font-bold ${k==='C'?'bg-red-600': k==='='?'bg-green-600': ['/','*','-','+'].includes(k)?'bg-orange-500':'bg-gray-600'}`;
            if(k==='0') btn.classList.add('col-span-2');
            btn.innerText = k;
            btn.onclick = () => calcInput(k);
            calcGrid.appendChild(btn);
        });
        setupCalculatorDrag();
    });

    // 7. EVENT LISTENERS WRAPPER
    function setupEventListeners() {
        // Full Screen Toggle for Landing Page
        const fsBtn = document.getElementById('btn-go-fullscreen');
        if(fsBtn) {
            fsBtn.onclick = () => {
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen().catch(e => console.error(e));
                    fsBtn.innerHTML = '<i class="fas fa-compress mr-2"></i> EXIT FULL SCREEN';
                } else {
                    if (document.exitFullscreen) document.exitFullscreen();
                    fsBtn.innerHTML = '<i class="fas fa-expand mr-2"></i> GO FULL SCREEN';
                }
            };
        }

        document.getElementById('resume-alert').onclick = resumeExamSession;
        document.getElementById('btn-close-inst').onclick = () => {
            document.getElementById('screen-instructions').classList.add('hidden');
            document.getElementById('screen-setup').classList.remove('hidden');
        };
        document.getElementById('btn-start-exam').onclick = confirmInstructions;
        
        document.getElementById('btn-toggle-calc').onclick = toggleCalculator;
        document.getElementById('btn-mob-calc').onclick = toggleCalculator;
        document.getElementById('btn-close-calc').onclick = toggleCalculator;
        
        document.getElementById('btn-show-qp').onclick = showQuestionPaper;
        document.getElementById('btn-mob-qp').onclick = showQuestionPaper;
        document.getElementById('btn-close-qp').onclick = () => document.getElementById('modal-qp').classList.add('hidden');
        
        document.getElementById('btn-font-inc').onclick = () => resizeFont(1);
        document.getElementById('btn-font-dec').onclick = () => resizeFont(-1);
        
        document.getElementById('btn-mobile-menu').onclick = () => document.getElementById('mobile-menu').classList.toggle('hidden');
        document.getElementById('btn-palette-mob').onclick = togglePaletteMobile;
        document.getElementById('palette-backdrop').onclick = togglePaletteMobile;
        document.getElementById('btn-close-palette').onclick = togglePaletteMobile;
        
        document.getElementById('btn-prev').onclick = prevQuestion;
        document.getElementById('btn-next').onclick = saveAndNext;
        document.getElementById('btn-clear').onclick = clearResponse;
        document.getElementById('btn-review').onclick = markForReview;
        
        document.getElementById('btn-submit-main').onclick = () => document.getElementById('modal-submit').classList.remove('hidden');
        document.getElementById('btn-cancel-submit').onclick = () => document.getElementById('modal-submit').classList.add('hidden');
        document.getElementById('btn-confirm-submit').onclick = finishExam;
        
        document.getElementById('btn-retake').onclick = retakeTest;
        document.getElementById('btn-home').onclick = clearSessionAndHome;
        
        document.getElementById('btn-resume-warning').onclick = resumeExam;
        
        document.getElementById('lightbox-modal').onclick = closeLightbox;
        document.getElementById('btn-close-lightbox').onclick = closeLightbox;
    }

    // 8. LOGIC IMPLEMENTATION
    
    // NEW: Get or Generate Shuffled Paper Order for this Device
    function getPaperOrder() {
        try {
            const savedOrder = localStorage.getItem(PAPER_ORDER_KEY);
            if (savedOrder) {
                const decrypted = Security.decryptStorage(savedOrder);
                if (Array.isArray(decrypted) && decrypted.length === 5) {
                    return decrypted;
                }
            }
        } catch(e) { console.error("Error retrieving paper order", e); }

        // Generate new shuffled order
        const order = Array.from({length: 5}, (_, i) => i + 1);
        // Fisher-Yates Shuffle
        for (let i = order.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [order[i], order[j]] = [order[j], order[i]];
        }
        
        // Save
        localStorage.setItem(PAPER_ORDER_KEY, Security.encryptStorage(order));
        return order;
    }

    function renderPaperGrid() {
        const grid = document.getElementById('paper-grid');
        const order = getPaperOrder();
        
        let history = {};
        try {
            const rawHist = localStorage.getItem(HISTORY_KEY);
            if (rawHist) {
                const decrypted = Security.decryptStorage(rawHist);
                if (decrypted) history = decrypted;
            }
        } catch (e) { console.error("History corrupted or empty", e); }
        
        grid.innerHTML = order.map((pid, index) => {
            const prev = history[pid] || history[String(pid)];
            
            // SHUFFLED SEQUENCE LOGIC:
            const prevPidInSequence = index > 0 ? order[index - 1] : null;
            const isPrevCompleted = index === 0 || (prevPidInSequence && (history[prevPidInSequence] !== undefined || history[String(prevPidInSequence)] !== undefined));

            // DISPLAY LOGIC: Show sequential Index (1, 2, 3...) instead of random PID
            const displayNum = index + 1;

            if (prev) {
                // COMPLETED CARD
                return `
                <div class="bg-slate-800 border border-slate-600 rounded-xl p-4 relative group overflow-hidden shadow-lg">
                    <div class="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg uppercase">Completed</div>
                    <h3 class="text-white text-base font-bold mb-2">Paper ${displayNum}</h3>
                    <div class="mb-3 bg-slate-900/50 rounded p-2 border border-slate-700">
                        <div class="text-slate-400 text-[10px] uppercase font-bold">Previous Score</div>
                        <div class="flex items-baseline space-x-2">
                            <span class="text-xl font-bold ${prev.score >= 0 ? 'text-emerald-400' : 'text-red-400'}">${prev.score}</span>
                            <span class="text-[10px] text-slate-500">/ 300</span>
                        </div>
                    </div>
                    <button data-pid="${pid}" class="btn-prepare w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded transition">Retake Exam</button>
                </div>`;
            } else if (isPrevCompleted) {
                // UNLOCKED CARD
                return `
                <div class="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition cursor-pointer group relative overflow-hidden" data-pid="${pid}">
                    <div class="absolute top-0 right-0 bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-bl-lg">UNLOCKED</div>
                    <h3 class="text-gray-800 text-lg font-bold mb-1">Mock Paper ${displayNum}</h3>
                    <p class="text-gray-500 text-xs mb-3">Physics • Chem • Math</p>
                    <div class="w-full bg-blue-50 text-blue-600 text-center py-1.5 rounded text-xs font-bold group-hover:bg-blue-600 group-hover:text-white transition">Start Test</div>
                </div>`;
            } else {
                // LOCKED CARD
                return `
                <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 opacity-60 relative overflow-hidden cursor-not-allowed select-none">
                    <div class="absolute top-2 right-2 text-gray-400"><i class="fas fa-lock"></i></div>
                    <h3 class="text-gray-400 text-lg font-bold mb-1">Mock Paper ${displayNum}</h3>
                    <p class="text-gray-400 text-xs mb-3">Locked</p>
                    <div class="w-full bg-gray-200 text-gray-400 text-center py-1.5 rounded text-xs font-bold flex items-center justify-center">
                        <i class="fas fa-lock mr-2"></i> Complete Previous
                    </div>
                </div>`;
            }
        }).join('');
        
        // Delegate Clicks
        grid.querySelectorAll('[data-pid]').forEach(el => {
            el.onclick = (e) => {
                let pid = el.getAttribute('data-pid');
                if(!pid) pid = e.target.closest('[data-pid]').getAttribute('data-pid');
                preparePaper(parseInt(pid));
            };
        });
    }

    function preparePaper(id) {
        STATE.tempPaper = generatePaperByID(id);
        document.getElementById('inst-paper-name').innerText = STATE.tempPaper.title;
        document.getElementById('screen-setup').classList.add('hidden');
        document.getElementById('screen-instructions').classList.remove('hidden');
    }

    function confirmInstructions() { startExam(STATE.tempPaper); }
    function checkPreviousSession() { if(localStorage.getItem(SESSION_KEY)) document.getElementById('resume-alert').classList.remove('hidden'); }
    
    function resumeExamSession() {
        const savedRaw = localStorage.getItem(SESSION_KEY);
        if(!savedRaw) return;
        const saved = Security.decryptStorage(savedRaw);
        if(!saved) { alert("Session corrupted"); localStorage.removeItem(SESSION_KEY); return; }
        
        Object.assign(STATE, saved);
        
        // FIX: Rebuild flatQuestions from the saved paper structure
        if (STATE.paper && STATE.paper.sections) {
            STATE.flatQuestions = [];
            STATE.paper.sections.forEach((sec, sIdx) => {
                sec.questions.forEach((q, qIdx) => {
                    STATE.flatQuestions.push({ ...q, sectionIndex: sIdx, localIndex: qIdx, sectionName: sec.name });
                });
            });
        }

        document.getElementById('screen-setup').classList.add('hidden');
        document.getElementById('screen-instructions').classList.add('hidden');
        document.getElementById('screen-exam').classList.remove('hidden');
        document.getElementById('screen-exam').classList.add('flex');
        document.getElementById('exam-name-display').innerText = STATE.paper.title;
        enableProctoring();
        checkOrientation();
        renderSubjectTabs();
        startTimer();
        loadQuestion(saved.questionGlobalIndex);
    }

    function startExam(paper) {
        STATE.paper = paper;
        STATE.timeRemaining = paper.durationMinutes * 60;
        STATE.warnings = 0;
        STATE.answers = {};
        STATE.flatQuestions = [];
        STATE.fontSize = 1;

        paper.sections.forEach((sec, sIdx) => {
            // NEW: Shuffle questions within each section
            const questions = [...sec.questions];
            
            // Fisher-Yates Shuffle
            for (let i = questions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [questions[i], questions[j]] = [questions[j], questions[i]];
            }
            
            // FIX: Update the section in the paper object so the shuffle is persisted in STATE.paper
            sec.questions = questions;

            questions.forEach((q, qIdx) => {
                // localIndex is reset based on new shuffled position (0, 1, 2...)
                STATE.flatQuestions.push({ ...q, sectionIndex: sIdx, localIndex: qIdx, sectionName: sec.name });
                STATE.answers[q.id] = { value: null, status: 'not-visited' };
            });
        });

        document.getElementById('screen-instructions').classList.add('hidden');
        document.getElementById('screen-exam').classList.remove('hidden');
        document.getElementById('screen-exam').classList.add('flex');
        document.getElementById('exam-name-display').innerText = paper.title;

        generateWatermark();
        enableProctoring();
        checkOrientation();
        renderSubjectTabs();
        startTimer();
        loadQuestion(0);
        saveSession();
    }

    function loadQuestion(index) {
        if(index < 0 || index >= STATE.flatQuestions.length) return;
        STATE.questionGlobalIndex = index;
        const q = STATE.flatQuestions[index];
        STATE.sectionIndex = q.sectionIndex;

        document.querySelectorAll('#subject-tabs button').forEach((btn, idx) => {
            btn.className = idx === q.sectionIndex ? "whitespace-nowrap px-3 py-1.5 rounded text-xs font-medium transition bg-blue-600 text-white shadow" : "whitespace-nowrap px-3 py-1.5 rounded text-xs font-medium transition bg-white text-gray-600 hover:bg-gray-100";
        });

        const ans = STATE.answers[q.id];
        if(ans.status === 'not-visited') ans.status = 'not-answered';

        document.getElementById('q-num').innerText = q.localIndex + 1;
        document.getElementById('q-type-badge').innerText = q.type;
        document.getElementById('section-badge').innerText = q.section;
        
        const contentDiv = document.getElementById('question-text');
        contentDiv.innerHTML = q.content;
        contentDiv.style.fontSize = `${STATE.fontSize}rem`;

        const optsDiv = document.getElementById('options-area');
        optsDiv.innerHTML = '';
        optsDiv.style.fontSize = `${STATE.fontSize}rem`;

        if(q.type === 'MCQ') {
            q.options.forEach((opt, i) => {
                const isSel = ans.value === i;
                const optEl = document.createElement('div');
                optEl.className = `flex items-start p-3 border rounded-lg cursor-pointer hover:bg-blue-50 ${isSel ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-200'}`;
                optEl.innerHTML = `<div class="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center mr-3 ${isSel ? 'bg-blue-600 border-blue-600' : 'bg-white'} shrink-0 mt-0.5">${isSel ? '<div class="h-1.5 w-1.5 rounded-full bg-white"></div>' : ''}</div><div class="text-gray-700 font-medium w-full text-sm">${opt}</div>`;
                optEl.onclick = () => selectOption(i);
                optsDiv.appendChild(optEl);
            });
        } else {
            const wrap = document.createElement('div');
            wrap.className = 'flex flex-col';
            wrap.innerHTML = `<label class="text-sm font-bold text-gray-600 mb-2">Enter Answer:</label>`;
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'p-3 border rounded focus:border-blue-500 outline-none w-full md:w-48 font-mono text-lg';
            input.placeholder = 'Answer...';
            input.value = ans.value || '';
            input.oninput = (e) => inputNumerical(e.target.value);
            wrap.appendChild(input);
            optsDiv.appendChild(wrap);
        }

        renderPalette();
        renderMathInElement(document.getElementById('question-area'), { delimiters: [{left: "\\(", right: "\\)", display: false}] });
        setupImageLightbox();
        
        document.getElementById('btn-prev').disabled = index === 0;
        document.getElementById('btn-next').innerText = index === STATE.flatQuestions.length - 1 ? 'Save & Submit' : 'Save & Next';
        saveSession(); 
    }

    function selectOption(idx) { STATE.answers[STATE.flatQuestions[STATE.questionGlobalIndex].id].value = idx; loadQuestion(STATE.questionGlobalIndex); }
    function inputNumerical(val) { STATE.answers[STATE.flatQuestions[STATE.questionGlobalIndex].id].value = val; }
    
    function saveAndNext() {
        const ans = STATE.answers[STATE.flatQuestions[STATE.questionGlobalIndex].id];
        if(ans.value !== null && ans.value !== "") ans.status = (ans.status.includes('marked')) ? 'marked-answered' : 'answered';
        else if(!ans.status.includes('marked')) ans.status = 'not-answered';
        
        if(STATE.questionGlobalIndex < STATE.flatQuestions.length - 1) loadQuestion(STATE.questionGlobalIndex + 1);
        else document.getElementById('modal-submit').classList.remove('hidden');
    }
    
    function prevQuestion() { loadQuestion(STATE.questionGlobalIndex - 1); }
    function markForReview() {
        const ans = STATE.answers[STATE.flatQuestions[STATE.questionGlobalIndex].id];
        ans.status = (ans.value !== null && ans.value !== "") ? 'marked-answered' : 'marked';
        loadQuestion(STATE.questionGlobalIndex + 1);
    }
    function clearResponse() {
        const ans = STATE.answers[STATE.flatQuestions[STATE.questionGlobalIndex].id];
        ans.value = null; ans.status = 'not-answered';
        loadQuestion(STATE.questionGlobalIndex);
    }
    function resizeFont(d) { STATE.fontSize = Math.min(1.5, Math.max(0.8, STATE.fontSize + d * 0.1)); loadQuestion(STATE.questionGlobalIndex); }

    function renderPalette() {
        const questions = STATE.flatQuestions.filter(q => q.sectionIndex === STATE.sectionIndex);
        document.getElementById('palette-section-title').innerText = questions[0].sectionName;
        document.getElementById('question-grid').innerHTML = questions.map(q => {
            const ans = STATE.answers[q.id];
            let cls = "status-btn ";
            if(STATE.questionGlobalIndex === STATE.flatQuestions.indexOf(q)) cls += "st-current ";
            if(ans.status === 'answered') cls += "st-answered";
            else if(ans.status === 'not-answered') cls += "st-not-answered";
            else if(ans.status === 'marked') cls += "st-marked";
            else if(ans.status === 'marked-answered') cls += "st-marked-answered";
            else cls += "st-not-visited";
            
            // Create element to add click listener safely
            return `<div data-idx="${STATE.flatQuestions.indexOf(q)}" class="${cls}">${q.localIndex + 1}</div>`;
        }).join('');
        
        document.querySelectorAll('#question-grid div').forEach(el => {
            el.onclick = () => loadQuestion(parseInt(el.getAttribute('data-idx')));
        });
    }

    function renderSubjectTabs() {
        document.getElementById('subject-tabs').innerHTML = STATE.paper.sections.map((sec, idx) => `
            <button data-sec="${idx}" class="whitespace-nowrap px-3 py-1.5 rounded text-xs font-medium transition bg-white text-gray-600 hover:bg-gray-100">${sec.name}</button>
        `).join('');
        document.querySelectorAll('#subject-tabs button').forEach(el => {
            el.onclick = () => switchSection(parseInt(el.getAttribute('data-sec')));
        });
    }

    function switchSection(secIdx) {
        const idx = STATE.flatQuestions.findIndex(q => q.sectionIndex === secIdx);
        if(idx !== -1) loadQuestion(idx);
    }

    function finishExam() {
        clearInterval(STATE.timerInterval);
        disableProctoring();
        localStorage.removeItem(SESSION_KEY);
        document.getElementById('screen-exam').classList.add('hidden');
        document.getElementById('modal-submit').classList.add('hidden');
        document.getElementById('screen-result').classList.remove('hidden');

        let score = 0, correct = 0, wrong = 0;
        let tbody = document.getElementById('result-table-body');
        tbody.innerHTML = '';
        
        STATE.flatQuestions.forEach((q, idx) => {
            const ans = STATE.answers[q.id];
            let st = "Unattempted", rowClass = "";
            let userDisp = "-";
            let resultStatus = "Neutral";
            
            // Secure Comparison using Hashed Values
            const correctHash = q.answerHash;
            let userHash = "";
            
            if (ans.value !== null && ans.value !== "") {
                userHash = obfuscate(String(ans.value));
                if (q.type === 'MCQ') userDisp = q.options[ans.value];
                else userDisp = ans.value;
                
                if (userHash === correctHash) {
                    score += CONFIG.marksCorrect; correct++; resultStatus = "Correct"; rowClass = "bg-green-50";
                } else {
                    score += CONFIG.marksWrong; wrong++; resultStatus = "Wrong"; rowClass = "bg-red-50";
                }
            }

            const trunc = (str) => String(str).length > 20 ? String(str).substring(0,20)+'...' : str;
            tbody.innerHTML += `<tr class="border-b ${rowClass}"><td class="p-2 md:p-4">${idx+1}</td><td class="p-2 md:p-4 font-bold">${resultStatus}</td><td class="p-2 md:p-4">${trunc(userDisp)}</td></tr>`;
        });

        document.getElementById('res-score').innerText = score;
        document.getElementById('res-correct').innerText = correct;
        document.getElementById('res-wrong').innerText = wrong;

        // SECURITY UPDATE: Encrypt History Data before saving
        // Improved error handling to ensure data is saved
        try {
            let hist = {};
            const rawHist = localStorage.getItem(HISTORY_KEY);
            if (rawHist) {
                const decrypted = Security.decryptStorage(rawHist);
                if (decrypted) hist = decrypted;
            }
            
            // Ensure ID is valid
            const paperId = STATE.paper && STATE.paper.id ? STATE.paper.id : 0;
            if(paperId > 0) {
                hist[paperId] = { score, maxScore: 300, timestamp: new Date().toISOString() };
                localStorage.setItem(HISTORY_KEY, Security.encryptStorage(hist));
            } else {
                console.error("Invalid Paper ID, cannot save history");
            }
        } catch(e) {
            console.error("Failed to save history:", e);
        }
    }

    function retakeTest() {
        const pid = STATE.paper.id;
        localStorage.removeItem(SESSION_KEY);
        document.getElementById('screen-result').classList.add('hidden');
        preparePaper(pid);
        confirmInstructions();
    }
    
    function clearSessionAndHome() { localStorage.removeItem(SESSION_KEY); location.reload(); }

    function startTimer() {
        if(STATE.timerInterval) clearInterval(STATE.timerInterval);
        STATE.timerInterval = setInterval(() => {
            STATE.timeRemaining--;
            saveSession();
            if(STATE.timeRemaining <= 0) finishExam();
            const h = Math.floor(STATE.timeRemaining / 3600);
            const m = Math.floor((STATE.timeRemaining % 3600) / 60);
            const s = STATE.timeRemaining % 60;
            document.getElementById('timer-display').innerText = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
        }, 1000);
    }

    function saveSession() {
        // Securely Encrypt Session Data
        const cleanState = {
            paper: STATE.paper, timeRemaining: STATE.timeRemaining, answers: STATE.answers,
            questionGlobalIndex: STATE.questionGlobalIndex, warnings: STATE.warnings
        };
        localStorage.setItem(SESSION_KEY, Security.encryptStorage(cleanState));
    }

    // PROCTORING LOGIC
    function enableProctoring() {
        const elem = document.documentElement;
        if (elem.requestFullscreen) elem.requestFullscreen().catch(()=>{});
        document.addEventListener("visibilitychange", visibilityHandler);
        window.addEventListener("blur", triggerWarning);
    }
    
    function disableProctoring() {
        if(document.exitFullscreen) document.exitFullscreen().catch(()=>{});
        document.removeEventListener("visibilitychange", visibilityHandler);
        window.removeEventListener("blur", triggerWarning);
    }
    
    function visibilityHandler() { if(document.hidden) triggerWarning(); }
    
    function triggerWarning() {
        if(document.getElementById('screen-exam').classList.contains('hidden') || !document.getElementById('modal-warning').classList.contains('hidden')) return;
        STATE.warnings++;
        document.getElementById('warning-count').innerText = STATE.warnings;
        saveSession();
        if (STATE.warnings > CONFIG.maxWarnings) { 
            disableProctoring(); 
            alert("Maximum security violations reached. Exam auto-submitted."); 
            finishExam(); 
        } 
        else document.getElementById('modal-warning').classList.remove('hidden');
    }
    
    function resumeExam() {
        const elem = document.documentElement;
        if (elem.requestFullscreen) elem.requestFullscreen().catch(()=>{});
        document.getElementById('modal-warning').classList.add('hidden');
    }

    function checkOrientation() {
        const overlay = document.getElementById('orientation-overlay');
        // Only enforce landscape if the exam screen is active
        if(document.getElementById('screen-exam').classList.contains('hidden')) { 
            overlay.classList.add('hidden'); 
            return; 
        }
        
        // Check aspect ratio: if height > width, show overlay
        if(window.innerHeight > window.innerWidth) {
            overlay.classList.remove('hidden');
        } else {
            overlay.classList.add('hidden');
        }
    }

    function generateWatermark() {
        const c = document.getElementById('exam-watermark');
        c.innerHTML = "";
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        const dateString = now.toLocaleDateString();
        const userString = "JEEPREMIUM"; // This could be dynamic if user login is implemented

        // Denser watermark pattern
        const count = 50; 
        let html = "";
        for(let i=0; i<count; i++) {
            html += `
            <div class="watermark-item">
                <div>ID: ${userString}</div>
                <div class="watermark-ts">${dateString} ${timeString}</div>
            </div>`;
        }
        c.innerHTML = html;
        
        // Update timestamp periodically
        setTimeout(generateWatermark, 60000);
    }

    // UTILS
    function toggleCalculator() { document.getElementById('calc-modal').classList.toggle('hidden'); document.getElementById('mobile-menu').classList.add('hidden'); }
    function togglePaletteMobile() { document.getElementById('palette-sidebar').classList.toggle('translate-x-full'); document.getElementById('palette-backdrop').classList.toggle('hidden'); }
    function showQuestionPaper() {
        const content = document.getElementById('qp-content');
        content.innerHTML = STATE.flatQuestions.map((q, idx) => `
            <div class="mb-4 border-b pb-2"><div class="font-bold text-gray-700 mb-1">Q${idx+1}. ${q.type}</div><div class="mb-1">${q.content}</div></div>`).join('');
        
        // Fix: Render math inside the modal content
        renderMathInElement(content, { delimiters: [{left: "\\(", right: "\\)", display: false}] });
        
        document.getElementById('modal-qp').classList.remove('hidden');
    }
    
    let calcExp = "";
    function calcInput(v) { if(v === 'C') calcExp = ""; else calcExp += v; document.getElementById('calc-display').value = calcExp; }
    
    function setupCalculatorDrag() {
        const el = document.getElementById('calc-modal'), h = document.getElementById('calc-header');
        let isDown = false, off = [0,0];
        const start = (x,y) => { isDown = true; off = [el.offsetLeft - x, el.offsetTop - y]; };
        const move = (x,y) => { if(isDown) { el.style.left = (x + off[0]) + 'px'; el.style.top = (y + off[1]) + 'px'; }};
        h.addEventListener('mousedown', e => start(e.clientX, e.clientY));
        document.addEventListener('mouseup', () => isDown = false);
        document.addEventListener('mousemove', e => move(e.clientX, e.clientY));
        h.addEventListener('touchstart', e => start(e.touches[0].clientX, e.touches[0].clientY));
        document.addEventListener('touchend', () => isDown = false);
        document.addEventListener('touchmove', e => move(e.touches[0].clientX, e.touches[0].clientY));
    }
    
    function closeLightbox() { document.getElementById('lightbox-modal').classList.add('hidden'); }
    function setupImageLightbox() {
        document.querySelectorAll('#question-text img, #options-area img').forEach(img => {
            img.onclick = (e) => { e.stopPropagation(); document.getElementById('lightbox-img').src = img.src; document.getElementById('lightbox-modal').classList.remove('hidden'); };
            img.onerror = function() {
                this.onerror = null;
                this.parentElement.innerHTML += '<div class="text-xs text-red-500 italic text-center p-2 border border-red-200 bg-red-50 rounded mt-2">Image Error</div>';
                this.style.display = 'none';
            };
        });
    }

})();