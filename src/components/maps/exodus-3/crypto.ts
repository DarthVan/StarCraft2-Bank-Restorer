import { sc2_initZeroArray, sc2_StringFind, sc2_StringLength, sc2_StringSub } from "@src/core/sc2";

const lib13390EF9_KEY_SIZE: number = 16;
const lib13390EF9_key: Uint8Array = new Uint8Array(lib13390EF9_KEY_SIZE);
let lib13390EF9_inputSize: number = 0;
const lib13390EF9_inputData: Uint8Array = new Uint8Array(4096);
const lib13390EF9_HexTable: string[] = new Array(16);
const lib13390EF9_ASCIITable: string[] = new Array(255);
const lib13390EF9_sbox: Uint8Array = new Uint8Array(256);
const lib13390EF9_rsbox: Uint8Array = new Uint8Array(256);
const lib13390EF9_rcon: Uint8Array = new Uint8Array(11);


// Binary conversion
/* function lib13390EF9_denaryToBinary(lp_i: number): string {
  let lv_binaryOutput: string = "";

  while (lp_i > 0) {
    lv_binaryOutput = sc2_ModI(lp_i, 2) + lv_binaryOutput;
    lp_i = Math.floor(sc2_div(lp_i, 2));
  }

  return lv_binaryOutput;
}

function lib13390EF9_binaryToDenary(lp_i: number): string {
  let lv_denaryOutput: number = 0;
  let lv_remainder: number;
  let lv_i: number = 0;

  while (lp_i > 0) {
    lv_remainder = sc2_ModI(lp_i, 10);
    lp_i = Math.floor(sc2_div(lp_i, 10));
    lv_denaryOutput += sc2_mult(lv_remainder, sc2_PowI(2, lv_i));
    lv_i += 1;
  }

  return String(lv_denaryOutput);
} */


//ASCII conversion
const lib13390EF9_asciiTable: string = "\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f\x20\x21\x22\x23\x24\x25\x26\x27\x28\x29\x2a\x2b\x2c\x2d\x2e\x2f\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x3a\x3b\x3c\x3d\x3e\x3f\x40\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4a\x4b\x4c\x4d\x4e\x4f\x50\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5a\x5b\x5c\x5d\x5e\x5f\x60\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6a\x6b\x6c\x6d\x6e\x6f\x70\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7a\x7b\x7c\x7d\x7e\x7f\x80\x81\x82\x83\x84\x85\x86\x87\x88\x89\x8a\x8b\x8c\x8d\x8e\x8f\x90\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9a\x9b\x9c\x9d\x9e\x9f\xa0\xa1\xa2\xa3\xa4\xa5\xa6\xa7\xa8\xa9\xaa\xab\xac\xad\xae\xaf\xb0\xb1\xb2\xb3\xb4\xb5\xb6\xb7\xb8\xb9\xba\xbb\xbc\xbd\xbe\xbf\xc0\xc1\xc2\xc3\xc4\xc5\xc6\xc7\xc8\xc9\xca\xcb\xcc\xcd\xce\xcf\xd0\xd1\xd2\xd3\xd4\xd5\xd6\xd7\xd8\xd9\xda\xdb\xdc\xdd\xde\xdf\xe0\xe1\xe2\xe3\xe4\xe5\xe6\xe7\xe8\xe9\xea\xeb\xec\xed\xee\xef\xf0\xf1\xf2\xf3\xf4\xf5\xf6\xf7\xf8\xf9\xfa\xfb\xfc\xfd\xfe\xff";

function lib13390EF9_CharToAsciiCode(charContainingString: string, charPosition: number): number {
  return sc2_StringFind(lib13390EF9_asciiTable, sc2_StringSub(charContainingString, charPosition + 1, charPosition + 1), true);
}

function lib13390EF9_decToASCII(num: number): string {
  //console.log('decToASCII ' + num + ':', lib13390EF9_ASCIITable[num]);
  return lib13390EF9_ASCIITable[num];
}


//Hex Conversion
const lib13390EF9_hexString: string = "0123456789abcdef";

function lib13390EF9_hexToByte(input: string): number {
  const lv_hexVal: string = sc2_StringSub(input, 1, 1);
  const lv_hexVal2: string = sc2_StringSub(input, 2, 2);
  const lv_hexPos: number = sc2_StringFind(lib13390EF9_hexString, lv_hexVal, false) - 1;
  const lv_hexPos2: number = sc2_StringFind(lib13390EF9_hexString, lv_hexVal2, false) - 1;

  return lv_hexPos * 16 + lv_hexPos2;
}

function lib13390EF9_charToHex(num: number): string {
  return lib13390EF9_HexTable[num];
}

function lib13390EF9_denaryToHex(i: number): string {
  let lv_output: string = "";
  lv_output += lib13390EF9_charToHex((i & 0x000000F0) >> 4);
  lv_output += lib13390EF9_charToHex(i & 0x0000000F);
  return lv_output;
}

const lib13390EF9_Nb: number = 4; // # of columns in AES
const lib13390EF9_Nk: number = 4; // # of 32-bit words in key
const lib13390EF9_Nr: number = 10; // # of rounds in AES 128-bit Cipher
const lib13390EF9_state_t: Uint8Array[] = [
  new Uint8Array(4),
  new Uint8Array(4),
  new Uint8Array(4),
  new Uint8Array(4)
];
const lib13390EF9_RoundKey: Uint8Array = new Uint8Array(256);

function lib13390EF9_getSBoxValue(n: number): number {
  return lib13390EF9_sbox[n];
}

function lib13390EF9_getRSBoxValue(n: number): number {
  return lib13390EF9_rsbox[n];
}

function lib13390EF9_KeyExpansion() {
  let lv_i: number;
  let lv_j: number;
  let lv_k: number;
  let tmp: number;

  const tempA: Uint16Array = new Uint16Array(4);
  for (lv_i = 0; lv_i < lib13390EF9_Nk; lv_i += 1) {
    lib13390EF9_RoundKey[(lv_i * 4) + 0] = lib13390EF9_key[(lv_i * 4) + 0];
    lib13390EF9_RoundKey[(lv_i * 4) + 1] = lib13390EF9_key[(lv_i * 4) + 1];
    lib13390EF9_RoundKey[(lv_i * 4) + 2] = lib13390EF9_key[(lv_i * 4) + 2];
    lib13390EF9_RoundKey[(lv_i * 4) + 3] = lib13390EF9_key[(lv_i * 4) + 3];
  }

  for (lv_i = 4; lv_i < 44; lv_i += 1) {
    lv_k = (lv_i - 1) * 4; // temp
    tempA[0] = lib13390EF9_RoundKey[lv_k + 0];
    tempA[1] = lib13390EF9_RoundKey[lv_k + 1];
    tempA[2] = lib13390EF9_RoundKey[lv_k + 2];
    tempA[3] = lib13390EF9_RoundKey[lv_k + 3];

    if (lv_i % 4 == 0) {
      // RotWord
      tmp = tempA[0];
      tempA[0] = tempA[1];
      tempA[1] = tempA[2];
      tempA[2] = tempA[3];
      tempA[3] = tmp;

      // SubWord
      tempA[0] = lib13390EF9_getSBoxValue(tempA[0]);
      tempA[1] = lib13390EF9_getSBoxValue(tempA[1]);
      tempA[2] = lib13390EF9_getSBoxValue(tempA[2]);
      tempA[3] = lib13390EF9_getSBoxValue(tempA[3]);

      tempA[0] = tempA[0] ^ lib13390EF9_rcon[lv_i / lib13390EF9_Nk];
    }

    lv_j = lv_i - 4;
    lv_k = (lv_i - lib13390EF9_Nk) * 4;

    lib13390EF9_RoundKey[lv_j + 0] = lib13390EF9_RoundKey[lv_k + 0] ^ tempA[0];
    lib13390EF9_RoundKey[lv_j + 1] = lib13390EF9_RoundKey[lv_k + 1] ^ tempA[1];
    lib13390EF9_RoundKey[lv_j + 2] = lib13390EF9_RoundKey[lv_k + 2] ^ tempA[2];
    lib13390EF9_RoundKey[lv_j + 3] = lib13390EF9_RoundKey[lv_k + 3] ^ tempA[3];
  }
}

function lib13390EF9_AddRoundKey(round: number): void {
  for (let lv_i: number = 0; lv_i < 4; lv_i += 1)
    for (let lv_j: number = 0; lv_j < 4; lv_j += 1)
      lib13390EF9_state_t[lv_i][lv_j] ^= lib13390EF9_RoundKey[(round * lib13390EF9_Nb * 4) + (lv_i * lib13390EF9_Nb) + lv_j];
}

function lib13390EF9_SubBytes(): void {
  for (let lv_i: number = 0; lv_i < 4; lv_i += 1)
    for (let lv_j: number = 0; lv_j < 4; lv_j += 1)
      lib13390EF9_state_t[lv_j][lv_i] = lib13390EF9_getSBoxValue(lib13390EF9_state_t[lv_j][lv_i]);
}

function lib13390EF9_ShiftRows(): void {
  let lv_temp: number;

  // rotate row 1 column left
  lv_temp = lib13390EF9_state_t[0][1];
  lib13390EF9_state_t[0][1] = lib13390EF9_state_t[1][1];
  lib13390EF9_state_t[1][1] = lib13390EF9_state_t[2][1];
  lib13390EF9_state_t[2][1] = lib13390EF9_state_t[3][1];
  lib13390EF9_state_t[3][1] = lv_temp;

  // rotate row 2 column left
  lv_temp = lib13390EF9_state_t[0][2];
  lib13390EF9_state_t[0][2] = lib13390EF9_state_t[2][2];
  lib13390EF9_state_t[2][2] = lv_temp;
  lv_temp = lib13390EF9_state_t[1][2];
  lib13390EF9_state_t[1][2] = lib13390EF9_state_t[3][2];
  lib13390EF9_state_t[3][2] = lv_temp;

  // rotate row 3 column left
  lv_temp = lib13390EF9_state_t[0][3];
  lib13390EF9_state_t[0][3] = lib13390EF9_state_t[3][3];
  lib13390EF9_state_t[3][3] = lib13390EF9_state_t[2][3];
  lib13390EF9_state_t[2][3] = lib13390EF9_state_t[1][3];
  lib13390EF9_state_t[1][3] = lv_temp;
}

function lib13390EF9_xtime(x: number): number {
  let andByte: number = 1;
  let mul: number = 0x1b;
  let result: number = (x >> 7) & andByte;
  result *= mul;
  result ^= (x << 1);

  return result;
}

function lib13390EF9_multiply(x: number, y: number): number {
  let result: number = 0;
  let andByte: number = 1;

  result += (((y & andByte) * x) ^
    ((y >> 1 & andByte) * lib13390EF9_xtime(x)) ^
    ((y >> 2 & andByte) * lib13390EF9_xtime(lib13390EF9_xtime(x))) ^
    ((y >> 3 & andByte) * lib13390EF9_xtime(lib13390EF9_xtime(lib13390EF9_xtime(x)))) ^
    ((y >> 4 & andByte) * lib13390EF9_xtime(lib13390EF9_xtime(lib13390EF9_xtime(lib13390EF9_xtime(x))))));

  return result;
}

function lib13390EF9_MixColumns(): void {
  let lv_a: number;
  let lv_b: number;
  let lv_c: number;
  let lv_d: number;

  for (let lv_i: number = 0; lv_i < 4; lv_i += 1) {
    lv_a = lib13390EF9_state_t[lv_i][0];
    lv_b = lib13390EF9_state_t[lv_i][1];
    lv_c = lib13390EF9_state_t[lv_i][2];
    lv_d = lib13390EF9_state_t[lv_i][3];
    lib13390EF9_state_t[lv_i][0] = lib13390EF9_multiply(lv_a, 0x02) ^ lib13390EF9_multiply(lv_b, 0x03) ^ lib13390EF9_multiply(lv_c, 0x01) ^ lib13390EF9_multiply(lv_d, 0x01);
    lib13390EF9_state_t[lv_i][1] = lib13390EF9_multiply(lv_a, 0x01) ^ lib13390EF9_multiply(lv_b, 0x02) ^ lib13390EF9_multiply(lv_c, 0x03) ^ lib13390EF9_multiply(lv_d, 0x01);
    lib13390EF9_state_t[lv_i][2] = lib13390EF9_multiply(lv_a, 0x01) ^ lib13390EF9_multiply(lv_b, 0x01) ^ lib13390EF9_multiply(lv_c, 0x02) ^ lib13390EF9_multiply(lv_d, 0x03);
    lib13390EF9_state_t[lv_i][3] = lib13390EF9_multiply(lv_a, 0x03) ^ lib13390EF9_multiply(lv_b, 0x01) ^ lib13390EF9_multiply(lv_c, 0x01) ^ lib13390EF9_multiply(lv_d, 0x02);
  }
}

function lib13390EF9_InvMixColumns(): void {
  let lv_a: number;
  let lv_b: number;
  let lv_c: number;
  let lv_d: number;

  for (let lv_i: number = 0; lv_i < 4; lv_i += 1) {
    lv_a = lib13390EF9_state_t[lv_i][0];
    lv_b = lib13390EF9_state_t[lv_i][1];
    lv_c = lib13390EF9_state_t[lv_i][2];
    lv_d = lib13390EF9_state_t[lv_i][3];
    lib13390EF9_state_t[lv_i][0] = lib13390EF9_multiply(lv_a, 0x0e) ^ lib13390EF9_multiply(lv_b, 0x0b) ^ lib13390EF9_multiply(lv_c, 0x0d) ^ lib13390EF9_multiply(lv_d, 0x09);
    lib13390EF9_state_t[lv_i][1] = lib13390EF9_multiply(lv_a, 0x09) ^ lib13390EF9_multiply(lv_b, 0x0e) ^ lib13390EF9_multiply(lv_c, 0x0b) ^ lib13390EF9_multiply(lv_d, 0x0d);
    lib13390EF9_state_t[lv_i][2] = lib13390EF9_multiply(lv_a, 0x0d) ^ lib13390EF9_multiply(lv_b, 0x09) ^ lib13390EF9_multiply(lv_c, 0x0e) ^ lib13390EF9_multiply(lv_d, 0x0b);
    lib13390EF9_state_t[lv_i][3] = lib13390EF9_multiply(lv_a, 0x0b) ^ lib13390EF9_multiply(lv_b, 0x0d) ^ lib13390EF9_multiply(lv_c, 0x09) ^ lib13390EF9_multiply(lv_d, 0x0e);
  }
}

function lib13390EF9_InvSubBytes(): void {
  for (let lv_i: number = 0; lv_i < 4; lv_i += 1)
    for (let lv_j: number = 0; lv_j < 4; lv_j += 1)
      lib13390EF9_state_t[lv_j][lv_i] = lib13390EF9_getRSBoxValue(lib13390EF9_state_t[lv_j][lv_i]);
}

function lib13390EF9_InvShiftRows(): void {
  let lv_temp: number;

  // Rotate row 1
  lv_temp = lib13390EF9_state_t[3][1];
  lib13390EF9_state_t[3][1] = lib13390EF9_state_t[2][1];
  lib13390EF9_state_t[2][1] = lib13390EF9_state_t[1][1];
  lib13390EF9_state_t[1][1] = lib13390EF9_state_t[0][1];
  lib13390EF9_state_t[0][1] = lv_temp;

  // Rotate row 2
  lv_temp = lib13390EF9_state_t[0][2];
  lib13390EF9_state_t[0][2] = lib13390EF9_state_t[2][2];
  lib13390EF9_state_t[2][2] = lv_temp;
  lv_temp = lib13390EF9_state_t[1][2];
  lib13390EF9_state_t[1][2] = lib13390EF9_state_t[3][2];
  lib13390EF9_state_t[3][2] = lv_temp;

  // Rotate row 3
  lv_temp = lib13390EF9_state_t[0][3];
  lib13390EF9_state_t[0][3] = lib13390EF9_state_t[1][3];
  lib13390EF9_state_t[1][3] = lib13390EF9_state_t[2][3];
  lib13390EF9_state_t[2][3] = lib13390EF9_state_t[3][3];
  lib13390EF9_state_t[3][3] = lv_temp;
}

function lib13390EF9_Cipher(): void {
  lib13390EF9_AddRoundKey(0);

  for (let i: number = 1; i < lib13390EF9_Nr; i += 1) {
    lib13390EF9_SubBytes();
    lib13390EF9_ShiftRows();
    lib13390EF9_MixColumns();
    lib13390EF9_AddRoundKey(i);
  }

  lib13390EF9_SubBytes();
  lib13390EF9_ShiftRows();
  lib13390EF9_AddRoundKey(lib13390EF9_Nr);
}

function lib13390EF9_InvCipher(): void {
  lib13390EF9_AddRoundKey(lib13390EF9_Nr);

  for (let i: number = lib13390EF9_Nr - 1; i > 0; i -= 1) {
    lib13390EF9_InvShiftRows();
    lib13390EF9_InvSubBytes();
    lib13390EF9_AddRoundKey(i);
    lib13390EF9_InvMixColumns();
  }

  lib13390EF9_InvShiftRows();
  lib13390EF9_InvSubBytes();
  lib13390EF9_AddRoundKey(0);
}

function lib13390EF9_print_key(): void {
  let lv_key: string = '';
  for (let lv_i: number = 0; lv_i < lib13390EF9_KEY_SIZE; lv_i += 1)
    lv_key += lib13390EF9_denaryToHex(lib13390EF9_key[lv_i]);
}

function lib1_InitCustomScript(): void {
}

export function lib1_gf_InitAESEncryption(): void {
  lib1_gf_InitializeHexTable();
  lib1_gf_InitializeRijndaelSbox();
  lib1_gf_InitializeRijndaelRSbox();
  lib1_gf_InitializeRijndaelRcon();
  lib1_gf_InitializeASCIITable();
  lib1_gf_InitializeKeyfromGameAttributes();
}

function lib1_gf_InitializeKeyfromGameAttributes(): void {
  for (let lv_i: number = 0; lv_i < 16; lv_i += 1)
    lib13390EF9_key[lv_i] = 1 + lv_i * 16;

  lib13390EF9_KeyExpansion();
  lib13390EF9_print_key();
}

function lib1_gf_InitializeHexTable(): void {
  lib13390EF9_HexTable[0] = "0";
  lib13390EF9_HexTable[1] = "1";
  lib13390EF9_HexTable[2] = "2";
  lib13390EF9_HexTable[3] = "3";
  lib13390EF9_HexTable[4] = "4";
  lib13390EF9_HexTable[5] = "5";
  lib13390EF9_HexTable[6] = "6";
  lib13390EF9_HexTable[7] = "7";
  lib13390EF9_HexTable[8] = "8";
  lib13390EF9_HexTable[9] = "9";
  lib13390EF9_HexTable[10] = "a";
  lib13390EF9_HexTable[11] = "b";
  lib13390EF9_HexTable[12] = "c";
  lib13390EF9_HexTable[13] = "d";
  lib13390EF9_HexTable[14] = "e";
  lib13390EF9_HexTable[15] = "f";
}

function lib1_gf_InitializeASCIITable(): void {
  lib13390EF9_ASCIITable[32] = " ";
  lib13390EF9_ASCIITable[33] = "!";
  lib13390EF9_ASCIITable[34] = "\"";
  lib13390EF9_ASCIITable[35] = "#";
  lib13390EF9_ASCIITable[36] = "$";
  lib13390EF9_ASCIITable[37] = "%";
  lib13390EF9_ASCIITable[38] = "&";
  lib13390EF9_ASCIITable[39] = "'";
  lib13390EF9_ASCIITable[40] = "(";
  lib13390EF9_ASCIITable[41] = ")";
  lib13390EF9_ASCIITable[42] = "*";
  lib13390EF9_ASCIITable[43] = "+";
  lib13390EF9_ASCIITable[44] = ",";
  lib13390EF9_ASCIITable[45] = "-";
  lib13390EF9_ASCIITable[46] = ".";
  lib13390EF9_ASCIITable[47] = "/";
  lib13390EF9_ASCIITable[48] = "0";
  lib13390EF9_ASCIITable[49] = "1";
  lib13390EF9_ASCIITable[50] = "2";
  lib13390EF9_ASCIITable[51] = "3";
  lib13390EF9_ASCIITable[52] = "4";
  lib13390EF9_ASCIITable[53] = "5";
  lib13390EF9_ASCIITable[54] = "6";
  lib13390EF9_ASCIITable[55] = "7";
  lib13390EF9_ASCIITable[56] = "8";
  lib13390EF9_ASCIITable[57] = "9";
  lib13390EF9_ASCIITable[58] = ":";
  lib13390EF9_ASCIITable[59] = ";";
  lib13390EF9_ASCIITable[60] = "<";
  lib13390EF9_ASCIITable[61] = "=";
  lib13390EF9_ASCIITable[62] = ">";
  lib13390EF9_ASCIITable[63] = "?";
  lib13390EF9_ASCIITable[64] = "@";
  lib13390EF9_ASCIITable[65] = "A";
  lib13390EF9_ASCIITable[66] = "B";
  lib13390EF9_ASCIITable[67] = "C";
  lib13390EF9_ASCIITable[68] = "D";
  lib13390EF9_ASCIITable[69] = "E";
  lib13390EF9_ASCIITable[70] = "F";
  lib13390EF9_ASCIITable[71] = "G";
  lib13390EF9_ASCIITable[72] = "H";
  lib13390EF9_ASCIITable[73] = "I";
  lib13390EF9_ASCIITable[74] = "J";
  lib13390EF9_ASCIITable[75] = "K";
  lib13390EF9_ASCIITable[76] = "L";
  lib13390EF9_ASCIITable[77] = "M";
  lib13390EF9_ASCIITable[78] = "N";
  lib13390EF9_ASCIITable[79] = "O";
  lib13390EF9_ASCIITable[80] = "P";
  lib13390EF9_ASCIITable[81] = "Q";
  lib13390EF9_ASCIITable[82] = "R";
  lib13390EF9_ASCIITable[83] = "S";
  lib13390EF9_ASCIITable[84] = "T";
  lib13390EF9_ASCIITable[85] = "U";
  lib13390EF9_ASCIITable[86] = "V";
  lib13390EF9_ASCIITable[87] = "W";
  lib13390EF9_ASCIITable[88] = "X";
  lib13390EF9_ASCIITable[89] = "Y";
  lib13390EF9_ASCIITable[90] = "Z";
  lib13390EF9_ASCIITable[91] = "[";
  lib13390EF9_ASCIITable[92] = "\\";
  lib13390EF9_ASCIITable[93] = "]";
  lib13390EF9_ASCIITable[94] = "^";
  lib13390EF9_ASCIITable[95] = "_";
  lib13390EF9_ASCIITable[96] = "`";
  lib13390EF9_ASCIITable[97] = "a";
  lib13390EF9_ASCIITable[98] = "b";
  lib13390EF9_ASCIITable[99] = "c";
  lib13390EF9_ASCIITable[100] = "d";
  lib13390EF9_ASCIITable[101] = "e";
  lib13390EF9_ASCIITable[102] = "f";
  lib13390EF9_ASCIITable[103] = "g";
  lib13390EF9_ASCIITable[104] = "h";
  lib13390EF9_ASCIITable[105] = "i";
  lib13390EF9_ASCIITable[106] = "j";
  lib13390EF9_ASCIITable[107] = "k";
  lib13390EF9_ASCIITable[108] = "l";
  lib13390EF9_ASCIITable[109] = "m";
  lib13390EF9_ASCIITable[110] = "n";
  lib13390EF9_ASCIITable[111] = "o";
  lib13390EF9_ASCIITable[112] = "p";
  lib13390EF9_ASCIITable[113] = "q";
  lib13390EF9_ASCIITable[114] = "r";
  lib13390EF9_ASCIITable[115] = "s";
  lib13390EF9_ASCIITable[116] = "t";
  lib13390EF9_ASCIITable[117] = "u";
  lib13390EF9_ASCIITable[118] = "v";
  lib13390EF9_ASCIITable[119] = "w";
  lib13390EF9_ASCIITable[120] = "x";
  lib13390EF9_ASCIITable[121] = "y";
  lib13390EF9_ASCIITable[122] = "z";
  lib13390EF9_ASCIITable[123] = "{";
  lib13390EF9_ASCIITable[124] = "|";
  lib13390EF9_ASCIITable[125] = "}";
  lib13390EF9_ASCIITable[126] = "~";
}

function lib1_gf_InitializeRijndaelSbox(): void {
  lib13390EF9_sbox[0] = 0x63;
  lib13390EF9_sbox[1] = 0x7c;
  lib13390EF9_sbox[2] = 0x77;
  lib13390EF9_sbox[3] = 0x7b;
  lib13390EF9_sbox[4] = 0xf2;
  lib13390EF9_sbox[5] = 0x6b;
  lib13390EF9_sbox[6] = 0x6f;
  lib13390EF9_sbox[7] = 0xc5;
  lib13390EF9_sbox[8] = 0x30;
  lib13390EF9_sbox[9] = 0x01;
  lib13390EF9_sbox[10] = 0x67;
  lib13390EF9_sbox[11] = 0x2b;
  lib13390EF9_sbox[12] = 0xfe;
  lib13390EF9_sbox[13] = 0xd7;
  lib13390EF9_sbox[14] = 0xab;
  lib13390EF9_sbox[15] = 0x76;
  lib13390EF9_sbox[16] = 0xca;
  lib13390EF9_sbox[17] = 0x82;
  lib13390EF9_sbox[18] = 0xc9;
  lib13390EF9_sbox[19] = 0x7d;
  lib13390EF9_sbox[20] = 0xfa;
  lib13390EF9_sbox[21] = 0x59;
  lib13390EF9_sbox[22] = 0x47;
  lib13390EF9_sbox[23] = 0xf0;
  lib13390EF9_sbox[24] = 0xad;
  lib13390EF9_sbox[25] = 0xd4;
  lib13390EF9_sbox[26] = 0xa2;
  lib13390EF9_sbox[27] = 0xaf;
  lib13390EF9_sbox[28] = 0x9c;
  lib13390EF9_sbox[29] = 0xa4;
  lib13390EF9_sbox[30] = 0x72;
  lib13390EF9_sbox[31] = 0xc0;
  lib13390EF9_sbox[32] = 0xb7;
  lib13390EF9_sbox[33] = 0xfd;
  lib13390EF9_sbox[34] = 0x93;
  lib13390EF9_sbox[35] = 0x26;
  lib13390EF9_sbox[36] = 0x36;
  lib13390EF9_sbox[37] = 0x3f;
  lib13390EF9_sbox[38] = 0xf7;
  lib13390EF9_sbox[39] = 0xcc;
  lib13390EF9_sbox[40] = 0x34;
  lib13390EF9_sbox[41] = 0xa5;
  lib13390EF9_sbox[42] = 0xe5;
  lib13390EF9_sbox[43] = 0xf1;
  lib13390EF9_sbox[44] = 0x71;
  lib13390EF9_sbox[45] = 0xd8;
  lib13390EF9_sbox[46] = 0x31;
  lib13390EF9_sbox[47] = 0x15;
  lib13390EF9_sbox[48] = 0x04;
  lib13390EF9_sbox[49] = 0xc7;
  lib13390EF9_sbox[50] = 0x23;
  lib13390EF9_sbox[51] = 0xc3;
  lib13390EF9_sbox[52] = 0x18;
  lib13390EF9_sbox[53] = 0x96;
  lib13390EF9_sbox[54] = 0x05;
  lib13390EF9_sbox[55] = 0x9a;
  lib13390EF9_sbox[56] = 0x07;
  lib13390EF9_sbox[57] = 0x12;
  lib13390EF9_sbox[58] = 0x80;
  lib13390EF9_sbox[59] = 0xe2;
  lib13390EF9_sbox[60] = 0xeb;
  lib13390EF9_sbox[61] = 0x27;
  lib13390EF9_sbox[62] = 0xb2;
  lib13390EF9_sbox[63] = 0x75;
  lib13390EF9_sbox[64] = 0x09;
  lib13390EF9_sbox[65] = 0x83;
  lib13390EF9_sbox[66] = 0x2c;
  lib13390EF9_sbox[67] = 0x1a;
  lib13390EF9_sbox[68] = 0x1b;
  lib13390EF9_sbox[69] = 0x6e;
  lib13390EF9_sbox[70] = 0x5a;
  lib13390EF9_sbox[71] = 0xa0;
  lib13390EF9_sbox[72] = 0x52;
  lib13390EF9_sbox[73] = 0x3b;
  lib13390EF9_sbox[74] = 0xd6;
  lib13390EF9_sbox[75] = 0xb3;
  lib13390EF9_sbox[76] = 0x29;
  lib13390EF9_sbox[77] = 0xe3;
  lib13390EF9_sbox[78] = 0x2f;
  lib13390EF9_sbox[79] = 0x84;
  lib13390EF9_sbox[80] = 0x53;
  lib13390EF9_sbox[81] = 0xd1;
  lib13390EF9_sbox[82] = 0x00;
  lib13390EF9_sbox[83] = 0xed;
  lib13390EF9_sbox[84] = 0x20;
  lib13390EF9_sbox[85] = 0xfc;
  lib13390EF9_sbox[86] = 0xb1;
  lib13390EF9_sbox[87] = 0x5b;
  lib13390EF9_sbox[88] = 0x6a;
  lib13390EF9_sbox[89] = 0xcb;
  lib13390EF9_sbox[90] = 0xbe;
  lib13390EF9_sbox[91] = 0x39;
  lib13390EF9_sbox[92] = 0x4a;
  lib13390EF9_sbox[93] = 0x4c;
  lib13390EF9_sbox[94] = 0x58;
  lib13390EF9_sbox[95] = 0xcf;
  lib13390EF9_sbox[96] = 0xd0;
  lib13390EF9_sbox[97] = 0xef;
  lib13390EF9_sbox[98] = 0xaa;
  lib13390EF9_sbox[99] = 0xfb;
  lib13390EF9_sbox[100] = 0x43;
  lib13390EF9_sbox[101] = 0x4d;
  lib13390EF9_sbox[102] = 0x33;
  lib13390EF9_sbox[103] = 0x85;
  lib13390EF9_sbox[104] = 0x45;
  lib13390EF9_sbox[105] = 0xf9;
  lib13390EF9_sbox[106] = 0x02;
  lib13390EF9_sbox[107] = 0x7f;
  lib13390EF9_sbox[108] = 0x50;
  lib13390EF9_sbox[109] = 0x3c;
  lib13390EF9_sbox[110] = 0x9f;
  lib13390EF9_sbox[111] = 0xa8;
  lib13390EF9_sbox[112] = 0x51;
  lib13390EF9_sbox[113] = 0xa3;
  lib13390EF9_sbox[114] = 0x40;
  lib13390EF9_sbox[115] = 0x8f;
  lib13390EF9_sbox[116] = 0x92;
  lib13390EF9_sbox[117] = 0x9d;
  lib13390EF9_sbox[118] = 0x38;
  lib13390EF9_sbox[119] = 0xf5;
  lib13390EF9_sbox[120] = 0xbc;
  lib13390EF9_sbox[121] = 0xb6;
  lib13390EF9_sbox[122] = 0xda;
  lib13390EF9_sbox[123] = 0x21;
  lib13390EF9_sbox[124] = 0x10;
  lib13390EF9_sbox[125] = 0xff;
  lib13390EF9_sbox[126] = 0xf3;
  lib13390EF9_sbox[127] = 0xd2;
  lib13390EF9_sbox[128] = 0xcd;
  lib13390EF9_sbox[129] = 0x0c;
  lib13390EF9_sbox[130] = 0x13;
  lib13390EF9_sbox[131] = 0xec;
  lib13390EF9_sbox[132] = 0x5f;
  lib13390EF9_sbox[133] = 0x97;
  lib13390EF9_sbox[134] = 0x44;
  lib13390EF9_sbox[135] = 0x17;
  lib13390EF9_sbox[136] = 0xc4;
  lib13390EF9_sbox[137] = 0xa7;
  lib13390EF9_sbox[138] = 0x7e;
  lib13390EF9_sbox[139] = 0x3d;
  lib13390EF9_sbox[140] = 0x64;
  lib13390EF9_sbox[141] = 0x5d;
  lib13390EF9_sbox[142] = 0x19;
  lib13390EF9_sbox[143] = 0x73;
  lib13390EF9_sbox[144] = 0x60;
  lib13390EF9_sbox[145] = 0x81;
  lib13390EF9_sbox[146] = 0x4f;
  lib13390EF9_sbox[147] = 0xdc;
  lib13390EF9_sbox[148] = 0x22;
  lib13390EF9_sbox[149] = 0x2a;
  lib13390EF9_sbox[150] = 0x90;
  lib13390EF9_sbox[151] = 0x88;
  lib13390EF9_sbox[152] = 0x46;
  lib13390EF9_sbox[153] = 0xee;
  lib13390EF9_sbox[154] = 0xb8;
  lib13390EF9_sbox[155] = 0x14;
  lib13390EF9_sbox[156] = 0xde;
  lib13390EF9_sbox[157] = 0x5e;
  lib13390EF9_sbox[158] = 0x0b;
  lib13390EF9_sbox[159] = 0xdb;
  lib13390EF9_sbox[160] = 0xe0;
  lib13390EF9_sbox[161] = 0x32;
  lib13390EF9_sbox[162] = 0x3a;
  lib13390EF9_sbox[163] = 0x0a;
  lib13390EF9_sbox[164] = 0x49;
  lib13390EF9_sbox[165] = 0x06;
  lib13390EF9_sbox[166] = 0x24;
  lib13390EF9_sbox[167] = 0x5c;
  lib13390EF9_sbox[168] = 0xc2;
  lib13390EF9_sbox[169] = 0xd3;
  lib13390EF9_sbox[170] = 0xac;
  lib13390EF9_sbox[171] = 0x62;
  lib13390EF9_sbox[172] = 0x91;
  lib13390EF9_sbox[173] = 0x95;
  lib13390EF9_sbox[174] = 0xe4;
  lib13390EF9_sbox[175] = 0x79;
  lib13390EF9_sbox[176] = 0xe7;
  lib13390EF9_sbox[177] = 0xc8;
  lib13390EF9_sbox[178] = 0x37;
  lib13390EF9_sbox[179] = 0x6d;
  lib13390EF9_sbox[180] = 0x8d;
  lib13390EF9_sbox[181] = 0xd5;
  lib13390EF9_sbox[182] = 0x4e;
  lib13390EF9_sbox[183] = 0xa9;
  lib13390EF9_sbox[184] = 0x6c;
  lib13390EF9_sbox[185] = 0x56;
  lib13390EF9_sbox[186] = 0xf4;
  lib13390EF9_sbox[187] = 0xea;
  lib13390EF9_sbox[188] = 0x65;
  lib13390EF9_sbox[189] = 0x7a;
  lib13390EF9_sbox[190] = 0xae;
  lib13390EF9_sbox[191] = 0x08;
  lib13390EF9_sbox[192] = 0xba;
  lib13390EF9_sbox[193] = 0x78;
  lib13390EF9_sbox[194] = 0x25;
  lib13390EF9_sbox[195] = 0x2e;
  lib13390EF9_sbox[196] = 0x1c;
  lib13390EF9_sbox[197] = 0xa6;
  lib13390EF9_sbox[198] = 0xb4;
  lib13390EF9_sbox[199] = 0xc6;
  lib13390EF9_sbox[200] = 0xe8;
  lib13390EF9_sbox[201] = 0xdd;
  lib13390EF9_sbox[202] = 0x74;
  lib13390EF9_sbox[203] = 0x1f;
  lib13390EF9_sbox[204] = 0x4b;
  lib13390EF9_sbox[205] = 0xbd;
  lib13390EF9_sbox[206] = 0x8b;
  lib13390EF9_sbox[207] = 0x8a;
  lib13390EF9_sbox[208] = 0x70;
  lib13390EF9_sbox[209] = 0x3e;
  lib13390EF9_sbox[210] = 0xb5;
  lib13390EF9_sbox[211] = 0x66;
  lib13390EF9_sbox[212] = 0x48;
  lib13390EF9_sbox[213] = 0x03;
  lib13390EF9_sbox[214] = 0xf6;
  lib13390EF9_sbox[215] = 0x0e;
  lib13390EF9_sbox[216] = 0x61;
  lib13390EF9_sbox[217] = 0x35;
  lib13390EF9_sbox[218] = 0x57;
  lib13390EF9_sbox[219] = 0xb9;
  lib13390EF9_sbox[220] = 0x86;
  lib13390EF9_sbox[221] = 0xc1;
  lib13390EF9_sbox[222] = 0x1d;
  lib13390EF9_sbox[223] = 0x9e;
  lib13390EF9_sbox[224] = 0xe1;
  lib13390EF9_sbox[225] = 0xf8;
  lib13390EF9_sbox[226] = 0x98;
  lib13390EF9_sbox[227] = 0x11;
  lib13390EF9_sbox[228] = 0x69;
  lib13390EF9_sbox[229] = 0xd9;
  lib13390EF9_sbox[230] = 0x8e;
  lib13390EF9_sbox[231] = 0x94;
  lib13390EF9_sbox[232] = 0x9b;
  lib13390EF9_sbox[233] = 0x1e;
  lib13390EF9_sbox[234] = 0x87;
  lib13390EF9_sbox[235] = 0xe9;
  lib13390EF9_sbox[236] = 0xce;
  lib13390EF9_sbox[237] = 0x55;
  lib13390EF9_sbox[238] = 0x28;
  lib13390EF9_sbox[239] = 0xdf;
  lib13390EF9_sbox[240] = 0x8c;
  lib13390EF9_sbox[241] = 0xa1;
  lib13390EF9_sbox[242] = 0x89;
  lib13390EF9_sbox[243] = 0x0d;
  lib13390EF9_sbox[244] = 0xbf;
  lib13390EF9_sbox[245] = 0xe6;
  lib13390EF9_sbox[246] = 0x42;
  lib13390EF9_sbox[247] = 0x68;
  lib13390EF9_sbox[248] = 0x41;
  lib13390EF9_sbox[249] = 0x99;
  lib13390EF9_sbox[250] = 0x2d;
  lib13390EF9_sbox[251] = 0x0f;
  lib13390EF9_sbox[252] = 0xb0;
  lib13390EF9_sbox[253] = 0x54;
  lib13390EF9_sbox[254] = 0xbb;
  lib13390EF9_sbox[255] = 0x16;
}

function lib1_gf_InitializeRijndaelRSbox(): void {
  lib13390EF9_rsbox[0] = 0x52;
  lib13390EF9_rsbox[1] = 0x09;
  lib13390EF9_rsbox[2] = 0x6a;
  lib13390EF9_rsbox[3] = 0xd5;
  lib13390EF9_rsbox[4] = 0x30;
  lib13390EF9_rsbox[5] = 0x36;
  lib13390EF9_rsbox[6] = 0xa5;
  lib13390EF9_rsbox[7] = 0x38;
  lib13390EF9_rsbox[8] = 0xbf;
  lib13390EF9_rsbox[9] = 0x40;
  lib13390EF9_rsbox[10] = 0xa3;
  lib13390EF9_rsbox[11] = 0x9e;
  lib13390EF9_rsbox[12] = 0x81;
  lib13390EF9_rsbox[13] = 0xf3;
  lib13390EF9_rsbox[14] = 0xd7;
  lib13390EF9_rsbox[15] = 0xfb;
  lib13390EF9_rsbox[16] = 0x7c;
  lib13390EF9_rsbox[17] = 0xe3;
  lib13390EF9_rsbox[18] = 0x39;
  lib13390EF9_rsbox[19] = 0x82;
  lib13390EF9_rsbox[20] = 0x9b;
  lib13390EF9_rsbox[21] = 0x2f;
  lib13390EF9_rsbox[22] = 0xff;
  lib13390EF9_rsbox[23] = 0x87;
  lib13390EF9_rsbox[24] = 0x34;
  lib13390EF9_rsbox[25] = 0x8e;
  lib13390EF9_rsbox[26] = 0x43;
  lib13390EF9_rsbox[27] = 0x44;
  lib13390EF9_rsbox[28] = 0xc4;
  lib13390EF9_rsbox[29] = 0xde;
  lib13390EF9_rsbox[30] = 0xe9;
  lib13390EF9_rsbox[31] = 0xcb;
  lib13390EF9_rsbox[32] = 0x54;
  lib13390EF9_rsbox[33] = 0x7b;
  lib13390EF9_rsbox[34] = 0x94;
  lib13390EF9_rsbox[35] = 0x32;
  lib13390EF9_rsbox[36] = 0xa6;
  lib13390EF9_rsbox[37] = 0xc2;
  lib13390EF9_rsbox[38] = 0x23;
  lib13390EF9_rsbox[39] = 0x3d;
  lib13390EF9_rsbox[40] = 0xee;
  lib13390EF9_rsbox[41] = 0x4c;
  lib13390EF9_rsbox[42] = 0x95;
  lib13390EF9_rsbox[43] = 0x0b;
  lib13390EF9_rsbox[44] = 0x42;
  lib13390EF9_rsbox[45] = 0xfa;
  lib13390EF9_rsbox[46] = 0xc3;
  lib13390EF9_rsbox[47] = 0x4e;
  lib13390EF9_rsbox[48] = 0x08;
  lib13390EF9_rsbox[49] = 0x2e;
  lib13390EF9_rsbox[50] = 0xa1;
  lib13390EF9_rsbox[51] = 0x66;
  lib13390EF9_rsbox[52] = 0x28;
  lib13390EF9_rsbox[53] = 0xd9;
  lib13390EF9_rsbox[54] = 0x24;
  lib13390EF9_rsbox[55] = 0xb2;
  lib13390EF9_rsbox[56] = 0x76;
  lib13390EF9_rsbox[57] = 0x5b;
  lib13390EF9_rsbox[58] = 0xa2;
  lib13390EF9_rsbox[59] = 0x49;
  lib13390EF9_rsbox[60] = 0x6d;
  lib13390EF9_rsbox[61] = 0x8b;
  lib13390EF9_rsbox[62] = 0xd1;
  lib13390EF9_rsbox[63] = 0x25;
  lib13390EF9_rsbox[64] = 0x72;
  lib13390EF9_rsbox[65] = 0xf8;
  lib13390EF9_rsbox[66] = 0xf6;
  lib13390EF9_rsbox[67] = 0x64;
  lib13390EF9_rsbox[68] = 0x86;
  lib13390EF9_rsbox[69] = 0x68;
  lib13390EF9_rsbox[70] = 0x98;
  lib13390EF9_rsbox[71] = 0x16;
  lib13390EF9_rsbox[72] = 0xd4;
  lib13390EF9_rsbox[73] = 0xa4;
  lib13390EF9_rsbox[74] = 0x5c;
  lib13390EF9_rsbox[75] = 0xcc;
  lib13390EF9_rsbox[76] = 0x5d;
  lib13390EF9_rsbox[77] = 0x65;
  lib13390EF9_rsbox[78] = 0xb6;
  lib13390EF9_rsbox[79] = 0x92;
  lib13390EF9_rsbox[80] = 0x6c;
  lib13390EF9_rsbox[81] = 0x70;
  lib13390EF9_rsbox[82] = 0x48;
  lib13390EF9_rsbox[83] = 0x50;
  lib13390EF9_rsbox[84] = 0xfd;
  lib13390EF9_rsbox[85] = 0xed;
  lib13390EF9_rsbox[86] = 0xb9;
  lib13390EF9_rsbox[87] = 0xda;
  lib13390EF9_rsbox[88] = 0x5e;
  lib13390EF9_rsbox[89] = 0x15;
  lib13390EF9_rsbox[90] = 0x46;
  lib13390EF9_rsbox[91] = 0x57;
  lib13390EF9_rsbox[92] = 0xa7;
  lib13390EF9_rsbox[93] = 0x8d;
  lib13390EF9_rsbox[94] = 0x9d;
  lib13390EF9_rsbox[95] = 0x84;
  lib13390EF9_rsbox[96] = 0x90;
  lib13390EF9_rsbox[97] = 0xd8;
  lib13390EF9_rsbox[98] = 0xab;
  lib13390EF9_rsbox[99] = 0x00;
  lib13390EF9_rsbox[100] = 0x8c;
  lib13390EF9_rsbox[101] = 0xbc;
  lib13390EF9_rsbox[102] = 0xd3;
  lib13390EF9_rsbox[103] = 0x0a;
  lib13390EF9_rsbox[104] = 0xf7;
  lib13390EF9_rsbox[105] = 0xe4;
  lib13390EF9_rsbox[106] = 0x58;
  lib13390EF9_rsbox[107] = 0x05;
  lib13390EF9_rsbox[108] = 0xb8;
  lib13390EF9_rsbox[109] = 0xb3;
  lib13390EF9_rsbox[110] = 0x45;
  lib13390EF9_rsbox[111] = 0x06;
  lib13390EF9_rsbox[112] = 0xd0;
  lib13390EF9_rsbox[113] = 0x2c;
  lib13390EF9_rsbox[114] = 0x1e;
  lib13390EF9_rsbox[115] = 0x8f;
  lib13390EF9_rsbox[116] = 0xca;
  lib13390EF9_rsbox[117] = 0x3f;
  lib13390EF9_rsbox[118] = 0x0f;
  lib13390EF9_rsbox[119] = 0x02;
  lib13390EF9_rsbox[120] = 0xc1;
  lib13390EF9_rsbox[121] = 0xaf;
  lib13390EF9_rsbox[122] = 0xbd;
  lib13390EF9_rsbox[123] = 0x03;
  lib13390EF9_rsbox[124] = 0x01;
  lib13390EF9_rsbox[125] = 0x13;
  lib13390EF9_rsbox[126] = 0x8a;
  lib13390EF9_rsbox[127] = 0x6b;
  lib13390EF9_rsbox[128] = 0x3a;
  lib13390EF9_rsbox[129] = 0x91;
  lib13390EF9_rsbox[130] = 0x11;
  lib13390EF9_rsbox[131] = 0x41;
  lib13390EF9_rsbox[132] = 0x4f;
  lib13390EF9_rsbox[133] = 0x67;
  lib13390EF9_rsbox[134] = 0xdc;
  lib13390EF9_rsbox[135] = 0xea;
  lib13390EF9_rsbox[136] = 0x97;
  lib13390EF9_rsbox[137] = 0xf2;
  lib13390EF9_rsbox[138] = 0xcf;
  lib13390EF9_rsbox[139] = 0xce;
  lib13390EF9_rsbox[140] = 0xf0;
  lib13390EF9_rsbox[141] = 0xb4;
  lib13390EF9_rsbox[142] = 0xe6;
  lib13390EF9_rsbox[143] = 0x73;
  lib13390EF9_rsbox[144] = 0x96;
  lib13390EF9_rsbox[145] = 0xac;
  lib13390EF9_rsbox[146] = 0x74;
  lib13390EF9_rsbox[147] = 0x22;
  lib13390EF9_rsbox[148] = 0xe7;
  lib13390EF9_rsbox[149] = 0xad;
  lib13390EF9_rsbox[150] = 0x35;
  lib13390EF9_rsbox[151] = 0x85;
  lib13390EF9_rsbox[152] = 0xe2;
  lib13390EF9_rsbox[153] = 0xf9;
  lib13390EF9_rsbox[154] = 0x37;
  lib13390EF9_rsbox[155] = 0xe8;
  lib13390EF9_rsbox[156] = 0x1c;
  lib13390EF9_rsbox[157] = 0x75;
  lib13390EF9_rsbox[158] = 0xdf;
  lib13390EF9_rsbox[159] = 0x6e;
  lib13390EF9_rsbox[160] = 0x47;
  lib13390EF9_rsbox[161] = 0xf1;
  lib13390EF9_rsbox[162] = 0x1a;
  lib13390EF9_rsbox[163] = 0x71;
  lib13390EF9_rsbox[164] = 0x1d;
  lib13390EF9_rsbox[165] = 0x29;
  lib13390EF9_rsbox[166] = 0xc5;
  lib13390EF9_rsbox[167] = 0x89;
  lib13390EF9_rsbox[168] = 0x6f;
  lib13390EF9_rsbox[169] = 0xb7;
  lib13390EF9_rsbox[170] = 0x62;
  lib13390EF9_rsbox[171] = 0x0e;
  lib13390EF9_rsbox[172] = 0xaa;
  lib13390EF9_rsbox[173] = 0x18;
  lib13390EF9_rsbox[174] = 0xbe;
  lib13390EF9_rsbox[175] = 0x1b;
  lib13390EF9_rsbox[176] = 0xfc;
  lib13390EF9_rsbox[177] = 0x56;
  lib13390EF9_rsbox[178] = 0x3e;
  lib13390EF9_rsbox[179] = 0x4b;
  lib13390EF9_rsbox[180] = 0xc6;
  lib13390EF9_rsbox[181] = 0xd2;
  lib13390EF9_rsbox[182] = 0x79;
  lib13390EF9_rsbox[183] = 0x20;
  lib13390EF9_rsbox[184] = 0x9a;
  lib13390EF9_rsbox[185] = 0xdb;
  lib13390EF9_rsbox[186] = 0xc0;
  lib13390EF9_rsbox[187] = 0xfe;
  lib13390EF9_rsbox[188] = 0x78;
  lib13390EF9_rsbox[189] = 0xcd;
  lib13390EF9_rsbox[190] = 0x5a;
  lib13390EF9_rsbox[191] = 0xf4;
  lib13390EF9_rsbox[192] = 0x1f;
  lib13390EF9_rsbox[193] = 0xdd;
  lib13390EF9_rsbox[194] = 0xa8;
  lib13390EF9_rsbox[195] = 0x33;
  lib13390EF9_rsbox[196] = 0x88;
  lib13390EF9_rsbox[197] = 0x07;
  lib13390EF9_rsbox[198] = 0xc7;
  lib13390EF9_rsbox[199] = 0x31;
  lib13390EF9_rsbox[200] = 0xb1;
  lib13390EF9_rsbox[201] = 0x12;
  lib13390EF9_rsbox[202] = 0x10;
  lib13390EF9_rsbox[203] = 0x59;
  lib13390EF9_rsbox[204] = 0x27;
  lib13390EF9_rsbox[205] = 0x80;
  lib13390EF9_rsbox[206] = 0xec;
  lib13390EF9_rsbox[207] = 0x5f;
  lib13390EF9_rsbox[208] = 0x60;
  lib13390EF9_rsbox[209] = 0x51;
  lib13390EF9_rsbox[210] = 0x7f;
  lib13390EF9_rsbox[211] = 0xa9;
  lib13390EF9_rsbox[212] = 0x19;
  lib13390EF9_rsbox[213] = 0xb5;
  lib13390EF9_rsbox[214] = 0x4a;
  lib13390EF9_rsbox[215] = 0x0d;
  lib13390EF9_rsbox[216] = 0x2d;
  lib13390EF9_rsbox[217] = 0xe5;
  lib13390EF9_rsbox[218] = 0x7a;
  lib13390EF9_rsbox[219] = 0x9f;
  lib13390EF9_rsbox[220] = 0x93;
  lib13390EF9_rsbox[221] = 0xc9;
  lib13390EF9_rsbox[222] = 0x9c;
  lib13390EF9_rsbox[223] = 0xef;
  lib13390EF9_rsbox[224] = 0xa0;
  lib13390EF9_rsbox[225] = 0xe0;
  lib13390EF9_rsbox[226] = 0x3b;
  lib13390EF9_rsbox[227] = 0x4d;
  lib13390EF9_rsbox[228] = 0xae;
  lib13390EF9_rsbox[229] = 0x2a;
  lib13390EF9_rsbox[230] = 0xf5;
  lib13390EF9_rsbox[231] = 0xb0;
  lib13390EF9_rsbox[232] = 0xc8;
  lib13390EF9_rsbox[233] = 0xeb;
  lib13390EF9_rsbox[234] = 0xbb;
  lib13390EF9_rsbox[235] = 0x3c;
  lib13390EF9_rsbox[236] = 0x83;
  lib13390EF9_rsbox[237] = 0x53;
  lib13390EF9_rsbox[238] = 0x99;
  lib13390EF9_rsbox[239] = 0x61;
  lib13390EF9_rsbox[240] = 0x17;
  lib13390EF9_rsbox[241] = 0x2b;
  lib13390EF9_rsbox[242] = 0x04;
  lib13390EF9_rsbox[243] = 0x7e;
  lib13390EF9_rsbox[244] = 0xba;
  lib13390EF9_rsbox[245] = 0x77;
  lib13390EF9_rsbox[246] = 0xd6;
  lib13390EF9_rsbox[247] = 0x26;
  lib13390EF9_rsbox[248] = 0xe1;
  lib13390EF9_rsbox[249] = 0x69;
  lib13390EF9_rsbox[250] = 0x14;
  lib13390EF9_rsbox[251] = 0x63;
  lib13390EF9_rsbox[252] = 0x55;
  lib13390EF9_rsbox[253] = 0x21;
  lib13390EF9_rsbox[254] = 0x0c;
  lib13390EF9_rsbox[255] = 0x7d;
}

function lib1_gf_InitializeRijndaelRcon(): void {
  lib13390EF9_rcon[0] = 0x8d;
  lib13390EF9_rcon[1] = 0x01;
  lib13390EF9_rcon[2] = 0x02;
  lib13390EF9_rcon[3] = 0x04;
  lib13390EF9_rcon[4] = 0x08;
  lib13390EF9_rcon[5] = 0x10;
  lib13390EF9_rcon[6] = 0x20;
  lib13390EF9_rcon[7] = 0x40;
  lib13390EF9_rcon[8] = 0x80;
  lib13390EF9_rcon[9] = 0x1B;
  lib13390EF9_rcon[10] = 0x36;
}

function lib1_gf_GetInputSize(): number {
  return lib13390EF9_inputSize;
}

function lib1_gf_AddByteToInput(lp_byte: number): void {
  lib13390EF9_inputData[lib13390EF9_inputSize] = lp_byte;
  lib13390EF9_inputSize += 1;
}

function lib1_gf_AddStringToHashInput(lp_string: string): void {
  const length: number = (lp_string.length - 1);
  for (let lv_i: number = 0; lv_i <= length; lv_i += 1)
    lib1_gf_AddByteToInput(lib13390EF9_CharToAsciiCode(lp_string, lv_i));
}

function lib1_gf_AddIntegerToInput(lp_integer: number): void {
  lib1_gf_AddByteToInput(lp_integer);
}

export function lib1_gf_ECBEncrypt(lp_input: string): string {
  let lv_encrypted: string = '';
  let lv_startIndex: number = 0;
  let lv_endIndex: number = 0;
  let lv_i: number = 0;
  let lv_j: number = 0;
  let lv_m: number = 0;
  let lv_n: number = 0;

  if (sc2_StringSub(lp_input, lp_input.length, lp_input.length) == " ") {
    //UIDisplayMessage(PlayerGroupAll(), c_messageAreaSubtitle, StringExternal("Param/Value/lib_1_D9E8FB15"));
    console.error('ECBEncrypt error: whitespace only');
    return "";
  }

  if (lp_input == "") {
    //UIDisplayMessage(PlayerGroupAll(), c_messageAreaSubtitle, StringExternal("Param/Value/lib_1_8D2A6BFF"));
    console.error('ECBEncrypt error: empty string');
    return "";
  }

  lib13390EF9_inputSize = 0;
  lib1_gf_AddStringToHashInput(lp_input);
  while (lv_i < lib13390EF9_inputSize) {
    if (lib13390EF9_inputSize - lv_i < 16) {
      const lv_numToPad: number = 16 - lib13390EF9_inputSize;
      for (let lv_k: number = lib13390EF9_inputSize; lv_k < lib13390EF9_inputSize + lv_numToPad; lv_k += 1)
        lib13390EF9_inputData[lv_k] = 0x20;
      lib13390EF9_inputSize += lv_numToPad;
    }
    lv_startIndex = lv_i;
    lv_i += 16;
    lv_endIndex = lv_i;
    lv_j = lv_startIndex;

    while (lv_j < lv_endIndex) {
      for (lv_m = 0; lv_m < 4; lv_m += 1) {
        for (lv_n = 0; lv_n < 4; lv_n += 1) {
          lib13390EF9_state_t[lv_m][lv_n] = lib13390EF9_inputData[lv_j];
          lib13390EF9_inputData[lv_j] = 0x00;
          lv_j += 1;
        }
      }
    }

    lib13390EF9_Cipher();
    lv_j = lv_startIndex;

    // Copy result to output
    while (lv_j < lv_endIndex) {
      for (lv_m = 0; lv_m < 4; lv_m += 1) {
        for (lv_n = 0; lv_n < 4; lv_n += 1) {
          lv_encrypted += lib13390EF9_denaryToHex(lib13390EF9_state_t[lv_m][lv_n]);
          lv_j += 1;
        }
      }
    }
  }

  if (lib1_gf_ECBDecrypt(lv_encrypted) == lp_input)
    return lv_encrypted;
  else
    return lv_encrypted;
}

export function lib1_gf_ECBDecrypt(lp_input: string): string {
  let lv_decrypted: string = '';
  let lv_temp: string = lp_input;
  let lv_hexVal: string = '';
  let lv_decVal: number = 0;
  let lv_startIndex: number = 0;
  let lv_endIndex: number = 0;
  let lv_i: number = 0;
  let lv_j: number = 0;
  let lv_k: number = 0;
  let lv_m: number = 0;
  let lv_n: number = 0;
  let lv_numToPad: number = 0;

  if (lp_input == "") {
    //UIDisplayMessage(PlayerGroupAll(), c_messageAreaSubtitle, StringExternal("Param/Value/lib_1_05689286"));
    console.error('ECBDecrypt error: empty string');
    return "";
  }

  lib13390EF9_inputSize = 0;
  while (lv_temp != "") {
    lv_hexVal = sc2_StringSub(lv_temp, 1, 2);
    lv_temp = sc2_StringSub(lv_temp, 3, lv_temp.length);
    lv_decVal = lib13390EF9_hexToByte(lv_hexVal);
    lib1_gf_AddIntegerToInput(lv_decVal);
  }

  while (lv_i < lib13390EF9_inputSize) {
    if (lib13390EF9_inputSize - lv_i < 16) {
      lv_numToPad = 16 - lib13390EF9_inputSize;
      for (lv_k = lib13390EF9_inputSize; lv_k < lib13390EF9_inputSize + lv_numToPad; lv_k += 1)
        lib13390EF9_inputData[lv_k] = 0x20;
      lib13390EF9_inputSize += lv_numToPad;
    }
    lv_startIndex = lv_i;
    lv_i += 16;
    lv_endIndex = lv_i;
    lv_j = lv_startIndex;
    while (lv_j < lv_endIndex) {
      for (lv_m = 0; lv_m < 4; lv_m += 1) {
        for (lv_n = 0; lv_n < 4; lv_n += 1) {
          lib13390EF9_state_t[lv_m][lv_n] = lib13390EF9_inputData[lv_j];
          lv_j += 1;
        }
      }
    }

    lib13390EF9_InvCipher();
    lv_j = lv_startIndex;

    while (lv_j < lv_endIndex) {
      for (lv_m = 0; lv_m < 4; lv_m += 1) {
        for (lv_n = 0; lv_n < 4; lv_n += 1) {
          lv_decrypted += lib13390EF9_decToASCII(lib13390EF9_state_t[lv_m][lv_n]);
          lv_j += 1;
        }
      }
    }
  }

  while (sc2_StringSub(lv_decrypted, lv_decrypted.length, sc2_StringLength(lv_decrypted)) == " ")
    lv_decrypted = sc2_StringSub(lv_decrypted, 1, sc2_StringLength(lv_decrypted) - 1);

  return lv_decrypted;
}

// Not used
/* export function lib1_gf_CBCEncrypt(lp_input: string, lp_playerHandle: string): string {
  let lv_handle: string;
  let lv_encrypted: string;
  let lv_startIndex: number;
  let lv_endIndex: number;
  let lv_i: number = 0;
  let lv_j: number;
  let lv_m: number;
  let lv_n: number;
  let lv_k: number;
  let lv_numToPad: number;
  let lv_currentIV: number[][] = Array.from({ length: 5 }, () => Array(5).fill(0));

  lv_handle = sc2_StringSub(lp_playerHandle, 8, sc2_StringLength(lp_playerHandle));
  lv_encrypted = "";

  if (sc2_StringSub(lp_input, sc2_StringLength(lp_input), sc2_StringLength(lp_input)) == " ") {
    //UIDisplayMessage(PlayerGroupAll(), c_messageAreaSubtitle, StringExternal("Param/Value/lib_1_9D778509"));
    return "";
  }

  if (lp_input == "") {
    //UIDisplayMessage(PlayerGroupAll(), c_messageAreaSubtitle, StringExternal("Param/Value/lib_1_0069B879"));
    return "";
  }

  lv_handle = lv_handle + lv_handle;
  for (let lv_u: number = 0; lv_u < 4; lv_u += 1)
    for (let lv_p: number = 0; lv_p < 4; lv_p += 1)
      lv_currentIV[lv_u][lv_p] = parseInt(lv_handle);

  lib13390EF9_inputSize = 0;
  lib1_gf_AddStringToHashInput(lp_input);

  while (lv_i < lib13390EF9_inputSize) {
    if (lib13390EF9_inputSize - lv_i < 16) {
      lv_numToPad = 16 - lib13390EF9_inputSize;
      for (lv_k = lib13390EF9_inputSize; lv_k < lib13390EF9_inputSize + lv_numToPad; lv_k += 1)
        lib13390EF9_inputData[lv_k] = 0x20;
      lib13390EF9_inputSize += lv_numToPad;
    }
    lv_startIndex = lv_i;
    lv_i += 16;
    lv_endIndex = lv_i;
    lv_j = lv_startIndex;
    while (lv_j < lv_endIndex) {
      for (lv_m = 0; lv_m < 4; lv_m += 1) {
        for (lv_n = 0; lv_n < 4; lv_n += 1) {
          lib13390EF9_state_t[lv_m][lv_n] = lib13390EF9_inputData[lv_j] ^ lv_currentIV[lv_m][lv_n];
          lib13390EF9_inputData[lv_j] = 0x00;
          lv_j += 1;
        }
      }
    }

    lib13390EF9_Cipher();

    lv_j = lv_startIndex;
    while (lv_j < lv_endIndex) {
      for (lv_m = 0; lv_m < 4; lv_m += 1) {
        for (lv_n = 0; lv_n < 4; lv_n += 1) {
          lv_encrypted += lib13390EF9_denaryToHex(lib13390EF9_state_t[lv_m][lv_n]);
          lv_currentIV[lv_m][lv_n] = lib13390EF9_state_t[lv_m][lv_n];
          lv_j += 1;
        }
      }
    }
  }

  if (lib1_gf_CBCDecrypt(lv_encrypted, lp_playerHandle) == lp_input) {
    return lv_encrypted;
  } else {
    //UIDisplayMessage(PlayerGroupAll(), c_messageAreaSubtitle, StringExternal("Param/Value/lib_1_5002FC13"));
    return lv_encrypted;
  }
} */

// Not used
/* export function lib1_gf_CBCDecrypt(lp_input: string, lp_playerHandle: string): string {
  let lv_handle: string;
  let lv_decrypted: string;
  let lv_temp: string;
  let lv_hexVal: string;
  let lv_decVal: number;
  let lv_startIndex: number;
  let lv_endIndex: number;
  let lv_i: number = 0;
  let lv_j: number;
  let lv_m: number;
  let lv_n: number;
  let lv_k: number;
  let lv_numToPad: number;
  const lv_currentIV: number[][] = sc2_initZeroArray<number[][]>(5, 5);
  const lv_bufferIV: number[][] = sc2_initZeroArray<number[][]>(5, 5);
  let lv_u: number;
  let lv_p: number;

  lv_handle = sc2_StringSub(lp_playerHandle, 8, sc2_StringLength(lp_playerHandle));
  lv_decrypted = "";
  lv_temp = lp_input;
  lv_hexVal = "";

  if (lp_input == "") {
    //UIDisplayMessage(PlayerGroupAll(), c_messageAreaSubtitle, StringExternal("Param/Value/lib_1_2C476660"));
    return "";
  }

  lib13390EF9_inputSize = 0;
  lv_handle = lv_handle + lv_handle;
  for (lv_u = 0; lv_u < 4; lv_u += 1)
    for (lv_p = 0; lv_p < 4; lv_p += 1)
      lv_currentIV[lv_u][lv_p] = parseInt(lv_handle);

  while (lv_temp !== "") {
    lv_hexVal = sc2_StringSub(lv_temp, 1, 2);
    lv_temp = sc2_StringSub(lv_temp, 3, sc2_StringLength(lv_temp));
    lv_decVal = lib13390EF9_hexToByte(lv_hexVal);
    lib1_gf_AddIntegerToInput(lv_decVal);
  }

  for (lv_m = 0; lv_m < 4; lv_m += 1)
    for (lv_n = 0; lv_n < 4; lv_n += 1)
      lib13390EF9_state_t[lv_m][lv_n] = lv_currentIV[lv_m][lv_n];

  while (lv_i < lib13390EF9_inputSize) {
    if (lib13390EF9_inputSize - lv_i < 16) {
      lv_numToPad = 16 - lib13390EF9_inputSize;
      for (lv_k = lib13390EF9_inputSize; lv_k < lib13390EF9_inputSize + lv_numToPad; lv_k += 1)
        lib13390EF9_inputData[lv_k] = 0x20;
      lib13390EF9_inputSize += lv_numToPad;
    }
    lv_startIndex = lv_i;
    lv_i += 16;
    lv_endIndex = lv_i;
    lv_j = lv_startIndex;
    while (lv_j < lv_endIndex) {
      for (lv_m = 0; lv_m < 4; lv_m += 1) {
        for (lv_n = 0; lv_n < 4; lv_n += 1) {
          lv_bufferIV[lv_m][lv_n] = lv_currentIV[lv_m][lv_n];
          lib13390EF9_state_t[lv_m][lv_n] = lib13390EF9_inputData[lv_j];
          lib13390EF9_inputData[lv_j] = 0x00;
          lv_currentIV[lv_m][lv_n] = lib13390EF9_state_t[lv_m][lv_n];
          lv_j += 1;
        }
      }
    }
    lib13390EF9_InvCipher();
    lv_j = lv_startIndex;
    while (lv_j < lv_endIndex) {
      for (lv_m = 0; lv_m < 4; lv_m += 1) {
        for (lv_n = 0; lv_n < 4; lv_n += 1) {
          lv_decrypted += lib13390EF9_decToASCII(lib13390EF9_state_t[lv_m][lv_n] ^ lv_bufferIV[lv_m][lv_n]);
          lv_j += 1;
        }
      }
    }
  }

  while ((sc2_StringSub(lv_decrypted, sc2_StringLength(lv_decrypted), sc2_StringLength(lv_decrypted)) == " "))
    lv_decrypted = sc2_StringSub(lv_decrypted, 1, (sc2_StringLength(lv_decrypted) - 1));

  return lv_decrypted;
} */